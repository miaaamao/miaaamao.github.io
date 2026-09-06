import PropTypes from 'prop-types';
import { intro, disclaimer } from '../data/profiles';

function Intro({ onStart, resumable, onResume }) {
  return (
    <div className='mx-auto w-full max-w-[42rem]'>
      <p className='text-[0.68rem] tracking-[0.22em] text-grey uppercase'>A self-reflection quiz</p>

      <h1 className='mt-4 text-h1 leading-[1.1] font-medium text-balance phone:text-h1-lg'>
        {intro.title}
      </h1>

      <div className='mt-7 space-y-4'>
        {intro.body.map((paragraph) => (
          <p
            key={paragraph.slice(0, 20)}
            className='text-[0.98rem] leading-relaxed text-light-black'
          >
            {paragraph}
          </p>
        ))}
      </div>

      <p className='mt-7 text-[0.82rem] text-grey'>{intro.meta}</p>

      <div className='mt-9 flex flex-wrap items-center gap-3'>
        <button
          type='button'
          onClick={onStart}
          className='rounded-full bg-black px-6 py-2.5 text-[0.9rem] text-white transition-transform duration-200 hover:-translate-y-px focus-visible:ring-1 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-none'
        >
          {resumable ? 'Start over' : 'Start'}
        </button>

        {resumable && (
          <button
            type='button'
            onClick={onResume}
            className='rounded-full border border-rule px-6 py-2.5 text-[0.9rem] transition-colors duration-200 hover:border-light-black/40 hover:bg-white focus-visible:ring-1 focus-visible:ring-black focus-visible:outline-none'
          >
            Pick up where I left off
          </button>
        )}
      </div>

      <p className='mt-10 border-t border-rule pt-4 text-[0.8rem] text-grey'>{disclaimer}</p>
    </div>
  );
}

Intro.propTypes = {
  onStart: PropTypes.func.isRequired,
  resumable: PropTypes.bool,
  onResume: PropTypes.func,
};

export default Intro;
