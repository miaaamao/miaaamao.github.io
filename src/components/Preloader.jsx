import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { gsap } from '../lib/gsap';
import { site } from '../data/site';

const W = 520;
const H = 200;
const MID = H / 2;
const AMP = 62;
const STEPS = 160;

const xAt = (t) => t * W;
const yAt = (t) => MID - Math.sin(t * Math.PI * 2) * AMP;

function curveTo(t) {
  let d = `M${xAt(0).toFixed(1)} ${yAt(0).toFixed(1)}`;
  const whole = Math.floor(t * STEPS);

  for (let i = 1; i <= whole; i += 1) {
    const u = i / STEPS;
    d += ` L${xAt(u).toFixed(1)} ${yAt(u).toFixed(1)}`;
  }

  return `${d} L${xAt(t).toFixed(1)} ${yAt(t).toFixed(1)}`;
}

function Preloader({ onDone }) {
  const rootRef = useRef(null);
  const penRef = useRef(null);
  const pathRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onDone();
      return undefined;
    }

    document.body.style.overflow = 'hidden';
    const progress = { value: 0 };

    const timeline = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        onDone();
      },
    });

    timeline
      .to(progress, {
        value: 1,
        duration: 1.5,
        ease: 'power2.inOut',
        onUpdate: () => {
          const t = progress.value;
          setCount(Math.round(t * 100));
          pathRef.current.setAttribute('d', curveTo(t));
          gsap.set(penRef.current, { attr: { cx: xAt(t), cy: yAt(t) } });
        },
      })
      .to('[data-pen]', { opacity: 0, duration: 0.3 }, '-=0.1')
      .to('[data-lift]', { y: -14, opacity: 0, duration: 0.5, ease: 'power2.in' })
      .to(rootRef.current, { opacity: 0, duration: 0.55, ease: 'power2.inOut' }, '-=0.3');

    return () => {
      document.body.style.overflow = '';
      timeline.kill();
    };
  }, [onDone]);

  return (
    <div
      ref={rootRef}
      className='graph-paper fixed inset-0 z-[90] flex items-center justify-center bg-canvas px-page'
    >
      <div data-lift className='w-[min(78vw,520px)]'>
        <svg viewBox={`0 0 ${W} ${H}`} className='w-full overflow-visible' aria-hidden='true'>
          <line x1='0' y1={MID} x2={W} y2={MID} stroke='rgba(10,10,10,0.14)' strokeWidth='1' />
          <line x1='0' y1='0' x2='0' y2={H} stroke='rgba(10,10,10,0.14)' strokeWidth='1' />
          <path
            ref={pathRef}
            d={curveTo(0)}
            fill='none'
            stroke='#0a0a0a'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <circle data-pen ref={penRef} cx='0' cy={MID} r='4' fill='#0a0a0a' />
        </svg>

        <div className='rule-t mt-6 flex items-baseline justify-between pt-3'>
          <span className='text-[0.7rem] tracking-[0.2em] text-grey uppercase'>{site.name}</span>
          <span className='text-[0.8rem] tabular-nums text-light-black'>
            {String(count).padStart(3, '0')}
          </span>
        </div>
      </div>
    </div>
  );
}

Preloader.propTypes = {
  onDone: PropTypes.func.isRequired,
};

export default Preloader;
