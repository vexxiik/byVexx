import Link from 'next/link';

export default function Footer() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between text-sm text-zinc-500 px-4 mt-16 md:mt-0">
      {/* 1. Levá část (Brand) */}
      <div className="w-full md:w-1/3 text-center md:text-left mb-4 md:mb-0">
        Vexx. Web Development
      </div>
      
      {/* 2. Střed (Navigace) */}
      <div className="flex gap-6 justify-center w-full md:w-1/3 mb-4 md:mb-0">
        <Link href="/#work" className="hover:text-[#171717] transition-colors">Práce</Link>
        <Link href="/#expertise" className="hover:text-[#171717] transition-colors">Expertíza</Link>
        <Link href="/#about" className="hover:text-[#171717] transition-colors">O mně</Link>
        <Link href="/#contact" className="hover:text-[#171717] transition-colors">Kontakt</Link>
      </div>
      
      {/* 3. Pravá část (Copyright & Právo) */}
      <div className="w-full md:w-1/3 text-center md:text-right flex items-center justify-center md:justify-end gap-3">
        <span>© 2026 Vexx.</span>
        <Link href="/ochrana-soukromi" className="hover:text-[#171717] transition-colors">
          Ochrana soukromí
        </Link>
      </div>
    </div>
  );
}
