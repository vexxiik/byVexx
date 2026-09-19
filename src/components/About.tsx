'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = containerRef.current;
    if (!el) return;

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

    ScrollTrigger.refresh();
  }, { scope: containerRef });

  return (
    <section id="about" className="py-24 px-6 max-w-4xl mx-auto" ref={containerRef}>
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 text-[#171717]">
        Kdo stojí za Vexx<span className="text-[#3b82f6]">.</span>
      </h2>

      <div className="space-y-6 text-lg md:text-xl text-[#52525b] leading-relaxed">
        <p className="animate-item">
          Jmenuji se Jakub Sokol. Webovým technologiím se intenzivně věnuji už přes 4 roky od střední školy a aktuálně prohlubuji své znalosti studiem na Univerzitě Pardubice (UPCE).
        </p>
        <p className="animate-item">
          Zkušenosti jsem sbíral od menších startupů, kde jsem se naučil to nejdůležitější: kód musí řešit reálný problém. Věřím, že nejlepší aplikace jsou ty, kde se čistý kód prolíná s nádherným interaktivním designem.
        </p>
        <p className="animate-item font-medium text-[#171717]">
          Nestavím weby, které jen hezky vypadají. Stavím řešení, která vašemu byznysu reálně pomáhají růst.
        </p>
        <div className="animate-item pt-4">
          <h3 className="text-sm font-semibold tracking-wide uppercase text-[#a1a1aa] mb-2">
            Kde působím?
          </h3>
          <p>
            Jsem ze Starého Hradiště. Pro klienty z Pardubic a&nbsp;okolí se velmi rád potkám osobně.
            Se&nbsp;zbytkem republiky funguji naprosto bez&nbsp;problémů online.
          </p>
        </div>
      </div>
    </section>
  );
}
