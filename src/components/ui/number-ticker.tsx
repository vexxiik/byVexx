"use client";

import NumberFlow, { type Value } from "@number-flow/react";
import { cn } from "@/lib/utils";

type NumberTickerProps = {
  value: Value;
  label?: string;
  decimals?: number;
  className?: string;
};

export default function NumberTicker({
  value,
  label,
  decimals = 0,
  className,
}: NumberTickerProps) {
  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
      </span>
      <NumberFlow
        value={value}
        format={{
          notation: "standard",
          compactDisplay: "short",
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }}
        className="tracking-tight"
      />
      {label && (
        <span className="text-zinc-400 font-medium tracking-wide">
          {label}
        </span>
      )}
    </div>
  );
}
