'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import HeroVisual from './HeroVisual';

/* ─────────────────────────────────────────────────────────────
   TEXT REVEAL – per-word staggered entrance
───────────────────────────────────────────────────────────── */
function RevealHeading() {
  const line1Words = 'Zapomeňte na hezké vizitky.'.split(' ');

  return (
    <h1 className="text-[3.5rem] md:text-[4.5rem] lg:text-[5rem] font-bold tracking-[-0.04em] leading-[1.05] text-[#111] mb-6">
      <span className="block overflow-hidden">
        {line1Words.map((word, i) => (
          <motion.span
            key={i}
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.15 + i * 0.06,
            }}
            className="inline-block mr-[0.3em]"
          >
            {word}
          </motion.span>
        ))}
      </span>
      <span className="block mt-1 overflow-hidden">
        <motion.span
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.5,
          }}
          className="inline-block bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-500 bg-clip-text text-transparent"
        >
          Váš web musí vydělávat.
        </motion.span>
      </span>
    </h1>
  );
}

/* ─────────────────────────────────────────────────────────────
   PREMIUM CTA BUTTON with glow
───────────────────────────────────────────────────────────── */
function PremiumCTA() {
  return (
    <Link
      href="#contact"
      className="group relative flex items-center justify-center gap-2 h-14 px-8 rounded-full overflow-hidden transition-transform active:scale-95 w-full sm:w-auto"
    >
      {/* Glow layer behind button */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 rounded-full opacity-0 group-hover:opacity-70 blur-xl transition-opacity duration-700" />

      {/* Button body */}
      <div className="absolute inset-0 bg-[#111] rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] group-hover:shadow-[0_8px_30px_rgba(59,130,246,0.25)] transition-shadow duration-500" />

      {/* Sheen sweep on hover */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
      </div>

      <span className="relative z-10 text-sm tracking-wide text-white font-medium">
        Chci web, co vydělává
      </span>
      <ArrowRight className="relative z-10 w-4 h-4 text-white group-hover:translate-x-1 transition-transform duration-300" />
    </Link>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN HERO
───────────────────────────────────────────────────────────── */
export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#FAFAFA] overflow-hidden flex flex-col justify-center selection:bg-blue-500/30">
      {/* Subtle noise texture */}
      <div className="absolute inset-0 z-0 opacity-[0.015] pointer-events-none mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="max-w-[90rem] mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center z-10 pt-20">
        {/* ── Left: Text & Flow (PRESERVED EXACTLY) ── */}
        <div className="flex flex-col items-start max-w-xl">

          {/* Heading with word-by-word reveal */}
          <RevealHeading />

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
            className="text-lg md:text-xl text-zinc-500 leading-relaxed font-light mb-10 max-w-md"
          >
            Zapomeňte na šablony, které používá vaše konkurence. Navrhneme pro
            vás{' '}
            <strong className="font-medium text-zinc-800">
              prémiový web na míru
            </strong>
            , který buduje okamžitou autoritu a automaticky generuje poptávky.
          </motion.p>

          {/* CTA Group */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
            className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto"
          >
            <PremiumCTA />

            <div className="flex flex-col items-center sm:items-start">
              <div className="flex items-center gap-0.5 text-[#F5A623] mb-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-[11px] font-medium text-zinc-500 tracking-wide">
                Více než 50+ spokojených klientů
              </span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.4 }}
          className="relative w-full h-[500px] lg:h-[640px]"
        >
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  );
}
