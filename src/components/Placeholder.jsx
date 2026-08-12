import PropTypes from 'prop-types';

const ASPECTS = {
  video: '16 / 9',
  square: '1 / 1',
  portrait: '3 / 4',
  tall: '4 / 5',
  wide: '21 / 9',
  screen: '2 / 1',
};

const TONES = {
  panel: 'bg-placeholder',
  screen: 'bg-white',
};

function Placeholder({
  label,
  aspect = 'video',
  src,
  alt = '',
  rounded = false,
  showCaption = true,
  tone = 'panel',
  className = '',
}) {
  const ratio = ASPECTS[aspect] ?? ASPECTS.video;
  const radius = rounded ? 'rounded-2xl' : '';
  const background = TONES[tone] ?? TONES.panel;

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading='lazy'
        className={`h-full w-full object-cover ${radius} ${className}`}
        style={{ aspectRatio: ratio }}
      />
    );
  }

  return (
    <div
      aria-hidden='true'
      className={`flex w-full items-end justify-between p-4 select-none ${background} ${radius} ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {showCaption && (
        <>
          <span className='text-[0.7rem] tracking-tight text-grey uppercase'>{label}</span>
          <span className='text-[0.7rem] tracking-tight text-grey'>{ratio.replace(/\s/g, '')}</span>
        </>
      )}
    </div>
  );
}

Placeholder.propTypes = {
  label: PropTypes.string.isRequired,
  aspect: PropTypes.oneOf(Object.keys(ASPECTS)),
  src: PropTypes.string,
  alt: PropTypes.string,
  rounded: PropTypes.bool,
  showCaption: PropTypes.bool,
  tone: PropTypes.oneOf(Object.keys(TONES)),
  className: PropTypes.string,
};

export default Placeholder;
