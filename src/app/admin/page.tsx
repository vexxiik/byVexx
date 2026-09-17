import { prisma } from "@/lib/prisma";
import LeadTable from "@/components/admin/LeadTable";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";
import CreditsBadge from "@/components/admin/CreditsBadge";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await auth();
  
  if (!session?.user?.id) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { credits: true, smsTemplate: true }
  });

  const leads = await prisma.lead.findMany({
    where: { userId: session.user.id }, // IDOR ochrana už při načítání (Tenant Isolation)
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-[#f9fafb] text-[#111111] p-8 font-sans selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 pb-6 border-b border-gray-200 gap-6">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-[#111]">
                Vexx<span className="text-[#3b82f6]">.</span> CRM
              </h1>
              <p className="text-gray-500 mt-1">Automatická správa a těžba leadů</p>
            </div>
            <CreditsBadge credits={user?.credits ?? 0} />
          </div>
          <div className="flex items-center">
            <form action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}>
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm"
              >
                <LogOut className="size-4" />
                Odhlásit se
              </button>
            </form>
          </div>
        </header>

        <main>
          <LeadTable initialLeads={leads} initialSmsTemplate={user?.smsTemplate || ""} />
        </main>
      </div>
    </div>
  );
}
