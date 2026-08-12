import { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { BackIcon, NextIcon } from './IconButton';

const cache = new Map();

let lib = null;
async function load() {
  if (!lib) {
    const [pdfjs, worker] = await Promise.all([
      import('pdfjs-dist/legacy/build/pdf.mjs'),
      import('pdfjs-dist/legacy/build/pdf.worker.min.mjs?url'),
    ]);
    pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
    lib = pdfjs;
  }
  return lib;
}

function open(url) {
  if (!cache.has(url)) {
    cache.set(
      url,
      load().then((pdfjs) => pdfjs.getDocument(url).promise),
    );
  }
  return cache.get(url);
}

function PdfViewer({ url, label, onReady }) {
  const boxRef = useRef(null);
  const canvasRef = useRef(null);
  const taskRef = useRef(null);
  const docRef = useRef(null);

  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(1);
  const [failed, setFailed] = useState(false);

  const announced = useRef(false);

  const draw = useCallback(async () => {
    const doc = docRef.current;
    const box = boxRef.current;
    const canvas = canvasRef.current;
    if (!doc || !box || !canvas) return;

    const previous = taskRef.current;
    if (previous) {
      previous.cancel();
      await previous.promise.catch(() => {});
    }

    const sheet = await doc.getPage(page);
    const unscaled = sheet.getViewport({ scale: 1 });

    const fit = Math.min(box.clientWidth / unscaled.width, box.clientHeight / unscaled.height);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const viewport = sheet.getViewport({ scale: fit * dpr });

    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);
    canvas.style.width = `${Math.floor(unscaled.width * fit)}px`;
    canvas.style.height = `${Math.floor(unscaled.height * fit)}px`;

    const task = sheet.render({ canvas, canvasContext: canvas.getContext('2d'), viewport });
    taskRef.current = task;

    try {
      await task.promise;
      if (!announced.current) {
        announced.current = true;
        onReady?.();
      }
    } catch (error) {
      if (error?.name !== 'RenderingCancelledException') throw error;
    }
  }, [page, onReady]);

  const chain = useRef(Promise.resolve());
  const pending = useRef(0);

  const schedule = useCallback(() => {
    const ticket = (pending.current += 1);
    chain.current = chain.current
      .then(() => (ticket === pending.current && docRef.current ? draw() : undefined))
      .catch((error) => {
        console.error('[PdfViewer]', error);
        setFailed(true);
      });
  }, [draw]);

  useEffect(() => {
    let live = true;

    open(url)
      .then((doc) => {
        if (!live) return;
        docRef.current = doc;
        setPages(doc.numPages);
        schedule();
      })
      .catch(() => live && setFailed(true));

    return () => {
      live = false;
      taskRef.current?.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  useEffect(schedule, [schedule]);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return undefined;

    const observer = new ResizeObserver(schedule);
    observer.observe(box);
    return () => observer.disconnect();
  }, [schedule]);

  if (failed) return null;

  const paged = pages > 1;

  return (
    // No inset. A landscape page is narrower than the sheet, so it is limited
    // by height anyway, and padding here would only make it smaller — the tint
    // either side of it is the mat.
    <div ref={boxRef} className='relative flex h-full w-full items-center justify-center'>
      <canvas
        ref={canvasRef}
        aria-label={label}
        role='img'
        className='block ring-1 ring-light-black/10'
      />

      {paged && (
        // Centred at the foot of the page, floating over it — the same place
        // every PDF reader puts it, and over blank paper on a diploma. Padding
        // the box instead would shrink the page on every visit, and would not
        // even work: clientWidth/clientHeight include padding, so the fit above
        // would still size the page to the full box and slide under the pill.
        <div className='pointer-events-none absolute inset-x-0 bottom-3 flex justify-center'>
          <div className='pointer-events-auto flex items-center gap-1 rounded-full bg-white/95 p-1 shadow-[0_2px_12px_rgba(10,10,10,0.12)] ring-1 ring-light-black/[0.06] backdrop-blur-sm'>
            <Pager
              label='Previous page'
              disabled={page === 1}
              onClick={() => setPage((n) => n - 1)}
            >
              <BackIcon style={{ fontSize: 12 }} />
            </Pager>
            <span className='min-w-[2.75rem] text-center text-[0.7rem] tabular-nums text-light-black'>
              {page} / {pages}
            </span>
            <Pager
              label='Next page'
              disabled={page === pages}
              onClick={() => setPage((n) => n + 1)}
            >
              <NextIcon style={{ fontSize: 12 }} />
            </Pager>
          </div>
        </div>
      )}
    </div>
  );
}

function Pager({ label, disabled, onClick, children }) {
  return (
    <button
      type='button'
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className='flex h-8 w-8 items-center justify-center rounded-full text-light-black transition-colors hover:bg-light-black/[0.06] disabled:pointer-events-none disabled:opacity-30'
    >
      {children}
    </button>
  );
}

Pager.propTypes = {
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

PdfViewer.propTypes = {
  url: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onReady: PropTypes.func,
};

export default PdfViewer;
