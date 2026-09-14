"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  m,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   MICRO-UI: TERMINAL  (Next.js & Škálovatelnost)
   Vexx  → auto-types `$ next build` with progress bar → 99.9%
   Běžná → frozen terminal with blinking error
   ═══════════════════════════════════════════════════════════════ */

const TerminalMicroUI = React.memo(function TerminalMicroUI({ isVexx }: { isVexx: boolean }) {
  const [typedChars, setTypedChars] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const command = "$ next build";

  useEffect(() => {
    if (!isVexx) {
      setTypedChars(0);
      setProgress(0);
      setShowSuccess(false);
      return;
    }

    setTypedChars(0);
    setProgress(0);
    setShowSuccess(false);

    // Type the command character by character
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      charIndex++;
      setTypedChars(charIndex);
      if (charIndex >= command.length) {
        clearInterval(typeInterval);

        // Start progress bar after typing finishes
        let prog = 0;
        const progressInterval = setInterval(() => {
          prog += Math.random() * 18 + 4;
          if (prog >= 99.9) {
            prog = 99.9;
            setProgress(prog);
            clearInterval(progressInterval);
            setTimeout(() => setShowSuccess(true), 300);

            // Reset cycle after a pause
            setTimeout(() => {
              setTypedChars(0);
              setProgress(0);
              setShowSuccess(false);
              // Re-trigger by updating a dep — handled by the effect cleanup
            }, 4000);
          } else {
            setProgress(prog);
          }
        }, 200);

        return () => clearInterval(progressInterval);
      }
    }, 80);

    return () => clearInterval(typeInterval);
  }, [isVexx]);

  // Recurring animation cycle for Vexx
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    if (!isVexx) return;
    if (showSuccess) {
      const timer = setTimeout(() => setCycle((c) => c + 1), 4000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess, isVexx]);

  useEffect(() => {
    if (!isVexx || cycle === 0) return;
    setTypedChars(0);
    setProgress(0);
    setShowSuccess(false);

    let charIndex = 0;
    const typeInterval = setInterval(() => {
      charIndex++;
      setTypedChars(charIndex);
      if (charIndex >= command.length) {
        clearInterval(typeInterval);
        let prog = 0;
        const progressInterval = setInterval(() => {
          prog += Math.random() * 18 + 4;
          if (prog >= 99.9) {
            prog = 99.9;
            setProgress(prog);
            clearInterval(progressInterval);
            setTimeout(() => setShowSuccess(true), 300);
          } else {
            setProgress(prog);
          }
        }, 200);
        return () => clearInterval(progressInterval);
      }
    }, 80);
    return () => clearInterval(typeInterval);
  }, [cycle, isVexx]);

  const progressWidth = Math.min(progress / 99.9, 1) * 100;

  if (!isVexx) {
    // Broken terminal state
    return (
      <div className="w-full h-28 rounded-xl bg-zinc-100 border border-zinc-200/60 p-3 font-mono text-[11px] leading-relaxed overflow-hidden select-none">
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-2 h-2 rounded-full bg-zinc-300" />
          <div className="w-2 h-2 rounded-full bg-zinc-300" />
          <div className="w-2 h-2 rounded-full bg-zinc-300" />
        </div>
        <div className="text-zinc-400">$ npm run build</div>
        <m.div
          className="text-red-400/70 mt-1"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Error: TIMEOUT — build failed
        </m.div>
        <m.div
          className="inline-block w-1.5 h-3 bg-red-300/50 mt-0.5"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </div>
    );
  }

  return (
    <div className="w-full h-28 rounded-xl bg-zinc-950 border border-zinc-800/80 p-3 font-mono text-[11px] leading-relaxed overflow-hidden select-none shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
      {/* Window dots */}
      <div className="flex items-center gap-1.5 mb-2">
        <div className="w-2 h-2 rounded-full bg-red-500/70" />
        <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
        <div className="w-2 h-2 rounded-full bg-green-500/70" />
      </div>

      {/* Typed command */}
      <div className="text-green-400/90">
        {command.slice(0, typedChars)}
        {typedChars < command.length && (
          <m.span
            className="inline-block w-1.5 h-3 bg-green-400/80 ml-px align-middle"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          />
        )}
      </div>

      {/* Progress bar */}
      {typedChars >= command.length && !showSuccess && (
        <div className="mt-1.5">
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <m.div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-400"
                initial={{ width: 0 }}
                animate={{ width: `${progressWidth}%` }}
                transition={{ duration: 0.15 }}
              />
            </div>
            <span className="text-zinc-500 text-[10px] tabular-nums w-10 text-right">
              {progress.toFixed(1)}%
            </span>
          </div>
        </div>
      )}

      {/* Success state */}
      {showSuccess && (
        <m.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1.5 text-emerald-400"
        >
          ✓ Compiled successfully in 1.2s
        </m.div>
      )}
    </div>
  );
});

/* ═══════════════════════════════════════════════════════════════
   MICRO-UI: COPYWRITING  (Psychologický Copywriting)
   Vexx  → keyword highlight sweep + scale animation
   Běžná → bland grey text block, no emphasis
   ═══════════════════════════════════════════════════════════════ */

const CopywritingMicroUI = React.memo(function CopywritingMicroUI({ isVexx }: { isVexx: boolean }) {
  const [activeWord, setActiveWord] = useState(0);
  const keywords = ["konverze", "růst", "důvěra"];

  useEffect(() => {
    if (!isVexx) return;
    const interval = setInterval(() => {
      setActiveWord((w) => (w + 1) % keywords.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [isVexx]);

  if (!isVexx) {
    return (
      <div className="w-full h-28 rounded-xl bg-zinc-100 border border-zinc-200/60 p-4 select-none overflow-hidden">
        <div className="space-y-2">
          <div className="h-2.5 bg-zinc-200/80 rounded-full w-full" />
          <div className="h-2.5 bg-zinc-200/80 rounded-full w-[85%]" />
          <div className="h-2.5 bg-zinc-200/60 rounded-full w-[70%]" />
          <div className="h-2.5 bg-zinc-200/50 rounded-full w-[90%]" />
          <div className="h-2.5 bg-zinc-200/40 rounded-full w-[60%]" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-28 rounded-xl bg-white border border-zinc-100 p-4 select-none overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
      <div className="text-[12px] leading-[1.8] text-zinc-500 font-light">
        <span>Váš web musí budovat </span>
        <AnimatePresence mode="wait">
          <m.span
            key={keywords[activeWord]}
            initial={{ opacity: 0, scale: 0.85, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.85, filter: "blur(4px)" }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="inline-block font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 text-[15px] mx-0.5 align-baseline"
          >
            {keywords[activeWord]}
          </m.span>
        </AnimatePresence>
        <span> od prvního kontaktu.</span>
      </div>

      {/* Animated highlight bar */}
      <div className="mt-3 relative h-1.5 bg-zinc-100 rounded-full overflow-hidden">
        <m.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-blue-500 to-indigo-400"
          animate={{ width: ["0%", "100%", "100%", "0%"] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            times: [0, 0.4, 0.6, 1],
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Mini metrics */}
      <div className="mt-2.5 flex gap-3">
        {["+142%", "+89%", "+67%"].map((metric, i) => (
          <m.div
            key={metric}
            className="text-[10px] font-semibold text-blue-600/80"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
          >
            {metric}
          </m.div>
        ))}
      </div>
    </div>
  );
});

/* ═══════════════════════════════════════════════════════════════
   MICRO-UI: TIMELINE  (Extrémní spolehlivost)
   Vexx  → Steps checking off one by one ✓
   Běžná → Crossed out / delayed steps ✗
   ═══════════════════════════════════════════════════════════════ */

const TimelineMicroUI = React.memo(function TimelineMicroUI({ isVexx }: { isVexx: boolean }) {
  const steps = ["Návrh", "Kód", "Test", "Launch"];
  const [checkedSteps, setCheckedSteps] = useState(0);

  useEffect(() => {
    if (!isVexx) {
      setCheckedSteps(0);
      return;
    }

    setCheckedSteps(0);
    let current = 0;
    const interval = setInterval(() => {
      current++;
      setCheckedSteps(current);
      if (current >= steps.length) {
        clearInterval(interval);
        // Reset cycle
        setTimeout(() => setCheckedSteps(0), 3000);
        setTimeout(() => {
          let c2 = 0;
          const int2 = setInterval(() => {
            c2++;
            setCheckedSteps(c2);
            if (c2 >= steps.length) clearInterval(int2);
          }, 600);
        }, 3500);
      }
    }, 600);

    return () => clearInterval(interval);
  }, [isVexx]);

  if (!isVexx) {
    return (
      <div className="w-full h-28 rounded-xl bg-zinc-100 border border-zinc-200/60 p-4 select-none overflow-hidden">
        <div className="flex items-center gap-2 mb-3">
          {steps.map((step, i) => (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold ${
                    i < 2
                      ? "bg-red-200/60 text-red-400"
                      : "bg-zinc-200 text-zinc-400"
                  }`}
                >
                  {i < 2 ? "✗" : "?"}
                </div>
                <span className="text-[9px] text-zinc-400 whitespace-nowrap">
                  {step}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="flex-1 h-px bg-zinc-200 -mt-3" />
              )}
            </React.Fragment>
          ))}
        </div>
        <m.div
          className="text-[10px] text-red-400/60 mt-1"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ⚠ Deadline zpožděn o 3 týdny
        </m.div>
      </div>
    );
  }

  return (
    <div className="w-full h-28 rounded-xl bg-white border border-zinc-100 p-4 select-none overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-2">
        {steps.map((step, i) => (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center gap-1">
              <m.div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold transition-colors duration-300 ${
                  i < checkedSteps
                    ? "bg-emerald-500 text-white shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                    : "bg-zinc-100 text-zinc-400 border border-zinc-200"
                }`}
                animate={
                  i < checkedSteps
                    ? { scale: [1, 1.25, 1] }
                    : { scale: 1 }
                }
                transition={{ duration: 0.3 }}
              >
                {i < checkedSteps ? "✓" : (i + 1)}
              </m.div>
              <span
                className={`text-[9px] whitespace-nowrap transition-colors duration-300 ${
                  i < checkedSteps
                    ? "text-emerald-600 font-semibold"
                    : "text-zinc-400"
                }`}
              >
                {step}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 h-px -mt-3 relative overflow-hidden">
                <div className="absolute inset-0 bg-zinc-200" />
                <m.div
                  className="absolute inset-y-0 left-0 bg-emerald-400"
                  initial={{ width: 0 }}
                  animate={{ width: i < checkedSteps - 1 ? "100%" : "0%" }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {checkedSteps >= steps.length && (
        <m.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[10px] text-emerald-600 font-semibold mt-3"
        >
          ✓ Vše dodáno v termínu
        </m.div>
      )}
    </div>
  );
});

/* ═══════════════════════════════════════════════════════════════
   MICRO-UI: CHART  (Konverzní partnerství)
   Vexx  → Bars growing up with bounce
   Běžná → Declining red bars
   ═══════════════════════════════════════════════════════════════ */

const ChartMicroUI = React.memo(function ChartMicroUI({ isVexx }: { isVexx: boolean }) {
  const vexxData = [30, 45, 55, 70, 85, 95];
  const badData = [70, 55, 40, 35, 25, 18];
  const data = isVexx ? vexxData : badData;
  const maxHeight = 60; // px

  const months = ["Led", "Úno", "Bře", "Dub", "Kvě", "Čer"];

  return (
    <div
      className={`w-full h-28 rounded-xl p-4 select-none overflow-hidden ${
        isVexx
          ? "bg-white border border-zinc-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
          : "bg-zinc-100 border border-zinc-200/60"
      }`}
    >
      <div className="flex items-end justify-between gap-1.5 h-[60px]">
        {data.map((value, i) => {
          const height = (value / 100) * maxHeight;
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <m.div
                className={`w-full rounded-t-sm ${
                  isVexx
                    ? "bg-gradient-to-t from-blue-500 to-indigo-400 shadow-[0_-2px_8px_rgba(59,130,246,0.15)]"
                    : "bg-red-300/50"
                }`}
                initial={{ height: 0 }}
                animate={{ height }}
                transition={
                  isVexx
                    ? {
                        duration: 0.6,
                        delay: i * 0.1,
                        type: "spring",
                        stiffness: 200,
                        damping: 12,
                      }
                    : { duration: 0.4, delay: i * 0.05 }
                }
              />
            </div>
          );
        })}
      </div>

      {/* Month labels */}
      <div className="flex justify-between mt-1.5">
        {months.map((month) => (
          <span
            key={month}
            className={`text-[8px] flex-1 text-center ${
              isVexx ? "text-zinc-400" : "text-zinc-300"
            }`}
          >
            {month}
          </span>
        ))}
      </div>

      {/* Trend indicator */}
      <div className="mt-1">
        {isVexx ? (
          <m.div
            className="text-[10px] font-semibold text-emerald-600"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            ↗ +217% konverze
          </m.div>
        ) : (
          <m.div
            className="text-[10px] text-red-400/60"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            ↘ klesající trend
          </m.div>
        )}
      </div>
    </div>
  );
});

/* ═══════════════════════════════════════════════════════════════
   TILT CARD  — 3D mouse-track on hover (Vexx only)
   ═══════════════════════════════════════════════════════════════ */

const TiltCard = React.memo(function TiltCard({
  children,
  isVexx,
  index,
}: {
  children: React.ReactNode;
  isVexx: boolean;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateXSpring = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [5, -5]),
    { stiffness: 300, damping: 22 }
  );
  const rotateYSpring = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-5, 5]),
    { stiffness: 300, damping: 22 }
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isVexx) return; // No tilt in boring mode
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY, isVexx]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <m.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isVexx ? rotateXSpring : 0,
        rotateY: isVexx ? rotateYSpring : 0,
        transformStyle: "preserve-3d",
        perspective: 800,
        willChange: "transform, opacity",
        transform: "translateZ(0)",
      }}
      initial={{ opacity: 0, y: 30, scale: 0.97, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -10, scale: 0.97, filter: "blur(6px)" }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={`relative overflow-hidden transition-shadow duration-500 cursor-default group ${
        isVexx
          ? "p-7 lg:p-8 rounded-3xl bg-white border border-zinc-100/80 shadow-[0_8px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_60px_rgba(59,130,246,0.1)]"
          : "p-6 lg:p-7 rounded-2xl bg-zinc-100/80 border border-zinc-200/40 shadow-none"
      }`}
    >
      {/* Hover glow — Vexx only */}
      {isVexx && (
        <m.div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-600 pointer-events-none"
          style={{
            background:
              "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59,130,246,0.04), transparent 60%)",
          }}
        />
      )}

      {/* Top edge gradient — Vexx only */}
      {isVexx && (
        <div className="absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-blue-300/30 to-transparent" />
      )}

      <div className="relative z-10">{children}</div>
    </m.div>
  );
});

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const vexxFeatures = [
  {
    title: "Next.js & Škálovatelnost",
    desc: "Moderní architektura stavěná na bleskovou rychlost a prémiový dojem.",
    MicroUI: TerminalMicroUI,
  },
  {
    title: "Psychologický Copywriting",
    desc: "Texty, které čtou myšlenky vašich klientů a nutí je kliknout na 'Poptat'.",
    MicroUI: CopywritingMicroUI,
  },
  {
    title: "Extrémní spolehlivost",
    desc: "Jasný proces, naprostá transparentnost. Deadline je u nás svatý.",
    MicroUI: TimelineMicroUI,
  },
  {
    title: "Konverzní partnerství",
    desc: "Spuštěním to začíná. Měříme, analyzujeme a optimalizujeme pro maximalizaci obratu.",
    MicroUI: ChartMicroUI,
  },
];

const badFeatures = [
  {
    title: "Levné šablony",
    desc: "Pomalé WordPress weby, které vypadají jako tisíce dalších. Žádná unikátní identita.",
    MicroUI: TerminalMicroUI,
  },
  {
    title: "Slepý text",
    desc: "Texty, které jen popisují firmu, ale neřeší problém zákazníka. Nuda, která neprodává.",
    MicroUI: CopywritingMicroUI,
  },
  {
    title: "Dlouhé dodání",
    desc: "Měsíce čekání bez jasného harmonogramu. Komunikace, která vázne.",
    MicroUI: TimelineMicroUI,
  },
  {
    title: "Opuštění po spuštění",
    desc: "Odevzdají kód a zmizí. Žádná analýza konverzí nebo další optimalizace.",
    MicroUI: ChartMicroUI,
  },
];

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export default function Comparison() {
  const [isVexx, setIsVexx] = useState(true);

  const features = isVexx ? vexxFeatures : badFeatures;

  return (
    <section
      id="comparison"
      className="relative py-24 lg:py-36 overflow-hidden"
      style={{ backgroundColor: "#F8F9FA" }}
    >
      {/* Ambient blurs */}
      <m.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: isVexx ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute top-[15%] right-[-8%] w-[550px] h-[550px] bg-blue-400/[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-[5%] left-[-5%] w-[450px] h-[450px] bg-indigo-400/[0.035] rounded-full blur-[100px]" />
      </m.div>
      <m.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: isVexx ? 0 : 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute top-[25%] left-[5%] w-[500px] h-[500px] bg-red-400/[0.025] rounded-full blur-[120px]" />
      </m.div>

      <div className="container mx-auto px-6 lg:px-12 max-w-6xl relative z-10">
        {/* ── Header ── */}
        <div className="text-center mb-14 lg:mb-18">
          <h2 className="text-[2rem] md:text-[3rem] lg:text-[3.25rem] font-bold tracking-tight text-[#111] leading-[1.08] mb-6">
            Proč si za weby od Vexx.{" "}
            <br className="hidden md:block" />
            klienti{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#4F46E5]">
              rádi připlatí?
            </span>
          </h2>
          <p className="text-lg md:text-xl text-zinc-500 font-light max-w-2xl mx-auto leading-relaxed">
            Rozdíl mezi investicí do růstu a vyhozenými penězi za šablonu.
          </p>
        </div>

        {/* ── Animated Pill Toggle ── */}
        <div className="flex justify-center mb-14 lg:mb-18">
          <div className="relative flex p-1.5 bg-white/80 rounded-full border border-zinc-200/50 shadow-[0_2px_20px_rgba(0,0,0,0.04)] backdrop-blur-sm">
            {/* Sliding pill background */}
            <m.div
              layoutId="comparison-pill"
              className={`absolute top-1.5 bottom-1.5 rounded-full shadow-sm ${
                isVexx
                  ? "bg-white border border-blue-200/50 shadow-[0_4px_20px_rgba(59,130,246,0.12)]"
                  : "bg-white border border-red-200/40 shadow-[0_4px_20px_rgba(239,68,68,0.08)]"
              }`}
              animate={{
                left: isVexx ? "50%" : "6px",
                right: isVexx ? "6px" : "50%",
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
            />

            <button
              onClick={() => setIsVexx(false)}
              className={`relative px-7 md:px-11 py-3.5 text-sm md:text-[15px] rounded-full transition-colors duration-300 z-10 cursor-pointer ${
                !isVexx
                  ? "text-red-600 font-bold"
                  : "text-zinc-400 hover:text-zinc-500 font-medium"
              }`}
            >
              Běžná agentura
            </button>

            <button
              onClick={() => setIsVexx(true)}
              className={`relative px-7 md:px-11 py-3.5 text-sm md:text-[15px] rounded-full transition-colors duration-300 z-10 cursor-pointer ${
                isVexx
                  ? "text-blue-600 font-bold"
                  : "text-zinc-400 hover:text-zinc-500 font-medium"
              }`}
            >
              Vexx. Přístup
            </button>
          </div>
        </div>

        {/* ── Cards Grid ── */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <m.div
              key={isVexx ? "vexx" : "bad"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6"
            >
              {features.map((feature, idx) => (
                <TiltCard
                  key={`${isVexx}-${idx}`}
                  isVexx={isVexx}
                  index={idx}
                >
                  <div className="flex flex-col gap-4">
                    {/* Micro-UI visual */}
                    <feature.MicroUI isVexx={isVexx} />

                    {/* Title */}
                    <h3
                      className={`text-xl lg:text-2xl font-bold tracking-tight transition-colors duration-300 ${
                        isVexx ? "text-[#111]" : "text-zinc-500"
                      }`}
                    >
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p
                      className={`text-base lg:text-lg font-light leading-relaxed transition-colors duration-300 ${
                        isVexx ? "text-zinc-500" : "text-zinc-400"
                      }`}
                    >
                      {feature.desc}
                    </p>
                  </div>
                </TiltCard>
              ))}
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
