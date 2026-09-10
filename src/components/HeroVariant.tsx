'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';

export default function HeroVariant() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background subtle zoom
      gsap.fromTo(
        '.bg-gradient-orb',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 0.6, duration: 3, ease: 'power2.out' }
      );

      // Floating animation for the orbs
      gsap.to('.bg-gradient-orb-1', {
        y: -30,
        x: 20,
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });
      gsap.to('.bg-gradient-orb-2', {
        y: 40,
        x: -30,
        duration: 5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        delay: 1,
      });

      // Text reveal animations
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo(
        '.hero-badge',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      )
        .fromTo(
          '.hero-title-line',
          { y: 50, opacity: 0, rotationX: -15 },
          { y: 0, opacity: 1, rotationX: 0, duration: 1, stagger: 0.2 },
          '-=0.4'
        )
        .fromTo(
          '.hero-desc',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          '-=0.6'
        )
        .fromTo(
          '.hero-cta',
          { y: 20, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1 },
          '-=0.8'
        );

      // Line expand animation
      gsap.fromTo(
        '.hero-line',
        { scaleX: 0 },
        { scaleX: 1, duration: 1.5, ease: 'power3.inOut' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center overflow-hidden px-6 pt-24 pb-20"
    >
      {/* Premium Ambient Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="bg-gradient-orb bg-gradient-orb-1 absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="bg-gradient-orb bg-gradient-orb-2 absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10 w-full flex flex-col items-center text-center">
        {/* Badge */}
        <div className="hero-badge mb-8 inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
          </span>
          <span className="text-xs font-semibold tracking-[0.2em] text-zinc-300 uppercase">
            Nezávazný návrh webu ZDARMA
          </span>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter leading-[1.1] mb-8 [perspective:1000px]">
          <div className="overflow-hidden">
            <div className="hero-title-line">Zapomeňte na hezké vizitky.</div>
          </div>
          <div className="overflow-hidden relative mt-2">
            <div className="hero-title-line bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent pb-4">
              Váš web musí vydělávat.
            </div>
            {/* Animated Underline */}
            <div className="hero-line absolute bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent origin-center" />
          </div>
        </h1>

        {/* Description */}
        <p className="hero-desc text-lg md:text-xl text-zinc-400 max-w-2xl font-light leading-relaxed mb-12">
          Zapomeňte na šablony, které používá vaše konkurence. Jako profesionální webová agentura pro vás navrhneme a naprogramujeme{' '}
          <strong className="text-zinc-200 font-medium">prémiový web na míru</strong>, který buduje autoritu a prodává.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Link
            href="/#contact"
            className="hero-cta group relative overflow-hidden flex items-center justify-center gap-2 text-sm font-semibold text-white bg-blue-600 px-8 py-4 rounded-full transition-all hover:scale-105 shadow-[0_0_40px_rgba(37,99,235,0.4)]"
          >
            {/* Button Highlight Hover Effect */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-out" />
            <span className="relative z-10 tracking-wide">CHCI WEB, CO VYDĚLÁVÁ</span>
            <svg
              className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>

          <Link
            href="/#process"
            className="hero-cta text-sm font-semibold text-zinc-300 hover:text-white px-8 py-4 transition-colors relative after:absolute after:bottom-3 after:left-8 after:right-8 after:h-px after:bg-zinc-700 hover:after:bg-zinc-300 after:transition-colors tracking-wide"
          >
            Jak to funguje?
          </Link>
        </div>

        {/* Social Proof */}
        <div className="hero-cta mt-16 pt-8 border-t border-white/10 w-full max-w-md flex flex-col items-center">
          <div className="flex items-center gap-1 text-blue-400 mb-3">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-zinc-500 uppercase tracking-widest font-medium">Důvěřuje nám přes 50+ klientů</span>
        </div>
      </div>
    </section>
  );
}
