import type Lenis from 'lenis';

// Shared handle to the active Lenis instance, set by <SmoothScroll /> on
// mount. Null when smooth scrolling is inactive (SSR, reduced motion), so
// consumers must fall back to native scrolling.
let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis(): Lenis | null {
  return instance;
}
