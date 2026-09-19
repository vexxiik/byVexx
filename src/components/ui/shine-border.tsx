"use client";

import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ShineBorderProps = {
  children: ReactNode;
  className?: string;
  borderWidth?: number;
  duration?: number;
  gradient?: string;
};

export default function ShineBorder({
  children,
  className,
  borderWidth = 1.5,
  duration = 3,
  gradient = "from-emerald-400 via-teal-400 to-emerald-400",
}: ShineBorderProps) {
  return (
    <>
      <style>{`
        @keyframes shine-scan {
          0% { mask-position: 0% -100%; -webkit-mask-position: 0% -100%; }
          100% { mask-position: 0% 200%; -webkit-mask-position: 0% 200%; }
        }
        .animate-shine-scan {
          mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 25%, transparent 40%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 25%, transparent 40%);
          mask-size: 100% 300%;
          -webkit-mask-size: 100% 300%;
          animation: shine-scan var(--duration, 3s) linear infinite;
        }
      `}</style>
      <div
        className={cn(
          "relative rounded-2xl overflow-hidden p-(--bw)",
          className,
        )}
        style={{ "--bw": `${borderWidth}px` } as React.CSSProperties}
      >
        {/* Animated Scanner Layer */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 rounded-2xl border border-zinc-200 pointer-events-none -z-10" />
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-b animate-shine-scan opacity-80 blur-[1px]",
              gradient,
            )}
            style={{ "--duration": `${duration}s` } as React.CSSProperties}
          />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 rounded-2xl bg-white h-full border border-zinc-100 shadow-sm flex flex-col justify-between">
          {children}
        </div>
      </div>
    </>
  );
}
