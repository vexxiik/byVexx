'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const leftPart = el.querySelector('.lg\\:grid-cols-2 > div:first-child');
      const rightPart = el.querySelector('.lg\\:grid-cols-2 > div:last-child');

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
    });

    return () => ctx.revert();
  }, []);

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
            <form className="space-y-6" onSubmit={(e) => {
              e.preventDefault();
              if (typeof window !== 'undefined' && (window as any).dataLayer) {
                (window as any).dataLayer.push({ event: 'form_submit_lead' });
              }
            }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Jméno"
                  className="w-full bg-transparent border-b border-black/10 py-4 text-[#171717] placeholder:text-[#a1a1aa] focus:outline-none focus:border-black transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-transparent border-b border-black/10 py-4 text-[#171717] placeholder:text-[#a1a1aa] focus:outline-none focus:border-black transition-colors"
                />
              </div>
              <textarea
                placeholder="Projekt"
                rows={4}
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

              <button className="w-full py-4 mt-4 bg-[#171717] text-white font-bold rounded-xl hover:bg-black transition-colors flex justify-center items-center gap-2 shadow-md">
                Odeslat zprávu
              </button>
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
