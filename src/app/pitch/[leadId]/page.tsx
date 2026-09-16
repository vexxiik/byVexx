import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProposalTracker from "./ProposalTracker";
import { CheckCircle2, Rocket, Code2 } from "lucide-react";

export default async function PitchPage({ params }: { params: Promise<{ leadId: string }> }) {
  const resolvedParams = await params;
  const lead = await prisma.lead.findUnique({ where: { id: resolvedParams.leadId } });
  
  if (!lead) return notFound();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-blue-500/30">
      <ProposalTracker leadId={lead.id} />
      
      <div className="max-w-4xl mx-auto px-6 py-24">
        {/* Header */}
        <div className="mb-20 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-blue-400 mb-6">
            Exkluzivní návrh spolupráce
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-br from-white to-white/50 bg-clip-text text-transparent">
            Moderní webové řešení pro<br/>{lead.companyName}
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Vážený kliente {lead.city ? `z lokality ${lead.city}` : ""}, připravili jsme pro vás návrh, jak posunout vaši digitální prezentaci na další úroveň a získat více zákazníků.
          </p>
        </div>

        {/* Startovací balíček */}
        <div className="bg-[#111] rounded-3xl border border-white/10 p-8 md:p-12 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-32 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
          
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <Rocket className="text-blue-500" /> Startovací balíček moderního webu
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 relative z-10">
            <div className="space-y-6">
              {[
                "Prémiový design na míru",
                "Dokonalé zobrazení na mobilech (Responsive)",
                "Základní SEO optimalizace pro Google",
                "Rychlost načítání pod 1 vteřinu",
                "Kontaktní formulář a propojení na mapy"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <CheckCircle2 className="size-6 text-green-500 shrink-0" />
                  <span className="text-gray-300 text-lg">{item}</span>
                </div>
              ))}
            </div>
            
            <div className="bg-black/50 p-8 rounded-2xl border border-white/5 flex flex-col justify-center items-center text-center">
              <Code2 className="size-12 text-gray-500 mb-4" />
              <h3 className="text-xl font-medium mb-2">Technologický stack</h3>
              <p className="text-gray-400 text-sm mb-6">Používáme ty nejmodernější technologie (Next.js, React, Tailwind) pro maximální výkon.</p>
              <a href={`tel:${lead.phone}`} className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-gray-200 transition-colors text-center inline-block">
                Mám zájem - Zavolat zpět
              </a>
            </div>
          </div>
        </div>
        
        <div className="text-center text-gray-500 text-sm">
          Navrženo s &hearts; agenturou Vexx.
        </div>
      </div>
    </div>
  );
}
