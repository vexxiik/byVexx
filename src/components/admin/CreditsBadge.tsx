"use client";

import { cn } from "@/lib/utils";
import { Coins } from "lucide-react";

export default function CreditsBadge({ credits }: { credits: number }) {
  const formattedCredits = credits.toLocaleString("cs-CZ");

  return (
    <div className={cn(
      "flex items-center gap-2.5 pl-2.5 pr-4 py-2 rounded-2xl",
      "bg-white border border-gray-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]",
      "hover:shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.06)] transition-shadow duration-300"
    )}>
      {/* Coin icon */}
      <div className="size-8 flex items-center justify-center rounded-xl bg-gradient-to-b from-emerald-50 to-emerald-100/80 border border-emerald-200/60">
        <Coins className="size-4 text-emerald-600" />
      </div>
      
      {/* Balance */}
      <div className="flex flex-col leading-none gap-0.5">
        <span className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">Kredity</span>
        <span className="text-[15px] font-bold tabular-nums tracking-tight text-gray-900">
          {formattedCredits}
        </span>
      </div>
    </div>
  );
}
