import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Progress from './Progress';

const KEYS = { a: 0, b: 1, c: 2, d: 3, 1: 0, 2: 1, 3: 2, 4: 3 };

// Long enough that sweeping the cursor across the list stays quiet.
const DWELL_MS = 650;
const LETTERS = ['A', 'B', 'C', 'D'];

function Question({ question, index, total, selected, onSelect, onDwell, onBack, locked }) {
  const headingRef = useRef(null);
  const dwell = useRef(0);

  const startDwell = (dimension) => {
    clearTimeout(dwell.current);
    dwell.current = setTimeout(() => onDwell?.(dimension), DWELL_MS);
  };

  const stopDwell = () => clearTimeout(dwell.current);

  useEffect(() => stopDwell, []);
  useEffect(() => stopDwell, [index]);

  // Focus the prompt so a screen reader hears the new question on advance.
  useEffect(() => {
    headingRef.current?.focus();
  }, [index]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      if (event.key === 'Backspace' || event.key === 'ArrowLeft') {
        event.preventDefault();
        onBack();
        return;
      }

      const slot = KEYS[event.key.toLowerCase()];
      if (slot === undefined || locked) return;
      event.preventDefault();
      onSelect(question.options[slot].dimension, slot);
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [question, onSelect, onBack, locked]);

  return (
    <div className='mx-auto w-full max-w-[46rem]'>
      <Progress current={index + 1} total={total} />

      <h1
        ref={headingRef}
        tabIndex={-1}
        className='mt-4 text-h2 leading-[1.22] font-medium text-balance outline-none phone:text-h2-lg'
      >
        {question.prompt}
      </h1>

      <div
        role='radiogroup'
        aria-label={question.prompt}
        className='mt-8 flex flex-col gap-2 phone:mt-10 phone:gap-2.5'
        onMouseLeave={stopDwell}
      >
        {question.options.map((option, slot) => {
          const active = selected === option.dimension;
          return (
            <button
              key={option.dimension}
              type='button'
              role='radio'
              aria-checked={active}
              disabled={locked}
              onClick={() => onSelect(option.dimension, slot)}
              onMouseEnter={() => startDwell(option.dimension)}
              onMouseLeave={stopDwell}
              onFocus={() => startDwell(option.dimension)}
              onBlur={stopDwell}
              className={`group flex w-full items-start gap-3.5 rounded-lg border px-4 py-3.5 text-left transition-[background-color,border-color,transform] duration-200 focus-visible:ring-1 focus-visible:ring-black focus-visible:outline-none disabled:cursor-default phone:gap-4 phone:px-5 phone:py-4 ${
                active
                  ? 'border-black bg-black text-white'
                  : 'border-rule bg-white/55 hover:-translate-y-px hover:border-light-black/35 hover:bg-white'
              }`}
            >
              <span
                aria-hidden='true'
                className={`mt-px w-4 shrink-0 text-[0.72rem] tracking-[0.1em] tabular-nums ${
                  active ? 'text-white/60' : 'text-grey'
                }`}
              >
                {LETTERS[slot]}
              </span>
              <span className='text-[0.95rem] leading-relaxed phone:text-base'>{option.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

Question.propTypes = {
  question: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  selected: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  onDwell: PropTypes.func,
  onBack: PropTypes.func.isRequired,
  locked: PropTypes.bool,
};

export default Question;
