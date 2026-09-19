"use client";

import React, { useEffect, useRef, useState } from "react";
import { m, useMotionValue, useTransform, animate } from "framer-motion";
import {
  Search,
  Smartphone,
  Zap,
  Bell,
  ShieldCheck,
  Timer,
  Clock,
  BadgeCheck,
  ArrowRight,
  CheckCircle2,
  Users
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   DESIGN TOKENS (Emil Kowalski aesthetic)
───────────────────────────────────────────────────────────── */
const ease = {
  out: [0.23, 1, 0.32, 1] as [number, number, number, number],
  inOut: [0.77, 0, 0.175, 1] as [number, number, number, number],
};

const stagger = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: ease.out },
    },
  },
};

/* ─────────────────────────────────────────────────────────────
   ANIMATED COUNTER (viewport-triggered)
───────────────────────────────────────────────────────────── */
function CountUp({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => {
    if (value < 10) return v.toFixed(1);
    return Math.round(v).toString();
  });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animate(count, value, {
            duration,
            ease: "easeOut",
          });
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [count, value, duration, hasAnimated]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      <m.span>{rounded}</m.span>
      {suffix}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────────────────────────── */
export function HeroSection({
  companyName,
  city,
  category,
}: {
  companyName: string;
  city: string;
  category: string;
}) {
  const categoryText = category || "vašeho řemeslníka";

  return (
    <m.section
      initial="hidden"
      animate="show"
      variants={stagger.container}
      className="pt-20 pb-16 md:pt-32 md:pb-24 px-6 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-8 items-center">
          {/* Left: Content */}
          <div className="text-left">
            <m.div variants={stagger.item}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-200 text-xs font-semibold tracking-[0.12em] uppercase text-zinc-400 mb-8 shadow-sm">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500" />
                </span>
                Exkluzivní návrh pro {companyName}
              </span>
            </m.div>

            <m.h1
              variants={stagger.item}
              className="text-4xl md:text-[3.5rem] font-bold tracking-tight text-zinc-900 leading-[1.1] mb-6"
            >
              Vaši zákazníci vás hledají online.
              <br />
              <span className="text-zinc-300">Najdou vás?</span>
            </m.h1>

            <m.p
              variants={stagger.item}
              className="text-lg md:text-xl text-zinc-500 leading-relaxed mb-6"
            >
              Připravili jsme webové řešení, které bude pro{" "}
              <strong className="font-semibold text-blue-600">{companyName}</strong>{" "}
              generovat nové poptávky 24 hodin denně, 7 dní v týdnu — i když vy odpočíváte.
            </m.p>

            {city && (
              <m.p variants={stagger.item} className="text-sm text-zinc-400 font-medium">
                Když někdo v {city} hledá službu{" "}
                <span className="text-zinc-600 font-semibold">{categoryText}</span>,
                měl by najít právě vás.
              </m.p>
            )}
          </div>

          {/* Right: Device Mockup */}
          <m.div variants={stagger.item} className="relative w-full aspect-square md:aspect-[4/3] group" style={{ perspective: "1000px" }}>
            <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
              
              {/* MacBook Mockup */}
              <div className="relative w-full max-w-[500px] aspect-[16/10] bg-zinc-900 rounded-t-2xl rounded-b-md shadow-2xl drop-shadow-[0_25px_25px_rgba(0,0,0,0.15)] border-t border-x border-zinc-700/50 flex flex-col overflow-hidden group-hover:-translate-y-2 group-hover:rotate-1 transition-all duration-700 ease-out z-10 ring-1 ring-white/10">
                {/* Screen bezel */}
                <div className="flex-1 bg-black p-2 md:p-3 relative">
                  {/* Screen content */}
                  <div className="w-full h-full bg-zinc-900 rounded-sm overflow-hidden relative">
                    <m.img 
                      initial={{ opacity: 0, filter: "blur(2px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      transition={{ duration: 0.7, ease: ease.out, delay: 0.3 }}
                      src="/mockup-pc.webp" 
                      alt="Desktop Web Mockup" 
                      className="absolute inset-0 w-full h-full object-cover object-top" 
                    />
                  </div>
                </div>
                {/* Mac Base */}
                <div className="h-4 bg-gradient-to-b from-zinc-300 to-zinc-400 w-[110%] -ml-[5%] rounded-b-2xl border-t border-zinc-400/50 flex justify-center shadow-lg relative z-20">
                   <div className="w-1/4 h-1 bg-zinc-400 rounded-b-xl" />
                </div>
              </div>

              {/* iPhone Mockup (Overlapping) */}
              <div className="absolute bottom-4 -right-2 md:bottom-0 md:-right-6 w-[110px] md:w-[130px] aspect-[1/2.1] bg-zinc-950 rounded-[2rem] shadow-2xl drop-shadow-[0_25px_25px_rgba(0,0,0,0.3)] border-[4px] border-zinc-800 flex flex-col overflow-hidden group-hover:-translate-y-6 group-hover:-rotate-3 transition-all duration-700 ease-out z-30 ring-1 ring-white/10">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-3 bg-zinc-950 rounded-b-xl z-40" />
                {/* Screen content */}
                <div className="flex-1 relative bg-zinc-900 overflow-hidden rounded-b-[1.75rem]">
                  <m.img 
                    initial={{ opacity: 0, filter: "blur(2px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.7, ease: ease.out, delay: 0.4 }}
                    src="/mockup-mobile.webp" 
                    alt="Mobile Web Mockup" 
                    className="absolute inset-0 w-full h-full object-cover object-top" 
                  />
                </div>
              </div>

            </div>
          </m.div>
        </div>
      </div>
    </m.section>
  );
}

/* ─────────────────────────────────────────────────────────────
   PAIN POINTS
───────────────────────────────────────────────────────────── */
const painPoints = [
  {
    icon: Search,
    text: "Konkurence s webem vám přebírá zakázky z Google vyhledávání",
  },
  {
    icon: Users,
    text: "Doporučení od známých nestačí na stabilní příjem nových klientů",
  },
  {
    icon: Timer,
    text: "Nemáte čas řešit technologie — potřebujete řešení, které funguje samo",
  },
];

export function PainSection() {
  return (
    <section className="pb-20 md:pb-28 px-6" style={{ contain: "paint" }}>
      <div className="max-w-5xl mx-auto">
        <m.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger.container}
        >
          <m.p
            variants={stagger.item}
            className="text-xs font-semibold tracking-[0.15em] uppercase text-zinc-400 text-center mb-4"
          >
            Problém
          </m.p>
          <m.h2
            variants={stagger.item}
            className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 text-center mb-12 md:mb-16"
          >
            Každý den ztrácíte zákazníky,
            <br className="hidden md:block" /> kteří vás nenajdou
          </m.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {painPoints.map((point, i) => {
              const Icon = point.icon;
              return (
                <m.div
                  key={i}
                  variants={stagger.item}
                  className="group p-8 rounded-[2rem] border border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-lg hover:shadow-zinc-100/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center mb-6 group-hover:bg-zinc-200 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-zinc-500" />
                  </div>
                  <p className="text-[1.05rem] font-medium text-zinc-700 leading-relaxed">
                    {point.text}
                  </p>
                </m.div>
              );
            })}
          </div>
        </m.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   BENTO GRID — Benefits
───────────────────────────────────────────────────────────── */
export function BentoSection({ companyName, city, category }: { companyName: string; city: string; category: string }) {
  const categoryText = category || "řemeslníka";

  return (
    <section className="py-24 px-6 bg-zinc-50 border-y border-zinc-200 relative overflow-hidden">
      {/* Subtle Dot Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <m.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger.container}
        >
          <m.p
            variants={stagger.item}
            className="text-xs font-semibold tracking-[0.15em] uppercase text-zinc-400 text-center mb-4"
          >
            Řešení
          </m.p>
          <m.h2
            variants={stagger.item}
            className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 text-center mb-12 md:mb-16"
          >
            Co pro vás připravíme
          </m.h2>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Speed Card (Wide) */}
            <m.div
              variants={stagger.item}
              className="group md:col-span-2 relative overflow-hidden rounded-[2rem] border border-zinc-200 bg-white p-8 hover:border-zinc-300 transition-all duration-300 hover:shadow-xl hover:shadow-zinc-200/40 flex flex-col md:flex-row gap-8 items-center"
            >
              <div className="flex-1">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-6">
                  <Zap className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-3 tracking-tight">
                  Web, který načte pod 1 vteřinu
                </h3>
                <p className="text-zinc-500 leading-relaxed">
                  Postavený na Next.js — stejné technologii, kterou používá Nike nebo Notion. Rychlost je klíč k udržení pozornosti a lepším pozicím.
                </p>
              </div>
              
              {/* Micro UI: Speed Indicator */}
              <div className="w-full md:w-48 bg-zinc-50 rounded-2xl p-4 border border-zinc-100 flex flex-col items-center justify-center shrink-0 h-32 relative">
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Fast</span>
                </div>
                <span className="text-4xl font-black text-zinc-900 tracking-tighter mb-1 mt-2">0.8<span className="text-xl text-zinc-400">s</span></span>
                <div className="w-full h-1.5 bg-zinc-200 rounded-full overflow-hidden">
                  <div className="w-[85%] h-full bg-emerald-400 rounded-full" />
                </div>
              </div>
            </m.div>

            {/* SEO Card */}
            <m.div
              variants={stagger.item}
              className="group relative overflow-hidden rounded-[2rem] border border-zinc-200 bg-white p-8 hover:border-zinc-300 transition-all duration-300 hover:shadow-xl hover:shadow-zinc-200/40"
            >
              <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center mb-6">
                <Search className="w-5 h-5 text-zinc-500" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-3 tracking-tight">
                Najdou vás na Googlu
              </h3>
              <p className="text-zinc-500 leading-relaxed mb-6">
                {city ? `SEO zajistí, že když někdo v ${city} hledá ${categoryText}, najde vás.` : `SEO zajistí, že když někdo hledá ${categoryText}, najde vás.`}
              </p>
              {/* Micro UI: Real Google Search Bar & Result */}
              <div className="bg-white rounded-xl p-4 border border-zinc-200 shadow-sm flex flex-col gap-3 group-hover:-translate-y-1 transition-transform duration-300">
                {/* Search Bar */}
                <div className="h-8 rounded-full border border-zinc-200 bg-zinc-50 flex items-center px-3 shadow-inner">
                   <Search className="w-3.5 h-3.5 text-blue-500 mr-2 shrink-0" />
                   <span className="text-[10px] text-zinc-800 font-medium truncate">{categoryText} {city}</span>
                </div>
                {/* Result */}
                <div>
                  <div className="flex gap-2 items-center mb-1">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                       <span className="text-[9px] font-bold text-blue-700">W</span>
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] text-zinc-900 font-semibold truncate">{companyName || "Váš Web"}</div>
                      <div className="text-[9px] text-zinc-500 truncate">https://www.vasweb.cz</div>
                    </div>
                  </div>
                  <div className="text-[12px] text-[#1a0dab] font-medium hover:underline cursor-pointer mb-1 leading-tight line-clamp-1">
                    {companyName || "Váš Web"} - Profesionální {categoryText}
                  </div>
                  <div className="text-[10px] text-[#4d5156] leading-snug line-clamp-2">
                    Spolehlivé služby. Kontaktujte nás pro nezávaznou nabídku. Kvalita a rychlost zaručena.
                  </div>
                </div>
              </div>
            </m.div>

            {/* Mobile Card */}
            <m.div
              variants={stagger.item}
              className="group relative overflow-hidden rounded-[2rem] border border-zinc-200 bg-white p-8 hover:border-zinc-300 transition-all duration-300 hover:shadow-xl hover:shadow-zinc-200/40"
            >
              <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center mb-6">
                <Smartphone className="w-5 h-5 text-zinc-500" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-3 tracking-tight">
                Perfektní na mobilu
              </h3>
              <p className="text-zinc-500 leading-relaxed mb-6">
                72 % lidí hledá z telefonu. Váš web bude vypadat bezchybně na každém zařízení.
              </p>
              {/* Micro UI: Phone */}
              <div className="mx-auto w-24 h-32 border-4 border-zinc-200 rounded-t-3xl border-b-0 relative overflow-hidden bg-zinc-50 group-hover:-translate-y-2 transition-transform duration-500">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-zinc-200 rounded-full" />
                <div className="mt-8 mx-2 space-y-2">
                  <div className="w-full h-8 bg-zinc-200/70 rounded-lg" />
                  <div className="w-3/4 h-2 bg-zinc-200 rounded-full" />
                  <div className="w-1/2 h-2 bg-zinc-200 rounded-full" />
                </div>
              </div>
            </m.div>

            {/* Automation Card (Wide) */}
            <m.div
              variants={stagger.item}
              className="group md:col-span-2 relative overflow-hidden rounded-[2rem] border border-zinc-200 bg-white p-8 hover:border-zinc-300 transition-all duration-300 hover:shadow-xl hover:shadow-zinc-200/40 flex flex-col md:flex-row gap-8 items-center"
            >
              <div className="flex-1">
                <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center mb-6">
                  <Bell className="w-5 h-5 text-zinc-500" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-3 tracking-tight">
                  Sběr poptávek na autopilota
                </h3>
                <p className="text-zinc-500 leading-relaxed">
                  Chytrý formulář, který vám pošle novou poptávku rovnou do telefonu nebo na e-mail. Nemusíte nic hlídat.
                </p>
              </div>
              {/* Micro UI: Toast Stack */}
              <div className="w-full md:w-56 bg-zinc-50 rounded-2xl p-6 border border-zinc-100 flex items-center justify-center h-44 relative overflow-hidden">
                
                {/* 3rd (Bottom Layer) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] bg-white border border-zinc-100 rounded-xl p-3 flex gap-3 items-center opacity-40 scale-90 translate-y-7">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    <div className="w-3 h-3 rounded-full bg-blue-200" />
                  </div>
                  <div className="w-full">
                    <div className="w-16 h-2.5 bg-zinc-200 rounded-full mb-1.5" />
                    <div className="w-10 h-2 bg-zinc-100 rounded-full" />
                  </div>
                </div>

                {/* 2nd (Middle Layer) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] bg-white/90 backdrop-blur-sm shadow-sm border border-zinc-100 rounded-xl p-3 flex gap-3 items-center opacity-80 scale-95 translate-y-3 z-10">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-700">Nová poptávka</p>
                    <p className="text-[9px] text-zinc-400">Petr S., před 5 min</p>
                  </div>
                </div>

                {/* 1st (Top Layer) */}
                <m.div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] bg-white shadow-xl shadow-zinc-200/50 border border-zinc-100 rounded-xl p-3 flex gap-3 items-center z-20"
                  whileHover={{ y: "-55%", scale: 1.02 }}
                  transition={{ ease: "easeOut", duration: 0.2 }}
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-900">Nová poptávka</p>
                    <p className="text-[10px] text-zinc-500">Jan Novák, právě teď</p>
                  </div>
                </m.div>
                
              </div>
            </m.div>

          </div>
        </m.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   GODFATHER OFFER (PREMIUM DARK MODE)
───────────────────────────────────────────────────────────── */
export function GodfatherOffer({ phone }: { phone: string }) {
  return (
    <section className="py-24 px-6 bg-white relative">
      <div className="max-w-4xl mx-auto">
        <m.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger.container}
        >
          <m.div
            variants={stagger.item}
            className="rounded-[2.5rem] bg-zinc-950 border-0 ring-1 ring-white/10 p-8 md:p-14 relative overflow-hidden shadow-2xl drop-shadow-2xl"
          >
            {/* Dark Mode Glow Effects (Vexx Blue) */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-blue-900/5 to-transparent pointer-events-none blur-3xl opacity-80" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-600/10 via-zinc-950/0 to-transparent pointer-events-none blur-3xl" />
            <div className="absolute -top-px left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 mb-8">
                <span className="text-xs font-bold tracking-[0.15em] uppercase text-zinc-300">
                  Zaváděcí nabídka
                </span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
                Prémiový web za <span className="text-zinc-500 font-medium">zlomek běžné ceny</span>
              </h2>
              
              <p className="text-lg text-zinc-400 leading-relaxed mb-10 max-w-2xl">
                Buduji portfolio profesionálních webů pro řemeslníky. Vy získáte prémiový
                web v hodnotě desítek tisíc za zlomek ceny. Já získám další případovou
                studii. Fér obchod.
              </p>

              {/* Price block */}
              <div className="flex flex-col md:flex-row md:items-end gap-4 mb-12">
                <span className="text-6xl md:text-7xl font-black tracking-tighter bg-gradient-to-br from-white via-blue-100 to-blue-400 bg-clip-text text-transparent">
                  7 500 Kč
                </span>
                <span className="text-2xl text-zinc-600 line-through font-semibold mb-2">
                  35 000 Kč
                </span>
              </div>

              {/* Guarantees */}
              <div className="grid sm:grid-cols-3 gap-6 mb-12 pt-8 border-t border-zinc-800/60">
                {[
                  {
                    text: "Grafický návrh ZDARMA",
                    sub: "Nejdřív uvidíte, pak se rozhodnete.",
                  },
                  {
                    text: "Hotovo do 14 dnů",
                    sub: "Od schválení finálního designu.",
                  },
                  {
                    text: "100% Záruka spokojenosti",
                    sub: "Budeme ladit detaily, dokud neřeknete: 'To je přesně ono'. Žádné poplatky za vícepráce.",
                  },
                ].map((g, i) => (
                  <div key={i} className="flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-950/50 border border-blue-900/30 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white mb-1">{g.text}</p>
                      <p className="text-xs text-zinc-500 leading-relaxed">{g.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Neon CTA */}
              <a
                href={`tel:${phone}`}
                className="group relative inline-flex items-center justify-center h-14 px-10 rounded-full w-full sm:w-auto font-semibold text-white transition-all duration-300"
              >
                <div className="absolute inset-0 bg-blue-600 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.4)] group-hover:shadow-[0_0_40px_rgba(59,130,246,0.7)] group-active:scale-[0.98] transition-all duration-300 border border-blue-400/50" />
                <span className="relative flex items-center gap-2 tracking-wide font-bold">
                  Probrat spolupráci
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            </div>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   SOCIAL PROOF STATS
───────────────────────────────────────────────────────────── */
const stats = [
  { value: 63, suffix: "%", prefix: "+", label: "Průměrný nárůst poptávek" },
  { value: 0.8, suffix: "s", prefix: "< ", label: "Průměrná doba načtení" },
];

export function StatsSection() {
  return (
    <section className="pb-20 md:pb-28 px-6 bg-white" style={{ contain: "paint" }}>
      <div className="max-w-4xl mx-auto">
        <m.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger.container}
        >
          <m.p
            variants={stagger.item}
            className="text-xs font-semibold tracking-[0.15em] uppercase text-zinc-400 text-center mb-12"
          >
            Výsledky mluví za vše
          </m.p>

          <div className="grid grid-cols-2 gap-6 md:gap-12 max-w-2xl mx-auto">
            {stats.map((stat, i) => (
              <m.div key={i} variants={stagger.item} className="text-center">
                <div className="text-4xl md:text-6xl font-black tracking-tighter text-zinc-900 mb-2">
                  <CountUp
                    value={stat.value}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                    duration={2.2}
                  />
                </div>
                <p className="text-xs md:text-sm text-zinc-500 font-medium">
                  {stat.label}
             </p>
              </m.div>
            ))}
          </div>
        </m.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   FINAL CTA
───────────────────────────────────────────────────────────── */
export function FinalCTA({
  phone,
  leadId,
}: {
  phone: string;
  leadId: string;
}) {
  return (
    <section className="pb-24 md:pb-32 px-6 bg-white" style={{ contain: "paint" }}>
      <div className="max-w-4xl mx-auto border-t border-zinc-100 pt-20">
        <m.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger.container}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center"
        >
          {/* Left Column: CTA text and button */}
          <div className="text-left flex flex-col items-start">
            <m.h2
              variants={stagger.item}
              className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 mb-6"
            >
              Jste připraveni růst?
            </m.h2>
            <m.p
              variants={stagger.item}
              className="text-lg text-zinc-500 leading-relaxed mb-10 max-w-xl"
            >
              Zavolejte nám a probereme, jak přesně můžeme pomoci vašemu podnikání. Grafický návrh připravíme ZDARMA.
            </m.p>

            <m.div
              variants={stagger.item}
              className="w-full sm:w-auto"
            >
              <a
                href={`tel:${phone}`}
                className="group relative inline-flex items-center justify-center gap-2 h-14 px-10 rounded-full overflow-hidden transition-transform duration-[160ms] active:scale-[0.97] w-full sm:w-auto"
                style={{
                  transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
                }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-full opacity-100" />
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.1] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                </div>
                <span className="relative z-10 text-sm tracking-wide text-white font-medium">
                  Zavolat a domluvit detaily
                </span>
                <ArrowRight className="relative z-10 w-4 h-4 text-white group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </m.div>
          </div>

          {/* Right Column: Contact Card */}
          <m.div
            variants={stagger.item}
            className="w-full"
          >
            <div className="bg-zinc-950 text-white rounded-2xl p-6 md:p-8 border border-white/10 shadow-2xl drop-shadow-xl">
              <h3 className="text-sm font-semibold tracking-wide uppercase text-zinc-400 mb-6">
                Přímý kontakt
              </h3>
              <div className="space-y-4">
                <a
                  href={`tel:${phone}`}
                  className="flex items-center gap-4 group"
                >
                  <svg className="w-[18px] h-[18px] text-zinc-500 shrink-0 transition-colors duration-200 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <span className="text-zinc-300 transition-colors duration-200 group-hover:text-white font-medium">{phone.replace('+420', '+420 ')}</span>
                </a>
                <a
                  href="mailto:jakub@vexx.cz"
                  className="flex items-center gap-4 group"
                >
                  <svg className="w-[18px] h-[18px] text-zinc-500 shrink-0 transition-colors duration-200 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <span className="text-zinc-300 transition-colors duration-200 group-hover:text-white font-medium">jakub@vexx.cz</span>
                </a>
              </div>
              <p className="text-zinc-500 text-sm mt-6 pt-6 border-t border-white/10">Jakub Sokol, Vexx.</p>
            </div>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
