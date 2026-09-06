import Seo from '../components/Seo';
import SplitReveal from '../components/SplitReveal';
import Placeholder from '../components/Placeholder';
import IconButton, { BackIcon, WorkIcon } from '../components/IconButton';
import ContactCluster from '../components/ContactCluster';
import { site } from '../data/site';
import { about } from '../data/about';

const MARKS = [
  { glyph: '∑', at: '-top-10 -left-12 text-[7rem] leading-none' },
  { glyph: '∫', at: 'top-1/3 -right-10 text-[6rem] leading-none' },
  { glyph: 'π', at: '-bottom-8 -left-8 text-[5rem] leading-none' },
];

function About() {
  return (
    <>
      <Seo title='About' />
      <section className='graph-paper relative min-h-screen py-20 phone:h-screen phone:overflow-hidden phone:py-0'>
        <div className='mx-auto flex w-full max-w-310 flex-col justify-center gap-10 px-page phone:grid phone:h-full phone:grid-cols-[minmax(0,1fr)_26rem] phone:items-center phone:gap-20 phone:px-10'>
          <div className='phone:pr-12'>
            <SplitReveal as='h1' className='block text-display font-medium' delay={0.15}>
              {site.name}
            </SplitReveal>

            <div className='mt-6 max-w-md space-y-4'>
              <p className='text-h4 leading-relaxed text-grey'>{about.intro}</p>
              {about.bio.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className='text-[0.95rem] leading-relaxed text-grey'
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className='mt-10 flex flex-wrap gap-3'>
              <IconButton label='Back to index' to='/' variant='solid'>
                <BackIcon />
              </IconButton>
              <IconButton label='Experience' to='/background'>
                <WorkIcon />
              </IconButton>
              <ContactCluster expandable={false} />
            </div>
          </div>

          <div className='relative w-full'>
            {MARKS.map((mark) => (
              <span
                key={mark.glyph}
                aria-hidden='true'
                className={`pointer-events-none absolute hidden font-medium text-light-black/[0.07] select-none phone:block ${mark.at}`}
              >
                {mark.glyph}
              </span>
            ))}

            <div className='group relative rotate-[-2.5deg] transition-transform duration-500 ease-out hover:rotate-0'>
              <div className='relative bg-white px-[6%] pt-[6%] pb-[9%] shadow-[0_10px_36px_rgba(10,10,10,0.13)]'>
                <Placeholder
                  label='Portrait'
                  aspect='tall'
                  src={about.portrait ?? undefined}
                  alt={site.name}
                  showCaption={false}
                />

                <div className='mt-[7%]'>
                  <p className='text-[0.95rem] leading-tight font-medium text-black'>{site.name}</p>
                  <p className='mt-1 text-[0.8rem] text-grey'>
                    {site.role} · {site.location}
                  </p>
                </div>
              </div>

              <span
                aria-hidden='true'
                className='pointer-events-none absolute -top-4 right-0 z-10 h-9 w-28 rotate-[28deg] phone:-right-6 bg-[#cdbfa6]/55 shadow-[0_1px_3px_rgba(10,10,10,0.08)]'
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
