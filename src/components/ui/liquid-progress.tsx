"use client";
import * as React from "react";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";

export interface LoaderLiquidProgressProps {
  progress?: number;
  height?: number;
  color?: string;
  duration?: number;
  className?: string;
}

export function LoaderLiquidProgress({
  className,
  progress = 0,
  height = 8,
  color = "#3b82f6", // default blue
  duration = 1,
}: LoaderLiquidProgressProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-full bg-zinc-100",
        className,
      )}
      style={{ height }}
    >
      <m.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `linear-gradient(90deg, ${color}, ${color}dd)`,
        }}
        initial={{ x: "-100%" }}
        animate={{ x: `${progress - 100}%` }}
        transition={{
          duration,
          ease: "easeOut",
        }}
      >
        <m.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${color}44, transparent)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      </m.div>
    </div>
  );
}
