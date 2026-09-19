"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { Globe } from "lucide-react"

interface SafariProps {
  url?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function SafariMockup({ url = "vasedomena.cz", className, children }: SafariProps) {
  return (
    <div
      className={cn(
        "w-full rounded-xl border border-zinc-200/60 bg-white shadow-sm overflow-hidden flex flex-col",
        className
      )}
    >
      {/* Browser top bar */}
      <div className="flex items-center px-3 py-2.5 bg-[#f5f5f5] border-b border-zinc-200/60">
        <div className="flex items-center space-x-1.5 shrink-0">
          <span className="w-2.5 h-2.5 bg-[#FF5F56] rounded-full border border-[#E0443E]/50" />
          <span className="w-2.5 h-2.5 bg-[#FFBD2E] rounded-full border border-[#DEA123]/50" />
          <span className="w-2.5 h-2.5 bg-[#27C93F] rounded-full border border-[#1AAB29]/50" />
        </div>
        <div className="flex-1 ml-4 mr-10 bg-white border border-zinc-200 rounded-md h-6 flex items-center justify-center gap-1.5 shadow-sm">
           <Globe className="w-3 h-3 text-zinc-400" />
           <span className="text-[11px] font-medium text-zinc-600 tracking-wide">{url}</span>
        </div>
      </div>

      {/* Preview area */}
      <div className="bg-zinc-50 flex-1 relative overflow-hidden flex items-center justify-center min-h-[120px]">
        {children}
      </div>
    </div>
  )
}
