'use client';

import React, { useEffect, useRef, useState } from 'react';
import { m, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Vexx Watch',
    fullName: 'Vexx Watch Atelier',
    category: 'E-commerce platforma',
    description: 'E-commerce platforma zaměřená na prémiovou prezentaci materiálů a zakázkovou stavbu luxusních hodinek.',
    link: 'https://www.vexxwatch.cz/',
    image: '/vexx%20watch.png',
    logoText: 'VW',
    logoColor: 'bg-black text-white',
    audit: { performance: 98, accessibility: 94, bestPractices: 96, seo: 100 },
    stack: [
      { name: 'REACT', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
      { name: 'NEXT.JS', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
      { name: 'TYPESCRIPT', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
      { name: 'TAILWIND', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'NODE.JS', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
      { name: 'GSAP', symbol: 'G' },
      { name: 'VERCEL', svg: <svg viewBox="0 0 24 24" className="w-5 h-5 text-black" fill="currentColor"><path d="M24 22.525H0l12-21.05 12 21.05z"/></svg> },
      { name: 'FRAMER', symbol: 'F' },
    ]
  },
  {
    id: 2,
    title: 'Terra Complex',
    fullName: 'Apartmán Terra Complex',
    category: 'Rezervační systém',
    description: 'Vysoce konverzní rezervační systém pro luxusní apartmán v Bansku s integrovanou správou dostupnosti.',
    link: 'https://terracomplexapartment.com/?i=1',
    image: '/terra.png',
    logoText: 'TC',
    logoColor: 'bg-teal-600 text-white',
    audit: { performance: 96, accessibility: 98, bestPractices: 95, seo: 100 },
    stack: [
      { name: 'HTML5', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
      { name: 'CSS3', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
      { name: 'JAVASCRIPT', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
      { name: 'TAILWIND', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'PHP', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg' },
      { name: 'MYSQL', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
      { name: 'APACHE', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apache/apache-original.svg' },
      { name: 'FLATPICKR', symbol: '📅' },
    ]
  }
];

/* ─── Lighthouse Dashboard Micro-UI ─── */

const AnimatedNumber = ({ value, isVisible }: { value: number; isVisible: boolean }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    if (isVisible) {
      const animation = animate(count, value, {
        duration: 1.8,
        ease: "easeOut",
        delay: 0.3,
      });
      return animation.stop;
    }
  }, [isVisible, count, value]);

  return <m.span>{rounded}</m.span>;
};

const LighthouseBar = React.memo(({ 
  value, 
  label, 
  delay = 0, 
  isVisible 
}: { 
  value: number; 
  label: string; 
  delay?: number; 
  isVisible: boolean;
}) => {
  const barColor = value >= 90 ? 'bg-emerald-500' : value >= 50 ? 'bg-amber-500' : 'bg-red-500';
  const textColor = value >= 90 ? 'text-emerald-600' : value >= 50 ? 'text-amber-600' : 'text-red-600';

  return (
    <div className="flex items-center gap-4">
      <div className="w-28 shrink-0">
        <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#a1a1aa]">{label}</span>
      </div>
      <div className="flex-1 h-2.5 bg-zinc-100 rounded-full overflow-hidden relative">
        <m.div
          className={`h-full rounded-full ${barColor}`}
          initial={{ width: 0 }}
          animate={isVisible ? { width: `${value}%` } : { width: 0 }}
          transition={{ duration: 1.5, delay: delay + 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: "width" }}
        />
      </div>
      <div className={`w-10 text-right text-sm font-black tabular-nums ${textColor}`}>
        <AnimatedNumber value={value} isVisible={isVisible} />
      </div>
    </div>
  );
});

const LighthouseDashboard = React.memo(({ audit, isVisible }: { 
  audit: { performance: number; accessibility: number; bestPractices: number; seo: number };
  isVisible: boolean;
}) => {
  const avgScore = Math.round((audit.performance + audit.accessibility + audit.bestPractices + audit.seo) / 4);

  return (
    <div className="bg-[#fcfcfc] rounded-[2rem] p-6 shadow-sm border border-black/5 flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#a1a1aa] text-xs font-bold tracking-widest uppercase">
          {/* Pulsing live dot */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Lighthouse Audit
        </div>
        <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border border-emerald-100">
          Score: {avgScore}
        </div>
      </div>

      {/* Bars */}
      <div className="flex flex-col gap-3.5 py-2">
        <LighthouseBar value={audit.performance} label="Výkon" delay={0} isVisible={isVisible} />
        <LighthouseBar value={audit.accessibility} label="Přístupnost" delay={0.1} isVisible={isVisible} />
        <LighthouseBar value={audit.bestPractices} label="Best Practices" delay={0.2} isVisible={isVisible} />
        <LighthouseBar value={audit.seo} label="SEO" delay={0.3} isVisible={isVisible} />
      </div>

      {/* Footer micro-detail */}
      <div className="flex items-center justify-between pt-2 border-t border-zinc-100">
        <span className="text-[10px] text-zinc-400 font-medium">Aktualizováno právě teď</span>
        <div className="flex items-center gap-1">
          {[audit.performance, audit.accessibility, audit.bestPractices, audit.seo].map((v, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full ${v >= 90 ? 'bg-emerald-400' : v >= 50 ? 'bg-amber-400' : 'bg-red-400'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

/* ─── Orbit Rotation Tech Stack ─── */

interface StackItem {
  name: string;
  iconUrl?: string;
  svg?: React.ReactNode;
  symbol?: string;
}

const OrbitTechStack = React.memo(({ stack }: { stack: StackItem[] }) => {
  const innerOrbit = stack.slice(0, 4);
  const outerOrbit = stack.slice(4);
  
  // Find center icon — prefer Next.js or first item
  const centerItem = stack.find(s => s.name === 'NEXT.JS' || s.name === 'REACT') || stack[0];

  return (
    <div className="bg-[#fcfcfc] rounded-[2rem] p-6 shadow-sm border border-black/5">
      <div className="flex items-center gap-2 text-[#a1a1aa] text-xs font-bold tracking-widest uppercase ml-2 mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
        Tech Stack
      </div>
      
      <div className="relative flex items-center justify-center h-[280px] overflow-hidden">
        {/* Center Hub */}
        <div className="absolute z-20 flex flex-col items-center justify-center w-16 h-16 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-black/5" style={{ willChange: "transform", transform: "translateZ(0)" }}>
          {centerItem.iconUrl ? (
            <img src={centerItem.iconUrl} alt={centerItem.name} className="w-7 h-7" />
          ) : centerItem.svg ? (
            <div className="w-7 h-7 flex items-center justify-center">{centerItem.svg}</div>
          ) : (
            <span className="text-lg font-black text-[#171717]">{centerItem.symbol}</span>
          )}
        </div>

        {/* Inner Orbit */}
        <div
          className="absolute rounded-full border-2 border-dashed border-zinc-200"
          style={{
            width: '10rem',
            height: '10rem',
            animation: 'orbit-spin 18s linear infinite',
            willChange: 'transform',
          }}
        >
          {innerOrbit.map((tech, i) => {
            const angle = (i / innerOrbit.length) * 2 * Math.PI;
            const x = 50 + 50 * Math.cos(angle);
            const y = 50 + 50 * Math.sin(angle);
            return (
              <div
                key={tech.name}
                className="absolute"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  animation: 'orbit-counter-spin 18s linear infinite',
                  willChange: 'transform',
                }}
              >
                <div className="w-10 h-10 rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06)] border border-black/5 flex items-center justify-center">
                  {tech.iconUrl ? (
                    <img src={tech.iconUrl} alt={tech.name} className="w-5 h-5" />
                  ) : tech.svg ? (
                    <div className="w-5 h-5 flex items-center justify-center">{tech.svg}</div>
                  ) : (
                    <span className="text-xs font-bold text-[#171717]">{tech.symbol}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Outer Orbit */}
        <div
          className="absolute rounded-full border-2 border-dashed border-zinc-100"
          style={{
            width: '18rem',
            height: '18rem',
            animation: 'orbit-spin 30s linear infinite reverse',
            willChange: 'transform',
          }}
        >
          {outerOrbit.map((tech, i) => {
            const angle = (i / outerOrbit.length) * 2 * Math.PI;
            const x = 50 + 50 * Math.cos(angle);
            const y = 50 + 50 * Math.sin(angle);
            return (
              <div
                key={tech.name}
                className="absolute"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  animation: 'orbit-counter-spin 30s linear infinite reverse',
                  willChange: 'transform',
                }}
              >
                <div className="w-9 h-9 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-black/5 flex items-center justify-center">
                  {tech.iconUrl ? (
                    <img src={tech.iconUrl} alt={tech.name} className="w-4 h-4" />
                  ) : tech.svg ? (
                    <div className="w-4 h-4 flex items-center justify-center">{tech.svg}</div>
                  ) : (
                    <span className="text-[10px] font-bold text-[#171717]">{tech.symbol}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Ripple rings */}
        <div className="absolute w-[10rem] h-[10rem] rounded-full border border-zinc-100/50 pointer-events-none" />
        <div className="absolute w-[14rem] h-[14rem] rounded-full border border-zinc-100/30 pointer-events-none" />
      </div>
    </div>
  );
});

/* ─── Main Component ─── */

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const auditRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState(projects[0].id);
  
  const auditInView = useInView(auditRef, { once: true, margin: "-80px" });

  const activeProject = projects.find(p => p.id === activeId) || projects[0];

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
            }
          }
        );
      });
      return () => ctx.revert();
    }
  }, []);

  useEffect(() => {
    if (leftColRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          leftColRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
        );
      });
      return () => ctx.revert();
    }
  }, [activeId]);

  return (
    <section id="work" className="py-24 px-4 sm:px-6 bg-[#f4f4f5] border-t border-black/5" ref={containerRef}>
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#171717]">
            Výběr projektů
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT COLUMN (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Live Preview Card */}
            <div className="bg-[#fcfcfc] rounded-[2rem] p-6 shadow-sm border border-black/5 flex flex-col gap-6" ref={leftColRef}>
              <div className="flex items-center gap-2 text-[#a1a1aa] text-xs font-bold tracking-widest uppercase ml-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                Živý náhled projektu
              </div>
              
              {/* Image window */}
              <div className="w-full aspect-[16/9] bg-black rounded-[1.5rem] overflow-hidden relative shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                <div className="absolute top-0 left-0 w-full h-8 bg-[#171717] flex items-center px-4 gap-1.5 z-20 border-b border-white/5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#eab308]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e]"></div>
                </div>
                <div className="w-full h-full pt-8">
                  <img 
                    src={activeProject.image} 
                    alt={activeProject.fullName}
                    className="w-full h-full object-cover object-top opacity-95 hover:opacity-100 transition-opacity duration-300" 
                  />
                </div>
              </div>

              {/* Info & Button */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mt-2 px-2">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-3xl font-bold text-[#171717] tracking-tight">{activeProject.fullName}</h3>
                    <div className="flex items-center gap-1.5 bg-[#d1fae5] text-[#065f46] px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></div>
                      Aktivní
                    </div>
                  </div>
                  <p className="text-[#52525b] max-w-lg text-sm leading-relaxed">
                    {activeProject.description}
                  </p>
                </div>
                {/* Shine Hover Premium Button */}
                <a 
                  href={activeProject.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="shrink-0 flex items-center justify-center gap-2.5 bg-[#171717] text-white px-7 py-4 rounded-full text-sm font-bold tracking-wide shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-all duration-500 relative overflow-hidden before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] before:duration-[1s] hover:before:bg-[position:-100%_0,0_0] group"
                >
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-[20deg]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                  ŽIVÝ WEB
                  <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path></svg>
                </a>
              </div>
            </div>

            {/* Lighthouse Dashboard Micro-UI */}
            <div ref={auditRef}>
              <LighthouseDashboard audit={activeProject.audit} isVisible={auditInView} />
            </div>

          </div>

          {/* RIGHT COLUMN (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Project Selection Card */}
            <div className="bg-[#fcfcfc] rounded-[2rem] p-6 shadow-sm border border-black/5 flex flex-col gap-6 flex-grow">
              <div className="flex items-center gap-2 text-[#a1a1aa] text-xs font-bold tracking-widest uppercase ml-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                Výběr projektu
              </div>
              
              <div className="flex flex-col gap-3">
                {projects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => setActiveId(project.id)}
                    className={`flex items-center justify-between p-4 rounded-[1.5rem] transition-all duration-300 border ${
                      activeId === project.id 
                        ? 'bg-white shadow-[0_4px_20px_rgb(0,0,0,0.06)] border-black/5' 
                        : 'bg-transparent border-transparent hover:bg-black/5'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm shadow-sm ${project.logoColor}`}>
                        {project.logoText}
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-[#171717]">{project.title}</div>
                        <div className="text-xs text-[#a1a1aa] font-medium">{project.category}</div>
                      </div>
                    </div>
                    {activeId === project.id && (
                      <div className="w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Orbiting Tech Stack */}
            <OrbitTechStack stack={activeProject.stack} />

          </div>
        </div>
      </div>
    </section>
  );
}
