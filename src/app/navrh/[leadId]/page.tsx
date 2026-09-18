import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProposalTracker from "./ProposalTracker";
import ReferralButton from "./ReferralButton";
import {
  HeroSection,
  PainSection,
  BentoSection,
  GodfatherOffer,
  StatsSection,
  FinalCTA,
} from "./PitchAnimations";

export default async function PitchPage({ params }: { params: Promise<{ leadId: string }> }) {
  const resolvedParams = await params;
  let lead = await prisma.lead.findUnique({ where: { id: resolvedParams.leadId } });
  
  if (!lead) {
    // Fallback: Pokus o vyhledání podle slugu firmy (kvůli plain-text emailům)
    const recentLeads = await prisma.lead.findMany({
      take: 2000,
      orderBy: { createdAt: 'desc' }
    });
    
    const match = recentLeads.find(l => {
      const slug = l.companyName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      return slug === resolvedParams.leadId;
    });
    
    if (match) {
      lead = match;
    } else {
      return notFound();
    }
  }

  return (
    <div className="min-h-[100dvh] bg-white text-zinc-900 font-sans selection:bg-blue-500/20 relative">
      {/* Invisible tracker */}
      <ProposalTracker leadId={lead.id} />

      {/* 1. Hero — Personalized */}
      <HeroSection
        companyName={lead.companyName}
        city={lead.city}
        category={lead.category}
      />

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="h-px bg-zinc-100" />
      </div>

      {/* 2. Pain Points */}
      <div className="pt-20 md:pt-28">
        <PainSection />
      </div>

      {/* 3. Bento Grid — Benefits */}
      <BentoSection companyName={lead.companyName} city={lead.city} category={lead.category} />

      {/* 4. Godfather Offer */}
      <GodfatherOffer phone="+420604256988" />

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="h-px bg-zinc-100" />
      </div>

      {/* 5. Social Proof Stats */}
      <div className="pt-20 md:pt-28">
        <StatsSection />
      </div>

      {/* 6. Final CTA + Referral */}
      <FinalCTA phone="+420604256988" leadId={lead.id} />

      {/* Secondary CTA — Referral (portfolio) */}
      <div className="relative z-10 pb-12 px-6 flex justify-center -mt-16">
        <ReferralButton leadId={lead.id} />
      </div>

      {/* 7. Footer */}
      <footer className="pb-12 pt-8 text-center">
        <p className="text-sm text-zinc-300 font-medium">
          Navrženo s &hearts; agenturou Vexx
          <span className="text-blue-500">.</span>
        </p>
      </footer>
    </div>
  );
}
