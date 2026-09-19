'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Footer from './Footer';
import * as SelectPrimitive from '@radix-ui/react-select';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isUrgent, setIsUrgent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    projectType: '',
    budget: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useGSAP(() => {
    let mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const el = containerRef.current;
      if (!el) return;

      const leftPart = el.querySelector('.contact-left');
      const rightPart = el.querySelector('.contact-right');
      const darkCard = el.querySelector('.contact-card-dark');

      if (leftPart) {
        gsap.from(leftPart, {
          opacity: 0,
          x: -80,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 80%' },
        });
      }

      if (rightPart) {
        gsap.from(rightPart, {
          opacity: 0,
          x: 80,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 80%' },
        });
      }

      // Stagger cards with 60ms offset
      if (darkCard) {
        gsap.from(darkCard, {
          opacity: 0,
          y: 24,
          duration: 0.7,
          ease: 'power3.out',
          delay: 0.15,
          scrollTrigger: { trigger: el, start: 'top 75%' },
        });
      }

      ScrollTrigger.refresh();
    });
  }, { scope: containerRef });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({ event: 'form_submit_lead' });
    }

    setIsSubmitting(true);
    setStatus('idle');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          isUrgent,
        }),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          website: '',
          projectType: '',
          budget: '',
          message: '',
        });
        setIsUrgent(false);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    'w-full bg-transparent border-b border-black/10 py-4 text-[#171717] placeholder:text-[#a1a1aa] focus:outline-none focus:border-black transition-colors duration-200';

  const selectClass =
    'w-full bg-transparent border-b border-black/10 py-4 text-[#171717] focus:outline-none focus:border-black transition-colors duration-200 appearance-none cursor-pointer';

  return (
    <footer id="contact" className="pt-24 pb-8 px-6 max-w-7xl mx-auto" ref={containerRef}>
      <div className="bg-white border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-8 md:p-16 lg:p-24 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* ── Left Column: Headline + Contact Cards ── */}
          <div className="contact-left">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-[#171717]">
              Pojďme postavit<br /> něco skvělého.
            </h2>
            <p className="text-[#52525b] text-lg mb-10">
              Řekněte mi o svém projektu a já vám ukážu,<br className="hidden md:inline" /> jak z něj vytěžit maximum. Získejte konzultaci zdarma.
            </p>

            {/* Dark Card — Přímý kontakt */}
            <div className="contact-card-dark bg-zinc-950 text-white rounded-2xl p-6 md:p-8 border border-white/10 mb-4">
              <h3 className="text-sm font-semibold tracking-wide uppercase text-zinc-400 mb-5">
                Přímý kontakt
              </h3>
              <div className="space-y-3">
                <a
                  href="tel:+420604256988"
                  className="flex items-center gap-3 group"
                >
                  <svg className="w-[18px] h-[18px] text-zinc-500 shrink-0 transition-colors duration-200 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <span className="text-zinc-300 transition-colors duration-200 group-hover:text-white">+420 604 256 988</span>
                </a>
                <a
                  href="mailto:jakub@vexx.cz"
                  className="flex items-center gap-3 group"
                >
                  <svg className="w-[18px] h-[18px] text-zinc-500 shrink-0 transition-colors duration-200 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <span className="text-zinc-300 transition-colors duration-200 group-hover:text-white">jakub@vexx.cz</span>
                </a>
              </div>
              <p className="text-zinc-500 text-sm mt-5">Jakub Sokol, Vexx.</p>
            </div>
          </div>

          {/* ── Right Column: Qualification Form ── */}
          <div className="contact-right">
            <form className="space-y-1" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                {/* Row 1 */}
                <input
                  type="text"
                  placeholder="Jméno a příjmení"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className={inputClass}
                />
                <input
                  type="email"
                  placeholder="E-mail"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                  className={inputClass}
                />

                {/* Row 2 */}
                <input
                  type="tel"
                  placeholder="Telefon"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className={inputClass}
                />
                <input
                  type="text"
                  placeholder="Váš současný web"
                  value={formData.website}
                  onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                  className={inputClass}
                />

                {/* Row 3 — Selects */}
                <div className="relative">
                  <SelectPrimitive.Root
                    value={formData.projectType}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, projectType: value }))}
                    required
                  >
                    <SelectPrimitive.Trigger
                      className={`flex w-full items-center justify-between bg-transparent border-b border-black/10 py-4 text-[#171717] focus:outline-none focus:border-black transition-colors duration-200 cursor-pointer ${
                        formData.projectType === '' ? 'text-[#a1a1aa]' : 'text-[#171717]'
                      }`}
                    >
                      <SelectPrimitive.Value placeholder="Typ projektu" />
                      <SelectPrimitive.Icon>
                        <svg className="w-4 h-4 text-[#a1a1aa]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </SelectPrimitive.Icon>
                    </SelectPrimitive.Trigger>

                    <SelectPrimitive.Portal>
                      <SelectPrimitive.Content
                        position="popper"
                        sideOffset={8}
                        className="overflow-hidden bg-white rounded-xl border border-black/5 shadow-lg min-w-[var(--radix-select-trigger-width)] z-50"
                      >
                        <SelectPrimitive.Viewport className="p-2 space-y-1">
                          <SelectPrimitive.Item value="novy-web" className="cursor-pointer select-none rounded-lg px-3 py-2 text-sm text-[#52525b] data-[highlighted]:bg-[#f4f4f5] data-[highlighted]:text-[#171717] data-[highlighted]:outline-none transition-colors duration-150">
                            <SelectPrimitive.ItemText>Zbrusu nový web</SelectPrimitive.ItemText>
                          </SelectPrimitive.Item>
                          <SelectPrimitive.Item value="redesign" className="cursor-pointer select-none rounded-lg px-3 py-2 text-sm text-[#52525b] data-[highlighted]:bg-[#f4f4f5] data-[highlighted]:text-[#171717] data-[highlighted]:outline-none transition-colors duration-150">
                            <SelectPrimitive.ItemText>Redesign stávajícího webu</SelectPrimitive.ItemText>
                          </SelectPrimitive.Item>
                          <SelectPrimitive.Item value="sprava" className="cursor-pointer select-none rounded-lg px-3 py-2 text-sm text-[#52525b] data-[highlighted]:bg-[#f4f4f5] data-[highlighted]:text-[#171717] data-[highlighted]:outline-none transition-colors duration-150">
                            <SelectPrimitive.ItemText>Měsíční péče (Správa webu)</SelectPrimitive.ItemText>
                          </SelectPrimitive.Item>
                        </SelectPrimitive.Viewport>
                      </SelectPrimitive.Content>
                    </SelectPrimitive.Portal>
                  </SelectPrimitive.Root>
                </div>

                <div className="relative">
                  <SelectPrimitive.Root
                    value={formData.budget}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, budget: value }))}
                    required
                  >
                    <SelectPrimitive.Trigger
                      className={`flex w-full items-center justify-between bg-transparent border-b border-black/10 py-4 text-[#171717] focus:outline-none focus:border-black transition-colors duration-200 cursor-pointer ${
                        formData.budget === '' ? 'text-[#a1a1aa]' : 'text-[#171717]'
                      }`}
                    >
                      <SelectPrimitive.Value placeholder="Představa o rozpočtu" />
                      <SelectPrimitive.Icon>
                        <svg className="w-4 h-4 text-[#a1a1aa]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </SelectPrimitive.Icon>
                    </SelectPrimitive.Trigger>

                    <SelectPrimitive.Portal>
                      <SelectPrimitive.Content
                        position="popper"
                        sideOffset={8}
                        className="overflow-hidden bg-white rounded-xl border border-black/5 shadow-lg min-w-[var(--radix-select-trigger-width)] z-50"
                      >
                        <SelectPrimitive.Viewport className="p-2 space-y-1">
                          <SelectPrimitive.Item value="do-15000" className="cursor-pointer select-none rounded-lg px-3 py-2 text-sm text-[#52525b] data-[highlighted]:bg-[#f4f4f5] data-[highlighted]:text-[#171717] data-[highlighted]:outline-none transition-colors duration-150">
                            <SelectPrimitive.ItemText>do 15 000 Kč</SelectPrimitive.ItemText>
                          </SelectPrimitive.Item>
                          <SelectPrimitive.Item value="15000-25000" className="cursor-pointer select-none rounded-lg px-3 py-2 text-sm text-[#52525b] data-[highlighted]:bg-[#f4f4f5] data-[highlighted]:text-[#171717] data-[highlighted]:outline-none transition-colors duration-150">
                            <SelectPrimitive.ItemText>15 000 – 25 000 Kč</SelectPrimitive.ItemText>
                          </SelectPrimitive.Item>
                          <SelectPrimitive.Item value="nad-25000" className="cursor-pointer select-none rounded-lg px-3 py-2 text-sm text-[#52525b] data-[highlighted]:bg-[#f4f4f5] data-[highlighted]:text-[#171717] data-[highlighted]:outline-none transition-colors duration-150">
                            <SelectPrimitive.ItemText>nad 25 000 Kč</SelectPrimitive.ItemText>
                          </SelectPrimitive.Item>
                        </SelectPrimitive.Viewport>
                      </SelectPrimitive.Content>
                    </SelectPrimitive.Portal>
                  </SelectPrimitive.Root>
                </div>
              </div>

              {/* Row 4 — Textarea (full width) */}
              <textarea
                placeholder="Stručná představa o webu"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                required
                className={`${inputClass} resize-none`}
              />

              {/* Row 5 — Toggle + Button */}
              <div className="flex items-center justify-between py-4">
                <div>
                  <div className="text-[#171717] font-medium">Projekt spěchá</div>
                  <div className="text-[#a1a1aa] text-sm">Zvýšená priorita vyřízení</div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsUrgent(!isUrgent)}
                  className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${isUrgent ? 'bg-[#3b82f6]' : 'bg-black/10'}`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform duration-300 shadow-sm ${isUrgent ? 'translate-x-6' : 'translate-x-0.5'}`} />
                </button>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-auto min-w-[220px] py-4 px-8 mt-2 bg-[#171717] hover:bg-blue-600 text-white font-bold rounded-xl transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] disabled:opacity-70 disabled:hover:bg-[#171717] disabled:hover:shadow-[0_4px_14px_rgba(0,0,0,0.1)] active:scale-[0.97]"
              >
                <span>{isSubmitting ? 'Odesílám...' : 'Odeslat zprávu'}</span>
                {!isSubmitting && (
                  <svg className="w-5 h-5 transition-transform duration-500 ease-out group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path></svg>
                )}
              </button>

              {status === 'success' && (
                <div className="text-emerald-600 text-sm font-medium mt-4">
                  Zpráva byla úspěšně odeslána.
                </div>
              )}
              {status === 'error' && (
                <div className="text-red-500 text-sm font-medium mt-4">
                  Něco se pokazilo. Zkuste to prosím znovu.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </footer>
  );
}
