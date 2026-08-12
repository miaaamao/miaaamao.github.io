import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { gsap, SplitText } from '../lib/gsap';

function SplitReveal({
  as: Tag = 'span',
  children,
  delay = 0,
  stagger = 0.018,
  onScroll = false,
  className = '',
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add('(prefers-reduced-motion: reduce)', () => {
        el.classList.remove('reveal-pending');
      });

      media.add('(prefers-reduced-motion: no-preference)', () => {
        const split = new SplitText(el, {
          type: 'lines,chars',
          linesClass: 'split-mask',
        });

        el.classList.remove('reveal-pending');

        const tween = gsap.from(split.chars, {
          yPercent: 110,
          duration: 0.9,
          ease: 'expo.out',
          stagger,
          delay,
          scrollTrigger: onScroll ? { trigger: el, start: 'top 85%', once: true } : undefined,
        });

        return () => {
          tween.kill();
          split.revert();
        };
      });
    }, ref);

    return () => context.revert();
  }, [children, delay, stagger, onScroll]);

  return (
    <Tag ref={ref} className={`reveal-pending ${className}`}>
      {children}
    </Tag>
  );
}

SplitReveal.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
  stagger: PropTypes.number,
  onScroll: PropTypes.bool,
  className: PropTypes.string,
};

export default SplitReveal;
