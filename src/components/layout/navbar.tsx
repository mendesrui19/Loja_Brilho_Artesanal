"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-400 px-6 md:px-12 py-4 flex items-center justify-between",
        scrolled
          ? "bg-[rgba(26,8,16,0.93)] backdrop-blur-md py-3 border-b border-[rgba(201,168,76,0.2)]"
          : "bg-transparent"
      )}
    >
      <Link href="/" className="font-serif text-2xl md:text-3xl text-[var(--color-gold-light)] flex items-center gap-3 md:gap-4 decoration-transparent">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-[var(--color-gold)] overflow-hidden shrink-0 shadow-lg flex items-center justify-center">
          <img src="/logo.jpg" alt="Brilho Artesanal Logo" className="w-full h-full object-cover scale-[1.35]" />
        </div>
        Brilho Artesanal
      </Link>
      
      <ul className="hidden md:flex gap-7 list-none m-0 p-0">
        {[
          { label: "Porta-chaves", href: "/#porta-chaves" },
          { label: "Bases", href: "/#bases" },
          { label: "Decoração", href: "/#decoracao" },
          { label: "Especiais", href: "/#especiais" },
          { label: "Catálogo", href: "/catalogo" },
        ].map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="text-white/75 hover:text-[var(--color-gold-light)] text-xs tracking-widest uppercase transition-colors"
            >
              {item.label}
            </Link>
          </li>
        ))}
        {/* Socials */}
        <li className="flex items-center gap-4 ml-4 border-l border-white/10 pl-6">
          <a href="https://www.instagram.com/brilho__artesanal/" target="_blank" rel="noreferrer" className="text-white/75 hover:text-[var(--color-gold-light)] transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          <a href="https://tiktok.com/@brilho__artesanal" target="_blank" rel="noreferrer" className="text-white/75 hover:text-[var(--color-gold-light)] transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
            </svg>
          </a>
        </li>
      </ul>
    </motion.nav>
  );
}
