'use client';

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export function SterlingGateKineticNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggle = () => setIsOpen(!isOpen);

  const links = [
    { name: "Práce", href: "/#work" },
    { name: "Expertíza", href: "/#expertise" },
    { name: "O mně", href: "/#about" },
    { name: "Reference", href: "/#results" },
    { name: "Kontakt", href: "/#contact" }
  ];

  return (
    <div className="md:hidden">
      <button onClick={toggle} className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-md z-50 relative">
        <Menu className="w-6 h-6" />
      </button>

      {mounted && isOpen && createPortal(
        <div className="fixed inset-0 bg-white z-[9999] flex flex-col pt-24 px-8 gap-8 overflow-y-auto">
          <button onClick={toggle} className="absolute top-6 right-6 flex items-center justify-center w-10 h-10 bg-black text-white rounded-md">
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex flex-col gap-6 mt-12">
            {links.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="text-3xl font-bold text-black border-b border-gray-100 pb-4"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

