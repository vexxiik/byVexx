"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   ABSTRACT VISUAL ELEMENTS (replace boring static icons)
───────────────────────────────────────────────────────────── */

/** Pulsing concentric rings — signals "broken / stale" */
function BrokenPulse() {
  return (
    <div className="relative w-14 h-14 flex items-center justify-center">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-red-300/40"
          style={{ width: 20 + i * 14, height: 20 + i * 14 }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0.15, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
        />
      ))}
      <div className="w-4 h-4 rounded-full bg-red-400/80 shadow-[0_0_12px_rgba(239,68,68,0.4)]" />
    </div>
  );
}

/** Rotating broken square — signals "fragmented" */
function FragmentedSquare() {
  return (
    <div className="relative w-14 h-14 flex items-center justify-center">
      <motion.div
        animate={{ rotate: [0, 90, 90, 180], opacity: [0.7, 0.3, 0.7, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="w-8 h-8 border-2 border-dashed border-red-300 rounded-lg"
      />
      <motion.div
        animate={{ rotate: [45, -45, 45] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-4 h-4 bg-red-200/60 rounded-sm"
      />
    </div>
  );
}

/** Decaying signal bar — signals "degrading over time" */
function DecayingSignal() {
  return (
    <div className="relative w-14 h-14 flex items-end justify-center gap-1 pb-3">
      {[28, 20, 14, 8].map((h, i) => (
        <motion.div
          key={i}
          className="w-2 rounded-t-sm bg-red-300/60"
          animate={{ height: [h, h * 0.3, h], opacity: [0.8, 0.2, 0.8] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/** Fading ghost circle — signals "abandoned" */
function GhostCircle() {
  return (
    <div className="relative w-14 h-14 flex items-center justify-center">
      <motion.div
        className="w-10 h-10 rounded-full border-2 border-red-300/50"
        animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-5 h-5 rounded-full bg-red-200/40"
        animate={{ opacity: [0.5, 0.1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/** Breathing diamond — signals "precision / speed" */
function BreathingDiamond() {
  return (
    <div className="relative w-14 h-14 flex items-center justify-center">
      <motion.div
        className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg shadow-[0_0_20px_rgba(59,130,246,0.3)]"
        animate={{ rotate: [45, 45, 45], scale: [0.9, 1.05, 0.9] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-12 h-12 border border-blue-300/30 rounded-lg rotate-45"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.1, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      />
    </div>
  );
}

/** Magnetic crosshair — signals "targeting" */
function MagneticCrosshair() {
  return (
    <div className="relative w-14 h-14 flex items-center justify-center">
      <motion.div
        className="absolute w-10 h-10 rounded-full border border-blue-400/40"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-5 h-[1.5px] bg-blue-400/60"
        animate={{ scaleX: [1, 1.3, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute h-5 w-[1.5px] bg-blue-400/60"
        animate={{ scaleY: [1, 1.3, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
      />
      <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
    </div>
  );
}

/** Synced orbiting dots — signals "reliability" */
function SyncedOrbit() {
  return (
    <div className="relative w-14 h-14 flex items-center justify-center">
      <motion.div
        className="absolute w-10 h-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)]" />
      </motion.div>
      <motion.div
        className="absolute w-10 h-10"
        animate={{ rotate: -360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.6)]" />
      </motion.div>
      <div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500" />
    </div>
  );
}

/** Rising arrow stack — signals "growth / acceleration" */
function RisingArrows() {
  return (
    <div className="relative w-14 h-14 flex items-center justify-center overflow-hidden">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: 14 + i * 8 }}
          animate={{ y: [20, -20], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.5, ease: "easeOut" }}
        >
          <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
            <path d="M5 14V2M5 2L1 6M5 2L9 6" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   TILTABLE CARD (3D mouse-track on hover)
───────────────────────────────────────────────────────────── */
function TiltCard({
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

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 20 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const glowColor = isVexx ? "rgba(59,130,246,0.06)" : "rgba(239,68,68,0.04)";
  const borderColor = isVexx ? "border-blue-100/50" : "border-red-100/40";
  const hoverShadow = isVexx
    ? "hover:shadow-[0_20px_50px_rgba(59,130,246,0.08)]"
    : "hover:shadow-[0_20px_50px_rgba(239,68,68,0.06)]";

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`relative p-8 lg:p-10 rounded-[2rem] border bg-white transition-shadow duration-500 cursor-default ${borderColor} ${hoverShadow} shadow-[0_8px_30px_rgba(0,0,0,0.03)] group`}
    >
      {/* Inner glow on hover */}
      <div
        className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${glowColor}, transparent 60%)` }}
      />

      {/* Edge highlight line */}
      <div
        className={`absolute top-0 left-8 right-8 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
          isVexx
            ? "bg-gradient-to-r from-transparent via-blue-300/40 to-transparent"
            : "bg-gradient-to-r from-transparent via-red-300/30 to-transparent"
        }`}
      />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const badFeatures = [
  {
    title: "Levné šablony",
    desc: "Pomalé WordPress weby, které vypadají jako tisíce dalších. Žádná unikátní identita.",
    visual: <BrokenPulse />,
  },
  {
    title: "Slepý text",
    desc: "Texty, které jen popisují firmu, ale neřeší problém zákazníka. Nuda, která neprodává.",
    visual: <FragmentedSquare />,
  },
  {
    title: "Dlouhé dodání",
    desc: "Měsíce čekání bez jasného harmonogramu. Komunikace, která vázne.",
    visual: <DecayingSignal />,
  },
  {
    title: "Opuštění po spuštění",
    desc: "Odevzdají kód a zmizí. Žádná analýza konverzí nebo další optimalizace.",
    visual: <GhostCircle />,
  },
];

const vexxFeatures = [
  {
    title: "Next.js & Škálovatelnost",
    desc: "Moderní architektura stavěná na bleskovou rychlost a prémiový dojem.",
    visual: <BreathingDiamond />,
  },
  {
    title: "Psychologický Copywriting",
    desc: "Texty, které čtou myšlenky vašich klientů a nutí je kliknout na 'Poptat'.",
    visual: <MagneticCrosshair />,
  },
  {
    title: "Extrémní spolehlivost",
    desc: "Jasný proces, naprostá transparentnost. Deadline je u nás svatý.",
    visual: <SyncedOrbit />,
  },
  {
    title: "Konverzní partnerství",
    desc: "Spuštěním to začíná. Měříme, analyzujeme a optimalizujeme pro maximalizaci obratu.",
    visual: <RisingArrows />,
  },
];

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────── */
export default function Comparison() {
  const [isVexx, setIsVexx] = useState(true);

  const features = isVexx ? vexxFeatures : badFeatures;

  return (
    <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
      {/* Ambient background shift */}
      <motion.div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        animate={{ opacity: isVexx ? 1 : 0 }}
      >
        <div className="absolute top-[20%] right-[-5%] w-[500px] h-[500px] bg-blue-400/[0.03] rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-indigo-400/[0.03] rounded-full blur-[100px]" />
      </motion.div>
      <motion.div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        animate={{ opacity: isVexx ? 0 : 1 }}
      >
        <div className="absolute top-[30%] left-[10%] w-[400px] h-[400px] bg-red-400/[0.025] rounded-full blur-[100px]" />
      </motion.div>

      <div className="container mx-auto px-6 lg:px-12 max-w-[85rem] relative z-10">
        {/* ── Header ── */}
        <div className="text-center mb-14 lg:mb-16">
          <h2 className="text-[2rem] md:text-[3rem] font-bold tracking-tight text-[#111] leading-[1.1] mb-6">
            Proč si za weby od Vexx.{" "}
            <br className="hidden md:block" />
            klienti{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              rádi připlatí?
            </span>
          </h2>
          <p className="text-lg md:text-xl text-zinc-500 font-light max-w-2xl mx-auto">
            Rozdíl mezi investicí do růstu a vyhozenými penězi za šablonu.
          </p>
        </div>

        {/* ── Toggle Switch ── */}
        <div className="flex justify-center mb-14 lg:mb-16">
          <div className="relative flex p-1.5 bg-zinc-50 rounded-full border border-zinc-200/60">
            <button
              onClick={() => setIsVexx(false)}
              className={`relative px-6 md:px-10 py-3 text-sm md:text-[15px] rounded-full transition-colors duration-300 z-10 ${
                !isVexx ? "text-red-600 font-bold" : "text-zinc-400 hover:text-zinc-600 font-medium"
              }`}
            >
              Běžná agentura
            </button>

            <button
              onClick={() => setIsVexx(true)}
              className={`relative px-6 md:px-10 py-3 text-sm md:text-[15px] rounded-full transition-colors duration-300 z-10 ${
                isVexx ? "text-blue-600 font-bold" : "text-zinc-400 hover:text-zinc-600 font-medium"
              }`}
            >
              Vexx. Přístup
            </button>

            {/* Sliding pill */}
            <motion.div
              layout
              className={`absolute top-1.5 bottom-1.5 rounded-full border shadow-sm ${
                isVexx
                  ? "bg-white border-blue-200/60 shadow-[0_4px_14px_rgba(59,130,246,0.08)]"
                  : "bg-white border-red-200/50 shadow-[0_4px_14px_rgba(239,68,68,0.06)]"
              }`}
              animate={{
                left: isVexx ? "50%" : "6px",
                right: isVexx ? "6px" : "50%",
              }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
            />
          </div>
        </div>

        {/* ── Cards Grid ── */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={isVexx ? "vexx" : "bad"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6"
            >
              {features.map((feature, idx) => (
                <TiltCard key={`${isVexx}-${idx}`} isVexx={isVexx} index={idx}>
                  <div className="flex flex-col gap-5">
                    {/* Animated visual element */}
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                        isVexx ? "bg-blue-50/80" : "bg-red-50/60"
                      }`}
                    >
                      {feature.visual}
                    </div>

                    {/* Title */}
                    <h3
                      className={`text-xl lg:text-2xl font-bold tracking-tight ${
                        isVexx ? "text-[#111]" : "text-zinc-700"
                      }`}
                    >
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-base lg:text-lg text-zinc-500 font-light leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </TiltCard>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
