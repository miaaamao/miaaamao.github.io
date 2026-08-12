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

  return (
    <div className='h-full w-full p-[3.5%]'>
      <div className='flex h-full w-full flex-col'>
        <div ref={boxRef} className='flex min-h-0 flex-1 items-center justify-center'>
          <canvas
            ref={canvasRef}
            aria-label={label}
            role='img'
            className='ring-1 shadow-[0_4px_22px_rgba(10,10,10,0.16)] ring-light-black/10'
          />
        </div>

        {pages > 1 && (
          <div className='mt-3 flex shrink-0 items-center justify-center gap-2'>
            <Pager
              label='Previous page'
              disabled={page === 1}
              onClick={() => setPage((n) => n - 1)}
            >
              <BackIcon style={{ fontSize: 13 }} />
            </Pager>
            <span className='rounded-full bg-white/90 px-3 py-1.5 text-[0.7rem] tabular-nums text-light-black shadow-[0_2px_10px_rgba(10,10,10,0.08)]'>
              {page} / {pages}
            </span>
            <Pager
              label='Next page'
              disabled={page === pages}
              onClick={() => setPage((n) => n + 1)}
            >
              <NextIcon style={{ fontSize: 13 }} />
            </Pager>
          </div>
        )}
      </div>
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
      className='flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-light-black shadow-[0_2px_10px_rgba(10,10,10,0.08)] transition-opacity disabled:pointer-events-none disabled:opacity-35'
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
