import PropTypes from 'prop-types';
import Luna from './Luna';
import Speech from './Speech';
import { dimensions } from '../data/dimensions';

const ANCHOR = 0.5;
const GROUND = 0.8;
const CAT_PX = 150;

function ProfileEmblem({ keys, cat, catRef, catReady, onPet, says, bubble }) {
  const tint = dimensions[keys[0]].color;

  return (
    <div
      className='relative h-[180px] overflow-hidden rounded-xl border border-rule phone:h-[215px]'
      style={{ backgroundColor: `${tint}14` }}
    >
      <div
        aria-hidden='true'
        className='absolute inset-x-0 h-px'
        style={{ top: `${GROUND * 100}%`, backgroundColor: `${tint}40` }}
      />

      <Speech
        text={says}
        anchor={ANCHOR}
        baseline={GROUND}
        size={CAT_PX}
        onEnter={bubble?.onEnter}
        onLeave={bubble?.onLeave}
      />

      <Luna
        canvasRef={catRef}
        ready={catReady}
        onPet={onPet}
        sit={cat.sit}
        scale={cat.scale}
        left={`${ANCHOR * 100}%`}
        top={`${GROUND * 100}%`}
        className='aspect-square h-[74%] w-auto'
      />
    </div>
  );
}

ProfileEmblem.propTypes = {
  keys: PropTypes.arrayOf(PropTypes.oneOf(['A', 'B', 'C', 'D'])).isRequired,
  cat: PropTypes.object.isRequired,
  catRef: PropTypes.object.isRequired,
  catReady: PropTypes.bool,
  onPet: PropTypes.func,
  says: PropTypes.string,
  bubble: PropTypes.object,
};

export default ProfileEmblem;
