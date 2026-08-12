import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ScrollTrigger } from '../lib/gsap';
import { schools } from '../data/background';

function Layout() {
  const { pathname } = useLocation();
  const [activeSheet, setActiveSheet] = useState(schools[0].slug);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [pathname]);

  useEffect(() => {
    const match = pathname.match(/^\/education\/([^/]+)/);
    if (match) setActiveSheet(match[1]);
  }, [pathname]);

  return (
    <main id='main'>
      <Outlet context={{ activeSheet, setActiveSheet }} />
    </main>
  );
}

export default Layout;
