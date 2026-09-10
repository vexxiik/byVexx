'use client';

import { useEffect, useRef, useState } from 'react';
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
    // Cesty k úvodním (hero) fotkám webů ze složky public
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

// Circular progress component for audit scores
const CircularProgress = ({ value, label }: { value: number; label: string }) => {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-20 h-20 flex items-center justify-center rounded-full bg-white shadow-[0_4px_20px_rgb(0,0,0,0.05)] border border-black/5">
        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
          {/* Background track */}
          <circle 
            cx="32" cy="32" r={radius} 
            stroke="#d1fae5" strokeWidth="4" fill="transparent" 
          />
          {/* Progress */}
          <circle 
            cx="32" cy="32" r={radius} 
            stroke="#10b981" strokeWidth="4" fill="transparent" 
            strokeDasharray={circumference} 
            strokeDashoffset={strokeDashoffset} 
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <span className="absolute text-lg font-bold text-[#171717]">{value}</span>
      </div>
      <span className="text-[9px] uppercase font-bold tracking-[0.15em] text-[#a1a1aa] mt-4 text-center">{label}</span>
    </div>
  );
};

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState(projects[0].id);

  const activeProject = projects.find(p => p.id === activeId) || projects[0];

  useEffect(() => {
    // Initial reveal animation
    const el = containerRef.current;
    if (el) {
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
    }
  }, []);

  // Animate content when project changes
  useEffect(() => {
    if (leftColRef.current && stackRef.current) {
      gsap.fromTo(
        [leftColRef.current, stackRef.current],
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.1 }
      );
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
                {/* Black Mac Window Header */}
                <div className="absolute top-0 left-0 w-full h-8 bg-[#171717] flex items-center px-4 gap-1.5 z-20 border-b border-white/5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#eab308]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e]"></div>
                </div>
                {/* Screenshot Container */}
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
                <a 
                  href={activeProject.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="shrink-0 flex items-center justify-center gap-2 bg-[#171717] text-white px-6 py-3.5 rounded-full text-sm font-bold hover:bg-black transition-all hover:scale-105 shadow-md"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                  ŽIVÝ WEB
                </a>
              </div>
            </div>

            {/* Technical Audit Card */}
            <div className="bg-[#fcfcfc] rounded-[2rem] p-6 shadow-sm border border-black/5 flex flex-col gap-6">
              <div className="flex items-center gap-2 text-[#a1a1aa] text-xs font-bold tracking-widest uppercase ml-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                Technický audit
              </div>
              <div className="flex flex-wrap justify-around items-center py-4 gap-4">
                <CircularProgress value={activeProject.audit.performance} label="Výkon" />
                <CircularProgress value={activeProject.audit.accessibility} label="Přístupnost" />
                <CircularProgress value={activeProject.audit.bestPractices} label="Doporučené postupy" />
                <CircularProgress value={activeProject.audit.seo} label="SEO" />
              </div>
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

            {/* Stack Card */}
            <div className="bg-[#fcfcfc] rounded-[2rem] p-6 shadow-sm border border-black/5">
              <div ref={stackRef}>
                <div className="grid grid-cols-3 gap-y-8 gap-x-2 relative items-center justify-items-center py-6">
                  {activeProject.stack.slice(0,4).map(tech => (
                    <div key={tech.name} className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-[#f4f4f5] flex items-center justify-center text-lg font-bold text-[#171717] border border-black/5 shadow-sm">
                        {tech.iconUrl ? <img src={tech.iconUrl} alt={tech.name} className="w-5 h-5" /> : tech.svg ? tech.svg : tech.symbol}
                      </div>
                      <span className="text-[8px] font-bold tracking-widest text-[#a1a1aa]">{tech.name}</span>
                    </div>
                  ))}

                  {/* Center Hub */}
                  <div className="flex flex-col items-center justify-center w-24 h-24 rounded-full bg-[#f4f4f5] shadow-inner border border-black/5 z-10 relative">
                    <svg className="w-6 h-6 text-[#171717] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                    <span className="text-[9px] font-bold text-[#171717] uppercase text-center leading-tight">Stack<br/>Devstack</span>
                    {/* Ripple effect rings */}
                    <div className="absolute inset-0 rounded-full border border-black/5 scale-[1.3] -z-10"></div>
                    <div className="absolute inset-0 rounded-full border border-black/5 scale-[1.6] -z-10"></div>
                  </div>

                  {activeProject.stack.slice(4).map(tech => (
                    <div key={tech.name} className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-[#f4f4f5] flex items-center justify-center text-lg font-bold text-[#171717] border border-black/5 shadow-sm">
                        {tech.iconUrl ? <img src={tech.iconUrl} alt={tech.name} className="w-5 h-5" /> : tech.svg ? tech.svg : tech.symbol}
                      </div>
                      <span className="text-[8px] font-bold tracking-widest text-[#a1a1aa]">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
