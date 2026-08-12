import { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import SheetWindow from './SheetWindow';
import PdfViewer from './PdfViewer';
import { site } from '../data/site';

const SchoolSheet = forwardRef(function SchoolSheet({ school, variant = 'card' }, ref) {
  const reading = Boolean(school.current);
  const plural = school.degrees.length > 1;

  const [shown, setShown] = useState(false);
  const file = variant === 'panel' ? (school.original ?? school.scan) : null;

  return (
    <SheetWindow ref={ref} sheet={school} variant={variant}>
      <div className='relative flex w-full items-center justify-center'>
        {file && (
          <div
            className={`absolute inset-0 z-10 transition-opacity duration-500 ${
              shown ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
            style={{ backgroundColor: school.tint }}
          >
            {school.original ? (
              <PdfViewer
                url={school.original}
                label={`${school.place} diploma`}
                onReady={() => setShown(true)}
              />
            ) : (
              <div className='flex h-full w-full items-center justify-center p-[3.5%]'>
                <img
                  src={school.scan}
                  alt={`${school.place} diploma`}
                  onLoad={() => setShown(true)}
                  className='max-h-full max-w-full object-contain ring-1 shadow-[0_4px_22px_rgba(10,10,10,0.16)] ring-light-black/10'
                />
              </div>
            )}
          </div>
        )}
        <span
          aria-hidden='true'
          className='pointer-events-none absolute inset-[3.5%] border border-light-black/15'
        />
        <span
          aria-hidden='true'
          className='pointer-events-none absolute inset-[5.2%] border border-light-black/[0.07]'
        />

        <div className='flex w-full flex-col items-center px-[13%] text-center'>
          <p className='text-[clamp(0.4rem,1.45cqw,0.82rem)] tracking-[0.24em] text-light-black/55 uppercase'>
            {school.place}
          </p>

          {school.logo ? (
            <img src={school.logo} alt='' className='mt-[3cqw] h-[7.5cqw] w-[26%] object-contain' />
          ) : (
            <span
              aria-hidden='true'
              className='mt-[3cqw] flex aspect-square h-[7.5cqw] items-center justify-center rounded-full border border-light-black/20 text-[clamp(0.5rem,1.7cqw,0.9rem)] tracking-[0.08em] text-light-black/45'
            >
              {initialsOf(school.place)}
            </span>
          )}

          <p className='mt-[3.4cqw] text-[clamp(0.38rem,1.3cqw,0.74rem)] text-light-black/45'>
            Be it known that
          </p>
          <p className='mt-[1.2cqw] text-[clamp(0.72rem,3cqw,1.6rem)] leading-none font-medium text-black'>
            {site.name}
          </p>
          <p className='mt-[1.8cqw] text-[clamp(0.38rem,1.3cqw,0.74rem)] text-light-black/45'>
            {reading ? 'is a candidate for the ' : 'has been admitted to the '}
            {plural ? 'degrees of' : 'degree of'}
          </p>

          <div className='mt-[1.6cqw]'>
            {school.degrees.map((degree) => (
              <div key={degree.degree} className='not-first:mt-[1.6cqw]'>
                <p className='text-[clamp(0.62rem,2.5cqw,1.32rem)] leading-tight font-medium text-light-black'>
                  {degree.degree}
                </p>
                {degree.major && (
                  <p className='mt-[0.5cqw] text-[clamp(0.4rem,1.45cqw,0.82rem)] leading-tight text-light-black/60'>
                    {degree.major}
                  </p>
                )}
              </div>
            ))}
          </div>

          <span aria-hidden='true' className='mt-[4cqw] block h-px w-[34%] bg-light-black/20' />
          <p className='mt-[2cqw] text-[clamp(0.38rem,1.25cqw,0.7rem)] tracking-[0.18em] tabular-nums text-light-black/45 uppercase'>
            {reading ? `Expected ${endOf(school.period)}` : `Conferred ${endOf(school.period)}`}
            {school.location ? ` · ${school.location}` : ''}
          </p>
        </div>
      </div>
    </SheetWindow>
  );
});

function endOf(period) {
  return period.split('—').pop().trim();
}

function initialsOf(name) {
  return name
    .split(/\s+/)
    .map((word) => (word === word.toUpperCase() ? word : word[0]))
    .join('')
    .slice(0, 4)
    .toUpperCase();
}

const schoolShape = PropTypes.shape({
  slug: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tint: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  period: PropTypes.string.isRequired,
  location: PropTypes.string,
  current: PropTypes.bool,
  logo: PropTypes.string,
  scan: PropTypes.string,
  original: PropTypes.string,
  degrees: PropTypes.arrayOf(
    PropTypes.shape({
      degree: PropTypes.string.isRequired,
      major: PropTypes.string,
    }),
  ).isRequired,
});

SchoolSheet.propTypes = {
  school: schoolShape.isRequired,
  variant: PropTypes.oneOf(['card', 'panel']),
};

export default SchoolSheet;
