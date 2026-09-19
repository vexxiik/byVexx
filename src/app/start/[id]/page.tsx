'use client';

import { useState, useId } from 'react';
import { useParams } from 'next/navigation';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { FileDropzone } from '@/components/ui/file-dropzone';
import { toast } from 'sonner';

export default function StartPage() {
  const domId = useId();
  const params = useParams();
  const leadId = params.id as string;

  const [formData, setFormData] = useState({
    companyName: '',
    ico: '',
    address: '',
    phone: '',
    email: '',
    workArea: '',
    domainOption: '',
    existingDomain: '',
    domainIdeas: '',
    services: '',
    advantages: '',
    pricingOption: '',
    references: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const update = (key: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setFormData((prev) => ({ ...prev, [key]: e.target.value }));

  const inputClass =
    'w-full rounded-xl border border-zinc-200 bg-white px-4 py-3.5 text-[15px] text-[#171717] placeholder:text-[#a1a1aa] focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600/30 transition-all duration-200';

  const textareaClass = `${inputClass} resize-none`;

  const labelClass = 'block text-sm font-medium text-[#171717] mb-2';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/onboarding/${leadId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          // You could handle files here too if uploaded to S3 first
        }),
      });

      if (!res.ok) {
        throw new Error('Chyba při odesílání');
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      toast.error('Něco se pokazilo. Zkuste to prosím znovu.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center px-6 bg-[#fafafa]">
        <div className="max-w-md text-center">
          <div className="mb-6 mx-auto w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
            <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#171717] mb-3">
            Podklady odeslány.
          </h1>
          <p className="text-[#52525b] text-lg leading-relaxed">
            Děkuji za vyplnění. Nyní se pustím do práce na vašem webu.
            Pokud budu potřebovat cokoliv upřesnit, ozvu se.
          </p>
          <p className="text-[#a1a1aa] text-sm mt-6">Vytvořeno agenturou Vexx.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[100dvh] bg-[#fafafa] pt-32 pb-12 md:pt-40 md:pb-20 px-4 sm:px-6">
      {/* Dot Pattern Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      <div className="relative z-10 max-w-3xl mx-auto bg-white/80 backdrop-blur-md shadow-sm border border-zinc-100 rounded-2xl p-8 md:p-12">
        {/* ── Header ── */}
        <div className="mb-16">
          <p className="text-sm font-semibold text-[#a1a1aa] tracking-wide uppercase mb-4">
            Vexx. — Onboarding
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#171717] mb-5">
            Vítejte na palubě.<br className="hidden sm:inline" /> Jdeme na to.
          </h1>
          <p className="text-[#52525b] text-lg leading-relaxed max-w-2xl">
            Děkuji za důvěru. Abychom mohli postavit web, který vám začne reálně
            přivádět zákazníky, potřebuji od vás pár základních informací.
            Zabere to jen pár minut.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-16">
          {/* ── Blok 1: Fakturační & Kontaktní údaje ── */}
          <section>
            <h2 className="text-xl font-semibold text-[#171717] mb-1">
              Fakturační & kontaktní údaje
            </h2>
            <p className="text-[#a1a1aa] text-sm mb-8">
              Základní informace pro fakturu a web.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label className={labelClass}>Název firmy / Jméno a příjmení</label>
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={update('companyName')}
                  placeholder="např. Zámečnictví Novák s.r.o."
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>IČO</label>
                <input
                  type="text"
                  value={formData.ico}
                  onChange={update('ico')}
                  placeholder="12345678"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Adresa sídla</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={update('address')}
                  placeholder="Ulice 123, Město"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Telefonní číslo pro zákazníky</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={update('phone')}
                  placeholder="+420 XXX XXX XXX"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>E-mail pro poptávky</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={update('email')}
                  placeholder="info@firma.cz"
                  className={inputClass}
                />
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass}>Kde primárně pracujete?</label>
                <textarea
                  rows={2}
                  value={formData.workArea}
                  onChange={update('workArea')}
                  placeholder="Města, okresy — např. Pardubice a okolí do 50 km"
                  className={textareaClass}
                />
              </div>
            </div>
          </section>

          {/* ── Blok 2: Doména a Hosting ── */}
          <section>
            <h2 className="text-xl font-semibold text-[#171717] mb-1">
              Doména a hosting
            </h2>
            <p className="text-[#a1a1aa] text-sm mb-8">
              Adresa vašeho budoucího webu.
            </p>

            <div className="space-y-5">
              <div>
                <label className={labelClass}>Máte již zakoupenou vlastní webovou doménu?</label>
                <RadioGroup
                  value={formData.domainOption}
                  onValueChange={(v) =>
                    setFormData((prev) => ({
                      ...prev,
                      domainOption: v,
                      existingDomain: v !== 'yes' ? '' : prev.existingDomain,
                      domainIdeas: v !== 'no' ? '' : prev.domainIdeas,
                    }))
                  }
                  className="grid-cols-1 sm:grid-cols-2"
                >
                  <div
                    className={`relative flex items-start gap-4 rounded-xl border p-4 transition-colors duration-200 cursor-pointer ${
                      formData.domainOption === 'yes'
                        ? 'border-blue-600 bg-blue-50/10'
                        : 'border-zinc-200 hover:border-blue-600/50'
                    }`}
                  >
                    <RadioGroupItem
                      id={`${domId}-domain-yes`}
                      value="yes"
                      className="mt-0.5"
                    />
                    <Label htmlFor={`${domId}-domain-yes`} className="cursor-pointer">
                      <span className="block text-sm font-medium text-[#171717]">
                        Ano, už mám
                      </span>
                      <span className="block text-xs text-[#a1a1aa] mt-0.5">
                        např. u Wedos, Forpsi
                      </span>
                    </Label>
                  </div>

                  <div
                    className={`relative flex items-start gap-4 rounded-xl border p-4 transition-colors duration-200 cursor-pointer ${
                      formData.domainOption === 'no'
                        ? 'border-blue-600 bg-blue-50/10'
                        : 'border-zinc-200 hover:border-blue-600/50'
                    }`}
                  >
                    <RadioGroupItem
                      id={`${domId}-domain-no`}
                      value="no"
                      className="mt-0.5"
                    />
                    <Label htmlFor={`${domId}-domain-no`} className="cursor-pointer">
                      <span className="block text-sm font-medium text-[#171717]">
                        Ne, potřebuji ji zařídit
                      </span>
                      <span className="block text-xs text-[#a1a1aa] mt-0.5">
                        Pomohu s výběrem
                      </span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.domainOption === 'yes' && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className={labelClass}>Napište název domény a u koho je:</label>
                  <input
                    type="text"
                    value={formData.existingDomain}
                    onChange={update('existingDomain')}
                    placeholder="mujweb.cz — registrováno u Wedos"
                    className={inputClass}
                  />
                </div>
              )}

              {formData.domainOption === 'no' && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className={labelClass}>
                    Napište 2–3 nápady, jak by se měl web jmenovat:
                  </label>
                  <textarea
                    rows={3}
                    value={formData.domainIdeas}
                    onChange={update('domainIdeas')}
                    placeholder="např. zamecnictvi-novak.cz, novak-zamky.cz..."
                    className={textareaClass}
                  />
                </div>
              )}
            </div>
          </section>

          {/* ── Blok 3: O firmě a Služby ── */}
          <section>
            <h2 className="text-xl font-semibold text-[#171717] mb-1">
              O firmě a služby
            </h2>
            <p className="text-[#a1a1aa] text-sm mb-8">
              Čím podrobnější budete, tím lepší texty pro vás připravím.
            </p>

            <div className="space-y-6">
              <div>
                <label className={labelClass}>
                  Detailní seznam vašich služeb
                </label>
                <textarea
                  rows={6}
                  required
                  value={formData.services}
                  onChange={update('services')}
                  placeholder="Rozepište vše, co děláte — výčet služeb, produktů, specializací..."
                  className={textareaClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Proč by si měl zákazník vybrat právě vás?
                </label>
                <textarea
                  rows={4}
                  value={formData.advantages}
                  onChange={update('advantages')}
                  placeholder="např. rychlé termíny, čistota po práci, 15 let praxe, moderní vybavení..."
                  className={textareaClass}
                />
              </div>

              <div>
                <label className={labelClass}>Ceník na webu</label>
                <RadioGroup
                  value={formData.pricingOption}
                  onValueChange={(v) =>
                    setFormData((prev) => ({ ...prev, pricingOption: v }))
                  }
                  className="grid-cols-1"
                >
                  {[
                    {
                      value: 'full',
                      label: 'Chci uvést kompletní ceník',
                      desc: 'Zákazník uvidí všechny ceny',
                    },
                    {
                      value: 'indicative',
                      label: 'Chci uvést pouze orientační ceny (od...)',
                      desc: 'Přibližná cenová hladina',
                    },
                    {
                      value: 'none',
                      label: 'Ceny nechci, vše na individuální poptávku',
                      desc: 'CTA „Nezávazná poptávka"',
                    },
                  ].map((item) => (
                    <div
                      key={item.value}
                      className={`relative flex items-start gap-4 rounded-xl border p-4 transition-colors duration-200 cursor-pointer ${
                        formData.pricingOption === item.value
                          ? 'border-blue-600 bg-blue-50/10'
                          : 'border-zinc-200 hover:border-blue-600/50'
                      }`}
                    >
                      <RadioGroupItem
                        id={`${domId}-pricing-${item.value}`}
                        value={item.value}
                        className="mt-0.5"
                      />
                      <Label
                        htmlFor={`${domId}-pricing-${item.value}`}
                        className="cursor-pointer"
                      >
                        <span className="block text-sm font-medium text-[#171717]">
                          {item.label}
                        </span>
                        <span className="block text-xs text-[#a1a1aa] mt-0.5">
                          {item.desc}
                        </span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </section>

          {/* ── Blok 4: Podklady a Reference ── */}
          <section>
            <h2 className="text-xl font-semibold text-[#171717] mb-1">
              Podklady a reference
            </h2>
            <p className="text-[#a1a1aa] text-sm mb-8">
              Fotky, logo a reference od vašich zákazníků.
            </p>

            <div className="space-y-6">
              <div>
                <label className={labelClass}>
                  Zkopírujte sem reference od zákazníků (pokud nějaké máte)
                </label>
                <textarea
                  rows={5}
                  value={formData.references}
                  onChange={update('references')}
                  placeholder={`"Pan Novák nám udělal skvělou práci, doporučujeme!" — Jan Dvořák, Pardubice`}
                  className={textareaClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Fotky realizací, logo a další podklady
                </label>
                <FileDropzone
                  accept="image/*,.pdf,.doc,.docx,.zip"
                  maxSizeMB={10}
                  maxFiles={20}
                  multiple={true}
                  onUpload={(file) =>
                    setUploadedFiles((prev) => [...prev, file])
                  }
                />
                <p className="text-[#a1a1aa] text-xs mt-3 leading-relaxed">
                  Poznámka: Pokud máte velký objem fotek, můžete je nahrát na{' '}
                  <a
                    href="https://uschovna.cz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-[#171717] transition-colors"
                  >
                    Úschovna.cz
                  </a>{' '}
                  a odkaz poslat na{' '}
                  <a
                    href="mailto:jakub@vexx.cz"
                    className="underline underline-offset-2 hover:text-[#171717] transition-colors"
                  >
                    jakub@vexx.cz
                  </a>
                </p>
              </div>
            </div>
          </section>

          {/* ── Submit ── */}
          <div className="pt-4 pb-8 border-t border-zinc-100">
            <button
              type="submit"
              disabled={isSubmitting}
              className="group w-full sm:w-auto min-w-[280px] py-4 px-8 bg-[#171717] hover:bg-blue-600 text-white font-semibold text-base rounded-xl transition-all duration-300 ease-in-out flex items-center justify-center gap-2.5 shadow-[0_4px_14px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_25px_rgba(37,99,235,0.25)] disabled:opacity-70 disabled:hover:bg-[#171717] active:scale-[0.97]"
            >
              <span>
                {isSubmitting
                  ? 'Odesílám podklady...'
                  : 'Odeslat podklady a zahájit tvorbu'}
              </span>
              {!isSubmitting && (
                <svg
                  className="w-5 h-5 transition-transform duration-500 ease-out group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              )}
            </button>
            <p className="text-[#a1a1aa] text-xs mt-5">
              Vytvořeno agenturou Vexx.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
