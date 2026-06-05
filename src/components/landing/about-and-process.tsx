"use client";

import { FadeIn } from "@/components/ui/fade-in";
import Link from "next/link";

export function AboutAndProcess() {
  const steps = [
    { title: "A Tua Visão", desc: "Tudo começa com uma mensagem. Conta-me a tua ideia, as tuas cores favoritas e a ocasião. Juntas, desenhamos a peça perfeita." },
    { title: "Escolha de Elementos", desc: "Seleciono com cuidado as flores preservadas, os pigmentos e os brilhos exatos que vão dar vida à tua peça exclusiva." },
    { title: "A Magia da Resina", desc: "A resina é misturada e vertida com todo o cuidado. Durante os dias de cura, a tua peça ganha a sua forma final, cristalina e brilhante." },
    { title: "O Presente Perfeito", desc: "A tua peça é polida e embalada com todo o amor (e um cheirinho delicioso!) pronta para te surpreender a ti ou a quem mais amas." }
  ];

  return (
    <section className="relative py-28 px-6 bg-[var(--color-cream-dark)] overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pink-100/50 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white rounded-full blur-[80px] pointer-events-none -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-[1300px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          
          {/* SOCIAL CTA (LEFT SIDE) */}
          <FadeIn>
            <div className="bg-white/60 backdrop-blur-md border border-white/80 rounded-[3rem] p-10 md:p-14 shadow-[0_20px_50px_rgba(139,26,74,0.05)] text-center lg:text-left relative overflow-hidden">
              <span className="block text-[0.75rem] tracking-[4px] uppercase text-[var(--color-gold)] mb-4 font-bold">
                ✦ Mais Inspiração ✦
              </span>
              
              <h2 className="font-serif text-[clamp(2rem,4vw,3.2rem)] text-[var(--color-dark)] mb-6 leading-[1.1]">
                Acompanha as novidades nas<br />
                <em className="not-italic text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-rose)]">redes sociais</em>
              </h2>

              <p className="text-gray-600 text-base md:text-lg mb-6 leading-relaxed">
                O site tem apenas uma pequena amostra do que podemos criar. Como cada peça é única e feita à medida, o nosso verdadeiro portfólio vive no Instagram e no TikTok.
              </p>
              
              <p className="text-gray-600 text-base md:text-lg mb-10 leading-relaxed">
                É por lá que partilhamos os vídeos para veres aquele brilho especial que as fotos não apanham, mostramos os bastidores das encomendas e todas as ideias novas. Passa por lá para te inspirares!
              </p>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 mb-10">
                <a 
                  href="https://www.instagram.com/brilho__artesanal/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-full sm:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-4 rounded-full text-sm font-bold text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                  className="w-full sm:w-auto flex items-center justify-center gap-3 bg-black px-6 py-4 rounded-full text-sm font-bold text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                  </svg>
                  Ver no TikTok
                </a>
              </div>

              <div className="pt-8 border-t border-[rgba(139,26,74,0.1)]">
                <p className="text-gray-500 mb-5 text-sm">Desde porta-chaves com a tua inicial a memórias do teu casamento eternizadas.</p>
                <Link 
                  href="/catalogo"
                  className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-[var(--color-rose-mid)] text-[var(--color-rose-mid)] text-sm font-bold tracking-wide transition-all hover:bg-[var(--color-rose-mid)] hover:text-white"
                >
                  Explorar seleção no site →
                </Link>
              </div>
            </div>
          </FadeIn>

          {/* PROCESS STEPS (RIGHT SIDE) */}
          <FadeIn delay={0.2} className="px-4 lg:px-10">
            <div className="relative border-l-2 border-[rgba(139,26,74,0.1)] ml-[1.125rem] md:ml-6 pl-10 md:pl-16 flex flex-col gap-12">
              {steps.map((step, i) => (
                <div key={i} className="relative">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[54px] md:-left-[78px] top-1 w-7 h-7 rounded-full bg-white border-4 border-[var(--color-gold)] flex items-center justify-center shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-[var(--color-rose-mid)]" />
                  </div>
                  
                  <span className="text-[var(--color-gold)] font-bold text-xs uppercase tracking-wider mb-2 block">Passo {i + 1}</span>
                  <h3 className="text-xl md:text-2xl font-serif text-[var(--color-dark)] mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-base leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
