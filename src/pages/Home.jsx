import { useOutletContext } from 'react-router-dom';
import Seo from '../components/Seo';
import SplitReveal from '../components/SplitReveal';
import CardDeck from '../components/CardDeck';
import SchoolSheet from '../components/SchoolSheet';
import IconButton, { PersonIcon, WorkIcon } from '../components/IconButton';
import ContactCluster from '../components/ContactCluster';
import { site } from '../data/site';
import { schools } from '../data/background';
import { useReducedMotion } from '../lib/useReducedMotion';

function Home() {
  const { activeSheet, setActiveSheet } = useOutletContext();
  const reduced = useReducedMotion();

  return (
    <>
      <Seo />

      <section
        className={reduced ? 'relative min-h-screen py-24' : 'relative h-screen overflow-hidden'}
      >
        <div className='mx-auto flex h-full max-w-[1700px] flex-col justify-center gap-8 px-page phone:grid phone:grid-cols-[1fr_1.35fr] phone:items-center phone:gap-10 phone:pr-[5%] phone:pl-[13%]'>
          <div>
            <p className='text-[0.7rem] tracking-[0.2em] text-grey uppercase'>Portfolio</p>
            <SplitReveal as='h1' className='mt-3 block text-display font-medium' delay={0.15}>
              {site.name}
            </SplitReveal>
            <SplitReveal as='p' className='block text-display text-grey' delay={0.28}>
              {site.role}
            </SplitReveal>

            <div className='mt-10 flex flex-wrap gap-3'>
              <IconButton label='About' to='/about'>
                <PersonIcon />
              </IconButton>
              <IconButton label='Experience' to='/background'>
                <WorkIcon />
              </IconButton>
              <ContactCluster />
            </div>
          </div>

          <div
            className={
              reduced ? 'h-auto' : 'h-[58vh] overflow-hidden phone:h-full phone:overflow-visible'
            }
          >
            <CardDeck
              items={schools}
              activeSlug={activeSheet}
              onChange={setActiveSheet}
              hrefFor={(school) => `/education/${school.slug}`}
              renderFace={(school) => <SchoolSheet school={school} />}
              label='Education, use arrow keys to browse'
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
