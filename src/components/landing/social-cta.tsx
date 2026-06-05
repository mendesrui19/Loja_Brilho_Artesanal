"use client";

import { FadeIn } from "@/components/ui/fade-in";

export function SocialCTA() {
  return (
    <section className="relative py-28 px-6 bg-white overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pink-100/50 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--color-cream-dark)] rounded-full blur-[80px] pointer-events-none -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-[1000px] mx-auto relative z-10">
        <FadeIn>
          <div className="bg-gradient-to-br from-[var(--color-cream-dark)] to-white border border-pink-100/50 rounded-[3rem] p-10 md:p-16 shadow-[0_20px_50px_rgba(139,26,74,0.05)] text-center relative overflow-hidden">
            
            {/* Inner glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-pink-50/50 to-transparent pointer-events-none" />

            <span className="block text-[0.75rem] tracking-[4px] uppercase text-[var(--color-gold)] mb-4 font-bold relative z-10">
              ✦ O Nosso Catálogo Completo ✦
            </span>
            
            <h2 className="font-serif text-[clamp(2.2rem,5vw,3.5rem)] text-[var(--color-dark)] mb-6 leading-[1.1] relative z-10">
              A magia acontece nas<br />
              <em className="not-italic text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-rose)]">redes sociais</em>
            </h2>

            <p className="text-gray-600 text-base md:text-lg max-w-[650px] mx-auto mb-10 leading-relaxed relative z-10">
              O nosso site tem apenas uma pequena amostra. Para explorares o nosso <strong>portfólio completo</strong>, não deixes de visitar o nosso Instagram e TikTok! É lá que publicamos:
            </p>

            <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 mb-12 relative z-10">
              <div className="flex items-center justify-center gap-2 text-[var(--color-rose-mid)] font-medium">
                <span className="text-xl">✨</span> Vídeos dos Detalhes
              </div>
              <div className="flex items-center justify-center gap-2 text-[var(--color-rose-mid)] font-medium">
                <span className="text-xl">📱</span> Destaques Especiais
              </div>
              <div className="flex items-center justify-center gap-2 text-[var(--color-rose-mid)] font-medium">
                <span className="text-xl">📦</span> Processo Criativo
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-5 relative z-10 mb-8">
              <a 
                href="https://www.instagram.com/brilho__artesanal/" 
                target="_blank" 
                rel="noreferrer" 
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-pink-500 to-purple-500 px-8 py-4 rounded-full text-base font-bold text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                Ver no Instagram
              </a>
              
              <a 
                href="https://tiktok.com/@brilho__artesanal" 
                target="_blank" 
                rel="noreferrer" 
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-black px-8 py-4 rounded-full text-base font-bold text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
                Ver no TikTok
              </a>
            </div>

            <div className="relative z-10 pt-8 border-t border-[rgba(139,26,74,0.1)]">
              <p className="text-gray-500 mb-4 text-sm">Desde porta-chaves com a tua inicial a memórias do teu casamento eternizadas.</p>
              <a 
                href="/catalogo"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-[var(--color-rose-mid)] text-[var(--color-rose-mid)] text-sm font-bold tracking-wide transition-all hover:bg-[var(--color-rose-mid)] hover:text-white"
              >
                Explorar seleção no site →
              </a>
            </div>

          </div>
        </FadeIn>
      </div>
    </section>
  );
}
