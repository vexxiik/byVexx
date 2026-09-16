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
      // Záměrně nepoužíváme standardní 'a href', 
      // abychom měli jistotu, že se zavolá tracking.
      // Přesměrujeme na hlavní stránku Vexx (relativní cesta `/` pro stejný projekt).
      router.push("/");
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="group relative flex items-center justify-center gap-2 h-14 px-10 mx-auto rounded-full overflow-hidden transition-transform active:scale-95 w-full sm:w-auto"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 rounded-full opacity-70 group-hover:opacity-100 blur transition-opacity duration-500" />
      <div className="absolute inset-0 bg-[#111] rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] group-hover:shadow-[0_8px_30px_rgba(59,130,246,0.25)] transition-shadow duration-500" />
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
      </div>
      <span className="relative z-10 text-base tracking-wide text-white font-medium">
        {isPending ? "Přesměrovávám..." : "Prohlédnout si naše portfolio"}
      </span>
      {!isPending && <ArrowRight className="relative z-10 w-5 h-5 text-white group-hover:translate-x-1 transition-transform duration-300" />}
    </button>
  );
}
