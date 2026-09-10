import Hero from '@/components/Hero';
import Expertise from '@/components/Expertise';
import ProcessSection from '@/components/ProcessSection';
import Comparison from '@/components/Comparison';
import ImpactBento from '@/components/ImpactBento';
import Results from '@/components/Results';
import Testimonials from '@/components/Testimonials';
import About from '@/components/About';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-[#3b82f6] selection:text-white relative">
      {/* Global subtle ambient breathing glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#4F46E5]/[0.02] blur-[150px] pointer-events-none animate-pulse mix-blend-multiply -z-10" style={{ animationDuration: '10s' }}></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#3b82f6]/[0.02] blur-[150px] pointer-events-none animate-pulse mix-blend-multiply -z-10" style={{ animationDuration: '15s', animationDelay: '2s' }}></div>
      <Hero />
      <Expertise />
      <ProcessSection />
      <Comparison />
      <ImpactBento />
      <Results />
      <Testimonials />
      <About />
      <Contact />
    </main>
  );
}
