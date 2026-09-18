"use client";

import { useState } from "react";
import { trackReferralClickAction } from "@/app/actions/leads";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ReferralButton({ leadId }: { leadId: string }) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setIsPending(true);
    try {
      await trackReferralClickAction(leadId);
    } catch (e) {
      console.error(e);
    } finally {
      router.push("/");
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="group inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full border border-zinc-200 bg-white text-zinc-600 text-sm font-medium hover:border-zinc-300 hover:text-zinc-900 transition-all duration-200 active:scale-[0.97] disabled:opacity-50"
      style={{
        transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
      }}
    >
      <span>
        {isPending ? "Přesměrovávám..." : "Prohlédnout si naše portfolio"}
      </span>
      {!isPending && (
        <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-600 group-hover:translate-x-0.5 transition-all duration-200" />
      )}
    </button>
  );
}
