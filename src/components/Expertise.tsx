'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const expertiseData = [
  {
    id: '01',
    title: 'Unikátní design',
    subtitle: 'Odlište se na první pohled.',
    description: 'Nevyužívám naklikané šablony. Tvořím prémiovou vizuální identitu na míru, která si okamžitě získá důvěru vašich zákazníků a buduje značku.',
    tags: ['React', 'Next.js', 'Tailwind', 'GSAP', 'Figma'],
    stats: [
      { value: '100%', label: 'Na Míru' },
      { value: '60fps', label: 'Animace' }
    ]
  },
  {
    id: '02',
    title: 'Rychlost & SEO',
    subtitle: 'Výkon, který prodává.',
    description: 'Pomalé weby zabíjejí prodeje. Optimalizuji každý detail pro bleskové načítání. Čistý kód znamená lepší pozice na Googlu a spokojené uživatele.',
    tags: ['Node.js', 'Core Web Vitals', 'SEO', 'Edge', 'Caching'],
    stats: [
      { value: '99.9%', label: 'Dostupnost' },
      { value: '<50ms', label: 'Odezva' }
    ]
  },
  {
    id: '03',
    title: 'Konverzní logika',
    subtitle: 'Cesta k nákupu.',
    description: 'Nekreslím jen obrázky. Navrhuji chytrou strukturu webu a call-to-action prvky, které přirozeně vedou návštěvníka k odeslání poptávky.',
    tags: ['CRO', 'UX/UI', 'Analytika', 'GTM', 'Funnels'],
    stats: [
      { value: 'ROI', label: 'Zaměření' },
      { value: 'A+', label: 'Přístupnost' }
    ]
  }
];

export default function Expertise() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const el = containerRef.current;
    if (!el) return;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { opacity: 0, x: i % 2 === 0 ? -150 : 150, y: 50 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 1,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
        }
      );
    });

    ScrollTrigger.refresh();
  }, { scope: containerRef });

  return (
    <section id="expertise" ref={containerRef} className="py-24 px-6 max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-[#171717]">
          Proč svěřit vývoj<br /> naší agentuře?
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {expertiseData.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => { cardsRef.current[index] = el; }}
            className="flex flex-col group p-8 rounded-2xl bg-white border border-black/5 hover:border-black/10 transition-colors duration-500 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          >
            <div className="flex items-center justify-between mb-8">
              <span className="text-[#a1a1aa] font-mono text-sm">{item.id}</span>
              <h3 className="text-xl font-semibold text-[#171717]">{item.title}</h3>
            </div>

            <div className="flex-1 mb-8">
              <h4 className="text-lg font-medium mb-3 text-[#171717]">{item.subtitle}</h4>
              <p className="text-[#52525b] text-sm leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {item.tags.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full border border-black/10 text-xs text-[#52525b] group-hover:border-black/20 transition-colors">
                  {tag}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-black/5 mt-auto">
              {item.stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl font-bold text-[#171717] mb-1">{stat.value}</div>
                  <div className="text-xs text-[#a1a1aa] uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
