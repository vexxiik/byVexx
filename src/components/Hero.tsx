'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, TrendingUp, Users, Activity } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#FAFAFA] overflow-hidden flex flex-col justify-center selection:bg-blue-500/30">
      {/* Subtle background grain/noise for texture */}
      <div className="absolute inset-0 z-0 opacity-[0.015] pointer-events-none mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <div className="max-w-[90rem] mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center z-10 pt-20">
        
        {/* Left: Text & Flow */}
        <div className="flex flex-col items-start max-w-xl">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-black/5 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-[11px] font-semibold tracking-[0.15em] text-zinc-500 uppercase">
              Nezávazný návrh webu zdarma
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-[3.5rem] md:text-[4.5rem] lg:text-[5rem] font-bold tracking-[-0.04em] leading-[1.05] text-[#111] mb-6"
          >
            Zapomeňte na hezké vizitky.
            <span className="block mt-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-500 bg-clip-text text-transparent">Váš web musí vydělávat.</span>
          </motion.h1>

          {/* Paragraph */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-500 leading-relaxed font-light mb-10 max-w-md"
          >
            Zapomeňte na šablony, které používá vaše konkurence. Navrhneme pro vás <strong className="font-medium text-zinc-800">prémiový web na míru</strong>, který buduje okamžitou autoritu a automaticky generuje poptávky.
          </motion.p>

          {/* CTA Group */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto"
          >
            <Link 
              href="#contact"
              className="group relative flex items-center justify-center gap-2 h-14 px-8 rounded-full bg-[#111] text-white font-medium overflow-hidden transition-transform active:scale-95 shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(59,130,246,0.3)] w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-blue-600 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
              <span className="relative z-10 text-sm tracking-wide">Chci web, co vydělává</span>
              <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>

            <div className="flex flex-col items-center sm:items-start">
              <div className="flex items-center gap-0.5 text-[#F5A623] mb-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-[11px] font-medium text-zinc-500 tracking-wide">
                Více než 50+ spokojených klientů
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right: Autonomous Animation Composition */}
        <div className="relative w-full h-[500px] lg:h-[700px] flex items-center justify-center lg:justify-end">
          
          {/* Ambient Glow behind composition */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-blue-500/20 rounded-full blur-[120px]"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.5, 0.2],
              rotate: [0, -90, 0]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-[40%] -translate-y-[60%] w-[350px] h-[350px] bg-indigo-500/20 rounded-full blur-[100px]"
          />
          
          {/* Decorative floating elements */}
          <motion.div 
            animate={{ y: [-20, 20, -20], x: [-10, 10, -10], opacity: [0, 1, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[15%] right-[15%] w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] z-10"
          />
          <motion.div 
            animate={{ y: [20, -20, 20], x: [10, -10, 10], opacity: [0, 1, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[15%] left-[10%] w-3 h-3 rounded-full bg-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.8)] z-10"
          />

          <div className="relative w-full max-w-[540px] h-full">
            
            {/* Main Central Card: Conversion Flow */}
            <motion.div 
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-[0_30px_60px_rgba(37,99,235,0.15)] border border-white/60 z-20"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-900">Konverzní poměr</h3>
                    <p className="text-[11px] text-zinc-500">Live analýza dat</p>
                  </div>
                </div>
                <div className="px-2.5 py-1 rounded-full bg-green-50 text-green-600 text-xs font-bold">
                  +14.2%
                </div>
              </div>
              
              {/* Animated Graph lines */}
              <div className="relative h-24 w-full flex items-end gap-2 pb-2">
                {[40, 60, 45, 80, 55, 90, 110].map((height, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: "10%" }}
                    animate={{ height: `${height}%` }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      repeatType: "reverse", 
                      ease: "easeInOut",
                      delay: i * 0.2
                    }}
                    className="w-full bg-gradient-to-t from-blue-100 to-blue-500 rounded-t-sm"
                  />
                ))}
              </div>
            </motion.div>

            {/* Top Left Floating Card: Users */}
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-[15%] left-[5%] w-[180px] bg-white/80 backdrop-blur-2xl rounded-2xl p-4 shadow-[0_15px_40px_rgba(37,99,235,0.1)] border border-white z-30"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600">
                  <Users className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-zinc-800">Návštěvnost</span>
              </div>
              <div className="text-2xl font-bold text-zinc-900 tracking-tight">12,405</div>
            </motion.div>

            {/* Bottom Right Floating Card: Activity */}
            <motion.div 
              animate={{ y: [0, -15, 0], x: [0, -5, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-[20%] right-[-5%] w-[200px] bg-white/90 backdrop-blur-xl rounded-2xl p-4 shadow-[0_20px_50px_rgba(99,102,241,0.12)] border border-white/60 z-30"
            >
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-4 h-4 text-indigo-500" />
                <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">Aktivní leady</span>
              </div>
              
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                      className="w-2 h-2 rounded-full bg-indigo-500"
                    />
                    <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ x: "-100%" }}
                        animate={{ x: "0%" }}
                        transition={{ duration: 2, repeat: Infinity, ease: "circOut", delay: i * 0.3 }}
                        className="h-full w-full bg-indigo-400"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Connection SVG Lines (Data Flow) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ filter: "drop-shadow(0 0 4px rgba(59,130,246,0.3))" }}>
              <motion.path 
                d="M 120 200 C 180 200, 200 300, 270 300" 
                fill="transparent" 
                stroke="rgba(59,130,246,0.2)" 
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <motion.circle 
                cx="120" cy="200" r="3" fill="#3B82F6"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.circle 
                cx="270" cy="300" r="3" fill="#3B82F6"
                animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />
            </svg>
          </div>
        </div>

      </div>
    </section>
  );
}
