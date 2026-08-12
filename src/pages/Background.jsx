import { useEffect, useMemo, useRef, useState } from 'react';
import Seo from '../components/Seo';
import SplitReveal from '../components/SplitReveal';
import IconButton, { BackIcon, CloseIcon } from '../components/IconButton';
import ContactCluster from '../components/ContactCluster';
import BubbleField from '../components/BubbleField';
import ScrollFade from '../components/ScrollFade';
import { gsap } from '../lib/gsap';
import { useReducedMotion } from '../lib/useReducedMotion';
import { experience, getRole, placesOf, roles } from '../data/background';

/**
 * Experience as a bubble chamber of professions rather than a list of
 * employers. Size says how close each one sits to the classroom, so the shape
 * of the page is the argument: the teaching is the big stuff and the analyst
 * work orbits it. Pick a bubble and it shows where she did it.
 */
function Background() {
  const [selected, setSelected] = useState(null);
  const detailRef = useRef(null);
  const reduced = useReducedMotion();

  // The `current: true` flag wins when it is there, otherwise fall back to the
  // top of the list — the array is reverse-chronological, so adding a job at
  // the top is enough.
  const current = experience.find((entry) => entry.current) ?? experience[0];

  const open = getRole(selected);
  const places = placesOf(open);

  // A bubble only offers a press if there is something behind it to show.
  const bubbles = useMemo(
    () => roles.map((role) => ({ ...role, interactive: placesOf(role).length > 0 })),
    [],
  );

  // Counted, never typed — these can't drift out of sync with the data.
  const stats = [
    { value: roles.length, label: 'Roles' },
    { value: experience.length, label: 'Places' },
    { value: new Set(experience.map((entry) => entry.location)).size, label: 'Cities' },
  ];

  useEffect(() => {
    if (reduced || !detailRef.current) return undefined;

    const context = gsap.context(() => {
      gsap.fromTo(
        detailRef.current,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out', overwrite: 'auto' },
      );
    });

    return () => context.revert();
  }, [selected, reduced]);

  return (
    <>
      <Seo title='Experience' description='Teaching, tutoring and the analyst work around it.' />

      <section className='relative min-h-screen py-20 phone:h-screen phone:overflow-hidden phone:py-0'>
        <div className='flex flex-col justify-center gap-10 px-page phone:grid phone:h-full phone:grid-cols-[1fr_56vw] phone:items-center phone:gap-0 phone:px-0 phone:pr-[4vw] phone:pl-[13vw]'>
          <div className='phone:pr-12'>
            <SplitReveal as='h1' className='block text-display font-medium' delay={0.15}>
              Experience
            </SplitReveal>

            <div ref={detailRef} className='mt-8 max-w-md'>
              {open ? (
                <>
                  <p className='text-[0.8rem] tracking-[0.14em] text-grey uppercase'>
                    As a {open.label}
                  </p>
                  <ScrollFade
                    className='mt-3'
                    scrollClassName='max-h-[34vh] space-y-5 overflow-y-auto pr-4'
                  >
                    {places.map((place) => (
                      <div key={place.slug} className='flex gap-4'>
                        {/* Every mark gets the same slot and sits centred in
                            it. They are a mix of wide wordmarks, circular
                            crests and stacked lockups, so flushing them left
                            lines up their bounding boxes but not the marks
                            themselves — a shared centre axis is what actually
                            reads as a column. The slot stays even when a logo
                            is missing so the text never jumps left. */}
                        <span className='mt-0.5 flex h-8 w-16 shrink-0 items-center justify-center'>
                          {place.logo && (
                            <img
                              src={place.logo}
                              alt=''
                              loading='lazy'
                              className='max-h-full max-w-full object-contain'
                            />
                          )}
                        </span>
                        <div className='min-w-0'>
                          <p className='text-[1.05rem] leading-snug font-medium text-light-black'>
                            {place.place}
                          </p>
                          <p className='mt-1 text-[0.9rem] leading-snug text-grey'>{place.role}</p>
                          <p className='mt-1.5 text-[0.7rem] tracking-[0.12em] tabular-nums text-grey uppercase'>
                            {place.period} · {place.location}
                          </p>
                        </div>
                      </div>
                    ))}
                  </ScrollFade>
                </>
              ) : (
                <>
                  <p className='text-[0.8rem] tracking-[0.14em] text-grey uppercase'>Currently</p>
                  <p className='mt-2 text-h3 phone:text-h3-lg text-light-black'>{current.role}</p>
                  <p className='mt-2 text-[0.95rem] text-grey'>
                    {current.place}
                    {current.location ? ` · ${current.location}` : ''}
                  </p>
                </>
              )}
            </div>

            <dl className='rule-t mt-10 flex max-w-md gap-10 pt-6'>
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className='sr-only'>{stat.label}</dt>
                  <dd className='text-h2 phone:text-h2-lg tabular-nums text-light-black'>
                    {String(stat.value).padStart(2, '0')}
                  </dd>
                  <span className='mt-1 block text-[0.7rem] tracking-wide text-grey uppercase'>
                    {stat.label}
                  </span>
                </div>
              ))}
            </dl>

            {/* Nothing else on the page says what the sizes mean, or why some
                bubbles do not respond to a press. */}
            <p className='mt-6 max-w-xs text-[0.8rem] leading-relaxed text-grey'>
              Every bubble is a role I have worked in, sized by how close it sits to teaching. The
              ones with places behind them open.
            </p>

            <div className='mt-8 flex flex-wrap gap-3'>
              <IconButton label='Back to index' to='/' variant='solid'>
                <BackIcon />
              </IconButton>
              {open && (
                <IconButton label='Clear selection' onClick={() => setSelected(null)}>
                  <CloseIcon />
                </IconButton>
              )}
              <ContactCluster expandable={false} />
            </div>
          </div>

          <div className='aspect-[4/5] w-full phone:aspect-auto phone:h-[84vh]'>
            <BubbleField
              items={bubbles}
              selected={selected}
              onSelect={setSelected}
              label='Roles, select one to see where'
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Background;
