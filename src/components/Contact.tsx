'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isUrgent, setIsUrgent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useGSAP(() => {
    const el = containerRef.current;
    if (!el) return;

    const leftPart = el.querySelector('.lg\\:grid-cols-2 > div:first-child');
    const rightPart = el.querySelector('.lg\\:grid-cols-2 > div:last-child');

    if (leftPart && rightPart) {
      gsap.fromTo(
        leftPart,
        { opacity: 0, x: -150 },
        { opacity: 1, x: 0, duration: 1, ease: 'back.out(1.2)', scrollTrigger: { trigger: el, start: 'top 80%' } }
      );
      gsap.fromTo(
        rightPart,
        { opacity: 0, x: 150 },
        { opacity: 1, x: 0, duration: 1, ease: 'back.out(1.2)', scrollTrigger: { trigger: el, start: 'top 80%' } }
      );
    }

    ScrollTrigger.refresh();
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
        setFormData({ name: '', email: '', message: '' });
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

  return (
    <footer id="contact" className="pt-24 pb-8 px-6 max-w-7xl mx-auto" ref={containerRef}>
      <div className="bg-white border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-8 md:p-16 lg:p-24 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-[#171717]">
              Pojďme postavit<br /> něco skvělého.
            </h2>
            <p className="text-[#52525b] text-lg mb-12">
              Řekněte mi o svém projektu a já vám ukážu,<br /> jak z něj vytěžit maximum. Získejte konzultaci zdarma.
            </p>
          </div>

          <div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Jméno"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="w-full bg-transparent border-b border-black/10 py-4 text-[#171717] placeholder:text-[#a1a1aa] focus:outline-none focus:border-black transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                  className="w-full bg-transparent border-b border-black/10 py-4 text-[#171717] placeholder:text-[#a1a1aa] focus:outline-none focus:border-black transition-colors"
                />
              </div>
              <textarea
                placeholder="Projekt"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                required
                className="w-full bg-transparent border-b border-black/10 py-4 text-[#171717] placeholder:text-[#a1a1aa] focus:outline-none focus:border-black transition-colors resize-none"
              />

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
                className="group w-full py-4 mt-4 bg-[#171717] hover:bg-blue-600 text-white font-bold rounded-xl transition-all duration-500 flex justify-center items-center gap-2 shadow-[0_4px_14px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] disabled:opacity-70 disabled:hover:bg-[#171717] disabled:hover:shadow-[0_4px_14px_rgba(0,0,0,0.1)]"
              >
                <span>{isSubmitting ? 'Odesílám...' : 'Odeslat zprávu'}</span>
                {!isSubmitting && (
                  <svg className="w-5 h-5 transition-transform duration-500 ease-out group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path></svg>
                )}
              </button>

              {status === 'success' && (
                <div className="text-emerald-600 text-sm font-medium mt-4 text-center">
                  Zpráva byla úspěšně odeslána.
                </div>
              )}
              {status === 'error' && (
                <div className="text-red-500 text-sm font-medium mt-4 text-center">
                  Něco se pokazilo. Zkuste to prosím znovu.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between text-sm text-[#a1a1aa] px-4">
        <div>Vexx. Web Development</div>
        <div className="flex gap-6 my-4 md:my-0">
          <Link href="/#work" className="hover:text-[#171717] transition-colors">Práce</Link>
          <Link href="/#expertise" className="hover:text-[#171717] transition-colors">Expertíza</Link>
          <Link href="/#about" className="hover:text-[#171717] transition-colors">O mně</Link>
          <Link href="/#contact" className="hover:text-[#171717] transition-colors">Kontakt</Link>
        </div>
        <div>© 2026</div>
      </div>
    </footer>
  );
}
