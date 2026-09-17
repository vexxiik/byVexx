"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

const BulkLeadIdsSchema = z.object({
  ids: z.array(z.string().cuid()),
});

const UpdateStatusSchema = z.object({
  id: z.string().cuid(),
  status: z.enum(["NEW", "CALLED", "NO_ANSWER", "MEETING", "CLOSED"]),
});

const BulkUpdateStatusSchema = z.object({
  ids: z.array(z.string().cuid()),
  status: z.enum(["NEW", "CALLED", "NO_ANSWER", "MEETING", "CLOSED"]),
});

const UpdateNotesSchema = z.object({
  id: z.string().cuid(),
  notes: z.string().optional(),
  ico: z.string().optional(),
  address: z.string().optional(),
  ceoName: z.string().optional(),
  email: z.string().optional(),
});

/**
 * Zabezpečené smazání jednoho nebo více leadů.
 */
export async function deleteLeadsAction(payload: { ids: string[] }) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  const parsed = BulkLeadIdsSchema.safeParse(payload);
  if (!parsed.success) return { error: "Invalid data" };

  try {
    const res = await prisma.lead.deleteMany({
      where: {
        id: { in: parsed.data.ids },
        userId: session.user.id, // IDOR Ochrana
      },
    });
    revalidatePath("/admin");
    return { success: true, count: res.count };
  } catch (error) {
    return { error: "Failed to delete leads" };
  }
}

/**
 * Zabezpečená změna statusu více leadů najednou.
 */
export async function bulkUpdateStatusAction(payload: { ids: string[]; status: any }) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  const parsed = BulkUpdateStatusSchema.safeParse(payload);
  if (!parsed.success) return { error: "Invalid data" };

  try {
    const res = await prisma.lead.updateMany({
      where: {
        id: { in: parsed.data.ids },
        userId: session.user.id, // IDOR Ochrana
      },
      data: {
        status: parsed.data.status,
      },
    });
    revalidatePath("/admin");
    return { success: true, count: res.count };
  } catch (error) {
    return { error: "Failed to update status" };
  }
}

/**
 * Zabezpečená změna statusu jednoho leadu.
 */
export async function updateLeadStatusAction(payload: { id: string; status: any }) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  const parsed = UpdateStatusSchema.safeParse(payload);
  if (!parsed.success) return { error: "Invalid data" };

  try {
    const lead = await prisma.lead.update({
      where: {
        id: parsed.data.id,
        userId: session.user.id, // IDOR Ochrana
      },
      data: {
        status: parsed.data.status,
      },
    });
    revalidatePath("/admin");
    return { success: true, lead };
  } catch (error) {
    return { error: "Failed to update status" };
  }
}

/**
 * Zabezpečená změna poznámek a IČO leadu.
 */
export async function updateLeadNotesAction(payload: { id: string; notes?: string; ico?: string; address?: string; ceoName?: string; email?: string }) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  const parsed = UpdateNotesSchema.safeParse(payload);
  if (!parsed.success) return { error: "Invalid data" };

  try {
    const lead = await prisma.lead.update({
      where: {
        id: parsed.data.id,
        userId: session.user.id, // IDOR Ochrana
      },
      data: {
        notes: parsed.data.notes,
        ico: parsed.data.ico,
        address: parsed.data.address,
        ceoName: parsed.data.ceoName,
        email: parsed.data.email,
      },
    });
    revalidatePath("/admin");
    return { success: true, lead };
  } catch (error) {
    return { error: "Failed to update notes" };
  }
}

import { fetchAresData } from "@/lib/ares";

const AddLeadSchema = z.object({
  companyName: z.string().min(1),
  phone: z.string().min(1),
  city: z.string().min(1),
});

/**
 * Zabezpečené manuální přidání leadu.
 */
export async function addLeadAction(payload: { companyName: string; phone: string; city: string }) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  const parsed = AddLeadSchema.safeParse(payload);
  if (!parsed.success) return { error: "Invalid data" };

  try {
    // Pokus o automatický enrichment přes ARES
    const aresData = await fetchAresData(parsed.data.companyName);

    const lead = await prisma.lead.create({
      data: {
        companyName: parsed.data.companyName,
        phone: parsed.data.phone,
        city: parsed.data.city,
        category: "Ručně přidáno",
        status: "NEW",
        userId: session.user.id,
        ico: aresData?.ico || null,
        address: aresData?.address || null,
      },
    });
    revalidatePath("/admin");
    return { success: true, lead };
  } catch (error: any) {
    if (error.code === 'P2002') {
      return { error: "Lead s tímto telefonním číslem již existuje." };
    }
    return { error: "Failed to add lead" };
  }
}

const UpdateSmsTemplateSchema = z.object({
  smsTemplate: z.string().optional(),
});

/**
 * Uložení uživatelské SMS šablony
 */
export async function updateSmsTemplateAction(payload: { smsTemplate: string }) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  const parsed = UpdateSmsTemplateSchema.safeParse(payload);
  if (!parsed.success) return { error: "Invalid data" };

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { smsTemplate: parsed.data.smsTemplate },
    });
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    return { error: "Failed to update sms template" };
  }
}

/**
 * Smart Trigger: Zaznamenání zobrazení nabídky a posun leadu do fáze INTERESTED
 */
export async function trackProposalViewAction(leadId: string) {
  try {
    const lead = await prisma.lead.findUnique({ where: { id: leadId } });
    if (!lead) return { error: "Lead not found" };

    const shouldUpdateStatus = ["NEW", "CALLED", "NO_ANSWER"].includes(lead.status);

    await prisma.lead.update({
      where: { id: leadId },
      data: {
        proposalViewedAt: new Date(),
        ...(shouldUpdateStatus ? { status: "INTERESTED" } : {})
      }
    });

    if (shouldUpdateStatus) {
      // Notifikace uživateli přes revalidate, ať se UI CRM obnoví, pokud je online
      revalidatePath("/admin");
    }

    return { success: true };
  } catch (error) {
    console.error("Chyba při trackování:", error);
    return { error: "Tracking failed" };
  }
}

/**
 * Zaznamenání prokliku na hlavní web z návrhu spolupráce
 */
export async function trackReferralClickAction(leadId: string) {
  try {
    const lead = await prisma.lead.findUnique({ where: { id: leadId } });
    if (!lead) return { error: "Lead not found" };

    const shouldUpdateStatus = ["NEW", "CALLED", "NO_ANSWER"].includes(lead.status);

    await prisma.lead.update({
      where: { id: leadId },
      data: {
        referralClickedAt: new Date(),
        ...(shouldUpdateStatus ? { status: "INTERESTED" } : {})
      }
    });

    revalidatePath("/admin");

    return { success: true };
  } catch (error) {
    console.error("Chyba při trackování prokliku:", error);
    return { error: "Tracking failed" };
  }
}

/**
 * Zabezpečené smazání VŠECH leadů uživatele.
 */
export async function deleteAllLeadsAction() {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    const res = await prisma.lead.deleteMany({
      where: {
        userId: session.user.id, // IDOR Ochrana
      },
    });
    revalidatePath("/admin");
    return { success: true, count: res.count };
  } catch (error) {
    return { error: "Failed to delete all leads" };
  }
}
