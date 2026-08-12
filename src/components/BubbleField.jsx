import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { gsap } from '../lib/gsap';
import { useReducedMotion } from '../lib/useReducedMotion';
import RoleIcon from './RoleIcon';

const BASE = 0.15; // of the field's short side
const MIN_R = 34;
const MAX_R = 112;
const SLOW = 7; // px/s — below this a bubble is nudged back up
const FAST = 30; // px/s — above this it is reined in
const GOLDEN = 2.39996; // radians; spreads the starting points evenly

const clamp = (value, low, high) => Math.min(high, Math.max(low, value));

function radiusOf(item, side) {
  return clamp(side * BASE, MIN_R, MAX_R) * (item.weight ?? 0.62);
}

function BubbleField({ items, selected, onSelect, label }) {
  const wrapRef = useRef(null);
  const nodeRefs = useRef([]);
  const bodies = useRef([]);
  const reduced = useReducedMotion();
  const [box, setBox] = useState({ w: 0, h: 0 });

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;

    const measure = () => setBox({ w: el.clientWidth, h: el.clientHeight });
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const { w, h } = box;
    if (!w || !h) return;

    const side = Math.min(w, h);

    bodies.current = items.map((item, index) => {
      const r = radiusOf(item, side);
      const previous = bodies.current[index];

      if (previous) {
        return { ...previous, r, x: clamp(previous.x, r, w - r), y: clamp(previous.y, r, h - r) };
      }

      const angle = index * GOLDEN;
      const spread = side * 0.34 * Math.sqrt((index + 0.5) / items.length);
      const heading = index * 2.1 + 0.7;
      const speed = 11 + (index % 3) * 6;

      return {
        r,
        x: clamp(w / 2 + Math.cos(angle) * spread, r, w - r),
        y: clamp(h / 2 + Math.sin(angle) * spread, r, h - r),
        vx: Math.cos(heading) * speed,
        vy: Math.sin(heading) * speed,
      };
    });
  }, [box, items]);

  useEffect(() => {
    const { w, h } = box;
    if (reduced || !w || !h) return undefined;

    const update = (time, deltaTime) => {
      const dt = Math.min(deltaTime, 48) / 1000;
      const list = bodies.current;

      list.forEach((body) => {
        body.x += body.vx * dt;
        body.y += body.vy * dt;

        if (body.x < body.r) {
          body.x = body.r;
          body.vx = Math.abs(body.vx);
        } else if (body.x > w - body.r) {
          body.x = w - body.r;
          body.vx = -Math.abs(body.vx);
        }

        if (body.y < body.r) {
          body.y = body.r;
          body.vy = Math.abs(body.vy);
        } else if (body.y > h - body.r) {
          body.y = h - body.r;
          body.vy = -Math.abs(body.vy);
        }
      });

      for (let i = 0; i < list.length; i += 1) {
        for (let j = i + 1; j < list.length; j += 1) {
          resolve(list[i], list[j]);
        }
      }

      list.forEach((body, index) => {
        const speed = Math.hypot(body.vx, body.vy) || 0.001;
        const wanted = clamp(speed, SLOW, FAST);
        if (wanted !== speed) {
          body.vx = (body.vx / speed) * wanted;
          body.vy = (body.vy / speed) * wanted;
        }

        const node = nodeRefs.current[index];
        if (node) {
          node.style.transform = `translate3d(${body.x - body.r}px, ${body.y - body.r}px, 0)`;
        }
      });
    };

    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, [box, reduced]);

  const onBackdrop = useCallback(
    (event) => {
      if (event.target === event.currentTarget) onSelect(null);
    },
    [onSelect],
  );

  const side = Math.min(box.w, box.h);
  const dimmed = Boolean(selected);

  if (reduced) {
    return (
      <ul className='flex flex-wrap items-center justify-center gap-4'>
        {items.map((item) => (
          <li key={item.slug}>
            <Bubble
              item={item}
              diameter={2 * radiusOf(item, 420)}
              selected={selected === item.slug}
              dimmed={dimmed}
              onSelect={onSelect}
            />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div
      ref={wrapRef}
      role='group'
      aria-label={label}
      onClick={onBackdrop}
      className='graph-paper relative h-full w-full overflow-hidden rounded-2xl border border-rule/70'
    >
      {side > 0 &&
        items.map((item, index) => (
          <div
            key={item.slug}
            ref={(node) => {
              nodeRefs.current[index] = node;
            }}
            className='absolute top-0 left-0 will-change-transform'
          >
            <Bubble
              item={item}
              diameter={2 * radiusOf(item, side)}
              selected={selected === item.slug}
              dimmed={dimmed}
              onSelect={onSelect}
            />
          </div>
        ))}
    </div>
  );
}

function Bubble({ item, diameter, selected, dimmed, onSelect }) {
  const Tag = item.interactive ? 'button' : 'div';
  const press = item.interactive
    ? {
        type: 'button',
        onClick: () => onSelect(selected ? null : item.slug),
        'aria-pressed': selected,
        'aria-label': `${item.label}, see where`,
      }
    : { 'aria-label': item.label };

  return (
    <Tag
      {...press}
      style={{ width: diameter, height: diameter }}
      className={`@container relative rounded-full backdrop-blur-[1px] transition-[opacity,transform] duration-300 focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-light-black ${
        item.interactive ? 'cursor-pointer hover:scale-[1.04]' : 'cursor-default'
      } ${selected ? 'scale-[1.06] opacity-100' : dimmed ? 'opacity-45' : 'opacity-100'}`}
    >
      <span
        aria-hidden='true'
        className={`absolute inset-0 rounded-full bg-white transition-opacity duration-300 ${
          selected ? 'opacity-55' : 'opacity-0'
        }`}
      />
      <span aria-hidden='true' className='bubble-skin absolute inset-0 rounded-full' />
      <span
        aria-hidden='true'
        className='bubble-sheen absolute inset-0 rounded-full motion-safe:animate-[bubble-turn_26s_linear_infinite]'
      />
      {selected && (
        <span
          aria-hidden='true'
          className='absolute inset-0 rounded-full ring-1 ring-light-black/70'
        />
      )}

      <span
        aria-hidden='true'
        className={`absolute inset-x-0 top-[26%] flex justify-center ${
          item.interactive ? 'text-light-black/85' : 'text-light-black/45'
        }`}
      >
        <RoleIcon name={item.icon} />
      </span>

      <span
        className={`absolute inset-x-[12%] bottom-[15%] text-center text-[clamp(0.5rem,8cqw,0.95rem)] leading-tight font-medium ${
          item.interactive ? 'text-light-black' : 'text-light-black/55'
        }`}
      >
        {item.label}
      </span>
    </Tag>
  );
}

const bubbleShape = PropTypes.shape({
  slug: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  weight: PropTypes.number.isRequired,
  interactive: PropTypes.bool.isRequired,
});

BubbleField.propTypes = {
  items: PropTypes.arrayOf(bubbleShape).isRequired,
  selected: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

Bubble.propTypes = {
  item: bubbleShape.isRequired,
  diameter: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
  dimmed: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

function resolve(a, b) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const distance = Math.hypot(dx, dy) || 0.001;
  const minimum = a.r + b.r;
  if (distance >= minimum) return;

  const nx = dx / distance;
  const ny = dy / distance;
  const overlap = (minimum - distance) / 2;

  a.x -= nx * overlap;
  a.y -= ny * overlap;
  b.x += nx * overlap;
  b.y += ny * overlap;

  const normal = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
  if (normal >= 0) return; // already separating

  const ma = a.r * a.r;
  const mb = b.r * b.r;
  const impulse = (-2 * normal) / (1 / ma + 1 / mb);

  a.vx -= (impulse / ma) * nx;
  a.vy -= (impulse / ma) * ny;
  b.vx += (impulse / mb) * nx;
  b.vy += (impulse / mb) * ny;
}

export default BubbleField;
