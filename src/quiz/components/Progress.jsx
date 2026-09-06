import PropTypes from 'prop-types';

// `current` is the question on screen, not the number answered: "00 / 16" first reads as broken.
function Progress({ current, total }) {
  return (
    <div className='flex items-center gap-4'>
      <p className='text-[0.68rem] tracking-[0.22em] text-grey uppercase tabular-nums'>
        {String(current).padStart(2, '0')} <span className='text-grey/50'>/ {total}</span>
      </p>

      <div
        className='h-px flex-1 bg-light-black/12'
        role='progressbar'
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label='Question progress'
      >
        <div
          className='h-full bg-light-black/55 transition-[width] duration-500 ease-out-expo'
          style={{ width: `${(current / total) * 100}%` }}
        />
      </div>
    </div>
  );
}

Progress.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default Progress;
