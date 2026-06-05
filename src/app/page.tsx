"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { FadeIn } from "@/components/ui/fade-in";
import { ProductCarousel } from "@/components/landing/product-carousel";
import { AboutAndProcess } from "@/components/landing/about-and-process";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.2;
    }
  }, []);

  return (
    <>
      <Navbar />
      
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden bg-gradient-to-br from-[#1a0810] via-[#2d1020] to-[#1a0810]">
        {/* Video Background */}
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none mix-blend-screen"
        >
          <source src="/banner_brilho.mp4" type="video/mp4" />
        </video>

        {/* Background Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ x: [0, 50, 0], y: [0, 40, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[600px] h-[600px] rounded-full blur-[90px] bg-[radial-gradient(circle,rgba(139,26,74,0.5),transparent)] -top-[150px] -left-[150px]"
          />
          <motion.div 
            animate={{ x: [0, -50, 0], y: [0, 40, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 9, delay: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[450px] h-[450px] rounded-full blur-[90px] bg-[radial-gradient(circle,rgba(201,168,76,0.3),transparent)] -bottom-[100px] -right-[100px]"
          />
          <motion.div 
            animate={{ x: [0, 30, 0], y: [0, -40, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 12, delay: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[350px] h-[350px] rounded-full blur-[90px] bg-[radial-gradient(circle,rgba(196,96,122,0.25),transparent)] top-[40%] left-[40%]"
          />
        </div>

        <div className="relative z-10 px-6 max-w-[900px]">
          <FadeIn delay={0.1}>
            <div className="inline-flex items-center gap-2 bg-[rgba(201,168,76,0.12)] border border-[rgba(201,168,76,0.4)] text-[var(--color-gold-light)] text-xs tracking-[3px] uppercase px-5 py-2 rounded-full mb-8">
              ✦ Arte em Resina Epóxi · Felgueiras, Portugal ✦
            </div>
          </FadeIn>
          
          <FadeIn delay={0.3}>
            <h1 className="font-serif text-[clamp(3rem,7.5vw,6.5rem)] text-white leading-[1.05] mb-4">
              Peças únicas<br />
              que <em className="not-italic text-transparent bg-clip-text bg-gradient-to-br from-[var(--color-gold)] via-[var(--color-gold-light)] to-[var(--color-rose-light)]">brilham</em><br />
              como tu
            </h1>
          </FadeIn>

          <FadeIn delay={0.5}>
            <p className="text-[clamp(1rem,2vw,1.15rem)] text-white/60 font-light leading-[1.7] mb-11">
              Criadas à mão com amor · 100% personalizadas · Cada peça conta a tua história
            </p>
          </FadeIn>

          <FadeIn delay={0.7} className="flex gap-4 justify-center flex-wrap">
            <a 
              href="https://wa.me/351913685068?text=Olá!%20Vim%20do%20site%20e%20quero%20fazer%20uma%20encomenda%20✨" 
              target="_blank" 
              className="inline-flex items-center gap-2 bg-[#25d366] text-white px-8 py-4 rounded-full font-semibold text-sm shadow-[0_8px_28px_rgba(37,211,102,0.35)] transition-all hover:-translate-y-1 hover:shadow-[0_16px_44px_rgba(37,211,102,0.5)]"
            >
              <svg width="19" height="19" viewBox="0 0 32 32" fill="none"><path d="M16 2C8.268 2 2 8.268 2 16c0 2.4.63 4.65 1.73 6.6L2 30l7.6-1.7A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2z" fill="#fff"/><path d="M23.3 20.1c-.32-.16-1.9-.94-2.2-1.04-.3-.1-.52-.16-.74.16-.22.32-.86 1.04-1.04 1.26-.18.22-.38.24-.7.08-.32-.16-1.34-.5-2.54-1.58-.94-.84-1.58-1.88-1.76-2.2-.18-.32-.02-.5.14-.66.14-.14.32-.38.48-.56.16-.18.22-.32.32-.54.1-.22.06-.4-.02-.56-.08-.16-.74-1.78-1.02-2.44-.26-.64-.54-.56-.74-.56h-.62c-.22 0-.56.08-.86.4-.3.32-1.12 1.1-1.12 2.68 0 1.58 1.14 3.1 1.3 3.32.16.22 2.24 3.42 5.44 4.8.76.32 1.36.52 1.82.66.76.24 1.46.2 2 .12.62-.1 1.9-.78 2.16-1.52.26-.74.26-1.38.18-1.52-.08-.12-.28-.2-.6-.36z" fill="#25d366"/></svg>
              Encomendar agora
            </a>
            <Link 
              href="/catalogo" 
              className="inline-flex items-center gap-2 border-[1.5px] border-white/35 text-white px-8 py-4 rounded-full text-sm transition-all hover:border-[var(--color-gold-light)] hover:text-[var(--color-gold-light)] hover:-translate-y-1"
            >
              Ver catálogo ↓
            </Link>
          </FadeIn>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-[1px] h-[52px] bg-gradient-to-b from-[rgba(201,168,76,0.7)] to-transparent mx-auto" />
        </motion.div>
      </section>

      {/* TRUST BAR */}
      <section className="relative z-10 bg-[var(--color-dark)] grid grid-cols-2 md:grid-cols-4">
        {[
          { num: "113+", label: "Peças criadas" },
          { num: "100%", label: "Personalizadas" },
          { num: "⭐ 5.0", label: "Avaliação" },
          { num: "💕", label: "Feitas com amor" }
        ].map((item, i) => (
          <FadeIn key={item.label} delay={i * 0.1} className="p-9 text-center border-r border-white/5 last:border-0">
            <span className="font-serif text-[2.6rem] font-bold text-transparent bg-clip-text bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-gold-light)] block mb-1">
              {item.num}
            </span>
            <span className="text-white/45 text-xs tracking-[2px] uppercase">
              {item.label}
            </span>
          </FadeIn>
        ))}
      </section>

      <ProductCarousel />

      {/* COMBINED ABOUT & PROCESS */}
      <AboutAndProcess />

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1a0810] via-[#3a0a25] to-[#1a0810] py-28 px-6 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(201,168,76,0.12),transparent)]" />
        <div className="relative z-10">
          <FadeIn>
            <h2 className="font-serif text-[clamp(2rem,4.5vw,3.8rem)] text-white mb-4 leading-[1.15]">
              Pronta para criar<br/>
              <em className="not-italic text-transparent bg-clip-text bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-gold-light)]">a tua peça de sonho?</em>
            </h2>
            <p className="text-white/55 text-lg mb-11">Envia-nos uma mensagem. Adoramos falar sobre novas ideias!</p>
            <a 
              href="https://wa.me/351913685068" 
              target="_blank"
              className="inline-flex items-center gap-2 bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-gold-light)] text-[var(--color-dark)] px-10 py-4 rounded-full font-bold text-[0.95rem] shadow-[0_8px_36px_rgba(201,168,76,0.4)] transition-all hover:-translate-y-1 hover:shadow-[0_20px_56px_rgba(201,168,76,0.55)]"
            >
              Falar no WhatsApp
            </a>
          </FadeIn>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
