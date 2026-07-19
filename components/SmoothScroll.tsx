"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { setLenis, getLenis } from '@/lib/lenis';

// Site-wide Lenis smooth scrolling. Renders nothing; mounted once in the
// root layout. Skipped entirely for users who prefer reduced motion.
const SmoothScroll = () => {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({ autoRaf: true, anchors: true });
    setLenis(lenis);

    return () => {
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  // On route change, cancel any in-flight scroll animation (stop/start resets
  // Lenis to the browser's actual position) so leftover momentum can't fight
  // the new page's scroll placement — top on navigation, anchor target on
  // hash links, or the restored position on back/forward.
  const pathname = usePathname();
  useEffect(() => {
    const lenis = getLenis();
    lenis?.stop();
    lenis?.start();
  }, [pathname]);

  return null;
};

export default SmoothScroll;
