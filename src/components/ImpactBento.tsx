"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { m, Variants, useMotionValue, useTransform, animate } from "framer-motion";
import { TrendingUp, Quote, Code2, PenTool, Star } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

export default function ImpactBento() {
  const codeIconRef = useRef<HTMLDivElement>(null);

  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    let mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      if (codeIconRef.current) {
        gsap.from(codeIconRef.current, {
          rotate: -20,
          scale: 0.8,
          duration: 1,
          ease: "elastic.out(1, 0.3)",
          scrollTrigger: {
            trigger: codeIconRef.current,
            start: "top 85%",
            once: true
          }
        });
      }
      ScrollTrigger.refresh();
    });
  }, []);

  // Animation is now triggered by onViewportEnter on the m.div

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <section className="py-24 lg:py-32 bg-[#FAFAFA] text-[#111] overflow-hidden" style={{ contain: 'paint' }}>
      <div className="container mx-auto px-6 lg:px-12 max-w-[85rem]">

        <div className="mb-16 md:mb-20">
          <h2 className="text-[2.5rem] md:text-[3.5rem] font-bold tracking-tight leading-[1.1] mb-6 max-w-2xl">
            Neměříme <span className="text-zinc-400 line-through decoration-zinc-300">návštěvy.</span><br />
            Měříme <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">váš obrat.</span>
          </h2>
          <p className="text-lg md:text-xl text-zinc-500 font-light leading-relaxed max-w-2xl">
            Hezký design je k ničemu, pokud negeneruje zisk. Naše weby jsou postavené od základu jako vysoce konverzní stroje.
          </p>
        </div>

        <m.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          onViewportEnter={() => {
            animate(count, 63, {
              duration: 2.5,
              ease: "easeOut",
            });
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-[240px]"
        >

          {/* Card 1: Hero Metric (2x2) */}
          <m.div
            variants={item}
            className="md:col-span-2 md:row-span-2 bg-white rounded-[2rem] p-8 md:p-12 border border-black/5 shadow-[0_20px_40px_rgba(0,0,0,0.02)] relative overflow-hidden flex flex-col justify-between group"
          >
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent opacity-50 pointer-events-none" />

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 border border-blue-100">
                <TrendingUp className="w-6 h-6" />
              </div>
              <p className="text-zinc-500 font-medium tracking-wide uppercase text-sm mb-2">Průměrný nárůst poptávek</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-[5rem] md:text-[7rem] font-black tracking-tighter text-[#111] leading-none flex">
                  +<m.span>{rounded}</m.span>
                </h3>
                <span className="text-4xl md:text-5xl font-bold text-blue-600">%</span>
              </div>
            </div>

            <div className="relative z-10 max-w-md mt-8">
              <p className="text-lg text-zinc-600 font-light leading-relaxed">
                Nekreslíme jen obrázky. Analyzujeme váš byznys, identifikujeme úzká hrdla a stavíme prodejní trychtýře, které konvertují návštěvníky na platící klienty už během prvních 3 měsíců.
              </p>
            </div>

            {/* Subtle Chart Graphic */}
            <div className="absolute -bottom-10 -right-10 w-[60%] h-[50%] opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-700 pointer-events-none">
              <svg viewBox="0 0 200 100" className="w-full h-full" preserveAspectRatio="none">
                <path d="M0,100 L0,80 Q25,80 50,60 T100,50 T150,20 L200,0 L200,100 Z" fill="currentColor" />
              </svg>
            </div>
          </m.div>

          {/* Card 2: Social Proof Review */}
          <m.div
            variants={item}
            className="md:col-span-1 md:row-span-1 bg-[#111] text-white rounded-[2rem] p-8 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />

            <div className="relative z-10 flex text-blue-400 gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>

            <div className="relative z-10 flex-1 flex items-center min-h-[100px]">
              <p className="text-xl font-medium leading-tight">"Zapomeňte na běžné agentury. Vexx chápe byznys. Web se zaplatil v prvním měsíci provozu."</p>
            </div>

            <div className="relative z-10 flex items-center gap-3 mt-6">
              <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-sm">
                MN
              </div>
              <div>
                <div className="font-bold text-sm">Martin N.</div>
                <div className="text-zinc-400 text-xs uppercase tracking-wider">CEO, Tech Company</div>
              </div>
            </div>
          </m.div>

          {/* Card 3: Rule / Custom Code */}
          <m.div
            variants={item}
            className="md:col-span-1 md:row-span-1 bg-white rounded-[2rem] p-8 border border-black/5 shadow-[0_10px_30px_rgba(0,0,0,0.02)] flex flex-col justify-between group overflow-hidden relative"
          >
            <div ref={codeIconRef} className="w-12 h-12 rounded-2xl bg-zinc-50 text-zinc-900 flex items-center justify-center mb-4 border border-zinc-100 group-hover:scale-110 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-100 transition-all duration-500">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-2xl font-bold tracking-tight mb-2">0 % šablon</h4>
              <p className="text-zinc-500 leading-relaxed font-light">
                Vaše firma není tuctová. Váš web by neměl být také. Každý pixel a řádek kódu tvoříme 100% na míru.
              </p>
            </div>
          </m.div>

          {/* Card 4: Guarantee (Full width bottom on mobile, spans 3 cols) */}
          <m.div
            variants={item}
            className="md:col-span-3 md:row-span-1 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] p-8 md:p-10 text-white relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
          >
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
            <div className="absolute right-0 top-0 w-1/2 h-full bg-white/5 blur-3xl rounded-full transform translate-x-1/4 -translate-y-1/4" />

            <div className="relative z-10 flex items-center gap-6 md:w-2/3">
              <div className="hidden md:flex w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md items-center justify-center border border-white/20 shrink-0">
                <PenTool className="w-8 h-8 text-white" />
              </div>
              <div>
                <h4 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">Psychologický copywriting v ceně.</h4>
                <p className="text-blue-100 text-lg font-light leading-relaxed">
                  Běžné agentury píší texty, aby zaplnily prázdné místo na obrazovce. My píšeme texty, které odstraňují námitky a nutí klienty poptat.
                </p>
              </div>
            </div>

            <div className="relative z-10 shrink-0">
              <Link href="#contact" className="inline-block px-8 py-4 rounded-full bg-white text-blue-600 font-bold tracking-wide hover:scale-105 transition-transform duration-300 shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_30px_rgba(255,255,255,0.2)]">
                Chci vidět rozdíl
              </Link>
            </div>
          </m.div>

        </m.div>
      </div>
    </section>
  );
}