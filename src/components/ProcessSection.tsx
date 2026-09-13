"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { m, useScroll, useTransform, MotionValue } from "framer-motion";
import {
  Search,
  Layers,
  Terminal,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Zap,
  BarChart3,
  Globe,
  Cpu,
  Eye,
  CheckCircle2,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const steps = [
  {
    num: "01",
    label: "Ponoření & Vize",
    tag: "Discovery",
    text: "Zahodíme nudné dotazníky. Probereme, co váš byznys skutečně palí a najdeme ten nejlepší technický směr pro váš růst.",
    icon: Search,
    accent: "#3B82F6",
    accentLight: "rgba(59,130,246,0.08)",
  },
  {
    num: "02",
    label: "Kreativní Návrh (ZDARMA)",
    tag: "Design",
    text: "Než si plácneme, připravím vám ukázkový grafický koncept zdarma. Chci, abyste hned od začátku věděli, že si vizuálně i lidsky sedneme.",
    icon: Layers,
    accent: "#8B5CF6",
    accentLight: "rgba(139,92,246,0.08)",
  },
  {
    num: "03",
    label: "Precizní Vývoj",
    tag: "Development",
    text: "Přetavím design v extrémně rychlý, škálovatelný kód. Čistá architektura, moderní technologie a nekompromisní optimalizace.",
    icon: Terminal,
    accent: "#111827",
    accentLight: "rgba(17,24,39,0.05)",
  },
  {
    num: "04",
    label: "Start & Akcelerace",
    tag: "Launch",
    text: "Spuštěním to nekončí! Nastavíme analytiku, ukážeme vám, jak s webem pracovat, a zajistíme, aby začal okamžitě generovat výsledky.",
    icon: TrendingUp,
    accent: "#10B981",
    accentLight: "rgba(16,185,129,0.08)",
  },
];

/* ─────────────────────────────────────────────────────────────
   VISUAL 01 — DISCOVERY: Living mind-map / constellation
───────────────────────────────────────────────────────────── */
function DiscoveryVisual() {
  const nodes = [
    { label: "Cíle", x: 50, y: 28, size: 52, icon: Eye },
    { label: "Trh", x: 22, y: 50, size: 44, icon: Globe },
    { label: "Tech Stack", x: 78, y: 48, size: 44, icon: Cpu },
    { label: "Konkurence", x: 36, y: 76, size: 40, icon: BarChart3 },
    { label: "UX", x: 66, y: 74, size: 40, icon: Sparkles },
  ];

  // Connection lines between nodes
  const connections = [
    [0, 1], [0, 2], [0, 3], [0, 4], [1, 3], [2, 4],
  ];

  return (
    <div className="relative w-full h-full bg-[#FAFBFF] flex items-center justify-center overflow-hidden">
      {/* Subtle dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(59,130,246,0.12)_1px,transparent_1px)] bg-[size:28px_28px]" />
      
      {/* Ambient glow */}
      <m.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[300px] h-[300px] bg-blue-400/10 rounded-full blur-[80px]"
      />

      {/* SVG connections */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {connections.map(([a, b], i) => (
          <m.line
            key={i}
            x1={nodes[a].x} y1={nodes[a].y}
            x2={nodes[b].x} y2={nodes[b].y}
            stroke="rgba(59,130,246,0.12)"
            strokeWidth="0.3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: i * 0.3, ease: "easeOut" }}
          />
        ))}
        {/* Animated pulse travelling along first connection */}
        {connections.slice(0, 3).map(([a, b], i) => (
          <m.circle
            key={`pulse-${i}`}
            r="0.8"
            fill="#3B82F6"
            initial={{ opacity: 0 }}
            animate={{
              cx: [nodes[a].x, nodes[b].x],
              cy: [nodes[a].y, nodes[b].y],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      {/* Floating node cards */}
      {nodes.map((node, i) => {
        const Icon = node.icon;
        return (
          <m.div
            key={i}
            animate={{
              y: [0, i % 2 === 0 ? -8 : 8, 0],
              x: [0, i % 3 === 0 ? 4 : -4, 0],
            }}
            transition={{
              duration: 5 + i * 0.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              width: node.size,
              height: node.size,
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
          >
            <div className="w-full h-full bg-white rounded-2xl shadow-[0_4px_20px_rgba(59,130,246,0.1)] border border-blue-100/60 flex flex-col items-center justify-center gap-1 group hover:shadow-[0_8px_30px_rgba(59,130,246,0.18)] transition-shadow duration-500 cursor-default">
              <Icon className="w-4 h-4 text-blue-500" />
              <span className="text-[8px] font-bold text-zinc-500 tracking-wide uppercase">{node.label}</span>
            </div>
          </m.div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   VISUAL 02 — DESIGN: Interactive layer-stack with 3D depth
───────────────────────────────────────────────────────────── */
function DesignVisual() {
  const layers = [
    { label: "Navigation", color: "#F3E8FF", border: "#C4B5FD", y: 0 },
    { label: "Hero Section", color: "#EDE9FE", border: "#A78BFA", y: 0 },
    { label: "Content Grid", color: "#DDD6FE", border: "#8B5CF6", y: 0 },
    { label: "CTA Footer", color: "#C4B5FD", border: "#7C3AED", y: 0 },
  ];

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-[#FAFAFE] to-[#F5F0FF] flex items-center justify-center overflow-hidden">
      {/* Background radial */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(139,92,246,0.06),transparent_65%)]" />

      <div className="relative z-10" style={{ perspective: 800 }}>
        <m.div
          animate={{ rotateX: [18, 22, 18], rotateY: [-8, -4, -8] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
          className="flex flex-col items-center"
        >
          {layers.map((layer, i) => (
            <m.div
              key={i}
              animate={{ y: [0, i % 2 === 0 ? -3 : 3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
              style={{
                transformStyle: "preserve-3d",
                transform: `translateZ(${(layers.length - i) * 18}px)`,
              }}
              className="mb-[-2px]"
            >
              <div
                className="w-[260px] h-[52px] rounded-xl flex items-center px-4 gap-3 shadow-sm"
                style={{
                  background: layer.color,
                  border: `1px solid ${layer.border}`,
                  boxShadow: `0 ${4 + i * 2}px ${12 + i * 4}px rgba(139,92,246,${0.04 + i * 0.02})`,
                }}
              >
                <div className="w-5 h-5 rounded-md" style={{ background: layer.border, opacity: 0.4 }} />
                <span className="text-xs font-semibold text-violet-700">{layer.label}</span>
                <div className="ml-auto flex gap-1.5">
                  <div className="w-8 h-1.5 rounded-full" style={{ background: layer.border, opacity: 0.25 }} />
                  <div className="w-5 h-1.5 rounded-full" style={{ background: layer.border, opacity: 0.15 }} />
                </div>
              </div>
            </m.div>
          ))}
        </m.div>
      </div>

      {/* ZDARMA badge */}
      <m.div
        animate={{ y: [0, -6, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[14%] right-[12%] z-20 px-3.5 py-1.5 bg-white rounded-xl border border-violet-200 shadow-[0_8px_24px_rgba(139,92,246,0.12)]"
      >
        <span className="text-xs font-black text-violet-600 tracking-wide">ZDARMA 🎁</span>
      </m.div>

      {/* Color palette dots */}
      <m.div
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[16%] left-[10%] flex gap-2"
      >
        {["#8B5CF6", "#A78BFA", "#C4B5FD", "#DDD6FE"].map((c, i) => (
          <div key={i} className="w-5 h-5 rounded-full border-2 border-white shadow-sm" style={{ background: c }} />
        ))}
      </m.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   VISUAL 03 — DEV: Live terminal with real-time build output
───────────────────────────────────────────────────────────── */
function DevVisual() {
  const [visibleLines, setVisibleLines] = useState(0);

  const terminalLines = [
    { text: "$ next build", color: "#7EE787" },
    { text: "  ✓ Compiled successfully", color: "#A5D6FF" },
    { text: "  ✓ Linting passed", color: "#A5D6FF" },
    { text: "  ✓ Type checking", color: "#A5D6FF" },
    { text: "  ✓ Collecting page data", color: "#A5D6FF" },
    { text: "  ✓ Generating static pages (4/4)", color: "#A5D6FF" },
    { text: "  ✓ Finalizing optimization", color: "#A5D6FF" },
    { text: "", color: "#C9D1D9" },
    { text: "Route    Size    First Load JS", color: "#8B949E" },
    { text: "┌ /      1.2 kB    64.2 kB", color: "#C9D1D9" },
    { text: "├ /_app  0 B       63.0 kB", color: "#C9D1D9" },
    { text: "└ /api   0 B       63.0 kB", color: "#C9D1D9" },
    { text: "", color: "#C9D1D9" },
    { text: "  ● First Load JS: 64.2 kB", color: "#7EE787" },
    { text: "  ● Lighthouse: 100/100", color: "#7EE787" },
  ];

  useEffect(() => {
    if (visibleLines >= terminalLines.length) {
      const timer = setTimeout(() => setVisibleLines(0), 3000);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setVisibleLines((v) => v + 1), 200);
    return () => clearTimeout(timer);
  }, [visibleLines, terminalLines.length]);

  return (
    <div className="relative w-full h-full bg-[#0D1117] flex items-center justify-center overflow-hidden">
      {/* Noise */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200px] h-[100px] bg-blue-500/10 blur-[60px] rounded-full" />

      <m.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 w-[90%] max-w-[360px] bg-[#161B22] rounded-2xl border border-white/[0.08] shadow-[0_30px_80px_rgba(0,0,0,0.6)] overflow-hidden"
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-[#1C2128]">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
          <span className="ml-auto text-[10px] text-zinc-600 font-mono tracking-wider">Terminal</span>
        </div>

        {/* Terminal output */}
        <div className="p-4 font-mono text-[11px] leading-[1.8] h-[260px] overflow-hidden">
          {terminalLines.slice(0, visibleLines).map((line, i) => (
            <m.div
              key={`${visibleLines > terminalLines.length ? "r" : ""}${i}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              style={{ color: line.color }}
              className="whitespace-pre"
            >
              {line.text || "\u00A0"}
            </m.div>
          ))}
          {/* Blinking cursor */}
          <m.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="inline-block w-2 h-3 bg-blue-400 mt-1"
          />
        </div>

        {/* Status bar */}
        <div className="px-4 py-2 bg-blue-600/90 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-3 h-3 text-white" />
            <span className="text-[10px] text-white/80 font-mono">Next.js 16</span>
          </div>
          <span className="text-[10px] text-white/60 font-mono">Turbopack</span>
        </div>
      </m.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   VISUAL 04 — LAUNCH: Real-time analytics dashboard
───────────────────────────────────────────────────────────── */
function LaunchVisual() {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-[#FAFFFE] to-[#ECFDF5] flex items-center justify-center overflow-hidden p-6">
      {/* Ambient */}
      <m.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[250px] h-[250px] bg-emerald-400/15 rounded-full blur-[70px]"
      />

      <div className="relative z-10 w-full max-w-[340px] flex flex-col gap-3">
        {/* Top row: Two metric cards */}
        <div className="flex gap-3">
          {/* Revenue card */}
          <m.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="flex-1 bg-white rounded-2xl border border-emerald-100 shadow-[0_8px_30px_rgba(16,185,129,0.06)] p-4"
          >
            <div className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase mb-1">Poptávky</div>
            <div className="text-2xl font-black text-zinc-900 tracking-tight">+215%</div>
            <div className="flex items-center gap-1 mt-1">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] font-semibold text-emerald-600">Live</span>
            </div>
          </m.div>

          {/* Conversion card */}
          <m.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="flex-1 bg-white rounded-2xl border border-emerald-100 shadow-[0_8px_30px_rgba(16,185,129,0.06)] p-4"
          >
            <div className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase mb-1">Konverze</div>
            <div className="text-2xl font-black text-zinc-900 tracking-tight">12.4%</div>
            <div className="flex items-center gap-1 mt-1">
              <ArrowRight className="w-3 h-3 text-emerald-500 -rotate-45" />
              <span className="text-[9px] font-semibold text-emerald-600">+3.2%</span>
            </div>
          </m.div>
        </div>

        {/* Chart card */}
        <m.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          className="bg-white rounded-2xl border border-emerald-100 shadow-[0_8px_30px_rgba(16,185,129,0.06)] p-4"
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase">Revenue</span>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+340%</span>
          </div>

          {/* Area chart via SVG */}
          <div className="h-[100px] w-full relative">
            <svg viewBox="0 0 300 100" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Area fill */}
              <m.path
                d="M0,90 Q30,85 60,78 T120,60 T180,45 T240,25 T300,8 L300,100 L0,100 Z"
                fill="url(#chartGradient)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
              />
              {/* Line */}
              <m.path
                d="M0,90 Q30,85 60,78 T120,60 T180,45 T240,25 T300,8"
                fill="none"
                stroke="#10B981"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.5, ease: "easeOut", repeat: Infinity, repeatDelay: 3 }}
              />
              {/* Active dot */}
              <m.circle
                cx="300"
                cy="8"
                r="4"
                fill="#10B981"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.4, delay: 2.5, repeat: Infinity, repeatDelay: 5.1 }}
              />
            </svg>
          </div>

          {/* X axis labels */}
          <div className="flex justify-between mt-2">
            {["Led", "Úno", "Bře", "Dub", "Kvě", "Čer"].map((m) => (
              <span key={m} className="text-[8px] font-semibold text-zinc-300 uppercase tracking-wider">{m}</span>
            ))}
          </div>
        </m.div>

        {/* Checklist */}
        <m.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          className="bg-white rounded-2xl border border-emerald-100 shadow-[0_8px_30px_rgba(16,185,129,0.06)] p-4 flex flex-col gap-2"
        >
          {["Google Analytics", "Conversion Tracking", "A/B Testing"].map((item, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span className="text-[11px] font-semibold text-zinc-700">{item}</span>
            </div>
          ))}
        </m.div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────── */
export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const totalSlides = steps.length;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* Map 0→1 vertical scroll to horizontal translation */
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", `-${(totalSlides - 1) * 100}vw`]
  );

  /* Active step index */
  const activeIndex = useTransform(scrollYProgress, (v: number) =>
    Math.min(Math.round(v * (totalSlides - 1) + 0.01), totalSlides - 1)
  );

  /* Progress bar width */
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const visuals = [
    <DiscoveryVisual key="v1" />,
    <DesignVisual key="v2" />,
    <DevVisual key="v3" />,
    <LaunchVisual key="v4" />,
  ];

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-white"
      style={{ height: isMobile ? "auto" : `${100 * totalSlides}vh` }}
    >
      {/* ── Viewport ── */}
      <div className={isMobile ? "flex flex-col pt-16 gap-16" : "sticky top-0 h-screen overflow-hidden flex flex-col pt-24 z-30"}>

        {/* ── Header with progress ── */}
        <header className="shrink-0 w-full px-6 md:px-16 lg:px-24 pb-2 md:pb-6 flex flex-col gap-6">
          {/* Title row */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 md:gap-0">
            <div>
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-400 mb-2">
                Jak to funguje
              </p>
              <h2 className="text-3xl md:text-[2.5rem] font-bold tracking-tight text-[#111] leading-[1.15]">
                Proces tvorby{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
                  webu na míru.
                </span>
              </h2>
            </div>

            {/* Step pills */}
            <ProgressPills activeIndex={activeIndex} />
          </div>

          {/* Thin progress bar */}
          <div className="hidden md:block w-full h-[2px] bg-zinc-100 rounded-full overflow-hidden">
            <m.div
              style={{ width: progressWidth }}
              className="h-full bg-gradient-to-r from-blue-500 via-violet-500 to-emerald-500 rounded-full"
            />
          </div>
        </header>

        {/* ── Horizontal/Vertical slide track ── */}
        <m.div
          style={{ x: isMobile ? 0 : x }}
          className={`flex will-change-transform flex-1 ${isMobile ? "flex-col gap-12 pb-12" : ""}`}
        >
          {steps.map((step, i) => (
            <SlidePanel key={i} step={step} index={i} visual={visuals[i]} isMobile={isMobile} />
          ))}
        </m.div>
      </div>
    </div>
  );
}

/* ── Progress pills ── */
function ProgressPills({ activeIndex }: { activeIndex: MotionValue<number> }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    return activeIndex.on("change", (v: number) => setActive(v));
  }, [activeIndex]);

  return (
    <div className="hidden md:flex items-center gap-1.5">
      {steps.map((s, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <div
            className={`relative flex items-center justify-center w-9 h-9 rounded-full border text-sm font-bold transition-all duration-500 ${
              i === active
                ? "bg-[#111] text-white border-[#111] shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
                : i < active
                ? "bg-zinc-100 text-zinc-500 border-zinc-200"
                : "bg-white text-zinc-400 border-zinc-200"
            }`}
          >
            {i < active ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <span className="text-xs">{s.num}</span>
            )}
          </div>
          {i < steps.length - 1 && (
            <div
              className={`w-5 h-[2px] rounded-full transition-colors duration-500 ${
                i < active ? "bg-zinc-800" : "bg-zinc-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Single slide panel ── */
function SlidePanel({
  step,
  index,
  visual,
  isMobile,
}: {
  step: (typeof steps)[0];
  index: number;
  visual: React.ReactNode;
  isMobile?: boolean;
}) {
  const Icon = step.icon;

  return (
    <div className={`shrink-0 w-full md:w-[100vw] ${isMobile ? "h-auto" : "h-full"} flex items-center px-6 md:px-16 lg:px-24 gap-12 lg:gap-20`}>
      {/* Left – Text */}
      <div className="flex-1 max-w-lg flex flex-col justify-center">
        {/* Tag chip */}
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center border"
            style={{ background: step.accentLight, borderColor: `${step.accent}20` }}
          >
            <Icon className="w-5 h-5" style={{ color: step.accent }} />
          </div>
          <span
            className="text-[11px] font-bold tracking-[0.18em] uppercase"
            style={{ color: step.accent }}
          >
            {step.tag}
          </span>
        </div>

        {/* Number + Title */}
        <div className="flex items-baseline gap-4 md:gap-5 mb-4 md:mb-5">
          <span
            className="text-[4.5rem] md:text-[7rem] font-black leading-none tracking-tighter select-none"
            style={{ color: step.accent, opacity: 0.15 }}
          >
            {step.num}
          </span>
          <h3 className="text-[1.5rem] md:text-[2.2rem] font-bold tracking-tight text-[#111] leading-[1.15]">
            {step.label}
          </h3>
        </div>

        {/* Body */}
        <p className="text-[1rem] md:text-[1.05rem] text-zinc-500 font-light leading-relaxed mb-8 md:mb-10 max-w-md">
          {step.text}
        </p>

        {/* CTA */}
        {index < steps.length - 1 ? (
          <div className="hidden md:flex items-center gap-2.5 text-sm font-semibold text-zinc-400">
            <m.div
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center gap-2"
            >
              <span>Scrolluj dál</span>
              <ArrowRight className="w-4 h-4" />
            </m.div>
          </div>
        ) : (
          <a
            href="#contact"
            className="inline-flex items-center gap-2 self-start px-7 py-3.5 rounded-full font-bold text-white text-sm shadow-[0_8px_24px_rgba(16,185,129,0.25)] hover:shadow-[0_12px_32px_rgba(16,185,129,0.35)] hover:scale-[1.03] transition-all duration-300"
            style={{ background: `linear-gradient(135deg, ${step.accent}, #059669)` }}
          >
            Začít spolupráci
            <ArrowRight className="w-4 h-4" />
          </a>
        )}
      </div>

      {/* Right – Visual */}
      <div className="hidden md:flex flex-1 max-w-[540px] h-[65%] max-h-[460px] rounded-[2rem] overflow-hidden border border-black/[0.04] shadow-[0_24px_64px_rgba(0,0,0,0.04)]">
        {visual}
      </div>
    </div>
  );
}
