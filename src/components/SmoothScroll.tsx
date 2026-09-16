'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Lenis fires its own rAF scroll loop. Framer Motion's useScroll watches
 * the native 'scroll' DOM event. We bridge the two by dispatching a
 * synthetic 'scroll' event on window every time Lenis updates.
 * We also sync GSAP ScrollTrigger with Lenis updates.
 */
function LenisBridge() {
  const lenis = useLenis((lenisInstance) => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Recommended by Lenis for GSAP integration
    gsap.ticker.lagSmoothing(0);
    
    // Handle hash navigation (e.g. from external link to /#work)
    if (window.location.hash && lenis) {
      const hash = window.location.hash;
      const target = document.querySelector(hash);
      
      if (target) {
        // Delay to allow dynamic components to render and layout to settle
        const timer = setTimeout(() => {
          lenis.scrollTo(target, { immediate: true });
          ScrollTrigger.refresh();
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [lenis]);

  return null;
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.5, smoothWheel: true }}>
      <LenisBridge />
      {children}
    </ReactLenis>
  );
}
