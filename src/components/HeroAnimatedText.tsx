'use client';

import React from 'react';
import { m } from 'framer-motion';

export default function HeroAnimatedText() {
  const line1Words = 'Zapomeňte na hezké vizitky.'.split(' ');

  return (
    <>
      <h1 className="text-[3.5rem] md:text-[4.5rem] lg:text-[5rem] font-bold tracking-[-0.04em] leading-[1.05] text-[#111] mb-6">
        <span className="block overflow-hidden">
          {line1Words.map((word, i) => (
            <m.span
              key={i}
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.15 + i * 0.06,
              }}
              className="inline-block mr-[0.3em]"
            >
              {word}
            </m.span>
          ))}
        </span>
        <span className="block mt-1 overflow-hidden">
          <m.span
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.5,
            }}
            className="inline-block bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-500 bg-clip-text text-transparent"
          >
            Váš web musí vydělávat.
          </m.span>
        </span>
      </h1>
      
      <m.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
        className="text-lg md:text-xl text-zinc-500 leading-relaxed font-light mb-10 max-w-md"
      >
        Zapomeňte na šablony, které používá vaše konkurence. Navrhneme pro
        vás{' '}
        <strong className="font-medium text-zinc-800">
          prémiový web na míru
        </strong>
        , který buduje okamžitou autoritu a automaticky generuje poptávky.
      </m.p>
    </>
  );
}
