import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { gsap, Observer } from '../lib/gsap';
import { useReducedMotion } from '../lib/useReducedMotion';
import { consumeOrigin, expandFrom, rememberOrigin } from '../lib/transition';

const FIRST_GAP = 1.16;
const PILE_GAP = 0.15;
const TILT = 46; // degrees of rotateX per step back
const MAX_TILT = 78; // never let a card pass edge-on and flip inside out
const DEPTH = 120; // pixels pushed away from the viewer per step back
const FADE = [1, 0.32, 0.06];

function opacityFor(distance) {
  return FADE[distance] ?? 0;
}

function offsetFor(signedDistance) {
  if (signedDistance === 0) return 0;
  const distance = Math.abs(signedDistance);
  const magnitude = FIRST_GAP + PILE_GAP * (distance - 1);
  return Math.sign(signedDistance) * magnitude;
}

function wrappedOffset(index, active, total) {
  const half = total / 2;
  let offset = index - active;
  if (offset > half) offset -= total;
  if (offset < -half) offset += total;
  return offset;
}

function CardDeck({ items, activeSlug, onChange, hrefFor, renderFace, label }) {
  const wrapRef = useRef(null);
  const cardRefs = useRef([]);
  const settled = useRef(false);
  const locked = useRef(false);

  const reduced = useReducedMotion();

  const active = Math.max(
    0,
    items.findIndex((item) => item.slug === activeSlug),
  );

  const activeRef = useRef(active);
  activeRef.current = active;

  const goTo = useCallback((index) => onChange(items[index].slug), [items, onChange]);

  const step = useCallback(
    (direction) => {
      if (locked.current) return;
      locked.current = true;
      gsap.delayedCall(0.55, () => {
        locked.current = false;
      });
      goTo(gsap.utils.wrap(0, items.length, activeRef.current + direction));
    },
    [goTo, items.length],
  );

  useLayoutEffect(() => {
    if (reduced) return;

    const cards = cardRefs.current.filter(Boolean);
    if (!cards.length) return;

    const height = cards[0].offsetHeight || 0;

    cards.forEach((card, index) => {
      const offset = wrappedOffset(index, active, items.length);
      const distance = Math.abs(offset);
      const capped = Math.min(distance, 3);
      const to = {
        y: offsetFor(offset) * height,
        z: -capped * DEPTH,
        rotationX: Math.sign(offset) * Math.min(TILT * capped, MAX_TILT),
        opacity: opacityFor(distance),
        zIndex: items.length - distance,
      };

      if (settled.current && distance < 3) {
        gsap.to(card, { ...to, duration: 0.9, ease: 'expo.out', overwrite: 'auto' });
      } else {
        gsap.set(card, to);
      }
    });

    settled.current = true;
  }, [active, items.length, reduced]);

  useEffect(() => {
    const origin = consumeOrigin();
    if (!origin || reduced) return;

    const card = cardRefs.current[activeRef.current];
    expandFrom(card, origin);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (reduced || !wrapRef.current) return undefined;

    const observer = Observer.create({
      target: wrapRef.current,
      type: 'wheel,touch,pointer',
      wheelSpeed: 1,
      tolerance: 24,
      dragMinimum: 24,
      preventDefault: true,
      onUp: () => step(-1),
      onDown: () => step(1),
    });

    return () => observer.kill();
  }, [reduced, step]);

  const onKeyDown = useCallback(
    (event) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        event.preventDefault();
        step(1);
      } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        event.preventDefault();
        step(-1);
      }
    },
    [step],
  );

  if (reduced) {
    return (
      <ul className='flex w-full flex-col gap-8'>
        {items.map((item) => (
          <li key={item.slug}>
            <CardLink item={item} hrefFor={hrefFor} renderFace={renderFace} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className='relative flex h-full w-full items-center justify-center'>
      <div
        ref={wrapRef}
        role='group'
        tabIndex={0}
        onKeyDown={onKeyDown}
        aria-label={label}
        className='absolute inset-y-0 right-10 left-0 flex transform-3d cursor-grab touch-none items-center justify-center perspective-[800px] focus-visible:outline-none active:cursor-grabbing phone:right-14'
      >
        {items.map((item, index) => (
          <div
            key={item.slug}
            ref={(node) => {
              cardRefs.current[index] = node;
            }}
            aria-hidden={index !== active}
            className='absolute w-[68vw] will-change-transform phone:w-[clamp(260px,28vw,560px)]'
          >
            <CardLink
              item={item}
              hrefFor={hrefFor}
              renderFace={renderFace}
              interactive={index === active}
            />
          </div>
        ))}
      </div>

      <ol className='absolute top-1/2 right-0 flex -translate-y-1/2 flex-col'>
        {items.map((item, index) => (
          <li key={item.slug}>
            <button
              type='button'
              onClick={() => goTo(index)}
              aria-label={`Go to ${item.title}`}
              aria-current={index === active}
              className='flex h-8 w-8 items-center justify-center'
            >
              <span
                className={`block h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                  index === active ? 'scale-125 bg-black' : 'bg-grey/50 hover:bg-grey'
                }`}
              />
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

function CardLink({ item, hrefFor, renderFace, interactive = true }) {
  return (
    <Link
      to={hrefFor(item)}
      tabIndex={interactive ? 0 : -1}
      draggable={false}
      onClick={(event) => rememberOrigin(event.currentTarget.getBoundingClientRect())}
      className='block'
    >
      {renderFace(item)}
    </Link>
  );
}

const itemShape = PropTypes.shape({
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
});

CardDeck.propTypes = {
  items: PropTypes.arrayOf(itemShape).isRequired,
  activeSlug: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  hrefFor: PropTypes.func.isRequired,
  renderFace: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

CardLink.propTypes = {
  item: itemShape.isRequired,
  hrefFor: PropTypes.func.isRequired,
  renderFace: PropTypes.func.isRequired,
  interactive: PropTypes.bool,
};

export default CardDeck;
