"use client";

import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Activity, Server, Zap, CheckCircle2, Cloud } from "lucide-react";

type TabType = "Frontend" | "Backend" | "Optimalizace";

const tabs: TabType[] = ["Frontend", "Backend", "Optimalizace"];

// Reusable Circular Progress component for Lighthouse scores
const CircularProgress = ({ value, label, color = "text-green-500", stroke = "stroke-green-500" }: { value: number, label: string, color?: string, stroke?: string }) => {
  const circumference = 2 * Math.PI * 38; // r=38
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="38" className="stroke-zinc-100" strokeWidth="8" fill="none" />
          <m.circle
            cx="50"
            cy="50"
            r="38"
            className={stroke}
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            strokeLinecap="round"
          />
        </svg>
        <span className={`absolute text-2xl font-bold tracking-tight ${color}`}>{value}</span>
      </div>
      <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">{label}</span>
    </div>
  );
};

export default function Results() {
  const [activeTab, setActiveTab] = useState<TabType>("Frontend");

  return (
    <section className="py-24 lg:py-32 bg-white overflow-hidden relative">
      <div className="container mx-auto px-6 lg:px-12 max-w-[85rem]">
        
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 lg:mb-16">
          <div className="max-w-2xl">
            <h2 className="text-[2.5rem] md:text-[3.5rem] font-bold tracking-tight leading-[1.1] mb-6">
              Systém, který <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">staví na výkonu.</span>
            </h2>
            <p className="text-lg text-zinc-500 font-light">
              Nenecháváme nic náhodě. Rychlost a stabilita jsou základem konverzí. Sledujte živé metriky naší infrastruktury.
            </p>
          </div>

          <div className="flex p-1.5 bg-zinc-50/80 rounded-full border border-black/5 backdrop-blur-sm self-start">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-5 md:px-8 py-2.5 text-sm md:text-base font-semibold rounded-full transition-colors z-10 ${
                  activeTab === tab ? "text-blue-700" : "text-zinc-500 hover:text-zinc-800"
                }`}
              >
                {activeTab === tab && (
                  <m.div
                    layoutId="resultsTab"
                    className="absolute inset-0 bg-white rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-black/5 -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Telemetry Card */}
        <div className="w-full bg-zinc-50/50 rounded-[2.5rem] border border-black/5 shadow-[0_30px_80px_rgba(0,0,0,0.03)] overflow-hidden relative min-h-[500px] flex items-center">
          <AnimatePresence mode="wait">
            
            {/* FRONTEND TAB */}
            {activeTab === "Frontend" && (
              <m.div
                key="frontend"
                initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
                transition={{ duration: 0.4 }}
                className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 md:p-12 lg:p-16 items-center"
              >
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-widest mb-6 border border-green-200">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Live Lighthouse Data
                  </div>
                  <h3 className="text-3xl font-bold tracking-tight mb-4 text-[#111]">Odezva na úrovni reflexu</h3>
                  <p className="text-zinc-500 leading-relaxed font-light mb-8">
                    Uživatelé nečekají. Jakmile se web načítá déle než vteřinu, ztrácíte peníze. Stavíme frontend na React/Next.js s využitím Vercel Edge sítě, takže vaše stránka naskočí dřív, než uživatel mrkne.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <div className="text-zinc-400 text-sm font-semibold uppercase tracking-widest mb-1">First Contentful Paint</div>
                      <div className="text-4xl font-black tracking-tight text-[#111]">&lt; 0.6s</div>
                    </div>
                    <div>
                      <div className="text-zinc-400 text-sm font-semibold uppercase tracking-widest mb-1">Time to Interactive</div>
                      <div className="text-4xl font-black tracking-tight text-[#111]">&lt; 0.8s</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-8 border border-zinc-100 shadow-[0_20px_40px_rgba(0,0,0,0.02)]">
                  <div className="grid grid-cols-2 gap-8">
                    <CircularProgress value={99} label="Performance" />
                    <CircularProgress value={100} label="Accessibility" />
                    <CircularProgress value={100} label="Best Practices" />
                    <CircularProgress value={100} label="SEO" />
                  </div>
                </div>
              </m.div>
            )}

            {/* BACKEND TAB */}
            {activeTab === "Backend" && (
              <m.div
                key="backend"
                initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
                transition={{ duration: 0.4 }}
                className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 md:p-12 lg:p-16 items-center"
              >
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest mb-6 border border-blue-200">
                    <Server className="w-3 h-3" />
                    Server Telemetry
                  </div>
                  <h3 className="text-3xl font-bold tracking-tight mb-4 text-[#111]">Nezastavitelná infrastruktura</h3>
                  <p className="text-zinc-500 leading-relaxed font-light mb-8">
                    Žádný sdílený hosting, který spadne při první kampani. Nasazujeme škálovatelné cloudové architektury, které dynamicky reagují na návštěvnost. Serverless funkce, distribuované databáze a Redis caching.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <div className="text-zinc-400 text-sm font-semibold uppercase tracking-widest mb-1">Uptime</div>
                      <div className="text-4xl font-black tracking-tight text-blue-600">99.99%</div>
                    </div>
                    <div>
                      <div className="text-zinc-400 text-sm font-semibold uppercase tracking-widest mb-1">API Latency</div>
                      <div className="text-4xl font-black tracking-tight text-[#111]">12ms</div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#111] rounded-3xl p-8 border border-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.2)] overflow-hidden relative group">
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                  <div className="flex justify-between items-center mb-6 relative z-10 text-white">
                    <div className="text-sm font-mono tracking-widest text-zinc-400">GET /api/v1/data</div>
                    <div className="text-green-400 text-sm font-mono flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      200 OK
                    </div>
                  </div>
                  
                  {/* Infinite Scrolling Chart */}
                  <div className="h-40 w-full relative z-10 border-b border-zinc-800 flex items-end overflow-hidden">
                    <div className="absolute left-0 bottom-0 top-0 w-8 bg-gradient-to-r from-[#111] to-transparent z-20" />
                    <div className="absolute right-0 bottom-0 top-0 w-8 bg-gradient-to-l from-[#111] to-transparent z-20" />
                    
                    <m.div 
                      animate={{ x: ["0%", "-50%"] }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      className="flex items-end gap-1 h-full min-w-[200%]"
                    >
                      {[...Array(60)].map((_, i) => {
                        // Generate random heights for the bars
                        const h = 20 + Math.random() * 60;
                        const isSpike = Math.random() > 0.9;
                        const height = isSpike ? h + 40 : h;
                        const color = isSpike ? "bg-red-500" : "bg-blue-500";
                        
                        return (
                          <div 
                            key={i} 
                            style={{ height: `${height}%` }}
                            className={`w-3 rounded-t-sm opacity-80 ${color}`}
                          />
                        );
                      })}
                    </m.div>
                  </div>
                  <div className="flex justify-between text-zinc-600 font-mono text-[10px] mt-3 relative z-10">
                    <span>NOW</span>
                    <span>-1M</span>
                    <span>-2M</span>
                    <span>-3M</span>
                  </div>
                </div>
              </m.div>
            )}

            {/* OPTIMALIZACE TAB */}
            {activeTab === "Optimalizace" && (
              <m.div
                key="optimalizace"
                initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
                transition={{ duration: 0.4 }}
                className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 md:p-12 lg:p-16 items-center"
              >
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-widest mb-6 border border-purple-200">
                    <Cloud className="w-3 h-3" />
                    Edge Computing
                  </div>
                  <h3 className="text-3xl font-bold tracking-tight mb-4 text-[#111]">Nekompromisní datová úspora</h3>
                  <p className="text-zinc-500 leading-relaxed font-light mb-8">
                    Redukujeme velikost bundle na absolutní minimum pomocí pokročilého treeshakingu, WebP/AVIF konverze médií a přesouváme logiku na Edge. Výsledek? Web, který se načte na 3G síti stejně jako na optice.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <div className="text-zinc-400 text-sm font-semibold uppercase tracking-widest mb-1">Bundle Size</div>
                      <div className="text-4xl font-black tracking-tight text-purple-600">- 64%</div>
                    </div>
                    <div>
                      <div className="text-zinc-400 text-sm font-semibold uppercase tracking-widest mb-1">Cache Hit Ratio</div>
                      <div className="text-4xl font-black tracking-tight text-[#111]">98.5%</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-8 border border-zinc-100 shadow-[0_20px_40px_rgba(0,0,0,0.02)] flex flex-col gap-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-bold text-[#111]">JavaScript Bundle</span>
                      <span className="text-sm font-mono text-zinc-500">64kb</span>
                    </div>
                    <div className="w-full h-3 bg-zinc-100 rounded-full overflow-hidden">
                      <m.div 
                        initial={{ width: 0 }}
                        animate={{ width: "20%" }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-yellow-400"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-bold text-[#111]">Images (WebP/AVIF)</span>
                      <span className="text-sm font-mono text-zinc-500">120kb</span>
                    </div>
                    <div className="w-full h-3 bg-zinc-100 rounded-full overflow-hidden">
                      <m.div 
                        initial={{ width: 0 }}
                        animate={{ width: "40%" }}
                        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                        className="h-full bg-blue-400"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-bold text-[#111]">CSS & Fonts</span>
                      <span className="text-sm font-mono text-zinc-500">32kb</span>
                    </div>
                    <div className="w-full h-3 bg-zinc-100 rounded-full overflow-hidden">
                      <m.div 
                        initial={{ width: 0 }}
                        animate={{ width: "10%" }}
                        transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                        className="h-full bg-purple-400"
                      />
                    </div>
                  </div>

                  <div className="mt-4 pt-6 border-t border-zinc-100 flex items-center justify-between">
                    <span className="text-sm text-zinc-500 font-medium">Core Web Vitals Pass Rate</span>
                    <span className="inline-flex items-center gap-1.5 text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full">
                      <CheckCircle2 className="w-4 h-4" /> 100%
                    </span>
                  </div>
                </div>
              </m.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
