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

    let copywritingSkill = "";
    let mktEmailSkill = "";
    try {
      copywritingSkill = fs.readFileSync(path.join(process.cwd(), "public", "copywriting", "SKILL.md"), "utf-8");
      mktEmailSkill = fs.readFileSync(path.join(process.cwd(), "public", "mkt-email-sequence", "SKILL.md"), "utf-8");
    } catch (e) {
      console.warn("Could not load SKILL.md files", e);
    }
    
    // Generate email content with AI
    const systemPrompt = `Vygeneruj POUZE 2 personalizované věty pro firmu ${lead.companyName} (obor: ${lead.category}, město: ${lead.city}). 
ZÁSADNÍ PRAVIDLO PRO OSLOVENÍ: E-mail MUSÍ začínat vždy pouze slovy "Dobrý den,". Nikdy nevkládej název firmy přímo do oslovení (žádné "Dobrý den, Topení David Havlas").
Název firmy, obor a město zmiň zcela přirozeně až uvnitř první a druhé věty (např. 'Narazil jsem na vaši firmu X a zaujaly mě vaše služby v oblasti Y v lokalitě Z.'). 
Druhá věta musí jemně naznačit problém (např. 'Všiml jsem si ale, že váš potenciál na internetu brzdí chybějící nebo zastaralý web.'). 
NIKDY neskloňuj název firmy. Nevytvářej žádný další text, generuj striktně pouze tyto 2 věty.`;

    const { object: emailData } = await generateObject({
      model: groq("openai/gpt-oss-120b"),
      schema: z.object({
        subject: z.string().describe("Úderný předmět e-mailu pro maximální open-rate"),
        hook: z.string().describe("2 personalizované věty (B2B oslovení a naznačení problému)"),
      }),
      prompt: systemPrompt,
    });

    const fullText = `${emailData.hook}

Jmenuji se Jakub Sokol a založil jsem webovou agenturu Vexx. Mým cílem je pomáhat poctivým firmám k tomu, aby na internetu působily přesně tak spolehlivě a profesionálně, jak reálně pracují.

Protože Vexx teprve spouštím a potřebuji vybudovat exkluzivní portfolio, hledám pouze první 3 klienty pro dlouhodobou spolupráci. Rozhodl jsem se vás proto oslovit s nabídkou, kterou vám žádná jiná agentura na trhu nedá.

Vytvoříme vám kompletní, moderní a rychlý web za bezkonkurenční, zlomkovou cenu. Získáte nejen luxusní vizitku, ale především technologické řešení, které za vás bude stabilně generovat poptávky.

Kde je háček?
Žádný není. Tato extrémně nízká cena existuje pouze proto, že se jedná o striktně limitovanou zaváděcí akci. Mám jedinou podmínku – po spuštění webu bych váš projekt rád využil jako referenční případovou studii na svém portfoliu. Vy získáte prémiové řešení s minimální investicí, já silnou referenci pro další růst. Je to naprosto férový obchod.

Abych vám ukázal, že to s vámi myslím vážně, rovnou jsem pro vás připravil konkrétní řešení na míru.

Zobrazit vaše technologické řešení: ${pitchUrl}

Tento e-mail jsem napsal přímo pro vás, nejedná se o žádný automatický spam a odkaz je 100% bezpečný. Pokud pro vás nabídka aktuálně nedává smysl, stačí e-mail ignorovat. 

S přátelským pozdravem,
Jakub Sokol
Zakladatel Vexx.`;

    const fullHtml = `
<div style="background-color: #FAFAFA; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; border: 1px solid #eaeaea; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
    <div style="padding: 30px; text-align: center; border-bottom: 1px solid #eaeaea;">
      <h1 style="margin: 0; color: #000000; font-weight: bold; font-size: 24px; letter-spacing: -0.5px;"><span style="color: #000000 !important; text-decoration: none;">Vexx.</span></h1>
    </div>
    <div style="padding: 40px 30px; color: #333333; font-size: 16px; line-height: 1.6;">
      <p>${emailData.hook}</p>
      
      <p>Jmenuji se Jakub Sokol a založil jsem webovou agenturu <strong>Vexx</strong>. Mým cílem je pomáhat poctivým firmám k tomu, aby na internetu působily přesně tak spolehlivě a profesionálně, jak reálně pracují.</p>
      
      <p>Protože Vexx teprve spouštím a potřebuji vybudovat exkluzivní portfolio, hledám <strong>pouze první 3 klienty</strong> pro dlouhodobou spolupráci. Rozhodl jsem se vás proto oslovit s nabídkou, kterou vám žádná jiná agentura na trhu nedá.</p>
      
      <p><strong>Co získáte?</strong><br>Vytvoříme vám kompletní, moderní a rychlý web za <strong>bezkonkurenční, zlomkovou cenu</strong>. Získáte nejen luxusní vizitku, ale především technologické řešení, které za vás bude stabilně generovat poptávky.</p>
      
      <p><strong>Kde je háček?</strong><br>Žádný není. Tato extrémně nízká cena existuje POUZE PROTO, že se jedná o striktně limitovanou zaváděcí akci. Mám jedinou podmínku – po úspěšném spuštění webu bych váš projekt rád využil jako referenční <em>případovou studii</em> na svém portfoliu. Vy získáte prémiové řešení s minimální investicí, já silnou referenci pro další růst. Fér obchod.</p>
      
      <p>Abych vám ukázal, že to s vámi myslím vážně, rovnou jsem pro vás připravil konkrétní <strong>řešení na míru</strong>.</p>
    </div>
    <div style="padding: 30px; text-align: center; background-color: #fcfcfc; border-top: 1px solid #eaeaea;">
      <a href="${pitchUrl}" style="display: inline-block; background: #18181b; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 500;">Zobrazit vaše technologické řešení</a>
      
      <p style="font-size: 13px; color: #666; margin-top: 30px; text-align: left; line-height: 1.5;">Tento e-mail jsem napsal přímo pro vás, nejedná se o žádný automatický spam a odkaz je 100% bezpečný. Pokud pro vás nabídka aktuálně nedává smysl, stačí tento e-mail ignorovat.</p>
      
      <p style="font-size: 13px; color: #666; margin-bottom: 0; text-align: left; line-height: 1.5;">S přátelským pozdravem,<br><strong style="color: #333;">Jakub Sokol</strong><br>Zakladatel Vexx.</p>
    </div>
  </div>
</div>`;

    // Send email using Resend if not in dry run
    if (!isDryRun && resendKey) {
      const resend = new Resend(resendKey);
      
      const { data, error } = await resend.emails.send({
        from: "Jakub z Vexx <jakub@vexx.cz>",
        to: [lead.email],
        subject: emailData.subject,
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
        lastEmailBody: isDryRun ? `[TEST - NEODESLÁNO]\nPředmět: ${emailData.subject}\n\n${fullText}` : `Předmět: ${emailData.subject}\n\n${fullText}`
      }
    });

    return { success: true, message: isDryRun ? "Vygenerováno (Test)" : "E-mail úspěšně odeslán.", body: isDryRun ? `[TEST - NEODESLÁNO]\nPředmět: ${emailData.subject}\n\n${fullText}` : `Předmět: ${emailData.subject}\n\n${fullText}` };

  } catch (error: any) {
    console.error("Email campaign error:", error);
    return { success: false, error: error.message || "Neočekávaná chyba při generování nebo odesílání." };
  }
}
