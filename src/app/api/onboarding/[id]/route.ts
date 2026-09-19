import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    if (!id) {
      return NextResponse.json({ error: "Chybí ID klienta" }, { status: 400 });
    }

    const body = await req.json();
    
    // We update the lead with the onboarding data
    // and also change the status to IN_PROGRESS.
    const lead = await prisma.lead.update({
      where: { id },
      data: {
        billingName: body.companyName || "",
        ico: body.ico || "",
        billingAddress: body.address || "",
        phone: body.phone || undefined, // Only update if provided
        email: body.email || undefined,
        
        domainStatus: body.domainOption || "",
        domainNameOrIdea: body.domainOption === "yes" ? body.existingDomain : body.domainIdeas,
        
        servicesDescription: body.services || "",
        whyUsDescription: body.advantages || "",
        pricingStrategy: body.pricingOption || "",
        references: body.references || "",
        
        onboardingCompleted: true,
        status: "IN_PROGRESS" // Switch status to in progress
      },
    });

    return NextResponse.json({ success: true, lead });
  } catch (error: any) {
    console.error("[ONBOARDING_API_ERROR]", error);
    return NextResponse.json(
      { error: "Neočekávaná chyba při ukládání podkladů." },
      { status: 500 }
    );
  }
}
