"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import 'lenis/dist/lenis.css';
import { setLenis, getLenis } from '@/lib/lenis';

// The first scroll, key press, or tap loads Lenis, so its code and its
// per-frame loop stay out of the initial page load.
const FIRST_INTERACTION = ['wheel', 'keydown', 'pointerdown', 'touchstart'] as const;

// Site-wide Lenis smooth scrolling. Renders nothing; mounted once in the
// root layout. Skipped entirely for users who prefer reduced motion.
const SmoothScroll = () => {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let unmounted = false;
    const load = () => {
      FIRST_INTERACTION.forEach((type) => window.removeEventListener(type, load));
      import('lenis').then(({ default: Lenis }) => {
        if (!unmounted) setLenis(new Lenis({ autoRaf: true, anchors: true }));
      });
    };
    FIRST_INTERACTION.forEach((type) => window.addEventListener(type, load, { passive: true }));

    return () => {
      unmounted = true;
      FIRST_INTERACTION.forEach((type) => window.removeEventListener(type, load));
      getLenis()?.destroy();
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
