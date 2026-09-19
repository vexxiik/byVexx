import { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Ochrana soukromí | Vexx.',
  description: 'Zásady ochrany osobních údajů pro sběr dat přes poptávkové a onboarding formuláře.',
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-[100dvh] pt-32 pb-8 px-6 relative selection:bg-[#3b82f6] selection:text-white flex flex-col">
      {/* Ambient backgrounds matching the rest of the site */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#4F46E5]/[0.02] blur-[150px] pointer-events-none -z-10" style={{ willChange: 'transform' }}></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#3b82f6]/[0.02] blur-[150px] pointer-events-none -z-10" style={{ willChange: 'transform' }}></div>
      
      <div className="flex-grow">
        <article className="max-w-2xl mx-auto text-[#52525b] space-y-12 leading-relaxed pb-24">
          <header className="space-y-4 mb-16">
            <Link href="/" className="inline-flex items-center text-sm font-medium text-[#a1a1aa] hover:text-[#171717] transition-colors mb-8 group">
              <svg className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Zpět na hlavní stránku
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#171717]">
              Zásady ochrany osobních údajů
            </h1>
            <p className="text-lg">
              Vaše soukromí bereme vážně. Zde se dozvíte, jak nakládáme s vašimi daty.
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight text-[#171717]">Kdo data zpracovává (Správce)</h2>
            <p>
              Správcem osobních údajů je <strong>Jakub Sokol</strong>, bytem Sportovní 158, 533 52 Staré Hradiště (vystupující pod značkou Vexx.).
            </p>
            <p>
              Kontaktní e-mail: <a href="mailto:jakub@vexx.cz" className="text-[#171717] font-medium underline decoration-black/20 hover:decoration-black transition-colors">jakub@vexx.cz</a>.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight text-[#171717]">Jaká data sbíráme</h2>
            <p>
              Sbíráme pouze nezbytná data, která nám poskytnete přes poptávkové a onboarding formuláře na našem webu. Patří mezi ně: <strong>jméno, příjmení, telefonní číslo, e-mailová adresa, IČO, adresa sídla</strong> a další případné údaje, které sami uvedete do textových polí.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight text-[#171717]">Proč je sbíráme (Účel)</h2>
            <p>
              Veškerá data sbíráme výhradně pro účely zpětného kontaktování ohledně vaší poptávky, plnění smlouvy (samotná tvorba webu a navazující služby) a pro splnění naší nezbytné administrativy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight text-[#171717]">Doba uložení</h2>
            <p>
              Vaše osobní údaje uchováváme po dobu trvání naší vzájemné spolupráce a následně po nezbytnou zákonnou dobu určenou pro archivaci daňových a účetních dokumentů.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight text-[#171717]">Třetí strany a bezpečnost</h2>
            <p>
              Vaše data s nikým nesdílíme ani je neprodáváme žádným třetím stranám. Data mohou být bezpečně uložena na serverech našich prověřených poskytovatelů hostingových a databázových služeb (např. Vercel, Supabase, Prisma), kteří splňují přísné bezpečnostní standardy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight text-[#171717]">Vaše práva</h2>
            <p>
              Jako klient máte plné právo na přístup ke svým datům, jejich opravu, a v případě ukončení spolupráce (pokud tomu nebrání jiná zákonná povinnost) také právo na jejich úplný výmaz. V takovém případě nás stačí kontaktovat e-mailem.
            </p>
          </section>
        </article>
      </div>

      <div className="max-w-7xl mx-auto w-full pt-8 border-t border-black/5">
        <Footer />
      </div>
    </main>
  );
}
