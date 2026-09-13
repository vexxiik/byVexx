'use client';

import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { Menu, X } from "lucide-react";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
}

// Isomorphic layout effect for SSR safety
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function SterlingGateKineticNavigation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  
  const navWrapRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const shapesContainerRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!mounted) return;

    try {
        if (!gsap.parseEase("main")) {
            CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");
            gsap.defaults({ ease: "main", duration: 0.7 });
        }
    } catch {
        gsap.defaults({ ease: "power2.out", duration: 0.7 });
    }

    const ctx = gsap.context(() => {
      // Hover animations for shapes
      const menuItems = document.querySelectorAll(".menu-list-item[data-shape]");
      const shapesContainer = shapesContainerRef.current;
      
      menuItems.forEach((item) => {
        const shapeIndex = item.getAttribute("data-shape");
        const shape = shapesContainer ? shapesContainer.querySelector(`.bg-shape-${shapeIndex}`) : null;
        if (!shape) return;

        const shapeEls = shape.querySelectorAll(".shape-element");

        const onEnter = () => {
             if (shapesContainer) {
                 shapesContainer.querySelectorAll(".bg-shape").forEach((s) => s.classList.remove("active"));
             }
             shape.classList.add("active");
             
             gsap.fromTo(shapeEls, 
                { scale: 0.5, opacity: 0, rotation: -10 },
                { scale: 1, opacity: 1, rotation: 0, duration: 0.6, stagger: 0.08, ease: "back.out(1.7)", overwrite: "auto" }
             );
        };
        
        const onLeave = () => {
            gsap.to(shapeEls, {
                scale: 0.8, opacity: 0, duration: 0.3, ease: "power2.in",
                onComplete: () => shape.classList.remove("active"),
                overwrite: "auto"
            });
        };

        item.addEventListener("mouseenter", onEnter);
        item.addEventListener("mouseleave", onLeave);
        
        (item as HTMLElement & { _cleanup?: () => void })._cleanup = () => {
            item.removeEventListener("mouseenter", onEnter);
            item.removeEventListener("mouseleave", onLeave);
        };
      });

      // Timeline for Menu Open/Close
      const navWrap = navWrapRef.current;
      const menu = menuRef.current;
      const overlay = overlayRef.current;
      const bgPanels = document.querySelectorAll(".backdrop-layer");
      const menuLinks = document.querySelectorAll(".nav-link");
      
      const menuButtonIcon = containerRef.current!.querySelector(".menu-button-icon")!;
      const menuButtonCloseIcon = containerRef.current!.querySelector(".menu-button-close-icon")!;

      // Ensure elements are initially set up correctly for GSAP
      gsap.set(navWrap, { display: "none" });
      
      tl.current = gsap.timeline({ paused: true })
          .set(navWrap, { display: "block" })
          .set(menu, { xPercent: 0 })
          .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 })
          .fromTo(menuButtonIcon, { scale: 1, opacity: 1, rotate: 0 }, { scale: 0, opacity: 0, rotate: 90, duration: 0.3 }, "<")
          .fromTo(menuButtonCloseIcon, { scale: 0, opacity: 0, rotate: -90 }, { scale: 1, opacity: 1, rotate: 0, duration: 0.3 }, "<")
          .fromTo(bgPanels, { xPercent: 101 }, { xPercent: 0, stagger: 0.12, duration: 0.575 }, "<")
          .fromTo(menuLinks, { yPercent: 140, rotate: 10 }, { yPercent: 0, rotate: 0, stagger: 0.05 }, "<+=0.35");
          
    }, containerRef); // containerRef helps scope cleanup

    return () => {
        ctx.revert();
        const items = document.querySelectorAll(".menu-list-item[data-shape]");
        items.forEach((item: Element) => {
            const htmlItem = item as HTMLElement & { _cleanup?: () => void };
            htmlItem._cleanup && htmlItem._cleanup();
        });
    };
  }, [mounted]);

  // Play or reverse timeline based on isMenuOpen state
  useEffect(() => {
      if (tl.current) {
          if (isMenuOpen) {
              tl.current.play();
          } else {
              tl.current.reverse();
          }
      }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape" && isMenuOpen) {
            setIsMenuOpen(false);
        }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div ref={containerRef} className="md:hidden">
      {/* Burger Button */}
      <button 
        className="nav-close-btn relative z-[60] flex items-center justify-center w-10 h-10 bg-black text-white rounded-full transition-transform active:scale-95" 
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        <Menu className="menu-button-icon absolute w-5 h-5" />
        <X className="menu-button-close-icon absolute w-5 h-5 opacity-0 scale-0" />
      </button>

      {/* Fullscreen Overlay using Portal to escape CSS transforms */}
      {mounted && createPortal(
        <section className="fullscreen-menu-container md:hidden">
          <div ref={navWrapRef} data-nav={isMenuOpen ? "open" : "closed"} className="nav-overlay-wrapper fixed inset-0 z-[100] hidden">
            <div ref={overlayRef} className="overlay absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0" onClick={closeMenu}></div>
            <nav ref={menuRef} className="menu-content absolute top-0 right-0 w-[85vw] h-full bg-[#131313] shadow-2xl flex flex-col translate-x-[120%] overflow-hidden">
              <div className="menu-bg absolute inset-0 pointer-events-none">
                <div className="backdrop-layer first absolute inset-0 bg-zinc-900 translate-x-[101%]"></div>
                <div className="backdrop-layer second absolute inset-0 bg-zinc-950 translate-x-[101%]"></div>
                <div className="backdrop-layer absolute inset-0 bg-[#131313] translate-x-[101%]"></div>

                <div ref={shapesContainerRef} className="ambient-background-shapes absolute inset-0 opacity-40 mix-blend-screen">
                  <svg className="bg-shape bg-shape-1 absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 [&.active]:opacity-100" viewBox="0 0 400 400" fill="none">
                    <circle className="shape-element origin-center" cx="80" cy="120" r="40" fill="rgba(99,102,241,0.15)" />
                    <circle className="shape-element origin-center" cx="300" cy="80" r="60" fill="rgba(139,92,246,0.12)" />
                  </svg>
                  <svg className="bg-shape bg-shape-2 absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 [&.active]:opacity-100" viewBox="0 0 400 400" fill="none">
                    <path className="shape-element origin-center" d="M0 200 Q100 100, 200 200 T 400 200" stroke="rgba(99,102,241,0.2)" strokeWidth="60" fill="none" />
                  </svg>
                  <svg className="bg-shape bg-shape-3 absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 [&.active]:opacity-100" viewBox="0 0 400 400" fill="none">
                    <circle className="shape-element origin-center" cx="50" cy="50" r="8" fill="rgba(99,102,241,0.3)" />
                    <circle className="shape-element origin-center" cx="150" cy="50" r="8" fill="rgba(139,92,246,0.3)" />
                  </svg>
                  <svg className="bg-shape bg-shape-4 absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 [&.active]:opacity-100" viewBox="0 0 400 400" fill="none">
                    <path className="shape-element origin-center" d="M100 100 Q150 50, 200 100 Q250 150, 200 200 Q150 250, 100 200 Q50 150, 100 100" fill="rgba(99,102,241,0.12)" />
                  </svg>
                </div>
              </div>

              <div className="menu-content-wrapper relative z-10 flex-1 flex flex-col justify-center px-8 sm:px-12">
                <ul className="menu-list flex flex-col gap-6 m-0 p-0 list-none">
                  <li className="menu-list-item overflow-hidden" data-shape="1">
                    <Link href="/#work" className="nav-link relative block text-5xl font-bold tracking-tight text-white translate-y-[140%] rotate-[10deg] no-underline hover:text-indigo-400 transition-colors" onClick={closeMenu}>
                      Práce
                    </Link>
                  </li>
                  <li className="menu-list-item overflow-hidden" data-shape="2">
                    <Link href="/#expertise" className="nav-link relative block text-5xl font-bold tracking-tight text-white translate-y-[140%] rotate-[10deg] no-underline hover:text-indigo-400 transition-colors" onClick={closeMenu}>
                      Expertíza
                    </Link>
                  </li>
                  <li className="menu-list-item overflow-hidden" data-shape="3">
                    <Link href="/#about" className="nav-link relative block text-5xl font-bold tracking-tight text-white translate-y-[140%] rotate-[10deg] no-underline hover:text-indigo-400 transition-colors" onClick={closeMenu}>
                      O mně
                    </Link>
                  </li>
                  <li className="menu-list-item overflow-hidden" data-shape="4">
                    <Link href="/#contact" className="nav-link relative block text-5xl font-bold tracking-tight text-white translate-y-[140%] rotate-[10deg] no-underline hover:text-indigo-400 transition-colors" onClick={closeMenu}>
                      Kontakt
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </section>,
        document.body
      )}
    </div>
  );
}

