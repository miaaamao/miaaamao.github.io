import PropTypes from 'prop-types';
import Luna from './Luna';
import Speech from './Speech';
import { HOST } from '../data/cats';
import { useIsWide } from '../lib/useIsWide';

export const ANCHOR = 0.68;
export const GROUND = 0.62;

const CAT_PX = { narrow: 150, wide: 190 };

function Stage({ lunaRef, lunaReady, onPet, says, bubble }) {
  const wide = useIsWide();
  const size = wide ? CAT_PX.wide : CAT_PX.narrow;

  return (
    <div className='relative h-[150px] w-full phone:h-[190px]'>
      <div
        aria-hidden='true'
        className='absolute inset-x-0 h-px bg-light-black/15'
        style={{ top: `${GROUND * 100}%` }}
      />

      <Speech
        text={says}
        anchor={ANCHOR}
        baseline={GROUND}
        size={size}
        onEnter={bubble?.onEnter}
        onLeave={bubble?.onLeave}
      />

      <Luna
        canvasRef={lunaRef}
        ready={lunaReady}
        onPet={onPet}
        sit={HOST.sit}
        scale={HOST.scale}
        left={`${ANCHOR * 100}%`}
        top={`${GROUND * 100}%`}
        className='h-[150px] w-[150px] phone:h-[190px] phone:w-[190px]'
      />
    </div>
  );
}

Stage.propTypes = {
  lunaRef: PropTypes.object.isRequired,
  lunaReady: PropTypes.bool,
  onPet: PropTypes.func,
  says: PropTypes.string,
  bubble: PropTypes.object,
};

export default Stage;
