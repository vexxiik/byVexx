'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll('.animate-item');
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: i % 2 === 0 ? -100 : 100, y: 30 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="py-24 px-6 max-w-4xl mx-auto" ref={containerRef}>
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 text-[#171717]">
        Kdo stojí za Vexx<span className="text-[#3b82f6]">.</span>
      </h2>

      <div className="space-y-6 text-lg md:text-xl text-[#52525b] leading-relaxed">
        <p className="animate-item">
          Jsem senior frontend engineer se specializací na tvorbu vysoce výkonných webových aplikací. Mým cílem není jen napsat funkční kód, ale doručit bezkonkurenční uživatelský zážitek s obsesí pro milisekundovou odezvu.
        </p>
        <p className="animate-item">
          S více než 5 lety zkušeností jsem prošel od malých startupů až po komplexní B2B platformy. Věřím, že nejlepší aplikace jsou ty, kde se čistý kód prolíná s nádherným interaktivním designem.
        </p>
        <p className="animate-item font-medium text-[#171717]">
          Rychlost načítání není jen číslo – je to pro mě základní stavební kámen každého produktu.
        </p>
      </div>
    </section>
  );
}
