import { useEffect, useState } from 'react';

// Matches the project's `phone` breakpoint.
const QUERY = '(min-width: 769px)';

export function useIsWide() {
  const [wide, setWide] = useState(true);

  useEffect(() => {
    const query = window.matchMedia(QUERY);
    setWide(query.matches);

    const onChange = (event) => setWide(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return wide;
}
