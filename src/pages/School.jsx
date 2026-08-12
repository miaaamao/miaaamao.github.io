import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Navigate, useParams } from 'react-router-dom';
import { gsap } from '../lib/gsap';
import { consumeOrigin, expandFrom, rememberOrigin } from '../lib/transition';
import Seo from '../components/Seo';
import SplitReveal from '../components/SplitReveal';
import IconButton, { CollapseIcon, ExternalIcon, WorkIcon } from '../components/IconButton';
import SchoolSheet from '../components/SchoolSheet';
import { getSchool } from '../data/background';

function School() {
  const { slug } = useParams();
  const school = getSchool(slug);
  const panelRef = useRef(null);
  const asideRef = useRef(null);

  useEffect(() => {
    const origin = consumeOrigin();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const context = gsap.context(() => {
      expandFrom(panelRef.current, origin);
      gsap.from(asideRef.current, {
        y: 16,
        opacity: 0,
        duration: 0.6,
        delay: origin ? 0.22 : 0.05,
        ease: 'power2.out',
      });
    });

    return () => context.revert();
  }, [slug]);

  if (!school) return <Navigate to='/404' replace />;

  const conferred = school.degrees
    .map((degree) => (degree.major ? `${degree.degree}, ${degree.major}` : degree.degree))
    .join(' · ');

  return (
    <>
      <Seo title={school.place} description={`${conferred}, ${school.place}.`} />
      <section className='relative min-h-screen py-20 phone:h-screen phone:overflow-hidden phone:py-0'>
        <div className='flex flex-col justify-center gap-8 px-page phone:grid phone:h-full phone:grid-cols-[1fr_54vw] phone:items-center phone:gap-0 phone:px-0 phone:pr-[4vw] phone:pl-[13vw]'>
          <div ref={asideRef} className='phone:pr-12'>
            <SplitReveal as='h1' className='block text-display font-medium' delay={0.15}>
              {school.place}
            </SplitReveal>

            <dl className='rule-t mt-8 grid max-w-md grid-cols-2 gap-x-6 gap-y-5 pt-6 text-[0.9rem]'>
              <Meta label='Term' value={school.period} />
              <Meta label='Location' value={school.location} />
              <Meta
                label={school.degrees.length > 1 ? 'Degrees' : 'Degree'}
                value={school.degrees.map((degree) =>
                  degree.major ? `${degree.degree}, ${degree.major}` : degree.degree,
                )}
              />
              <Meta label='Status' value={school.current ? 'In progress' : 'Conferred'} />
            </dl>

            <div className='mt-10 flex flex-wrap gap-3'>
              <IconButton
                label='Back to index'
                to='/'
                onClick={() => rememberOrigin(panelRef.current?.getBoundingClientRect())}
              >
                <CollapseIcon />
              </IconButton>
              <IconButton label='Experience' to='/background'>
                <WorkIcon />
              </IconButton>
              {school.original && (
                <IconButton label='Open the original diploma' href={school.original}>
                  <ExternalIcon />
                </IconButton>
              )}
            </div>
          </div>

          <div className='w-full'>
            <SchoolSheet ref={panelRef} school={school} variant='panel' />
          </div>
        </div>
      </section>
    </>
  );
}

function Meta({ label, value }) {
  const lines = Array.isArray(value) ? value : [value];
  if (!lines.filter(Boolean).length) return null;

  return (
    <div>
      <dt className='text-[0.7rem] tracking-[0.14em] text-grey uppercase'>{label}</dt>
      {lines.map((line) => (
        <dd key={line} className='mt-1.5 leading-snug text-light-black'>
          {line}
        </dd>
      ))}
    </div>
  );
}

Meta.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
};

export default School;
