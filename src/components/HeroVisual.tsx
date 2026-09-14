'use client';

import React, { useEffect, useState, useRef } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   EDGE GLARE — Conic-gradient hover border (preserved)
   ═══════════════════════════════════════════════════════════════ */
function EdgeGlare() {
  return (
    <div className="absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10">
      <div className="absolute inset-[0px] rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]">
        <m.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] aspect-square bg-[conic-gradient(from_0deg,transparent_75%,rgba(59,130,246,0.9)_100%)]"
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CLEAN ANIMATED NUMBER — Minimalist Precision Ticker (Linear/Apple style)
   No flashing colored background boxes, no circus red/green text shifts.
   Pure, clean numeric transitions with crisp tabular alignment.
   ═══════════════════════════════════════════════════════════════ */
const CleanAnimatedNumber = React.memo(function CleanAnimatedNumber({
  value,
  format,
  className = "",
}: {
  value: number;
  format: (v: number) => string;
  className?: string;
}) {
  const previous = useRef(value);
  const [direction, setDirection] = useState<"up" | "down">("up");
  const [changeKey, setChangeKey] = useState(0);

  useEffect(() => {
    if (previous.current !== value) {
      setDirection(value > previous.current ? "up" : "down");
      previous.current = value;
      setChangeKey((k) => k + 1);
    }
  }, [value]);

  const text = format(value);

  return (
    <span className={`relative inline-grid grid-flow-col items-center font-bold tabular-nums select-none ${className}`}>
      <span className="relative inline-grid overflow-hidden">
        <AnimatePresence initial={false} mode="popLayout">
          <m.span
            key={changeKey}
            initial={{
              opacity: 0,
              y: direction === "down" ? "-0.4em" : "0.4em",
            }}
            animate={{ opacity: 1, y: "0em" }}
            exit={{
              opacity: 0,
              y: direction === "down" ? "0.4em" : "-0.4em",
              transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 32,
              mass: 0.5,
            }}
            className="col-start-1 row-start-1"
          >
            {text}
          </m.span>
        </AnimatePresence>
      </span>
    </span>
  );
});

/* ═══════════════════════════════════════════════════════════════
   CARD 1: CONVERSION PERFORMANCE (Main card — full width)
   Professional B2B metrics — no fake revenue numbers
   ═══════════════════════════════════════════════════════════════ */

interface MetricPill {
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  trend: number;
}

const ConversionPerformanceCard = React.memo(function ConversionPerformanceCard() {
  const [metrics, setMetrics] = useState<MetricPill[]>([
    { label: 'Konverzní poměr', value: 4.8, suffix: '%', trend: 12 },
    { label: 'ROAS', value: 6.2, suffix: '×', trend: 18 },
    { label: 'Náklady na lead', value: 127, suffix: ' Kč', prefix: '', trend: -15 },
  ]);

  const [activeMetric, setActiveMetric] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((m) => {
          let delta: number;
          if (m.label === 'Náklady na lead') {
            delta = (Math.random() * 4) - 2;
            return { ...m, value: Math.max(90, Math.min(180, Math.round(m.value + delta))), trend: Math.max(-22, Math.min(-8, m.trend + Math.floor(Math.random() * 3) - 1)) };
          }
          delta = (Math.random() * 0.3) - 0.1;
          const newTrend = Math.max(8, Math.min(25, m.trend + Math.floor(Math.random() * 3) - 1));
          return { ...m, value: Math.round(Math.max(2.5, Math.min(8.5, m.value + delta)) * 10) / 10, trend: newTrend };
        })
      );
    }, 8500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % 3);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const current = metrics[activeMetric];
  const trendIsNegativeGood = current.label === 'Náklady na lead';
  const trendColor = trendIsNegativeGood
    ? (current.trend < 0 ? 'text-emerald-700 bg-emerald-50/70 border-emerald-200/50' : 'text-rose-600 bg-rose-50/70 border-rose-200/50')
    : (current.trend > 0 ? 'text-emerald-700 bg-emerald-50/70 border-emerald-200/50' : 'text-rose-600 bg-rose-50/70 border-rose-200/50');

  return (
    <m.div
      initial={{ opacity: 0, y: 30, rotate: -1 }}
      animate={{ opacity: 1, y: 0, rotate: -0.5 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
      className="animate-float-card-1 group relative w-full bg-white rounded-3xl p-7 shadow-[0_8px_40px_rgba(0,0,0,0.04)] border border-zinc-100 hover:shadow-[0_20px_60px_rgba(37,99,235,0.1)] transition-shadow duration-500"
    >
      <EdgeGlare />
      
      {/* Header */}
      <div className="flex justify-between items-start mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Konverzní výkonnost</span>
          </div>
          <div className="flex items-baseline gap-2">
            <AnimatePresence mode="wait">
              <m.div
                key={activeMetric}
                initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                transition={{ duration: 0.35 }}
                className="flex items-baseline gap-2"
              >
                <CleanAnimatedNumber
                  value={current.value}
                  format={(v) => current.label === 'Náklady na lead' ? `${v}` : `${v.toFixed(1)}`}
                  className="text-4xl lg:text-[2.75rem] tracking-tight text-zinc-900"
                />
                <span className="text-lg font-semibold text-zinc-400">{current.suffix}</span>
              </m.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-colors duration-300 ${trendColor}`}>
            <ArrowUpRight className={`w-3.5 h-3.5 ${trendIsNegativeGood && current.trend < 0 ? 'rotate-90' : ''}`} />
            <span className="tabular-nums font-semibold">
              {current.trend < 0 ? '-' : '+'}{Math.abs(current.trend)}%
            </span>
          </div>
          <span className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider">za 90 dní</span>
        </div>
      </div>

      {/* Metric selector pills */}
      <div className="flex gap-2 mb-4">
        {metrics.map((m, i) => (
          <button
            key={m.label}
            onClick={() => setActiveMetric(i)}
            className={`px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all duration-300 ${
              activeMetric === i
                ? 'bg-zinc-900 text-white shadow-sm'
                : 'bg-zinc-100/80 text-zinc-500 hover:bg-zinc-200/80'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Growth trajectory sparkline */}
      <GrowthTrajectory activeMetric={activeMetric} />
    </m.div>
  );
});

/* ── Growth trajectory sub-component ── */
const GrowthTrajectory = React.memo(function GrowthTrajectory({ activeMetric }: { activeMetric: number }) {
  // Each metric has its own distinct trajectory shape
  const trajectories = [
    // Konverzní poměr — steady climb
    [38, 42, 36, 45, 40, 48, 44, 52, 48, 55, 50, 58, 52, 60, 55, 62],
    // ROAS — steeper growth
    [55, 50, 48, 52, 45, 50, 42, 48, 38, 44, 35, 40, 30, 35, 28, 25],
    // Náklady na lead — descending (good)
    [20, 25, 18, 30, 22, 35, 28, 40, 32, 42, 36, 48, 38, 50, 42, 55],
  ];

  const points = trajectories[activeMetric] || trajectories[0];
  const width = 400;
  const height = 80;
  const step = width / (points.length - 1);

  const pathD = points
    .map((p, i) => {
      const x = i * step;
      const y = p;
      if (i === 0) return `M ${x},${y}`;
      const prev = points[i - 1];
      const cpx1 = (i - 1) * step + step * 0.5;
      const cpx2 = i * step - step * 0.5;
      return `C ${cpx1},${prev} ${cpx2},${y} ${x},${y}`;
    })
    .join(' ');

  const fillD = `${pathD} L ${width},${height} L 0,${height} Z`;
  const lastX = (points.length - 1) * step;
  const lastY = points[points.length - 1];

  // Color per metric
  const colors = [
    { stroke: '#3B82F6', fill: '#3B82F6', dot: '#4F46E5' },
    { stroke: '#10B981', fill: '#10B981', dot: '#059669' },
    { stroke: '#F59E0B', fill: '#F59E0B', dot: '#D97706' },
  ];
  const c = colors[activeMetric] || colors[0];

  return (
    <div className="relative w-full h-[70px]">
      <AnimatePresence mode="wait">
        <m.div
          key={activeMetric}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`trajFill-${activeMetric}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={c.fill} stopOpacity="0.08" />
                <stop offset="100%" stopColor={c.fill} stopOpacity="0" />
              </linearGradient>
            </defs>

            <m.path
              d={fillD}
              fill={`url(#trajFill-${activeMetric})`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 0.8 }}
            />

            <m.path
              d={pathD}
              fill="none"
              stroke={c.stroke}
              strokeWidth="2"
              strokeLinecap="round"
              strokeOpacity={0.5}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />

            {/* End dot */}
            <m.circle
              cx={lastX}
              cy={lastY}
              r="4"
              fill="#fff"
              stroke={c.dot}
              strokeWidth="2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 1 }}
            />
          </svg>
        </m.div>
      </AnimatePresence>
    </div>
  );
});

/* ═══════════════════════════════════════════════════════════════
   CARD 2: AKVIZIČNÍ FUNNEL (Self-animating pipeline)
   ═══════════════════════════════════════════════════════════════ */
const FunnelCard = React.memo(function FunnelCard() {
  const [metrics, setMetrics] = useState([
    { label: 'Návštěvnost', val: 12400, progress: 100 },
    { label: 'Kliknutí na poptávku', val: 2840, progress: 45, highlight: '+22%' },
    { label: 'Uzavřené dealy', val: 412, progress: 15, highlight: '+8%' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((item) => {
          const delta = Math.floor(Math.random() * Math.max(1, item.val * 0.02));
          const direction = Math.random() > 0.4 ? 1 : -1;
          const newVal = Math.max(100, item.val + delta * direction);

          const highlightNum = item.highlight ? parseInt(item.highlight.replace(/[^0-9]/g, '')) : 0;
          const hDelta = Math.floor(Math.random() * 3) - 1;
          const newHighlight = item.highlight
            ? `+${Math.max(1, highlightNum + hDelta)}%`
            : undefined;

          return {
            ...item,
            val: newVal,
            highlight: newHighlight,
          };
        })
      );
    }, 8500);
    return () => clearInterval(interval);
  }, []);

  return (
    <m.div
      initial={{ opacity: 0, y: 30, rotate: 0.5 }}
      animate={{ opacity: 1, y: 0, rotate: 0.3 }}
      transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
      className="animate-float-card-2 group relative w-full bg-white rounded-3xl p-6 shadow-[0_8px_40px_rgba(0,0,0,0.04)] border border-zinc-100 hover:shadow-[0_20px_60px_rgba(37,99,235,0.1)] transition-shadow duration-500"
    >
      <EdgeGlare />

      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          <span className="text-sm font-semibold text-zinc-900">Akviziční Flow</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-emerald-200/50 bg-emerald-50/50">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-700">Live</span>
        </div>
      </div>

      <div className="space-y-4">
        {metrics.map((item, i) => (
          <div key={item.label} className="relative">
            <div className="flex justify-between items-end text-xs font-semibold text-zinc-600 mb-1.5">
              <span>{item.label}</span>
              <div className="flex items-center gap-2">
                {item.highlight && (
                  <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50/70 px-2 py-0.5 rounded-full border border-emerald-200/50">
                    {item.highlight}
                  </span>
                )}
                <CleanAnimatedNumber
                  value={item.val}
                  format={(v) => v.toLocaleString('cs-CZ')}
                  className="text-sm font-semibold text-zinc-800"
                />
              </div>
            </div>
            <div className="h-2 w-full bg-zinc-100/80 rounded-full overflow-hidden">
              <m.div
                initial={{ width: 0 }}
                animate={{ width: `${item.progress}%` }}
                transition={{ duration: 1.5, delay: 1 + i * 0.2, ease: "easeOut" }}
                className="relative h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 overflow-hidden"
              >
                <m.div
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 + 2 }}
                  className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
              </m.div>
            </div>
          </div>
        ))}
      </div>
    </m.div>
  );
});

/* ═══════════════════════════════════════════════════════════════
   CARD 3: ACTIVITY FEED (Auto-rotating live entries)
   ═══════════════════════════════════════════════════════════════ */
const FEED_ENTRIES = [
  { text: 'Nový lead z Google Ads', color: 'bg-blue-500', time: 'Právě teď' },
  { text: 'Deal uzavřen +45K CZK', color: 'bg-emerald-500', time: 'Před 2m' },
  { text: 'A/B test: var. B +12%', color: 'bg-amber-500', time: 'Před 5m' },
  { text: 'Poptávka z kontakt. form.', color: 'bg-indigo-500', time: 'Před 8m' },
  { text: 'Nová objednávka #1284', color: 'bg-emerald-500', time: 'Před 12m' },
  { text: 'Lead scoring: 92/100', color: 'bg-violet-500', time: 'Před 15m' },
  { text: 'Remarketing: CTR +3.2%', color: 'bg-blue-500', time: 'Před 18m' },
  { text: 'E-mail kampaň: 48% OR', color: 'bg-amber-500', time: 'Před 22m' },
  { text: 'Nový lead z LinkedIn', color: 'bg-blue-600', time: 'Před 25m' },
  { text: 'Deal pipeline: +120K', color: 'bg-emerald-500', time: 'Před 30m' },
];

const ActivityFeedCard = React.memo(function ActivityFeedCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 4;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % FEED_ENTRIES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const visibleEntries = Array.from({ length: visibleCount }, (_, i) => {
    const idx = (currentIndex + i) % FEED_ENTRIES.length;
    return { ...FEED_ENTRIES[idx], key: `${currentIndex}-${i}` };
  });

  return (
    <m.div
      initial={{ opacity: 0, y: 30, rotate: 1 }}
      animate={{ opacity: 1, y: 0, rotate: 0.5 }}
      transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
      className="animate-float-card-3 group relative w-full bg-white rounded-3xl p-5 shadow-[0_8px_40px_rgba(0,0,0,0.04)] border border-zinc-100 hover:shadow-[0_20px_60px_rgba(37,99,235,0.1)] transition-shadow duration-500 overflow-hidden"
    >
      <EdgeGlare />

      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
        </div>
        <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Live Aktivita</span>
      </div>

      <div className="space-y-0 relative min-h-[148px]">
        <AnimatePresence mode="popLayout" initial={false}>
          {visibleEntries.map((entry, i) => (
            <m.div
              key={entry.key}
              layout
              initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
              animate={{ 
                opacity: 1 - i * 0.15, 
                x: 0, 
                filter: "blur(0px)",
              }}
              exit={{ opacity: 0, x: 20, filter: "blur(4px)" }}
              transition={{ 
                duration: 0.45, 
                ease: [0.16, 1, 0.3, 1],
                layout: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
              }}
              className="flex items-center gap-3 py-2 border-b border-zinc-50 last:border-0"
            >
              <div className={`w-1.5 h-1.5 rounded-full ${entry.color} shrink-0`} />
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-medium text-zinc-800 truncate">{entry.text}</p>
              </div>
              <span className="text-[10px] text-zinc-400 font-medium whitespace-nowrap">{entry.time}</span>
            </m.div>
          ))}
        </AnimatePresence>
      </div>
    </m.div>
  );
});

/* ═══════════════════════════════════════════════════════════════
   CARD 4: PERFORMANCE BAR CHART (Interactive mini chart)
   ═══════════════════════════════════════════════════════════════ */
const PERF_DATA = [
  { label: 'LCP', value: 92 },
  { label: 'FID', value: 98 },
  { label: 'CLS', value: 88 },
  { label: 'FCP', value: 95 },
  { label: 'TTI', value: 90 },
  { label: 'SI', value: 85 },
];

const PerformanceChartCard = React.memo(function PerformanceChartCard() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [score, setScore] = useState(98);
  const maxValue = 100;

  useEffect(() => {
    const interval = setInterval(() => {
      setScore((prev) => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        return Math.max(96, Math.min(100, prev + delta));
      });
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  return (
    <m.div
      initial={{ opacity: 0, y: 30, rotate: -1.5 }}
      animate={{ opacity: 1, y: 0, rotate: -0.8 }}
      transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
      className="animate-float-card-4 group relative bg-white rounded-3xl p-5 shadow-[0_8px_40px_rgba(0,0,0,0.04)] border border-zinc-100 hover:shadow-[0_20px_60px_rgba(37,99,235,0.1)] transition-shadow duration-500"
    >
      <EdgeGlare />

      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Web Vitals</span>
        <div className="flex items-baseline gap-1">
          <CleanAnimatedNumber
            value={score}
            format={(v) => `${v}`}
            className="text-2xl tracking-tight text-zinc-900 font-bold"
          />
          <span className="text-xs text-zinc-400 font-semibold">/100</span>
        </div>
      </div>

      {/* Bar Chart */}
      <div
        className="flex items-end gap-[6px] h-20"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {PERF_DATA.map((item, index) => {
          const heightPx = (item.value / maxValue) * 76;
          const isHovered = hoveredIndex === index;
          const isAnyHovered = hoveredIndex !== null;
          const isNeighbor = hoveredIndex !== null && (index === hoveredIndex - 1 || index === hoveredIndex + 1);

          return (
            <div
              key={item.label}
              className="relative flex-1 flex flex-col items-center justify-end h-full cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
            >
              {/* Tooltip */}
              <m.div
                initial={false}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? 0 : 4,
                }}
                transition={{ duration: 0.15 }}
                className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-zinc-900 text-white text-[10px] font-semibold whitespace-nowrap pointer-events-none z-20"
              >
                {item.value}
              </m.div>

              {/* Bar */}
              <m.div
                initial={{ height: 0 }}
                animate={{ height: heightPx }}
                transition={{ duration: 0.8, delay: 1.2 + index * 0.08, ease: "easeOut" }}
                className="w-full rounded-full transition-all duration-200 ease-out origin-bottom"
                style={{
                  background: isHovered
                    ? 'linear-gradient(to top, #3B82F6, #818CF8)'
                    : isNeighbor
                      ? 'rgba(59,130,246,0.3)'
                      : isAnyHovered
                        ? 'rgba(59,130,246,0.1)'
                        : 'rgba(59,130,246,0.2)',
                  transform: isHovered ? 'scaleX(1.2)' : isNeighbor ? 'scaleX(1.05)' : 'scaleX(1)',
                }}
              />

              {/* Label */}
              <span className={`text-[8px] font-semibold mt-1.5 transition-colors duration-200 ${
                isHovered ? 'text-blue-600' : 'text-zinc-400'
              }`}>
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </m.div>
  );
});

/* ═══════════════════════════════════════════════════════════════
   CARD 5: STATUS BEACON (Floating live pill)
   ═══════════════════════════════════════════════════════════════ */
const StatusBeacon = React.memo(function StatusBeacon() {
  const [visitors, setVisitors] = useState(247);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisitors((prev) => {
        const delta = Math.floor(Math.random() * 9) - 4;
        return Math.max(210, Math.min(380, prev + delta));
      });
    }, 7500);
    return () => clearInterval(interval);
  }, []);

  return (
    <m.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
      className="animate-float-card-5"
    >
      <div className="group relative inline-flex items-center gap-3 bg-white rounded-2xl px-5 py-3.5 shadow-[0_8px_40px_rgba(0,0,0,0.04)] border border-zinc-100 hover:shadow-[0_20px_60px_rgba(37,99,235,0.1)] transition-shadow duration-500">
        <EdgeGlare />
        
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">Online</span>
        </div>

        <div className="w-px h-4 bg-zinc-200" />

        <div className="flex items-baseline gap-1.5">
          <CleanAnimatedNumber
            value={visitors}
            format={(v) => v.toString()}
            className="text-base text-zinc-900 font-bold"
          />
          <span className="text-[10px] text-zinc-400 font-medium">návštěvníků</span>
        </div>
      </div>
    </m.div>
  );
});

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPOSITION — "Command Center" Layout
   ═══════════════════════════════════════════════════════════════ */
export default function HeroVisual() {
  return (
    <div className="relative w-full h-auto lg:h-full flex items-center justify-center p-4">
      {/* ── Ambient Glows ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] h-[500px] bg-blue-400/[0.08] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[60%] left-[60%] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-400/[0.06] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[30%] left-[35%] -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-violet-400/[0.05] rounded-full blur-[100px] pointer-events-none" />

      {/* ── Card Composition ── */}
      <div className="relative z-10 w-full max-w-[540px] flex flex-col gap-5">
        
        {/* Row 1: Conversion Performance (full width) */}
        <div className="hidden md:block">
          <ConversionPerformanceCard />
        </div>
        
        {/* Row 2: Funnel + Activity Feed */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="hidden md:block">
            <FunnelCard />
          </div>
          <ActivityFeedCard />
        </div>

        {/* Row 3: Performance Chart + Status Beacon */}
        <div className="hidden md:flex flex-col sm:flex-row items-start sm:items-end gap-5">
          <div className="w-full sm:w-[55%]">
            <PerformanceChartCard />
          </div>
          <div className="w-full sm:w-[45%] flex sm:justify-end">
            <StatusBeacon />
          </div>
        </div>

      </div>
    </div>
  );
}
