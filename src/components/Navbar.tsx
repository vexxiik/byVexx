'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { MobileNavigation } from './ui/mobile-navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
        isScrolled
          ? 'max-w-[760px] bg-white/90 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-black/5 rounded-full px-6 py-2'
          : 'max-w-7xl bg-transparent border-transparent px-0 py-0'
      )}
    >
      {/* Logo */}
      <Link
        href="/"
        className={cn(
          "text-xl font-bold tracking-tight text-[#171717] transition-all duration-700 flex-shrink-0",
          !isScrolled && "px-2"
        )}
      >
        Vexx<span className="text-[#3b82f6]">.</span>
      </Link>

      {/* Nav Links */}
      <div
        className={cn(
          "hidden md:flex items-center space-x-8 text-sm font-medium text-[#52525b] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
          !isScrolled
            ? "bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] px-8 py-3 rounded-full border border-black/5"
            : "bg-transparent shadow-none px-0 py-1 border-transparent"
        )}
      >
        <Link href="/#work" className="hover:text-black transition-colors">Práce</Link>
        <Link href="/#expertise" className="hover:text-black transition-colors">Expertíza</Link>
        <Link href="/#about" className="hover:text-black transition-colors">O mně</Link>
        <Link href="/#contact" className="hover:text-black transition-colors">Kontakt</Link>
      </div>

      <Link
        href="/#contact"
        className="hidden md:flex relative overflow-hidden text-xs sm:text-sm font-semibold text-white bg-[#3b82f6] px-4 py-2 sm:px-6 sm:py-2.5 rounded-full hover:bg-[#2563eb] transition-all hover:scale-105 shadow-[0_4px_14px_rgba(59,130,246,0.4)] flex-shrink-0"
      >
        NÁVRH ZDARMA
      </Link>
      
      <div className="md:hidden">
        <MobileNavigation />
      </div>
    </nav>
  );
}
