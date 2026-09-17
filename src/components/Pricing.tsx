"use client";

import React from "react";
import { m } from "framer-motion";

const plans = [
  {
    name: "Vexx. Kompletní Web",
    desc: "Vše, co potřebujete pro dominanci na internetu. Od návrhu po spuštění.",
    features: [
      "Vícestránková architektura (až 5 podstránek)",
      "Vysoce konverzní prémiový design",
      "Next.js & Framer Motion interakce",
      "Psychologický copywriting",
      "Pokročilé SEO a integrace rezervačních systémů",
    ],
    price: "Zaváděcí cena od 7 500 Kč",
    highlight: false,
  },
  {
    name: "Vexx. Essential Care",
    desc: "Základní technická údržba. Vy se staráte o byznys, já o váš web.",
    features: [
      "Rychlý a bezpečný Vercel hosting",
      "Správa a obnova domény",
      "Průběžný technický dohled a aktualizace",
      "Drobné úpravy textů a fotek",
    ],
    price: "Správa od 500 Kč / měsíc",
    highlight: true,
  },
  {
    name: "Vexx. Growth Partner",
    desc: "Aktivní práce na vašem růstu. Pro firmy, které chtějí neustále maximalizovat zisk.",
    features: [
      "Vše z balíčku Essential Care",
      "Prioritní technická podpora (24/7)",
      "Pokročilá Vercel analytika a reporty",
      "Průběžná optimalizace rychlosti a A/B testování",
      "Rozšířené úpravy obsahu a architektury",
    ],
    price: "Správa od 1 500 Kč / měsíc",
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 lg:py-36 bg-[#F8F9FA] overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 max-w-[80rem] relative z-10">
        
        <div className="text-center mb-16 lg:mb-24">
          <m.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-[2.25rem] md:text-[3.5rem] font-bold tracking-tight text-[#111] leading-[1.1] mb-6"
          >
            Vyberte si úroveň <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">partnerství.</span>
          </m.h2>
          <m.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-zinc-500 font-light max-w-2xl mx-auto leading-relaxed"
          >
            Nestavíme weby jako na běžícím pásu. Navrhujeme řešení, která přesně odpovídají fázi vašeho byznysu.
          </m.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <m.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
              className={`relative flex flex-col bg-white rounded-[2rem] p-8 lg:p-10 shadow-[0_8px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgba(37,99,235,0.08)] transition-all duration-500 group ${
                plan.highlight 
                  ? 'ring-[1.5px] ring-blue-500/30 md:-translate-y-4 hover:-translate-y-6' 
                  : 'border border-zinc-100 hover:-translate-y-2'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shadow-blue-500/30 whitespace-nowrap">
                  Zlatý střed
                </div>
              )}
              
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-zinc-900 mb-3">{plan.name}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed font-light min-h-[45px]">{plan.desc}</p>
              </div>

              <div className="flex-1">
                <ul className="space-y-5">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3.5 group/item">
                      <div className="relative mt-1 shrink-0 flex items-center justify-center w-4 h-4 rounded-full bg-blue-50/80 text-blue-500 group-hover/item:bg-blue-100 group-hover/item:scale-110 transition-all duration-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-current" />
                      </div>
                      <span className="text-sm font-medium text-zinc-600 group-hover/item:text-zinc-900 transition-colors duration-300 leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-12 pt-8 border-t border-zinc-100/80">
                <div className="text-[17px] font-bold text-zinc-900 tracking-tight transition-colors duration-300 group-hover:text-blue-600">
                  {plan.price}
                </div>
              </div>
              
              {/* Subtle edge glare effect */}
              <div className="absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10">
                <div className="absolute inset-[0px] rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]">
                  <m.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] aspect-square bg-[conic-gradient(from_0deg,transparent_75%,rgba(59,130,246,0.15)_100%)]"
                  />
                </div>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
