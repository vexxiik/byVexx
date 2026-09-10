'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Intro() {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, x: -150, scale: 0.9 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1.2,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <section className="py-32 px-6 flex items-center justify-center text-center">
      <h2 
        ref={textRef}
        className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight max-w-4xl mx-auto leading-tight text-[#171717]"
      >
        Tvůj projekt začíná zde.<br className="hidden md:block" /> Prozkoumej mé portfolio a pojďme spolupracovat.
      </h2>
    </section>
  );
}
