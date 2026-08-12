import { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

function ScrollFade({ scrollClassName = '', className = '', children }) {
  const ref = useRef(null);
  const [more, setMore] = useState(false);
  const [overflowing, setOverflowing] = useState(false);
  const [thumb, setThumb] = useState({ size: 0, top: 0 });

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const hidden = el.scrollHeight - el.clientHeight;
    setOverflowing(hidden > 4);
    setMore(hidden - el.scrollTop > 4);
    setThumb({
      size: (el.clientHeight / el.scrollHeight) * 100,
      top: (el.scrollTop / el.scrollHeight) * 100,
    });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    measure();
    el.addEventListener('scroll', measure, { passive: true });

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    Array.from(el.children).forEach((child) => observer.observe(child));

    return () => {
      el.removeEventListener('scroll', measure);
      observer.disconnect();
    };
  }, [measure, children]);

  return (
    <div className={`relative ${className}`}>
      <div
        ref={ref}
        data-lenis-prevent
        tabIndex={overflowing ? 0 : -1}
        className={`no-scrollbar focus-visible:outline-1 focus-visible:outline-grey ${scrollClassName}`}
      >
        {children}
      </div>

      <div
        aria-hidden='true'
        className={`pointer-events-none absolute inset-y-1.5 right-1.5 w-[3px] transition-opacity duration-300 ${
          overflowing ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span
          className='absolute right-0 w-[3px] rounded-full bg-light-black/25'
          style={{ height: `${thumb.size}%`, top: `${thumb.top}%` }}
        />
      </div>

      <div
        aria-hidden='true'
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-canvas via-canvas/80 to-transparent transition-opacity duration-300 ${
          more ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}

ScrollFade.propTypes = {
  scrollClassName: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default ScrollFade;
