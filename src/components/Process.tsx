'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const steps = [
    {
      num: '01',
      title: 'Ponoření & Vize',
      desc: 'Zahodíme nudné dotazníky. Probereme, co váš byznys skutečně pálí a najdeme ten nejlepší technický směr pro váš růst.',
    },
    {
      num: '02',
      title: 'Kreativní Návrh (ZDARMA)',
      desc: 'Než si plácneme, připravím vám ukázkový grafický koncept zdarma. Chci, abyste hned od začátku věděli, že si vizuálně i lidsky sedneme.',
      highlight: true,
    },
    {
      num: '03',
      title: 'Precizní Vývoj',
      desc: 'Přetavím design v extrémně rychlý, škálovatelný kód. Čistá architektura, moderní technologie a nekompromisní optimalizace.',
    },
    {
      num: '04',
      title: 'Start & Akcelerace',
      desc: 'Spuštěním to nekončí. Nastavíme analytiku, ukážu vám, jak s webem pracovat, a zajistíme, aby začal okamžitě generovat výsledky.',
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        }
      });

      // Section Title
      tl.fromTo('.process-title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );

      // Bento Box Stagger
      tl.fromTo('.bento-piece', 
        { opacity: 0, scale: 0.8, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'back.out(1.2)' },
        "-=0.4"
      );

      // Right Column Steps
      tl.fromTo('.process-step-item',
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.2, ease: 'power3.out' },
        "-=1.0"
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-24 md:py-32 bg-[#FAFAFA] overflow-hidden" id="process">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="process-title text-4xl md:text-5xl font-bold text-[#111111] tracking-tighter mb-4 opacity-0">
              Od vize až po <span className="text-[#3b82f6]">spuštění.</span>
            </h2>
            <p className="process-title text-[#52525b] text-lg opacity-0">
              Žádný chaos, jen čistý a transparentní proces, který doručuje výsledky.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
          
          {/* Left Column: Abstract Bento Composition */}
          <div className="lg:col-span-5 relative w-full h-[450px] md:h-[550px] flex items-center justify-center">
             
             {/* Decorative Background Glow */}
             <div className="absolute inset-0 bg-[#3b82f6]/5 rounded-[3rem] blur-3xl scale-90" />

             <div className="relative w-full h-full max-w-[400px] grid grid-cols-2 grid-rows-3 gap-4 p-4 z-10">
                
                {/* Top Left: Logo/V */}
                <div className="bento-piece col-span-1 row-span-1 bg-white rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.04)] border border-black/5 flex items-center justify-center overflow-hidden relative opacity-0 hover:scale-[1.03] hover:-translate-y-1 transition-all duration-500 ease-out">
                  <div className="text-6xl font-black text-[#111111] tracking-tighter">V.</div>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#3b82f6]/10 rounded-full blur-xl" />
                </div>

                {/* Top Right: Animated Gradient */}
                <div className="bento-piece col-span-1 row-span-2 bg-gradient-to-br from-[#3b82f6] to-[#2563eb] rounded-3xl shadow-[0_20px_40px_rgba(59,130,246,0.2)] p-6 flex flex-col justify-end overflow-hidden relative opacity-0 hover:scale-[1.03] hover:-translate-y-1 transition-all duration-500 ease-out">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                  <div className="w-full h-2 bg-white/30 rounded-full mb-3" />
                  <div className="w-2/3 h-2 bg-white/30 rounded-full" />
                </div>

                {/* Middle Left: Code/Tech Abstract */}
                <div className="bento-piece col-span-1 row-span-1 bg-[#111111] rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] flex items-center justify-center relative overflow-hidden opacity-0 hover:scale-[1.03] hover:-translate-y-1 transition-all duration-500 ease-out">
                   <div className="absolute left-4 top-4 flex gap-1.5">
                     <div className="w-2 h-2 rounded-full bg-red-500/80" />
                     <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
                     <div className="w-2 h-2 rounded-full bg-green-500/80" />
                   </div>
                   <svg className="w-8 h-8 text-[#3b82f6] mt-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                   </svg>
                </div>

                {/* Bottom Full: UI Skeleton */}
                <div className="bento-piece col-span-2 row-span-1 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-black/5 p-6 flex flex-col justify-center gap-4 opacity-0 hover:scale-[1.02] hover:-translate-y-1 transition-all duration-500 ease-out">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex-shrink-0 border border-black/5" />
                    <div className="flex-grow space-y-2">
                      <div className="h-3 w-1/3 bg-gray-200 rounded-full" />
                      <div className="h-3 w-3/4 bg-gray-100 rounded-full" />
                    </div>
                  </div>
                </div>

             </div>
          </div>

          {/* Right Column: Custom Timeline Steps */}
          <div className="lg:col-span-7 flex flex-col gap-0 relative z-10 lg:pl-10">
            {steps.map((step, i) => (
              <div key={i} className="process-step-item relative pl-10 md:pl-14 pb-12 group opacity-0">
                {/* Timeline Line */}
                {i !== steps.length - 1 && (
                  <div className="absolute left-[11px] md:left-[15px] top-10 bottom-0 w-[2px] bg-gray-100 group-hover:bg-[#3b82f6]/20 transition-colors duration-500" />
                )}
                
                {/* Timeline Dot */}
                <div className={`absolute left-0 md:left-1 top-2 w-6 h-6 md:w-8 md:h-8 rounded-full border-4 flex items-center justify-center transition-all duration-500 ${
                  step.highlight 
                    ? 'border-[#3b82f6] bg-white shadow-[0_0_15px_rgba(59,130,246,0.3)] scale-110' 
                    : 'border-gray-200 bg-gray-50 group-hover:border-[#3b82f6]/50'
                }`}>
                  {step.highlight && <div className="w-2 h-2 rounded-full bg-[#3b82f6]" />}
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2 -mt-1">
                  <div className="flex items-baseline gap-4">
                    <span className={`text-sm font-bold tracking-widest ${step.highlight ? 'text-[#3b82f6]' : 'text-gray-400'}`}>
                      {step.num}
                    </span>
                    <h3 className={`text-xl md:text-2xl font-bold tracking-tight ${step.highlight ? 'text-[#111111]' : 'text-[#111111]'}`}>
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-[#52525b] leading-relaxed text-base">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
