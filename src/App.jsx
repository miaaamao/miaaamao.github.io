import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Preloader from './components/Preloader';
import Home from './pages/Home';
import About from './pages/About';
import Project from './pages/Project';
import School from './pages/School';
import Background from './pages/Background';
import NotFound from './pages/NotFound';
import SocialMediaStyle from './pages/SocialMediaStyle';
import { gsap } from './lib/gsap';
import { hasOrigin } from './lib/transition';
import { getLenis, useSmoothScroll } from './lib/lenis';
import { useReducedMotion } from './lib/useReducedMotion';

const OUT = 0.22;
const IN = 0.42;

// The quiz is shared as a bare link with students. Opening it should not start
// with the portfolio owner's name animating in.
const NO_PRELOAD = ['/social-media-style'];

function App() {
  const [loading, setLoading] = useState(() => !NO_PRELOAD.includes(window.location.pathname));
  const finishLoading = useCallback(() => setLoading(false), []);

  useSmoothScroll();

  const location = useLocation();
  const reduced = useReducedMotion();
  const stageRef = useRef(null);
  const [shown, setShown] = useState(location);

  const handoff = useRef(false);
  const first = useRef(true);

  useLayoutEffect(() => {
    if (location.pathname === shown.pathname) return undefined;

    handoff.current = hasOrigin();

    if (reduced || handoff.current || !stageRef.current) {
      setShown(location);
      return undefined;
    }

    const tween = gsap.to(stageRef.current, {
      opacity: 0,
      y: 6,
      duration: OUT,
      ease: 'power2.in',
      onComplete: () => setShown(location),
    });

    return () => tween.kill();
  }, [location, shown, reduced]);

  useLayoutEffect(() => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);

    const skip = first.current || reduced || handoff.current || !stageRef.current;
    first.current = false;
    handoff.current = false;
    if (skip) return undefined;

    const tween = gsap.fromTo(
      stageRef.current,
      { opacity: 0, y: -6 },
      {
        opacity: 1,
        y: 0,
        duration: IN,
        ease: 'power2.out',
        clearProps: 'opacity,transform',
      },
    );

    return () => tween.kill();
  }, [shown, reduced]);

  return (
    <>
      {loading && <Preloader onDone={finishLoading} />}
      <div ref={stageRef}>
        <Routes location={shown}>
          {/* Deliberately outside Layout: the quiz is a standalone tool with no
              link to it from anywhere in the portfolio, and it inherits none of
              the site's outlet context. */}
          <Route path='/social-media-style' element={<SocialMediaStyle />} />

          <Route element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/education/:slug' element={<School />} />
            <Route path='/project/:slug' element={<Project />} />
            <Route path='/background' element={<Background />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
