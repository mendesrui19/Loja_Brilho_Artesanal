"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pathname = usePathname();
  const isHome = pathname === "/";
  const shouldHaveBg = scrolled || !isHome;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-400 px-6 md:px-12 py-4 flex items-center justify-between",
        shouldHaveBg
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
          { label: "Início", href: "/" },
          { label: "Porta-chaves", href: "/catalogo?categoria=porta-chaves" },
          { label: "Decoração", href: "/catalogo?categoria=decoracao" },
          { label: "Especiais", href: "/catalogo?categoria=especiais" },
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

      {/* Mobile Menu Toggle */}
      <button 
        className="md:hidden text-[var(--color-gold-light)] p-2"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {mobileMenuOpen ? (
            <><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></>
          ) : (
            <><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></>
          )}
        </svg>
      </button>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[rgba(26,8,16,0.98)] backdrop-blur-xl border-b border-[rgba(201,168,76,0.2)] md:hidden flex flex-col items-center py-6 shadow-2xl">
          <ul className="flex flex-col gap-6 list-none m-0 p-0 items-center">
            {[
              { label: "Início", href: "/" },
              { label: "Porta-chaves", href: "/catalogo?categoria=porta-chaves" },
              { label: "Decoração", href: "/catalogo?categoria=decoracao" },
              { label: "Especiais", href: "/catalogo?categoria=especiais" },
            ].map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white hover:text-[var(--color-gold-light)] text-sm tracking-widest uppercase transition-colors block py-2"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="flex items-center gap-6 mt-4 pt-6 border-t border-white/10 w-full justify-center">
              <a href="https://www.instagram.com/brilho__artesanal/" target="_blank" rel="noreferrer" className="text-white/75 hover:text-[var(--color-gold-light)] transition-colors">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://tiktok.com/@brilho__artesanal" target="_blank" rel="noreferrer" className="text-white/75 hover:text-[var(--color-gold-light)] transition-colors">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      )}
    </motion.nav>
  );
}
