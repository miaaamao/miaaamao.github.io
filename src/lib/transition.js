import { gsap } from './gsap';

let pending = null;

export function rememberOrigin(rect) {
  pending =
    rect && rect.width && rect.height
      ? { top: rect.top, left: rect.left, width: rect.width, height: rect.height }
      : null;
}

export function consumeOrigin() {
  const rect = pending;
  pending = null;
  return rect;
}

export function expandFrom(el, from, vars = {}) {
  if (!el || !from) return null;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;

  const to = el.getBoundingClientRect();
  if (!to.width || !to.height) return null;

  return gsap.from(el, {
    x: from.left - to.left,
    y: from.top - to.top,
    scaleX: from.width / to.width,
    scaleY: from.height / to.height,
    transformOrigin: 'top left',
    duration: 0.7,
    ease: 'power3.inOut',
    ...vars,
  });
}

export function hasOrigin() {
  return pending !== null;
}
