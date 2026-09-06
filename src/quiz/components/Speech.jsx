import PropTypes from 'prop-types';

// `data-speech` keeps the page-wide tap bridge from reading a reach for the bubble as a poke.
function Speech({ text, anchor, baseline, size, onEnter, onLeave }) {
  const open = Boolean(text);

  return (
    <div
      className='absolute z-10'
      style={{
        left: `calc(${anchor * 100}% - ${size * 0.34}px)`,
        top: `calc(${baseline * 100}% - ${size * 0.72}px)`,
        transform: 'translate(-100%, -100%)',
      }}
      aria-live='polite'
    >
      <div
        data-speech='true'
        onPointerEnter={onEnter}
        onPointerLeave={onLeave}
        className={`relative transition-all duration-300 ${
          open ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-1 opacity-0'
        }`}
      >
        <p className='max-w-[13rem] rounded-2xl border border-rule bg-white/90 px-3.5 py-2 text-[0.8rem] leading-snug text-light-black lowercase shadow-[0_2px_12px_rgba(10,10,10,0.06)] phone:max-w-[19rem]'>
          {text ?? ' '}
        </p>

        {/* Tail, bottom-right, aimed at her. */}
        <span
          aria-hidden='true'
          className='absolute -bottom-[5px] right-4 h-[10px] w-[10px] rotate-45 border-r border-b border-rule bg-white/90'
        />
      </div>
    </div>
  );
}

Speech.propTypes = {
  text: PropTypes.string,
  anchor: PropTypes.number.isRequired,
  baseline: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  onEnter: PropTypes.func,
  onLeave: PropTypes.func,
};

export default Speech;
