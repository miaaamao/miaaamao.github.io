import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Navigate, useParams } from 'react-router-dom';
import { gsap } from '../lib/gsap';
import { consumeOrigin, expandFrom, rememberOrigin } from '../lib/transition';
import Seo from '../components/Seo';
import SplitReveal from '../components/SplitReveal';
import IconButton, { CollapseIcon, ExternalIcon, InfoIcon } from '../components/IconButton';
import SheetWindow from '../components/SheetWindow';
import { getProject } from '../data/projects';

function Project() {
  const { slug } = useParams();
  const project = getProject(slug);
  const [detailed, setDetailed] = useState(false);
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

  if (!project) return <Navigate to='/404' replace />;

  return (
    <>
      <Seo title={project.title} description={project.summary} />
      <section className='relative min-h-screen py-20 phone:h-screen phone:overflow-hidden phone:py-0'>
        <div className='flex flex-col justify-center gap-8 px-page phone:grid phone:h-full phone:grid-cols-[1fr_52vw] phone:items-center phone:gap-0 phone:px-0 phone:pr-[4vw] phone:pl-[15vw]'>
          <div ref={asideRef} className='phone:pr-12'>
            <SplitReveal as='h1' className='block text-display font-medium' delay={0.15}>
              {project.title}
            </SplitReveal>

            {detailed ? (
              <div className='mt-6 max-w-md space-y-4 overflow-y-auto text-[1.05rem] leading-relaxed text-grey phone:max-h-[48vh]'>
                <p>{project.approach}</p>
                <p>{project.challenges}</p>
                <dl className='grid grid-cols-2 gap-x-6 gap-y-2 pt-2 text-[0.8rem]'>
                  <Meta label='Client' value={project.client} />
                  <Meta label='Year' value={project.year} />
                  <Meta label='Role' value={project.role} />
                  <Meta label='Services' value={project.services.join(', ')} />
                </dl>
              </div>
            ) : (
              <p className='mt-6 max-w-md text-h4 leading-relaxed text-grey'>{project.summary}</p>
            )}

            <div className='mt-10 flex flex-wrap gap-3'>
              <IconButton
                label='Back to index'
                to='/'
                onClick={() => rememberOrigin(panelRef.current?.getBoundingClientRect())}
              >
                <CollapseIcon />
              </IconButton>
              <IconButton
                label={detailed ? 'Hide project details' : 'Show project details'}
                onClick={() => setDetailed((open) => !open)}
              >
                <InfoIcon />
              </IconButton>
              {project.url && (
                <IconButton label='Visit the live site' href={project.url}>
                  <ExternalIcon />
                </IconButton>
              )}
            </div>
          </div>
          <div className='w-full'>
            <SheetWindow ref={panelRef} sheet={project} variant='panel' />
          </div>
        </div>
      </section>
    </>
  );
}

function Meta({ label, value }) {
  return (
    <div>
      <dt className='text-grey uppercase'>{label}</dt>
      <dd className='text-light-black'>{value}</dd>
    </div>
  );
}

Meta.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Project;
