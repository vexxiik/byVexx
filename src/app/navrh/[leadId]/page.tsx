import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProposalTracker from "./ProposalTracker";
import ReferralButton from "./ReferralButton";
import { CheckCircle2, Rocket, Code2, ArrowRight } from "lucide-react";

export default async function PitchPage({ params }: { params: Promise<{ leadId: string }> }) {
  const resolvedParams = await params;
  const lead = await prisma.lead.findUnique({ where: { id: resolvedParams.leadId } });
  
  if (!lead) return notFound();

  return (
    <div className="min-h-[100dvh] bg-[#FAFAFA] text-zinc-900 font-sans selection:bg-blue-500/30 relative overflow-hidden">
      {/* Subtle noise texture */}
      <div className="absolute inset-0 z-0 opacity-[0.015] pointer-events-none mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Global subtle ambient breathing glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#4F46E5]/[0.03] blur-[150px] pointer-events-none animate-pulse mix-blend-multiply -z-10" style={{ animationDuration: '10s', willChange: 'transform, opacity' }}></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#3b82f6]/[0.03] blur-[150px] pointer-events-none animate-pulse mix-blend-multiply -z-10" style={{ animationDuration: '15s', animationDelay: '2s', willChange: 'transform, opacity' }}></div>

      <ProposalTracker leadId={lead.id} />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24">
        {/* Header */}
        <div className="mb-20 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-zinc-200 text-sm font-medium text-blue-600 mb-6 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Váš nový digitální standard
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-zinc-900">
            Web, který pro <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{lead.companyName}</span> pracuje 24/7
          </h1>
          <p className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed">
            {lead.city ? `Působíte v lokalitě ${lead.city} a zasloužíte si` : "Zasloužíte si"} web, který nejen skvěle vypadá, ale hlavně <strong className="font-semibold text-zinc-700">generuje poptávky</strong>. Připravili jsme řešení přesně pro vás.
          </p>
        </div>

        {/* Startovací balíček */}
        <div className="bg-white rounded-3xl border border-zinc-200 p-8 md:p-12 mb-16 relative overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          {/* Card Background & Decorative Elements */}
          <div className="absolute inset-0 bg-white/60 backdrop-blur-3xl" />
          <div className="absolute top-0 right-0 p-32 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" style={{ willChange: 'transform' }} />
          
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-zinc-900">
            <div className="p-2 bg-blue-50 rounded-xl">
              <Rocket className="text-blue-600 size-6" />
            </div>
            Vše, co potřebujete pro úspěch online
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 relative z-10">
            <div className="space-y-6">
              {[
                "Prémiový design, který vás odliší od konkurence",
                "Bezchybné zobrazení na všech telefonech a tabletech",
                "Základní SEO pro lepší pozice ve vyhledávačích",
                "Bleskové načítání pod 1 vteřinu pro maximální konverze",
                "Chytrý kontaktní formulář pro snadný sběr poptávek"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <CheckCircle2 className="size-6 text-blue-600 shrink-0 mt-0.5" />
                  <span className="text-zinc-700 text-lg leading-snug">{item}</span>
                </div>
              ))}
            </div>
            
            <div className="bg-zinc-50 p-8 rounded-2xl border border-zinc-200 flex flex-col justify-center items-center text-center shadow-inner">
              <Code2 className="size-10 text-zinc-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-zinc-900">Technologická špička</h3>
              <p className="text-zinc-500 text-sm mb-8 leading-relaxed">
                Stavíme na moderních technologiích (Next.js, React), které pro svůj chod využívají i světové značky. Zajišťují <strong className="font-medium text-zinc-700">maximální rychlost a bezpečnost</strong>.
              </p>
              
              {/* Premium CTA Button */}
              <a
                href={`tel:${lead.phone}`}
                className="group relative flex items-center justify-center gap-2 h-14 px-8 rounded-full overflow-hidden transition-transform active:scale-95 w-full"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 rounded-full opacity-70 group-hover:opacity-100 blur transition-opacity duration-500" />
                <div className="absolute inset-0 bg-[#111] rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] group-hover:shadow-[0_8px_30px_rgba(59,130,246,0.25)] transition-shadow duration-500" />
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                </div>
                <span className="relative z-10 text-sm tracking-wide text-white font-medium">
                  Probrat možnosti spolupráce
                </span>
                <ArrowRight className="relative z-10 w-4 h-4 text-white group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              <span className="text-xs text-zinc-400 mt-4">Zavolejte nám ještě dnes</span>
            </div>
          </div>
        </div>

        {/* 2. Prodejní sekce (Referral/Sales) */}
        <div className="mb-20 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
          <div className="bg-white rounded-3xl border border-zinc-200 p-10 md:p-16 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" style={{ willChange: 'transform' }} />
            <div className="absolute top-10 right-10 w-32 h-32 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" style={{ willChange: 'transform' }} />
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-zinc-900 tracking-tight relative z-10">
              Přesvědčte se o naší práci na vlastní oči
            </h2>
            <p className="text-lg text-zinc-500 max-w-2xl mx-auto leading-relaxed mb-10 relative z-10">
              Neříkáme jen, že děláme weby lépe. My vám to ukážeme. Podívejte se na naše reálné výsledky, reference spokojených klientů a projekty, které už nyní dominují svému trhu.
            </p>
            
            <div className="relative z-10">
              <ReferralButton leadId={lead.id} />
            </div>
          </div>
        </div>
        
        <div className="text-center text-zinc-400 text-sm font-medium">
          Navrženo s &hearts; agenturou Vexx.
        </div>
      </div>
    </div>
  );
}
