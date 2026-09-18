import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import HeroVisualWrapper from './HeroVisualWrapper';
import HeroAnimatedText from './HeroAnimatedText';

/* ─────────────────────────────────────────────────────────────
   PREMIUM CTA BUTTON (Server Component, uses CSS for hover)
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
   MAIN HERO (Server Component)
───────────────────────────────────────────────────────────── */
export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] bg-[#FAFAFA] overflow-hidden flex flex-col justify-center selection:bg-blue-500/30" style={{ contain: 'paint' }}>
      {/* Subtle noise texture */}
      <div className="absolute inset-0 z-0 opacity-[0.015] pointer-events-none mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="max-w-[90rem] mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center z-10 pt-20">
        
        {/* ── Left: Text & Flow ── */}
        <div className="flex flex-col items-start max-w-xl">
          
          <HeroAnimatedText />

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto animate-fade-in-up" style={{ animationDelay: '0.65s', animationFillMode: 'both' }}>
            <PremiumCTA />


          </div>
        </div>

        {/* ── Right: Visuals ── */}
        <HeroVisualWrapper />

      </div>
    </section>
  );
}
