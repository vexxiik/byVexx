'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Link from 'next/link';
import { MenuToggleIcon } from './menu-toggle-icon';

const links = [
  { name: 'Práce', href: '/#work', accent: '#3B82F6' },
  { name: 'Expertíza', href: '/#expertise', accent: '#8B5CF6' },
  { name: 'O mně', href: '/#about', accent: '#111827' },
  { name: 'Reference', href: '/#results', accent: '#10B981' },
  { name: 'Kontakt', href: '/#contact', accent: '#F59E0B' },
];

// Slide-in overlay variants
const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: [0.32, 0.72, 0, 1], delay: 0.15 },
  },
};

// Panel slide-in from right
const panelVariants: Variants = {
  hidden: {
    x: '100%',
    transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] },
  },
  visible: {
    x: '0%',
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    x: '100%',
    transition: { duration: 0.45, ease: [0.32, 0.72, 0, 1] },
  },
};

// Staggered link animation
const linkContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

const linkItemVariants: Variants = {
  hidden: {
    x: 60,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    x: 40,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.32, 0.72, 0, 1],
    },
  },
};

// CTA button animation
const ctaVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.45,
    },
  },
  exit: {
    y: 20,
    opacity: 0,
    transition: {
      duration: 0.25,
      ease: [0.32, 0.72, 0, 1],
    },
  },
};

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <div className="md:hidden">
      {/* Burger button – rounded-full to match the nav pill */}
      <button
        onClick={toggle}
        aria-label={isOpen ? 'Zavřít menu' : 'Otevřít menu'}
        className="relative flex items-center justify-center w-12 h-12 bg-transparent text-black rounded-full z-[60] transition-shadow duration-300 hover:bg-black/5 active:scale-95"
      >
        <MenuToggleIcon open={isOpen} className="size-8" duration={500} />
      </button>

      {/* Slide-in Panel */}
      {mounted &&
        createPortal(
          <AnimatePresence mode="wait">
            {isOpen && (
              <>
                {/* Backdrop overlay */}
                <motion.div
                  key="mobile-nav-overlay"
                  variants={overlayVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm"
                  onClick={close}
                />

                {/* Panel */}
                <motion.div
                  key="mobile-nav-panel"
                  variants={panelVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="fixed top-0 right-0 bottom-0 z-[9999] w-[75%] max-w-[400px] bg-white shadow-[-8px_0_30px_rgba(0,0,0,0.12)] flex flex-col"
                >
                  {/* Panel header */}
                  <div className="flex items-center justify-between px-6 pt-6 pb-4">
                    <span className="text-lg font-bold tracking-tight text-[#171717]">
                      Menu
                    </span>
                    <button
                      onClick={close}
                      aria-label="Zavřít menu"
                      className="flex items-center justify-center w-12 h-12 bg-transparent text-black rounded-full transition-shadow duration-300 hover:bg-black/5 active:scale-95"
                    >
                      <MenuToggleIcon open={true} className="size-8" duration={500} />
                    </button>
                  </div>

                  {/* Separator */}
                  <div className="mx-6 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

                  {/* Navigation links */}
                  <motion.nav
                    variants={linkContainerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex flex-col gap-1 px-6 pt-8 flex-1"
                  >
                    {links.map((link, i) => (
                      <motion.div key={link.name} variants={linkItemVariants}>
                        <Link
                          href={link.href}
                          onClick={close}
                          className="group flex items-center gap-6 py-4 text-2xl font-semibold text-[#171717] transition-colors duration-200 hover:text-[#3b82f6] border-b border-gray-100/80"
                        >
                          <span
                            className="text-5xl font-black tracking-tighter select-none transition-opacity duration-300 group-hover:opacity-40"
                            style={{ color: link.accent, opacity: 0.15 }}
                          >
                            0{i + 1}
                          </span>
                          <span className="relative">
                            {link.name}
                            <span
                              className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                              style={{ backgroundColor: link.accent }}
                            />
                          </span>
                        </Link>
                      </motion.div>
                    ))}

                    {/* CTA Button */}
                    <motion.div variants={ctaVariants} className="mt-auto pb-8">
                      <Link
                        href="/#contact"
                        onClick={close}
                        className="relative overflow-hidden flex items-center justify-center w-full text-sm font-semibold text-white bg-[#3b82f6] px-6 py-3.5 rounded-full hover:bg-[#2563eb] transition-all hover:scale-[1.02] shadow-[0_4px_14px_rgba(59,130,246,0.4)]"
                      >
                        NÁVRH ZDARMA
                      </Link>
                    </motion.div>
                  </motion.nav>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}