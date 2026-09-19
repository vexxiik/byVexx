"use client";

import React from "react";
import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";

type CtaSectionProps = {
  headline: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  phone?: string;
};

const stagger = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
  },
};

export default function CtaSection({
  headline,
  description,
  buttonText,
  buttonHref,
  phone = "+420 604 256 988",
}: CtaSectionProps) {
  return (
    <section className="pb-24 md:pb-32 px-6 bg-transparent w-full" style={{ contain: "paint" }}>
      <div className="max-w-4xl mx-auto border-t border-zinc-100 pt-20">
        <m.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger.container}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center"
        >
          {/* Left Column: CTA text and button */}
          <div className="text-left flex flex-col items-start">
            <m.h2
              variants={stagger.item}
              className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 mb-6"
            >
              {headline}
            </m.h2>
            <m.p
              variants={stagger.item}
              className="text-lg text-zinc-500 leading-relaxed mb-10 max-w-xl"
            >
              {description}
            </m.p>

            <m.div
              variants={stagger.item}
              className="w-full sm:w-auto"
            >
              <a
                href={buttonHref}
                className="group relative inline-flex items-center justify-center gap-2 h-14 px-10 rounded-full overflow-hidden transition-transform duration-[160ms] active:scale-[0.97] w-full sm:w-auto"
                style={{
                  transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
                }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-full opacity-100" />
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.1] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                </div>
                <span className="relative z-10 text-sm tracking-wide text-white font-medium">
                  {buttonText}
                </span>
                <ArrowRight className="relative z-10 w-4 h-4 text-white group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </m.div>
          </div>

          {/* Right Column: Contact Card */}
          <m.div
            variants={stagger.item}
            className="w-full"
          >
            <div className="bg-zinc-950 text-white rounded-2xl p-6 md:p-8 border border-white/10 shadow-2xl drop-shadow-xl">
              <h3 className="text-sm font-semibold tracking-wide uppercase text-zinc-400 mb-6">
                Přímý kontakt
              </h3>
              <div className="space-y-4">
                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-4 group"
                >
                  <svg className="w-[18px] h-[18px] text-zinc-500 shrink-0 transition-colors duration-200 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <span className="text-zinc-300 transition-colors duration-200 group-hover:text-white font-medium">{phone}</span>
                </a>
                <a
                  href="mailto:jakub@vexx.cz"
                  className="flex items-center gap-4 group"
                >
                  <svg className="w-[18px] h-[18px] text-zinc-500 shrink-0 transition-colors duration-200 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <span className="text-zinc-300 transition-colors duration-200 group-hover:text-white font-medium">jakub@vexx.cz</span>
                </a>
              </div>
              <p className="text-zinc-500 text-sm mt-6 pt-6 border-t border-white/10">Jakub Sokol, Vexx.</p>
            </div>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
