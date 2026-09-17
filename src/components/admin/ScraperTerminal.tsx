"use client";

import { useEffect, useRef } from "react";
import { Terminal } from "lucide-react";
import { m } from "framer-motion";

interface ScraperTerminalProps {
  logs: string[];
  isScraping: boolean;
}

export default function ScraperTerminal({ logs, isScraping }: ScraperTerminalProps) {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div className="bg-[#0a0a0a] rounded-2xl shadow-xl border border-gray-800 overflow-hidden flex flex-col h-full min-h-[400px]">
      {/* Terminal Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-[#111] border-b border-gray-800">
        <Terminal className="size-4 text-gray-400" />
        <span className="text-xs font-mono text-gray-400 font-medium">Scraper Terminal</span>
        <div className="ml-auto flex items-center gap-2">
          {isScraping && (
            <span className="flex items-center gap-2 text-xs font-mono text-green-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              BĚŽÍ
            </span>
          )}
          {!isScraping && logs.length > 0 && (
            <span className="text-xs font-mono text-gray-500">DOKONČENO</span>
          )}
          {!isScraping && logs.length === 0 && (
            <span className="text-xs font-mono text-gray-500">PŘIPRAVENO</span>
          )}
        </div>
      </div>

      {/* Terminal Content */}
      <div className="p-4 overflow-y-auto font-mono text-[13px] leading-relaxed flex-1 space-y-1">
        {logs.length === 0 ? (
          <div className="text-gray-600 h-full flex items-center justify-center italic">
            Čekám na spuštění těžby...
          </div>
        ) : (
          logs.map((log, index) => {
            // Barevné odlišení logů podle obsahu
            let textColor = "text-green-400";
            if (log.includes("❌")) textColor = "text-red-400";
            if (log.includes("✅")) textColor = "text-emerald-300";
            if (log.includes("==================")) textColor = "text-gray-500";
            
            return (
              <m.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className={textColor}
              >
                {log}
              </m.div>
            );
          })
        )}
        <div ref={endOfMessagesRef} className="h-1" />
      </div>
    </div>
  );
}
