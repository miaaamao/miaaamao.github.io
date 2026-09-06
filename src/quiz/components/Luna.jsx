import PropTypes from 'prop-types';

const DEFAULT_SIT = '-84%';

// Pointer events must stay on: `pointer-events-none` silently kills the file's cursor listeners.
function Luna({
  canvasRef,
  ready,
  left,
  top,
  onPet,
  sit = DEFAULT_SIT,
  scale = 1,
  className = '',
}) {
  const interactive = Boolean(onPet);

  return (
    <canvas
      ref={canvasRef}
      width={420}
      height={420}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? 'Pet the cat' : undefined}
      aria-hidden={interactive ? undefined : 'true'}
      onClick={onPet}
      onKeyDown={
        interactive
          ? (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onPet();
              }
            }
          : undefined
      }
      className={`absolute mix-blend-multiply transition-opacity duration-700 focus-visible:outline-none ${
        interactive ? 'cursor-pointer' : 'pointer-events-none'
      } ${ready ? 'opacity-100' : 'opacity-0'} ${className}`}
      style={{
        left,
        top,
        transform: `translate(-50%, ${sit}) scale(${scale})`,
      }}
    />
  );
}

Luna.propTypes = {
  canvasRef: PropTypes.object.isRequired,
  ready: PropTypes.bool,
  left: PropTypes.string.isRequired,
  top: PropTypes.string.isRequired,
  onPet: PropTypes.func,
  sit: PropTypes.string,
  scale: PropTypes.number,
  className: PropTypes.string,
};

export default Luna;
