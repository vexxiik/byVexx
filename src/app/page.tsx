import dynamic from 'next/dynamic';

import Hero from '@/components/Hero';
import Expertise from '@/components/Expertise';
// dynamic imports for heavy sections below the fold
const ProcessSection = dynamic(() => import('@/components/ProcessSection'), { ssr: true });
const Pricing = dynamic(() => import('@/components/Pricing'), { ssr: true });
const ImpactBento = dynamic(() => import('@/components/ImpactBento'), { ssr: true });
const Results = dynamic(() => import('@/components/Results'), { ssr: true });
const Testimonials = dynamic(() => import('@/components/Testimonials'), { ssr: true });
const About = dynamic(() => import('@/components/About'), { ssr: true });
const Contact = dynamic(() => import('@/components/Contact'), { ssr: true });

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-[#3b82f6] selection:text-white relative overflow-clip pb-20 md:pb-0">
      {/* Global subtle ambient breathing glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#4F46E5]/[0.02] blur-[150px] pointer-events-none animate-pulse mix-blend-multiply -z-10" style={{ animationDuration: '10s' }}></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#3b82f6]/[0.02] blur-[150px] pointer-events-none animate-pulse mix-blend-multiply -z-10" style={{ animationDuration: '15s', animationDelay: '2s' }}></div>
      <Hero />
      <Expertise />
      <ProcessSection />
      <Pricing />
      <ImpactBento />
      <Results />
      <Testimonials />
      <About />
      <Contact />
    </main>
  );
}
