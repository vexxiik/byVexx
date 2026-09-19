"use client";

import React, { useEffect, useState } from "react";
import { m, LazyMotion, domAnimation } from "framer-motion";
import { ArrowRight, ArrowLeft, ShieldCheck, DatabaseBackup } from "lucide-react";
import Link from "next/link";
import SafariMockup from "@/components/ui/safari-mockup";
import { LoaderLiquidProgress } from "@/components/ui/liquid-progress";
import ShineBorder from "@/components/ui/shine-border";
import Footer from "@/components/Footer";
import CtaSection from "@/components/CtaSection";

export default function MaintenanceContent() {
  const [backupProgress, setBackupProgress] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setBackupProgress((p) => (p >= 100 ? 0 : p + 10));
    }, 800);
    return () => clearInterval(id);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } },
  };

  return (
    <LazyMotion features={domAnimation}>
      <main className="relative min-h-screen bg-zinc-50 pt-32 pb-12 lg:pt-40 lg:pb-16 overflow-hidden selection:bg-blue-100 selection:text-blue-900">
        {/* Dotted Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-zinc-50 pointer-events-none" />

        <div className="container relative z-10 mx-auto px-6 lg:px-12 max-w-[80rem]">
          
          {/* Back Navigation */}
          <div className="mb-8 max-w-3xl mx-auto flex justify-center md:justify-start">
            <Link 
              href="/#pricing" 
              className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Zpět na přehled balíčků
            </Link>
          </div>

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
            <m.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 leading-[1.1] mb-6"
            >
              Věnujte se svému řemeslu. <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                O web se postarám já.
              </span>
            </m.h1>
            <m.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl text-zinc-500 font-light leading-relaxed"
            >
              Co přesně získáte v rámci měsíční péče <strong className="font-semibold text-zinc-800">Vexx. Essential Care.</strong>
            </m.p>
          </div>

          {/* Symmetrical Bento Grid (3 columns) */}
          <m.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {/* 1. Speed */}
            <m.div 
              variants={item}
              style={{ WebkitTransform: 'translateZ(0)' }}
              className="bg-white rounded-3xl p-8 border border-zinc-200/60 shadow-sm flex flex-col justify-between group overflow-hidden relative transform-gpu backface-hidden transition-all duration-500 hover:shadow-lg hover:-translate-y-1"
            >
              <span className="absolute top-5 right-5 text-zinc-300 font-mono text-sm font-medium select-none">01</span>
              <div className="flex-1 flex flex-col items-center justify-center min-h-[160px] relative w-full mb-8">
                 <div className="relative w-40 h-24 mx-auto flex items-end justify-center">
                   <svg className="w-full h-full" viewBox="0 0 120 70">
                     <path d="M 10 60 A 50 50 0 0 1 110 60" fill="none" stroke="currentColor" className="text-zinc-100" strokeWidth="3" strokeLinecap="round" />
                     <m.path 
                       d="M 10 60 A 50 50 0 0 1 110 60" 
                       fill="none" 
                       stroke="currentColor" 
                       className="text-emerald-500" 
                       strokeWidth="3" 
                       strokeLinecap="round"
                       initial={{ strokeDasharray: "157", strokeDashoffset: "157" }}
                       animate={{ strokeDashoffset: "1.57" }}
                       transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                     />
                   </svg>
                   <div className="absolute bottom-1 flex flex-col items-center justify-center">
                     <span className="text-5xl font-semibold text-emerald-500 tracking-tighter">99</span>
                   </div>
                 </div>
                 <div className="text-center mt-3">
                   <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 bg-zinc-100/50 px-3 py-1.5 rounded-full border border-zinc-200/50">
                     Performance Score
                   </span>
                 </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-zinc-900 mb-2 tracking-tight">Extrémní rychlost</h3>
                <p className="text-sm text-zinc-500 font-light leading-relaxed">
                  Web běží na moderní architektuře. Stránky se načítají okamžitě po celé ČR, což miluje Google i vaši zákazníci.
                </p>
              </div>
            </m.div>

            {/* 2. Security */}
            <m.div 
              variants={item}
              style={{ WebkitTransform: 'translateZ(0)' }}
              className="transform-gpu backface-hidden transition-all duration-500 hover:shadow-lg hover:-translate-y-1 rounded-3xl h-full relative"
            >
              <span className="absolute top-5 right-5 z-20 text-zinc-300 font-mono text-sm font-medium select-none">02</span>
              <ShineBorder borderWidth={1.5} duration={4} gradient="from-emerald-400 via-teal-400 to-emerald-400" className="h-full">
                <div className="flex flex-col h-full p-8 items-center text-center">
                  <div className="flex-1 flex items-center justify-center min-h-[160px] mb-8">
                     <div className="w-24 h-24 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
                        <ShieldCheck className="w-12 h-12" />
                     </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-zinc-900 mb-2 tracking-tight">Železné zabezpečení a SSL</h3>
                    <p className="text-sm text-zinc-500 font-light leading-relaxed">
                      Nasazení bezpečnostních certifikátů, šifrování dat a ochrana proti útokům. Váš web nikdy neukáže varování „Nezabezpečeno“.
                    </p>
                  </div>
                </div>
              </ShineBorder>
            </m.div>

            {/* 3. Domain */}
            <m.div 
              variants={item}
              style={{ WebkitTransform: 'translateZ(0)' }}
              className="bg-white rounded-3xl p-8 border border-zinc-200/60 shadow-sm flex flex-col justify-between group overflow-hidden relative transform-gpu backface-hidden transition-all duration-500 hover:shadow-lg hover:-translate-y-1"
            >
              <span className="absolute top-5 right-5 text-zinc-300 font-mono text-sm font-medium select-none">03</span>
              <div className="w-full mx-auto mb-8 relative flex-1 min-h-[160px] flex items-center">
                 <div className="absolute -inset-4 bg-gradient-to-r from-blue-100/50 to-indigo-100/50 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                 <SafariMockup url="vasedomena.cz">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                       <div className="h-1 w-12 bg-zinc-200 rounded-full" />
                       <div className="h-1 w-16 bg-zinc-200 rounded-full" />
                       <div className="h-1 w-8 bg-blue-500 rounded-full mt-1" />
                    </div>
                 </SafariMockup>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-zinc-900 mb-2 tracking-tight">Správa domény bez starostí</h3>
                <p className="text-sm text-zinc-500 font-light leading-relaxed">
                  Hlídám expiraci vaší adresy a řeším veškeré technické záznamy. Vy jen podnikáte.
                </p>
              </div>
            </m.div>

            {/* 4. Backup */}
            <m.div 
              variants={item}
              style={{ WebkitTransform: 'translateZ(0)' }}
              className="bg-white rounded-3xl p-8 border border-zinc-200/60 shadow-sm flex flex-col justify-between group overflow-hidden relative transform-gpu backface-hidden transition-all duration-500 hover:shadow-lg hover:-translate-y-1"
            >
              <span className="absolute top-5 right-5 text-zinc-300 font-mono text-sm font-medium select-none">04</span>
              <div className="flex-1 min-h-[160px] flex flex-col justify-center gap-6 mb-8 w-full max-w-xs mx-auto">
                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                       <DatabaseBackup className="w-6 h-6 text-blue-600" />
                     </div>
                     <div className="text-left">
                       <h3 className="text-sm font-bold text-zinc-900">Cloud Sync</h3>
                       <p className="text-xs text-zinc-400">Automatická záloha</p>
                     </div>
                   </div>
                   <div className="text-sm font-bold text-blue-600 tabular-nums">{backupProgress}%</div>
                 </div>
                 <LoaderLiquidProgress progress={backupProgress} height={12} color="#3b82f6" />
              </div>
              <div className="text-center">
                 <h3 className="text-xl font-bold text-zinc-900 mb-2 tracking-tight">Pravidelné zálohování</h3>
                 <p className="text-sm text-zinc-500 font-light leading-relaxed">
                   Kód i struktura webu jsou neustále zálohovány. Pokud se cokoliv stane, dokážeme web během pár minut obnovit.
                 </p>
              </div>
            </m.div>

            {/* 5. Text Edits */}
            <m.div 
              variants={item}
              style={{ WebkitTransform: 'translateZ(0)' }}
              className="bg-white rounded-3xl p-8 border border-zinc-200/60 shadow-sm flex flex-col justify-between group overflow-hidden relative transform-gpu backface-hidden transition-all duration-500 hover:shadow-lg hover:-translate-y-1"
            >
               <span className="absolute top-5 right-5 text-zinc-300 font-mono text-sm font-medium select-none">05</span>
               <div className="flex-1 min-h-[160px] flex items-center justify-center mb-8 relative w-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-zinc-100/50 rounded-2xl group-hover:opacity-70 transition-opacity duration-500" />
                  <div className="relative bg-white border border-zinc-200/60 shadow-sm rounded-xl p-4 w-full max-w-[200px] flex flex-col gap-3 group-hover:-translate-y-1 transition-transform duration-500">
                     <div className="flex items-center justify-between">
                       <div className="h-2 w-12 bg-zinc-200 rounded-full" />
                       <div className="h-2 w-4 bg-blue-100 rounded-full" />
                     </div>
                     <div className="h-2 w-full bg-zinc-100 rounded-full" />
                     <div className="h-2 w-3/4 bg-zinc-100 rounded-full" />
                     <div className="mt-2 flex items-center gap-2 px-2.5 py-1.5 bg-emerald-50 rounded-lg border border-emerald-100/50">
                       <span className="relative flex h-2 w-2">
                         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                         <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                       </span>
                       <span className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wide">Aktualizováno</span>
                     </div>
                  </div>
               </div>
               <div className="text-center">
                 <h3 className="text-xl font-bold text-zinc-900 mb-2 tracking-tight">Flexibilní úpravy</h3>
                 <p className="text-sm text-zinc-500 font-light leading-relaxed">
                   Měníte ceník? Nová otevírací doba? Stačí napsat a já textovou úpravu obratem nasadím přímo do kódu.
                 </p>
               </div>
            </m.div>

            {/* 6. Tech Stack */}
            <m.div 
              variants={item}
              style={{ WebkitTransform: 'translateZ(0)' }}
              className="bg-white rounded-3xl p-8 border border-zinc-200/60 shadow-sm flex flex-col justify-between group overflow-hidden relative transform-gpu backface-hidden transition-all duration-500 hover:shadow-lg hover:-translate-y-1"
            >
               <span className="absolute top-5 right-5 text-zinc-300 font-mono text-sm font-medium select-none">06</span>
               <div className="flex-1 min-h-[160px] flex items-center justify-center gap-4 mb-8">
                  {/* Next.js Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-white border border-zinc-200/60 shadow-sm flex items-center justify-center group-hover:-translate-y-1 transition-transform duration-500">
                    <svg viewBox="0 0 180 180" className="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <mask id="mask0_nextjs" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
                        <circle cx="90" cy="90" r="90" fill="black"/>
                      </mask>
                      <g mask="url(#mask0_nextjs)">
                        <circle cx="90" cy="90" r="90" fill="black"/>
                        <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#paint0_nextjs)"/>
                        <path d="M115.012 54H127.125V125.97H115.012V54Z" fill="url(#paint1_nextjs)"/>
                      </g>
                      <defs>
                        <linearGradient id="paint0_nextjs" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
                          <stop stopColor="white"/>
                          <stop offset="1" stopColor="white" stopOpacity="0"/>
                        </linearGradient>
                        <linearGradient id="paint1_nextjs" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
                          <stop stopColor="white"/>
                          <stop offset="1" stopColor="white" stopOpacity="0"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  {/* React Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-[#087ea4] border border-[#087ea4]/20 shadow-sm flex items-center justify-center group-hover:-translate-y-1 transition-transform duration-500 delay-75">
                    <svg viewBox="-10.5 -9.45 21 18.9" className="w-9 h-9 text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="0" cy="0" r="2" fill="currentColor"></circle>
                      <g stroke="currentColor" strokeWidth="1" fill="none">
                        <ellipse rx="10" ry="4.5"></ellipse>
                        <ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse>
                        <ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse>
                      </g>
                    </svg>
                  </div>
               </div>
               <div className="text-center">
                 <h3 className="text-xl font-bold text-zinc-900 mb-2 tracking-tight">Moderní Tech Stack</h3>
                 <p className="text-sm text-zinc-500 font-light leading-relaxed">
                   Využíváme moderní technologie React a Next.js. Váš web nezastará a nebude odkázaný na děravé šablony.
                 </p>
               </div>
            </m.div>

          </m.div>

          {/* Global CTA */}
          <div className="mt-8 mb-4">
            <CtaSection 
              headline="Zní to jako plán, který hledáte?"
              description="Zavolejte mi nebo napište e-mail a dohodneme se na spuštění vaší měsíční správy. Vy se budete starat o řemeslo, já o váš web."
              buttonText="Aktivovat měsíční péči"
              buttonHref="/#contact"
            />
          </div>

        </div>
        
        {/* Footer */}
        <div className="max-w-7xl mx-auto w-full pt-8 pb-8 border-t border-zinc-200/50 mt-12 px-6 relative z-10">
          <Footer />
        </div>
      </main>
    </LazyMotion>
  );
}
