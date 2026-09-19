'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function StickyCTA() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide on admin and funnel pages
  if (
    pathname?.startsWith('/admin') ||
    pathname?.startsWith('/navrh') ||
    pathname?.startsWith('/pitch') ||
    pathname?.startsWith('/start') ||
    pathname?.startsWith('/onboarding')
  ) {
    return null;
  }

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className={`fixed bottom-8 left-6 z-50 md:hidden transition-transform duration-500 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
      }`}
    >
      <button
        onClick={scrollToContact}
        className="group relative flex items-center justify-center gap-2 h-14 px-8 rounded-full overflow-hidden transition-transform active:scale-95 bg-[#3b82f6] hover:bg-[#2563eb] shadow-[0_8px_30px_rgba(59,130,246,0.4)]"
      >
        <span className="relative z-10 text-sm tracking-wide text-white font-bold">
          Návrh zdarma
        </span>
        <ArrowRight className="relative z-10 w-4 h-4 text-white group-hover:translate-x-1 transition-transform duration-300" />
      </button>
    </div>
  );
}
