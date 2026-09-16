'use client';

import React, { useRef, useEffect, useState } from 'react';
import { m, useReducedMotion } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────
   RevealLine – a single line that slides up from behind a mask
   Uses clipPath instead of overflow:hidden for sub-pixel smooth
   rendering, combined with a translateY for the kinetic feel.
───────────────────────────────────────────────────────────── */
function RevealLine({
  children,
  delay = 0,
  duration = 0.9,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const prefersReduced = useReducedMotion();

  return (
    <span className={`block ${className}`}>
      <m.span
        className="block will-change-transform"
        initial={
          prefersReduced
            ? { opacity: 0 }
            : {
                y: '100%',
                clipPath: 'inset(100% 0% 0% 0%)',
              }
        }
        animate={
          prefersReduced
            ? { opacity: 1 }
            : {
                y: '0%',
                clipPath: 'inset(0% 0% 0% 0%)',
              }
        }
        transition={{
          duration: prefersReduced ? 0.4 : duration,
          ease: [0.16, 1, 0.3, 1], // expo-out for buttery deceleration
          delay,
        }}
      >
        {children}
      </m.span>
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────
   HeroAnimatedText
   Three reveal phases, tightly choreographed:
     1. "Zapomeňte na hezké vizitky."  → two visual lines
     2. "Váš web musí vydělávat."      → gradient accent line
     3. Body paragraph                 → gentle fade-in drift
───────────────────────────────────────────────────────────── */
export default function HeroAnimatedText() {
  const prefersReduced = useReducedMotion();

  return (
    <>
      <h1 className="text-[2.75rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5rem] font-bold tracking-[-0.04em] leading-[1.05] text-[#111] mb-6">
        {/* Line 1: "Zapomeňte na" */}
        <RevealLine delay={0.1} duration={0.85}>
          Zapomeňte na
        </RevealLine>

        {/* Line 2: "hezké vizitky." */}
        <RevealLine delay={0.2} duration={0.85}>
          hezké vizitky.
        </RevealLine>

        {/* Line 3: Gradient accent line */}
        <RevealLine delay={0.38} duration={1.0} className="mt-1">
          <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-500 bg-clip-text text-transparent">
            Váš web musí
          </span>
        </RevealLine>

        <RevealLine delay={0.5} duration={1.0}>
          <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-500 bg-clip-text text-transparent">
            vydělávat.
          </span>
        </RevealLine>
      </h1>

      {/* Body paragraph – simple fade + drift, no choppiness */}
      <m.p
        initial={
          prefersReduced
            ? { opacity: 0 }
            : { opacity: 0, y: 16, filter: 'blur(4px)' }
        }
        animate={
          prefersReduced
            ? { opacity: 1 }
            : { opacity: 1, y: 0, filter: 'blur(0px)' }
        }
        transition={{
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.7,
        }}
        className="text-lg md:text-xl text-zinc-500 leading-relaxed font-light mb-10 max-w-md"
      >
        Zapomeňte na šablony, které používá vaše konkurence. Navrhneme pro
        vás{' '}
        <strong className="font-medium text-zinc-800">
          prémiový web na míru
        </strong>
        , který buduje okamžitou autoritu a automaticky generuje poptávky.
      </m.p>
    </>
  );
}
