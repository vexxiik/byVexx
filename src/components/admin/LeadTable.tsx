"use client";

import { useState, useTransition } from "react";
import { Copy, MessageSquare, Play, Search, Loader2, MoreHorizontal, Trash2 } from "lucide-react";
import { Lead } from "@prisma/client";
import { toast } from "sonner";
import { m, AnimatePresence } from "framer-motion";
import { Drawer } from "vaul";
import { deleteLeadsAction, bulkUpdateStatusAction, updateLeadStatusAction, updateLeadNotesAction, addLeadAction, updateSmsTemplateAction } from "@/app/actions/leads";
import KanbanBoard from "./KanbanBoard";
import { LayoutGrid, List, Plus, Settings, Phone as PhoneIcon, MessageCircle, Link2, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function LeadTable({ initialLeads, initialSmsTemplate = "" }: { initialLeads: any[], initialSmsTemplate?: string }) {
  const [leads, setLeads] = useState<any[]>(initialLeads);
  const [smsTemplate, setSmsTemplate] = useState(initialSmsTemplate || "Dobrý den, hledal jsem vás na Google Maps, ale chybí vám web. Jsem lokální webař z Vexx., nedáme rychlý call?");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isLoading, setIsLoading] = useState(false);
  const [scrapeCity, setScrapeCity] = useState("Pardubice");
  const [scrapeCategory, setScrapeCategory] = useState("Instalatér");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isPending, startTransition] = useTransition();

  // Detail Drawer state
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [drawerNotes, setDrawerNotes] = useState("");
  const [drawerIco, setDrawerIco] = useState("");
  const [drawerAddress, setDrawerAddress] = useState("");
  const [drawerCeo, setDrawerCeo] = useState("");

  const [view, setView] = useState<"table" | "kanban">("table");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addForm, setAddForm] = useState({ companyName: "", phone: "", city: "" });
  const [isAdding, setIsAdding] = useState(false);

  const handleAddLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true);
    const res = await addLeadAction(addForm);
    setIsAdding(false);
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("Lead úspěšně přidán");
      setIsAddModalOpen(false);
      setAddForm({ companyName: "", phone: "", city: "" });
      if (res.lead) setLeads(prev => [res.lead, ...prev]);
    }
  };

  const handleScrape = async () => {
    setIsLoading(true);
    toast.loading("Zahajuji těžbu, může to chvíli trvat...");
    try {
      const res = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city: scrapeCity, category: scrapeCategory }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        window.location.reload();
      } else {
        toast.error("Chyba: " + data.error);
      }
    } catch (err) {
      toast.error("Chyba při komunikaci se serverem.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    // Optimistic UI
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
    
    startTransition(async () => {
      const res = await updateLeadStatusAction({ id, status: newStatus as any });
      if (res.error) {
        toast.error(res.error);
        // Revert optimistic update (simplification)
        setLeads(initialLeads);
      } else {
        toast.success("Status aktualizován.");
      }
    });
  };

  const saveDrawerDetails = async () => {
    if (!selectedLead) return;
    
    setLeads(prev => prev.map(l => l.id === selectedLead.id ? { ...l, notes: drawerNotes, ico: drawerIco, address: drawerAddress, ceoName: drawerCeo } : l));
    
    const res = await updateLeadNotesAction({ 
      id: selectedLead.id, 
      notes: drawerNotes, 
      ico: drawerIco,
      address: drawerAddress,
      ceoName: drawerCeo
    });
    
    if (res.error) {
      toast.error(res.error);
      setLeads(initialLeads);
    } else {
      toast.success("Údaje uloženy.");
    }
  };

  const handleSaveSettings = async () => {
    const res = await updateSmsTemplateAction({ smsTemplate });
    if (res.error) toast.error(res.error);
    else {
      toast.success("Nastavení uloženo");
      setIsSettingsOpen(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} zkopírováno do schránky!`);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === leads.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(leads.map(l => l.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleBulkDelete = () => {
    if (selectedIds.size === 0) return;
    const idsToDelete = Array.from(selectedIds);
    
    // Optimistic
    setLeads(prev => prev.filter(l => !idsToDelete.includes(l.id)));
    setSelectedIds(new Set());
    
    startTransition(async () => {
      const res = await deleteLeadsAction({ ids: idsToDelete });
      if (res.error) {
        toast.error(res.error);
        setLeads(initialLeads);
      } else {
        toast.success(`Úspěšně smazáno ${res.count} leadů.`);
      }
    });
  };

  const handleBulkStatus = (newStatus: string) => {
    if (selectedIds.size === 0) return;
    const ids = Array.from(selectedIds);
    
    // Optimistic
    setLeads(prev => prev.map(l => ids.includes(l.id) ? { ...l, status: newStatus } : l));
    setSelectedIds(new Set());

    startTransition(async () => {
      const res = await bulkUpdateStatusAction({ ids, status: newStatus as any });
      if (res.error) {
        toast.error(res.error);
        setLeads(initialLeads);
      } else {
        toast.success(`Hromadně změněn status u ${res.count} leadů.`);
      }
    });
  };

  const openDrawer = (lead: Lead) => {
    setSelectedLead(lead);
    setDrawerNotes(lead.notes || "");
    setDrawerIco(lead.ico || "");
    setDrawerAddress(lead.address || "");
    setDrawerCeo(lead.ceoName || "");
  };

  const statusColors: Record<string, string> = {
    NEW: "bg-blue-100 text-blue-700",
    CALLED: "bg-yellow-100 text-yellow-700",
    NO_ANSWER: "bg-gray-100 text-gray-700",
    INTERESTED: "bg-orange-100 text-orange-700",
    MEETING: "bg-green-100 text-green-700",
    CLOSED: "bg-purple-100 text-purple-700",
  };

  const statusLabels: Record<string, string> = {
    NEW: "Nový",
    CALLED: "Zavoláno",
    NO_ANSWER: "Nezvedá",
    INTERESTED: "Zájemce",
    MEETING: "Schůzka",
    CLOSED: "Uzavřeno"
  };

  return (
    <div className="space-y-6 pb-24 relative">
      {/* Těžba Leadů Kontrolní Panel */}
      <div className="bg-white p-6 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-gray-100">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Search className="size-5 text-[#3b82f6]" /> Těžba leadů z Google Maps
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-600 mb-1">Obor</label>
            <select 
              value={scrapeCategory} 
              onChange={e => setScrapeCategory(e.target.value)}
              className="w-full h-11 bg-gray-50 border border-gray-200 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50"
            >
              <option value="Všechny">Všechny (Komplet)</option>
              <option value="Instalatér">Instalatér</option>
              <option value="Elektrikář">Elektrikář</option>
              <option value="Truhlář">Truhlář</option>
              <option value="Zedník">Zedník</option>
              <option value="Pokrývač">Pokrývač</option>
            </select>
          </div>
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-600 mb-1">Město</label>
            <select 
              value={scrapeCity} 
              onChange={e => setScrapeCity(e.target.value)}
              className="w-full h-11 bg-gray-50 border border-gray-200 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50"
            >
              <option value="Všechny">Všechna města</option>
              <option value="Pardubice">Pardubice</option>
              <option value="Chrudim">Chrudim</option>
              <option value="Svitavy">Svitavy</option>
              <option value="Přelouč">Přelouč</option>
              <option value="Holice">Holice</option>
            </select>
          </div>
          <button
            onClick={handleScrape}
            disabled={isLoading}
            className="h-11 px-6 bg-[#111] hover:bg-[#222] text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 w-full sm:w-auto shadow-sm"
          >
            {isLoading ? <Loader2 className="size-4 animate-spin" /> : <Play className="size-4" />}
            {isLoading ? "Hledám..." : "Spustit těžbu"}
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="h-11 px-6 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 font-medium rounded-lg transition-colors flex items-center justify-center gap-2 w-full sm:w-auto shadow-sm"
          >
            <Plus className="size-4" />
            Přidat ručně
          </button>
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="h-11 px-4 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 rounded-lg transition-colors flex items-center justify-center shadow-sm"
          >
            <Settings className="size-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-end mb-2">
        <div className="bg-white p-1 rounded-lg border border-gray-200 inline-flex shadow-sm">
          <button
            onClick={() => setView("table")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all",
              view === "table" ? "bg-gray-100 text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            )}
          >
            <List className="size-4" />
            Tabulka
          </button>
          <button
            onClick={() => setView("kanban")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all",
              view === "kanban" ? "bg-gray-100 text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            )}
          >
            <LayoutGrid className="size-4" />
            Kanban
          </button>
        </div>
      </div>

      {/* Zobrazení */}
      {view === "kanban" ? (
        <KanbanBoard 
          leads={leads} 
          updateStatus={updateStatus} 
          onCardClick={(lead) => {
            setSelectedLead(lead);
            setDrawerNotes(lead.notes || "");
            setDrawerIco(lead.ico || "");
            setDrawerAddress(lead.address || "");
            setDrawerCeo(lead.ceoName || "");
          }} 
        />
      ) : (
      <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 text-sm text-gray-500">
                <th className="px-6 py-4 w-12 text-center">
                  <input 
                    type="checkbox"
                    checked={leads.length > 0 && selectedIds.size === leads.length}
                    onChange={toggleSelectAll}
                    className="size-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-4 font-medium">Firma</th>
                <th className="px-6 py-4 font-medium">Lokalita & Obor</th>
                <th className="px-6 py-4 font-medium">Telefon</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Akce</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm relative">
              {leads.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-gray-400 flex-col items-center justify-center">
                    <div className="mx-auto size-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                      <Search className="size-5 text-gray-300" />
                    </div>
                    Zatím žádné leady. Spusťte těžbu v horním panelu.
                  </td>
                </tr>
              )}
              <AnimatePresence>
                {leads.map(lead => (
                  <m.tr 
                    key={lead.id} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                    className={`transition-colors cursor-default ${selectedIds.has(lead.id) ? "bg-blue-50/50" : "hover:bg-gray-50/50"}`}
                  >
                    <td className="px-6 py-4">
                      <input 
                        type="checkbox"
                        checked={selectedIds.has(lead.id)}
                        onChange={() => toggleSelect(lead.id)}
                        className="size-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => openDrawer(lead)} className="font-medium text-gray-900 hover:text-blue-600 hover:underline transition-colors text-left">
                        {lead.companyName}
                      </button>
                      {lead.notes && <div className="text-xs text-gray-400 mt-1 line-clamp-1">{lead.notes}</div>}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {lead.city} &bull; {lead.category}
                    </td>
                    <td className="px-6 py-4 font-mono text-gray-600">{lead.phone}</td>
                    <td className="px-6 py-4">
                      <select
                        value={lead.status}
                        onChange={(e) => updateStatus(lead.id, e.target.value)}
                        disabled={isPending}
                        className={`text-xs font-medium px-2.5 py-1 rounded-full outline-none cursor-pointer appearance-none disabled:opacity-50 ${statusColors[lead.status] || "bg-gray-100 text-gray-700"}`}
                      >
                        {Object.keys(statusLabels).map(key => (
                          <option key={key} value={key}>{statusLabels[key]}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right space-x-1">
                      <button 
                        onClick={() => copyToClipboard(lead.phone, "Telefon")}
                        className="p-2 text-gray-400 hover:text-[#3b82f6] hover:bg-blue-50 rounded-lg transition-colors"
                        title="Kopírovat telefon"
                      >
                        <Copy className="size-4" />
                      </button>
                      <button 
                        onClick={() => openDrawer(lead)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Upravit / Detail"
                      >
                        <MoreHorizontal className="size-4" />
                      </button>
                      <button 
                        onClick={() => copyToClipboard(smsTemplate, "SMS šablona")}
                        className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Zkopírovat SMS text"
                      >
                        <MessageSquare className="size-4" />
                      </button>
                    </td>
                  </m.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
      )}

      {/* Floating Action Bar */}
      <AnimatePresence>
        {selectedIds.size > 0 && (
          <m.div 
            initial={{ y: 100, opacity: 0, x: "-50%" }}
            animate={{ y: 0, opacity: 1, x: "-50%" }}
            exit={{ y: 100, opacity: 0, x: "-50%" }}
            className="fixed bottom-8 left-1/2 z-50 bg-[#111] text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-6 border border-white/10"
          >
            <span className="text-sm font-medium">Vybráno {selectedIds.size}</span>
            <div className="w-px h-5 bg-white/20"></div>
            
            <div className="flex items-center gap-2">
              <select 
                className="bg-transparent text-sm font-medium outline-none text-gray-300 hover:text-white cursor-pointer"
                onChange={(e) => {
                  if (e.target.value) {
                    handleBulkStatus(e.target.value);
                    e.target.value = ""; // reset
                  }
                }}
              >
                <option value="" className="text-black">Změnit status...</option>
                {Object.keys(statusLabels).map(key => (
                  <option key={key} value={key} className="text-black">{statusLabels[key]}</option>
                ))}
              </select>
              <button 
                onClick={handleBulkDelete}
                className="text-red-400 hover:text-red-300 text-sm font-medium flex items-center gap-1.5 ml-4"
              >
                <Trash2 className="size-4" /> Smazat
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Vaul Drawer pro Detail Leadu */}
      <Drawer.Root open={!!selectedLead} onOpenChange={(open) => !open && setSelectedLead(null)} direction={isDesktop ? "right" : "bottom"}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm" />
          <Drawer.Content className={cn("bg-white flex flex-col z-50 shadow-2xl focus:outline-none fixed", isDesktop ? "right-0 top-0 bottom-0 w-[90%] max-w-[500px] rounded-l-[20px]" : "bottom-0 left-0 right-0 h-[85vh] rounded-t-[20px] mt-24")}>
            <div className={cn("p-4 sm:p-6 bg-white flex-1 overflow-y-auto", isDesktop ? "rounded-l-[20px]" : "rounded-t-[20px]")}>
              {!isDesktop && <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-200 mb-8" />}
              
              <div className="max-w-2xl mx-auto">
                <Drawer.Title className="text-2xl font-bold text-gray-900 mb-1">
                  {selectedLead?.companyName}
                </Drawer.Title>
                <p className="text-gray-500 mb-6">
                  {selectedLead?.city} &bull; {selectedLead?.category}
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
                  <a href={`tel:${selectedLead?.phone}`} className="w-full flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition-colors">
                    <PhoneIcon className="size-5" />
                    Zavolat
                  </a>
                  <a href={`sms:${selectedLead?.phone}?body=${encodeURIComponent(smsTemplate)}`} className="w-full flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium transition-colors">
                    <MessageCircle className="size-5" />
                    SMS
                  </a>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-8 flex flex-col gap-3 border border-gray-100">
                  <button 
                    onClick={() => copyToClipboard(`${window.location.origin}/pitch/${selectedLead?.id}`, "Odkaz na nabídku")}
                    className="flex items-center justify-center gap-2 w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 py-2.5 rounded-lg font-medium transition-colors"
                  >
                    <Link2 className="size-4" />
                    Zkopírovat odkaz na Pitch Page
                  </button>
                  {selectedLead?.proposalViewedAt && (
                    <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                      <Eye className="size-4" />
                      Nabídka zobrazena: {new Date(selectedLead.proposalViewedAt).toLocaleString("cs-CZ")}
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Sídlo / Adresa</label>
                      <input 
                        type="text" 
                        value={drawerAddress} 
                        onChange={e => setDrawerAddress(e.target.value)}
                        placeholder="Např. Václavské náměstí 1"
                        className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Jméno Jednatele</label>
                      <input 
                        type="text" 
                        value={drawerCeo} 
                        onChange={e => setDrawerCeo(e.target.value)}
                        placeholder="Např. Jan Novák"
                        className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">IČO</label>
                    <input 
                      type="text" 
                      value={drawerIco} 
                      onChange={e => setDrawerIco(e.target.value)}
                      placeholder="Např. 12345678"
                      className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Poznámky k hovoru</label>
                    <textarea 
                      value={drawerNotes} 
                      onChange={e => setDrawerNotes(e.target.value)}
                      placeholder="Co jste se dozvěděli po zavolání?"
                      className="w-full h-32 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 transition-all resize-none"
                    />
                  </div>

                  <div className="pt-4 flex justify-end gap-3">
                    <button 
                      onClick={() => setSelectedLead(null)}
                      className="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      Zavřít
                    </button>
                    <button 
                      onClick={() => {
                        saveDrawerDetails();
                        setSelectedLead(null);
                      }}
                      className="px-5 py-2.5 rounded-lg text-sm font-medium bg-[#111] hover:bg-[#222] text-white transition-colors"
                    >
                      Uložit změny
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>

      {/* Vaul Drawer pro Přidání Leadu */}
      <Drawer.Root open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm" />
          <Drawer.Content className="bg-white flex flex-col rounded-t-[20px] h-auto max-h-[85vh] mt-24 fixed bottom-0 left-0 right-0 z-50 shadow-2xl focus:outline-none">
            <div className="p-4 bg-white rounded-t-[20px] flex-1">
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-200 mb-8" />
              
              <div className="max-w-2xl mx-auto">
                <Drawer.Title className="text-2xl font-bold text-gray-900 mb-1">
                  Přidat Lead Ručně
                </Drawer.Title>
                <p className="text-gray-500 mb-8">
                  Vyplňte základní údaje o leadu.
                </p>

                <form onSubmit={handleAddLead} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Název firmy *</label>
                    <input 
                      type="text" 
                      required
                      value={addForm.companyName} 
                      onChange={e => setAddForm(prev => ({ ...prev, companyName: e.target.value }))}
                      placeholder="Např. Truhlářství Novák"
                      className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Telefon *</label>
                    <input 
                      type="text" 
                      required
                      value={addForm.phone} 
                      onChange={e => setAddForm(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="Např. +420 123 456 789"
                      className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Město *</label>
                    <input 
                      type="text" 
                      required
                      value={addForm.city} 
                      onChange={e => setAddForm(prev => ({ ...prev, city: e.target.value }))}
                      placeholder="Např. Praha"
                      className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 transition-all"
                    />
                  </div>

                  <div className="pt-4 flex justify-end gap-3 pb-8">
                    <button 
                      type="button"
                      onClick={() => setIsAddModalOpen(false)}
                      className="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      Zrušit
                    </button>
                    <button 
                      type="submit"
                      disabled={isAdding}
                      className="px-5 py-2.5 rounded-lg text-sm font-medium bg-[#111] hover:bg-[#222] text-white transition-colors flex items-center justify-center disabled:opacity-70"
                    >
                      {isAdding ? <Loader2 className="size-4 animate-spin mr-2" /> : null}
                      Přidat lead
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>

      {/* Vaul Drawer pro Nastavení */}
      <Drawer.Root open={isSettingsOpen} onOpenChange={setIsSettingsOpen} direction={isDesktop ? "right" : "bottom"}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm" />
          <Drawer.Content className={cn("bg-white flex flex-col z-50 shadow-2xl focus:outline-none fixed", isDesktop ? "right-0 top-0 bottom-0 w-[90%] max-w-[500px] rounded-l-[20px]" : "bottom-0 left-0 right-0 h-auto max-h-[85vh] rounded-t-[20px] mt-24")}>
            <div className={cn("p-4 sm:p-6 bg-white flex-1 overflow-y-auto", isDesktop ? "rounded-l-[20px]" : "rounded-t-[20px]")}>
              {!isDesktop && <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-200 mb-8" />}
              
              <div className="max-w-2xl mx-auto">
                <Drawer.Title className="text-2xl font-bold text-gray-900 mb-1">
                  Nastavení SMS
                </Drawer.Title>
                <p className="text-gray-500 mb-8">
                  Upravte výchozí šablonu pro odesílání SMS zpráv.
                </p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Šablona zprávy</label>
                    <textarea 
                      value={smsTemplate} 
                      onChange={e => setSmsTemplate(e.target.value)}
                      placeholder="Napište text SMS zprávy..."
                      className="w-full h-40 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 transition-all resize-none"
                    />
                  </div>

                  <div className="pt-4 flex justify-end gap-3 pb-8">
                    <button 
                      type="button"
                      onClick={() => setIsSettingsOpen(false)}
                      className="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      Zavřít
                    </button>
                    <button 
                      type="button"
                      onClick={handleSaveSettings}
                      className="px-5 py-2.5 rounded-lg text-sm font-medium bg-[#111] hover:bg-[#222] text-white transition-colors"
                    >
                      Uložit šablonu
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}
