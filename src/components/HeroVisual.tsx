'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Activity, Zap, ArrowUpRight } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   PREMIUM EDGE GLARE (21st.dev style hover border)
───────────────────────────────────────────────────────────── */
function EdgeGlare() {
  return (
    <div className="absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10">
      <div className="absolute inset-[0px] rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] aspect-square bg-[conic-gradient(from_0deg,transparent_75%,rgba(59,130,246,0.9)_100%)]"
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   CARD 1: MAIN REVENUE CHART
───────────────────────────────────────────────────────────── */
function RevenueChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative w-full bg-white/80 backdrop-blur-2xl rounded-3xl p-7 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-white/60 hover:shadow-[0_20px_60px_rgba(37,99,235,0.08)] transition-shadow duration-500"
    >
      <EdgeGlare />
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-sm font-semibold text-zinc-900">Měsíční obrat</span>
          </div>
          <div className="text-3xl lg:text-4xl font-bold text-zinc-900 tracking-tight ml-10">
            2.4M CZK
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-1 bg-green-50 text-green-600 px-3 py-1.5 rounded-full text-sm font-bold border border-green-100/50">
            <ArrowUpRight className="w-4 h-4" />
            +34%
          </div>
          <span className="text-[10px] text-zinc-400 font-medium mr-1 uppercase tracking-wider">vs minulý měsíc</span>
        </div>
      </div>

      {/* Abstract Smooth SVG Chart */}
      <div className="relative w-full h-[100px] mt-2">
        <svg viewBox="0 0 400 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="chartLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="50%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#818CF8" />
            </linearGradient>
          </defs>
          
          <motion.path
            d="M 0,80 C 50,70 100,90 150,50 C 200,10 250,60 300,30 C 350,-10 400,10 400,10 L 400,100 L 0,100 Z"
            fill="url(#chartFill)"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <motion.path
            d="M 0,80 C 50,70 100,90 150,50 C 200,10 250,60 300,30 C 350,-10 400,10 400,10"
            fill="none"
            stroke="url(#chartLine)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          
          <motion.circle
            cx="400"
            cy="10"
            r="5"
            fill="#fff"
            stroke="#4F46E5"
            strokeWidth="2.5"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [1, 1.25, 1], opacity: 1 }}
            transition={{ 
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 0.5, delay: 2 }
            }}
            className="drop-shadow-[0_0_8px_rgba(79,70,229,0.5)]"
          />
        </svg>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   CARD 2: PERFORMANCE METRIC
───────────────────────────────────────────────────────────── */
function PerformanceCard() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const duration = 2000;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min((progress / duration), 1);
      
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      setCount(Math.floor(easeOutQuart * 100));
      
      if (percentage < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    const timer = setTimeout(() => requestAnimationFrame(animate), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative w-full bg-white/80 backdrop-blur-2xl rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-white/60 hover:shadow-[0_20px_60px_rgba(37,99,235,0.08)] transition-shadow duration-500 flex flex-col justify-between"
    >
      <EdgeGlare />
      <div className="flex justify-between items-start">
        <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
          <Zap className="w-5 h-5 text-indigo-500" />
        </div>
        <div className="flex items-center gap-1 bg-green-50 text-green-600 px-2 py-1 rounded-full text-[11px] font-bold border border-green-100/50">
          <ArrowUpRight className="w-3 h-3" />
          +12%
        </div>
      </div>
      
      <div className="mt-4 flex flex-col items-center">
        <div className="relative w-24 h-24 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="#f8fafc" strokeWidth="6" />
            <motion.circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="url(#perfGradient)"
              strokeWidth="6"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.8, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="perfGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#818CF8" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
            </defs>
          </svg>
          <div className="text-3xl font-black text-zinc-900 tracking-tighter">
            {count}<span className="text-lg text-zinc-400">%</span>
          </div>
        </div>
        <span className="text-xs font-semibold text-zinc-900 mt-3">Rychlost webu</span>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   CARD 3: CONVERSION PIPELINE
───────────────────────────────────────────────────────────── */
function PipelineCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="group relative w-full bg-white/80 backdrop-blur-2xl rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-white/60 hover:shadow-[0_20px_60px_rgba(37,99,235,0.08)] transition-shadow duration-500"
    >
      <EdgeGlare />
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-500" />
          <span className="text-sm font-semibold text-zinc-900">Akviziční Flow</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-green-200/50 bg-green-50/50">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-[10px] uppercase tracking-widest font-bold text-green-700">Live</span>
        </div>
      </div>

      <div className="space-y-4">
        {[
          { label: 'Návštěvnost', val: '12,400', progress: 100 },
          { label: 'Kliknutí na poptávku', val: '2,840', progress: 45, highlight: '+22%' },
          { label: 'Uzavřené dealy', val: '412', progress: 15, highlight: '+8%' },
        ].map((item, i) => (
          <div key={i} className="relative">
            <div className="flex justify-between items-end text-xs font-semibold text-zinc-600 mb-1.5">
              <span>{item.label}</span>
              <div className="flex items-center gap-2">
                {item.highlight && (
                  <span className="text-[10px] text-green-600 font-bold bg-green-50 px-1.5 py-0.5 rounded border border-green-100/50">
                    {item.highlight}
                  </span>
                )}
                <span className="text-sm text-zinc-900">{item.val}</span>
              </div>
            </div>
            <div className="h-2 w-full bg-zinc-100/80 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.progress}%` }}
                transition={{ duration: 1.5, delay: 1 + i * 0.2, ease: "easeOut" }}
                className="relative h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 overflow-hidden"
              >
                <motion.div 
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 + 2 }}
                  className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN COMPOSITION
───────────────────────────────────────────────────────────── */
export default function HeroVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-4">
      {/* ── Ambient Glows (Very subtle, locked behind the cards) ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[60%] left-[60%] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-400/10 rounded-full blur-[120px] pointer-events-none" />

      {/* ── Clean Bento Layout (No overlap, generous whitespace) ── */}
      <div className="relative z-10 w-full max-w-[520px] flex flex-col gap-6">
        
        {/* Row 1: Full width Revenue Chart */}
        <RevenueChart />
        
        {/* Row 2: Performance (Square) + Pipeline (Rectangle) */}
        <div className="grid grid-cols-[200px_1fr] gap-6">
          <PerformanceCard />
          <PipelineCard />
        </div>

      </div>
    </div>
  );
}
