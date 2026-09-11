'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import { useEffect } from 'react';

/**
 * Lenis fires its own rAF scroll loop.  Framer Motion's useScroll watches
 * the native 'scroll' DOM event.  We bridge the two by dispatching a
 * synthetic 'scroll' event on window every time Lenis updates so that
 * Framer Motion stays in sync (and sticky/horizontal-scroll sections work).
 */
function LenisFramerBridge() {
  useLenis(() => {
    window.dispatchEvent(new Event('scroll'));
  });
  return null;
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.5, smoothWheel: true }}>
      <LenisFramerBridge />
      {children}
    </ReactLenis>
  );
}
