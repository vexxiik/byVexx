"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { generateText, generateObject } from "ai";
import { groq } from "@ai-sdk/groq";
import { Resend } from "resend";
import { z } from "zod";
import fs from "fs";
import path from "path";

export async function generateAndSendEmail(leadId: string, isDryRun: boolean = true) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { id: true, resendApiKey: true }
    });

    const resendKey = user?.resendApiKey || process.env.RESEND_API_KEY;

    if (!isDryRun && !resendKey) {
      return { success: false, error: "Nemáte nastavený Resend API klíč pro odesílání e-mailů." };
    }

    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
    });

    if (!lead) {
      return { success: false, error: "Lead nenalezen" };
    }

    if (!lead.email) {
      return { success: false, error: "Lead nemá vyplněný e-mail." };
    }

    const pitchUrl = `https://vexx.cz/navrh/${lead.id}`;
    const companySlug = lead.companyName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    const displayUrl = `vexx.cz/navrh/${companySlug}`;

    const subject = `Zvýšení online viditelnosti pro ${lead.category} v lokalitě ${lead.city}`;
    
    const fullText = `Dobrý den,

narazil jsem na vaši firmu ${lead.companyName} a všiml si, že nemáte ideálně vyřešený web. Každý měsíc tak pravděpodobně přicházíte o zakázky z Googlu na úkor konkurence.

Jmenuji se Jakub Sokol a zakládám digitální agenturu Vexx. Abych rychle vybudoval exkluzivní portfolio, hledám nyní první 3 klienty, kterým vytvořím prémiový web za zlomek běžné ceny (za 7 500 Kč místo běžných 35 000 Kč).

Háček je jediný – až vám web začne generovat zakázky, chtěl bych vás použít jako referenci.

Abych ukázal, že to myslím vážně, rovnou jsem pro vás zpracoval návrh vašeho budoucího webu: ${pitchUrl} Zkuste si ho rozkliknout, ať vidíte, o čem mluvím.

Pokud vám to dává smysl, stačí odepsat a probereme detaily.

Jakub Sokol, Zakladatel Vexx.`;

    const fullHtml = `
<div style="background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #111111; font-size: 15px; line-height: 1.5; text-align: left;">
  <p style="margin: 0 0 1em 0;">Dobrý den,</p>
  
  <p style="margin: 0 0 1em 0;">narazil jsem na vaši firmu ${lead.companyName} a všiml si, že nemáte ideálně vyřešený web. Každý měsíc tak pravděpodobně přicházíte o zakázky z Googlu na úkor konkurence.</p>
  
  <p style="margin: 0 0 1em 0;">Jmenuji se Jakub Sokol a zakládám digitální agenturu Vexx. Abych rychle vybudoval exkluzivní portfolio, hledám nyní první 3 klienty, kterým vytvořím prémiový web za zlomek běžné ceny (za 7&nbsp;500&nbsp;Kč místo běžných 35&nbsp;000&nbsp;Kč).</p>
  
  <p style="margin: 0 0 1em 0;">Háček je jediný – až vám web začne generovat zakázky, chtěl bych vás použít jako referenci.</p>
  
  <p style="margin: 0 0 1em 0;">Abych ukázal, že to myslím vážně, rovnou jsem pro vás zpracoval návrh vašeho budoucího webu: <a href="${pitchUrl}" style="color: #0056b3; text-decoration: underline;">${displayUrl}</a>. Zkuste si ho rozkliknout, ať vidíte, o čem mluvím.</p>
  
  <p style="margin: 0 0 1em 0;">Pokud vám to dává smysl, stačí odepsat a probereme detaily.</p>
  
  <p style="margin: 0;">
    Jakub Sokol,<br>
    Zakladatel Vexx.
  </p>
  <div style="opacity: 0; height: 0; width: 0; overflow: hidden; font-size: 0px; color: transparent; line-height: 0;">
    anti-trim-${Date.now()}-${Math.random().toString(36).substring(2, 9)}
  </div>
</div>`;

    // Send email using Resend if not in dry run
    if (!isDryRun && resendKey) {
      const resend = new Resend(resendKey);
      
      const { data, error } = await resend.emails.send({
        from: "Jakub z Vexx <jakub@vexx.cz>",
        to: [lead.email],
        subject: subject,
        text: fullText,
        html: fullHtml,
      });

      if (error) {
        console.error("[RESEND ERROR DETAILS]:", error);
        return { success: false, error: `Chyba Resend: ${error.message || 'Neznámá chyba'}` };
      }
    }

    // Update lastEmailedAt and lastEmailBody
    await prisma.lead.update({
      where: { id: lead.id },
      data: { 
        lastEmailedAt: new Date(),
        lastEmailBody: isDryRun ? `[TEST - NEODESLÁNO]\nPředmět: ${subject}\n\n${fullText}` : `Předmět: ${subject}\n\n${fullText}`
      }
    });

    return { success: true, message: isDryRun ? "Vygenerováno (Test)" : "E-mail úspěšně odeslán.", body: isDryRun ? `[TEST - NEODESLÁNO]\nPředmět: ${subject}\n\n${fullText}` : `Předmět: ${subject}\n\n${fullText}` };

  } catch (error: any) {
    console.error("Email campaign error:", error);
    return { success: false, error: error.message || "Neočekávaná chyba při generování nebo odesílání." };
  }
}
