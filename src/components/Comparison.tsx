"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, Target, CalendarCheck, Rocket } from "lucide-react";

const badFeatures = [
  {
    title: "Levné šablony",
    desc: "Pomalé WordPress weby, které vypadají jako tisíce dalších. Žádná unikátní identita.",
    icon: <X className="w-6 h-6 text-red-500" />
  },
  {
    title: "Slepý text",
    desc: "Texty, které jen popisují firmu, ale neřeší problém zákazníka. Nuda, která neprodává.",
    icon: <X className="w-6 h-6 text-red-500" />
  },
  {
    title: "Dlouhé dodání",
    desc: "Měsíce čekání bez jasného harmonogramu. Komunikace, která vázne.",
    icon: <X className="w-6 h-6 text-red-500" />
  },
  {
    title: "Opuštění po spuštění",
    desc: "Odevzdají kód a zmizí. Žádná analýza konverzí nebo další optimalizace.",
    icon: <X className="w-6 h-6 text-red-500" />
  }
];

const vexxFeatures = [
  {
    title: "Next.js & Škálovatelnost",
    desc: "Moderní architektura stavěná na bleskovou rychlost a prémiový dojem.",
    icon: <Zap className="w-6 h-6 text-blue-500" />
  },
  {
    title: "Psychologický Copywriting",
    desc: "Texty, které čtou myšlenky vašich klientů a nutí je kliknout na 'Poptat'.",
    icon: <Target className="w-6 h-6 text-blue-500" />
  },
  {
    title: "Extrémní spolehlivost",
    desc: "Jasný proces, naprostá transparentnost. Deadline je u nás svatý.",
    icon: <CalendarCheck className="w-6 h-6 text-blue-500" />
  },
  {
    title: "Konverzní partnerství",
    desc: "Spuštěním to začíná. Měříme, analyzujeme a optimalizujeme pro maximalizaci obratu.",
    icon: <Rocket className="w-6 h-6 text-blue-500" />
  }
];

export default function Comparison() {
  const [isVexx, setIsVexx] = useState(true);

  return (
    <section className={`py-24 lg:py-32 transition-colors duration-700 ${isVexx ? "bg-white" : "bg-zinc-50"}`}>
      <div className="container mx-auto px-6 lg:px-12 max-w-[85rem] flex flex-col items-center">
        
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-[2rem] md:text-[3rem] font-bold tracking-tight text-[#111] leading-[1.1] mb-6">
            Proč si za weby od Vexx. <br className="hidden md:block" />
            klienti <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">rádi připlatí?</span>
          </h2>
          <p className="text-lg md:text-xl text-zinc-500 font-light max-w-2xl mx-auto">
            Rozdíl mezi investicí do růstu a vyhozenými penězi za šablonu.
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="relative flex p-1.5 bg-zinc-100/80 backdrop-blur-sm rounded-full mb-16 border border-zinc-200/50 shadow-inner">
          <button
            onClick={() => setIsVexx(false)}
            className={`relative px-6 md:px-8 py-3 text-sm md:text-base font-medium rounded-full transition-colors z-10 ${
              !isVexx ? "text-red-700" : "text-zinc-500 hover:text-zinc-700"
            }`}
          >
            Běžná agentura
          </button>
          
          <button
            onClick={() => setIsVexx(true)}
            className={`relative px-6 md:px-8 py-3 text-sm md:text-base font-bold rounded-full transition-colors z-10 ${
              isVexx ? "text-blue-700" : "text-zinc-500 hover:text-zinc-700"
            }`}
          >
            Vexx. Přístup
          </button>

          {/* Active background pill */}
          <motion.div
            layoutId="comparisonToggle"
            className={`absolute top-1.5 bottom-1.5 rounded-full shadow-sm border ${
              isVexx ? "bg-white border-blue-100" : "bg-white border-red-100"
            }`}
            initial={false}
            animate={{
              left: isVexx ? "50%" : "6px",
              right: isVexx ? "6px" : "50%",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        </div>

        {/* Cards Grid */}
        <div className="w-full max-w-5xl relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={isVexx ? "vexx" : "bad"}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 absolute inset-0"
            >
              {(isVexx ? vexxFeatures : badFeatures).map((feature, idx) => (
                <div
                  key={idx}
                  className={`p-8 rounded-[2rem] border transition-all duration-300 flex flex-col gap-4 ${
                    isVexx 
                      ? "bg-white border-blue-50/50 shadow-[0_10px_40px_rgba(37,99,235,0.03)] hover:shadow-[0_15px_50px_rgba(37,99,235,0.06)]" 
                      : "bg-white border-red-50 shadow-[0_10px_40px_rgba(239,68,68,0.02)]"
                  }`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-2 ${
                    isVexx ? "bg-blue-50" : "bg-red-50"
                  }`}>
                    {feature.icon}
                  </div>
                  <h3 className={`text-2xl font-bold tracking-tight ${isVexx ? "text-[#111]" : "text-zinc-800"}`}>
                    {feature.title}
                  </h3>
                  <p className={`text-lg leading-relaxed font-light ${isVexx ? "text-zinc-500" : "text-zinc-500"}`}>
                    {feature.desc}
                  </p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
