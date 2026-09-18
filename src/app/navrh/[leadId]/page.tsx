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
  const lead = await prisma.lead.findUnique({ where: { id: resolvedParams.leadId } });
  
  if (!lead) return notFound();

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
      <GodfatherOffer phone={lead.phone} />

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="h-px bg-zinc-100" />
      </div>

      {/* 5. Social Proof Stats */}
      <div className="pt-20 md:pt-28">
        <StatsSection />
      </div>

      {/* 6. Final CTA + Referral */}
      <FinalCTA phone={lead.phone} leadId={lead.id} />

      {/* Secondary CTA — Referral (portfolio) */}
      <div className="pb-12 px-6 flex justify-center -mt-8">
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
