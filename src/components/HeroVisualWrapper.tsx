'use client';

import React from 'react';
import { m } from 'framer-motion';
import dynamic from 'next/dynamic';

const HeroVisual = dynamic(() => import('./HeroVisual'), {
  ssr: false, // Not needed for immediate first paint, plus saves hydration errors on complex SVGs if any
});

export default function HeroVisualWrapper() {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut', delay: 0.4 }}
      className="relative w-full h-[500px] lg:h-[640px]"
    >
      <HeroVisual />
    </m.div>
  );
}
