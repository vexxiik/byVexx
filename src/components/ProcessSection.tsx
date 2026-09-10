"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useTransform } from "framer-motion";
import { Search, LayoutTemplate, Code2, Rocket, ArrowUpRight } from "lucide-react";

const steps = [
  {
    id: "step-1",
    num: "01",
    title: "Ponoření & Vize",
    text: "Zahodíme nudné dotazníky. Probereme, co váš byznys skutečně palí a najdeme ten nejlepší technický směr pro váš růst.",
    visual: (
      <div className="w-full h-full bg-[#FAFAFA] relative overflow-hidden flex items-center justify-center rounded-[2.5rem] border border-black/5 shadow-[0_20px_80px_rgba(0,0,0,0.04)]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [transform:perspective(800px)_rotateX(60deg)_translateY(-100px)_scale(2)] origin-top" />
        
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 w-32 h-32 rounded-[2rem] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-zinc-100 flex items-center justify-center"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full"
          />
          <Search className="w-10 h-10 text-blue-600 relative z-20" />
        </motion.div>

        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute w-64 h-64 border border-blue-500/10 rounded-full"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-400 shadow-[0_0_20px_rgba(96,165,250,0.6)]" />
        </motion.div>
      </div>
    )
  },
  {
    id: "step-2",
    num: "02",
    title: "Kreativní Návrh (ZDARMA)",
    text: "Než si plácneme, připravím vám ukázkový grafický koncept zdarma. Chci, abyste hned od začátku věděli, že si vizuálně i lidsky sedneme.",
    visual: (
      <div className="w-full h-full bg-[#FAFAFA] relative overflow-hidden flex items-center justify-center rounded-[2.5rem] border border-black/5 shadow-[0_20px_80px_rgba(0,0,0,0.04)]">
        <div className="absolute w-[150%] h-[150%] bg-gradient-to-br from-blue-400/5 to-purple-400/5 blur-3xl" />
        
        <div className="relative z-10 w-full max-w-[320px] h-[340px] perspective-1000">
          <motion.div 
            animate={{ rotateY: [-5, 5, -5], rotateX: [5, -5, 5], y: [-10, 10, -10] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full bg-white rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.08)] border border-zinc-100 p-4 flex flex-col gap-3 transform-style-3d"
          >
            <div className="w-full h-12 rounded-xl bg-zinc-50 flex items-center px-4 gap-3 border border-zinc-100">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                <LayoutTemplate className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <div className="w-20 h-2 rounded-full bg-zinc-200" />
              <div className="ml-auto flex gap-2">
                <div className="w-10 h-2 rounded-full bg-zinc-200" />
                <div className="w-10 h-2 rounded-full bg-zinc-200" />
              </div>
            </div>

            <div className="w-full flex-1 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50/30 flex flex-col items-center justify-center p-6 border border-blue-100/50">
              <motion.div 
                animate={{ width: ["40%", "70%", "40%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="h-3 rounded-full bg-blue-200/60 mb-3" 
              />
              <div className="w-1/2 h-2 rounded-full bg-blue-200/40 mb-6" />
              <div className="flex gap-3">
                <div className="w-16 h-6 rounded-full bg-blue-500 shadow-sm" />
                <div className="w-16 h-6 rounded-full bg-white border border-blue-100 shadow-sm" />
              </div>
            </div>

            <div className="w-full h-20 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-zinc-50 border border-zinc-100 p-3">
                <div className="w-6 h-6 rounded-md bg-purple-100 mb-2" />
                <div className="w-full h-1.5 rounded-full bg-zinc-200" />
              </div>
              <div className="rounded-xl bg-zinc-50 border border-zinc-100 p-3">
                <div className="w-6 h-6 rounded-md bg-orange-100 mb-2" />
                <div className="w-full h-1.5 rounded-full bg-zinc-200" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    )
  },
  {
    id: "step-3",
    num: "03",
    title: "Precizní Vývoj",
    text: "Přetavím design v extrémně rychlý, škálovatelný kód. Čistá architektura, moderní technologie a nekompromisní optimalizace.",
    visual: (
      <div className="w-full h-full bg-[#111] relative overflow-hidden p-8 font-mono text-sm flex items-center justify-center rounded-[2.5rem] border border-black/5 shadow-[0_20px_80px_rgba(0,0,0,0.4)]">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
        
        <motion.div 
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="w-full max-w-[320px] bg-[#1A1A1A] rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.6)] border border-white/10 overflow-hidden relative z-10"
        >
          <div className="w-full h-12 bg-[#222] border-b border-white/5 flex items-center px-4 gap-2.5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
            <div className="ml-auto flex items-center gap-2 opacity-50">
              <Code2 className="w-4 h-4 text-zinc-400" />
              <span className="text-xs text-zinc-400 uppercase tracking-wider">app.tsx</span>
            </div>
          </div>
          
          <div className="p-6 flex flex-col gap-2.5 relative text-sm md:text-base">
            <div className="flex gap-2 items-center">
              <span className="text-[#FF7B72]">export</span>
              <span className="text-[#FF7B72]">default</span>
              <span className="text-[#FF7B72]">function</span>
              <span className="text-[#D2A8FF]">App</span>
              <span className="text-[#C9D1D9]">() {'{'}</span>
            </div>
            
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              transition={{ duration: 2, repeat: Infinity, ease: "circOut", repeatDelay: 1 }}
              className="pl-4 flex gap-2 items-center overflow-hidden whitespace-nowrap"
            >
              <span className="text-[#FF7B72]">return</span>
              <span className="text-[#C9D1D9]">(</span>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, repeat: Infinity, ease: "easeOut", repeatDelay: 2.5 }}
              className="pl-8 flex flex-col gap-2"
            >
              <div className="flex items-center gap-2">
                <span className="text-[#7EE787]">&lt;</span>
                <span className="text-[#7EE787]">PremiumExperience</span>
              </div>
              <div className="pl-4 flex gap-2 items-center">
                <span className="text-[#79C0FF]">perf</span>
                <span className="text-[#C9D1D9]">="</span>
                <span className="text-[#A5D6FF]">100%</span>
                <span className="text-[#C9D1D9]">"</span>
              </div>
              <div className="pl-4 flex gap-2 items-center">
                <span className="text-[#79C0FF]">conv</span>
                <span className="text-[#C9D1D9]">="</span>
                <span className="text-[#A5D6FF]">max</span>
                <span className="text-[#C9D1D9]">"</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#7EE787]">/&gt;</span>
              </div>
            </motion.div>

            <div className="pl-4 text-[#C9D1D9]">)</div>
            <div className="text-[#C9D1D9]">{'}'}</div>

            <motion.div 
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-6 left-[24px] w-2 h-4 bg-blue-500"
            />
          </div>
        </motion.div>
      </div>
    )
  },
  {
    id: "step-4",
    num: "04",
    title: "Start & Akcelerace",
    text: "Spuštěním to nekončí! Nastavíme analytiku, ukážeme vám, jak s webem pracovat, a zajistíme, aby začal okamžitě generovat výsledky.",
    visual: (
      <div className="w-full h-full bg-[#FAFAFA] relative overflow-hidden flex items-center justify-center p-8 rounded-[2.5rem] border border-black/5 shadow-[0_20px_80px_rgba(0,0,0,0.04)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/50 via-transparent to-transparent opacity-70" />
        
        <div className="relative z-10 w-full max-w-[340px] h-[260px] bg-white rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.04)] border border-zinc-100 p-6 flex flex-col justify-end">
          <div className="absolute top-6 left-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
              <Rocket className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold tracking-widest text-zinc-400 uppercase">Revenue</div>
              <div className="text-2xl font-extrabold text-zinc-900 tracking-tight flex items-center gap-2">
                +340% 
                <ArrowUpRight className="w-5 h-5 text-green-500" />
              </div>
            </div>
          </div>

          <div className="flex items-end justify-between h-[120px] gap-2 md:gap-3 pt-10">
            {[30, 45, 35, 60, 50, 85, 100].map((height, i) => (
              <motion.div 
                key={i}
                initial={{ height: "10%" }}
                animate={{ height: `${height}%` }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: i * 0.15 }}
                className="w-full bg-gradient-to-t from-blue-100 to-blue-500 rounded-t-lg relative group"
              >
                {i === 6 && <div className="absolute -inset-2 bg-blue-500/20 blur-xl rounded-t-lg -z-10" />}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    )
  },
];

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // 4 sections, so we divide 0-1 by 4
    if (latest < 0.25) setActiveStep(0);
    else if (latest < 0.5) setActiveStep(1);
    else if (latest < 0.75) setActiveStep(2);
    else setActiveStep(3);
  });

  return (
    <section 
      ref={containerRef}
      className="relative z-20 w-full bg-white text-[#111] selection:bg-blue-500/30 lg:h-[400vh]"
    >
      <div className="lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center py-24 lg:py-0">
        <div className="container mx-auto px-6 lg:px-12 max-w-[85rem] h-full flex flex-col justify-center">
          
          {/* Header */}
          <div className="mb-12 lg:mb-16 max-w-3xl">
            <h2 className="text-[2.5rem] md:text-[3.5rem] font-bold tracking-tight leading-[1.1] mb-6">
              Proces tvorby <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">webu na míru.</span>
            </h2>
            <p className="text-lg md:text-xl text-zinc-500 font-light leading-relaxed max-w-2xl">
              Žádný chaos, jen čistý a transparentní proces, od prvního nápadu až po spuštění a získávání klientů.
            </p>
          </div>

          {/* Sticky Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center h-[500px]">
            
            {/* Left Column: List of points */}
            <div className="lg:col-span-5 flex flex-col space-y-8 relative z-10">
              {steps.map((step, idx) => {
                const isActive = activeStep === idx;
                
                return (
                  <div
                    key={step.id}
                    className="relative w-full flex flex-col gap-3 group"
                  >
                    {/* Active highlight indicator line */}
                    <div className="absolute -left-6 lg:-left-8 top-0 bottom-0 w-1 bg-zinc-100 rounded-full overflow-hidden">
                      {isActive && (
                        <motion.div 
                          layoutId="activeProcessIndicator"
                          className="w-full h-full bg-blue-600"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                    </div>

                    <div className={`flex items-center gap-4 transition-all duration-500 ${isActive ? "opacity-100" : "opacity-30"}`}>
                      <span className="text-sm font-bold tracking-widest text-blue-600">
                        {step.num}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold tracking-tight text-[#111]">
                        {step.title}
                      </h3>
                    </div>

                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                      <p className="text-base text-zinc-500 font-light leading-relaxed pr-4">
                        {step.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Morphing Visual Area */}
            <div className="lg:col-span-7 relative w-full h-[400px] md:h-[500px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={steps[activeStep].id}
                  initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute inset-0 w-full h-full"
                >
                  {steps[activeStep].visual}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
