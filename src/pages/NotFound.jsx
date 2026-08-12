import Seo from '../components/Seo';
import SplitReveal from '../components/SplitReveal';
import IconButton, { CollapseIcon } from '../components/IconButton';
import { site } from '../data/site';

function NotFound() {
  return (
    <>
      <Seo title='404' description='This page does not exist.' />

      <section className='flex min-h-screen flex-col items-start justify-center px-page phone:px-[15vw]'>
        <SplitReveal as='h1' className='block text-display font-medium' delay={0.1}>
          404
        </SplitReveal>
        <p className='mt-6 max-w-md text-h4 leading-relaxed text-grey'>
          This page does not exist. Head back to {site.name}’s index.
        </p>

        <div className='mt-10 flex flex-wrap gap-3'>
          <IconButton label='Back to index' to='/'>
            <CollapseIcon />
          </IconButton>
        </div>
      </section>
    </>
  );
}

export default NotFound;
