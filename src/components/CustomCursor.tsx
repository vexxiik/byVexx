'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "power2.out" });
      gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.3, ease: "power2.out" });
    };

    const onMouseHover = () => {
      gsap.to(cursor, { scale: 1.5, backgroundColor: "transparent", border: "1px solid #171717", duration: 0.2 });
      gsap.to(follower, { scale: 0.5, duration: 0.2 });
    };

    const onMouseLeave = () => {
      gsap.to(cursor, { scale: 1, backgroundColor: "#171717", border: "none", duration: 0.2 });
      gsap.to(follower, { scale: 1, duration: 0.2 });
    };

    window.addEventListener('mousemove', onMouseMove);
    
    // Add hover effects to links and buttons
    const interactiveElements = document.querySelectorAll('a, button');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', onMouseHover);
      el.addEventListener('mouseleave', onMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseHover);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 bg-[#171717] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 border border-[#171717]/30 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
      />
    </>
  );
}
