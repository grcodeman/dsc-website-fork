import { useEffect, useState } from 'react';

/**
 * The current time for components that show what's next. It starts at the
 * server's render time so hydration matches the static HTML, then switches
 * to the visitor's clock and ticks each minute, so a page built days ago
 * still shows the right session and "Happening now" turns on and off on time.
 */
export function useNow(initialNow: number) {
  const [now, setNow] = useState(initialNow);

  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  return now;
}
