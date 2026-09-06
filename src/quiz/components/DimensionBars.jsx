import PropTypes from 'prop-types';
import { dimensionList } from '../data/dimensions';
import { TOTAL_POINTS } from '../data/questions';

function DimensionBars({ totals, primary, secondary, isMixed }) {
  const peak = Math.max(...Object.values(totals), 1);

  return (
    <ul className='space-y-3.5'>
      {dimensionList.map((dim) => {
        const value = totals[dim.key] ?? 0;
        const lead = dim.key === primary;
        const second = isMixed && dim.key === secondary;

        return (
          <li key={dim.key}>
            <div className='flex items-baseline justify-between gap-4'>
              <span
                className={`text-[0.86rem] ${lead || second ? 'text-black' : 'text-grey'}`}
                style={lead || second ? { color: dim.color } : undefined}
              >
                {dim.name}
              </span>
              <span className='text-[0.76rem] text-grey tabular-nums'>
                {value}
                <span className='text-grey/55'> / {TOTAL_POINTS}</span>
              </span>
            </div>

            <div className='mt-1.5 h-[3px] w-full rounded-full bg-light-black/10'>
              <div
                className='h-full rounded-full transition-[width] duration-700 ease-out-expo'
                style={{
                  width: `${(value / peak) * 100}%`,
                  backgroundColor: dim.color,
                  opacity: lead || second ? 1 : 0.42,
                }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

DimensionBars.propTypes = {
  totals: PropTypes.object.isRequired,
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string,
  isMixed: PropTypes.bool,
};

export default DimensionBars;
