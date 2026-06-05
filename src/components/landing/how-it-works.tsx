"use client";

import { FadeIn } from "@/components/ui/fade-in";

export function HowItWorks() {
  const steps = [
    { title: "A Tua Visão", desc: "Tudo começa com uma mensagem. Conta-me a tua ideia, as tuas cores favoritas e a ocasião. Juntas, desenhamos a peça perfeita." },
    { title: "Escolha de Elementos", desc: "Seleciono com cuidado as flores preservadas, os pigmentos e os brilhos exatos que vão dar vida à tua peça exclusiva." },
    { title: "A Magia da Resina", desc: "A resina é misturada e vertida com todo o cuidado. Durante os dias de cura, a tua peça ganha a sua forma final, cristalina e brilhante." },
    { title: "O Presente Perfeito", desc: "A tua peça é polida e embalada com todo o amor (e um cheirinho delicioso!) pronta para te surpreender a ti ou a quem mais amas." }
  ];

  return (
    <section className="relative py-24 px-6 bg-[var(--color-cream-dark)] overflow-hidden">
      {/* Soft background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-pink-200/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[800px] mx-auto">
        <FadeIn>
          <div className="mb-16 text-center">
            <span className="block text-[0.68rem] tracking-[4px] uppercase text-[var(--color-rose-mid)] mb-3 font-bold">
              ✦ Como Funciona ✦
            </span>
            <h2 className="font-serif text-[clamp(2.2rem,4vw,3.2rem)] text-[var(--color-dark)] leading-[1.2]">
              O processo de criar a tua<br/>
              <em className="not-italic text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-rose)]">peça de sonho</em>
            </h2>
          </div>

          <div className="relative border-l-2 border-[rgba(139,26,74,0.1)] ml-[1.125rem] md:ml-[50%] md:border-l-0 flex flex-col gap-12">
            
            {/* Desktop Center Line */}
            <div className="hidden md:block absolute top-0 bottom-0 left-0 w-[2px] bg-[rgba(139,26,74,0.1)]" />

            {steps.map((step, i) => (
              <div key={i} className={`relative flex flex-col md:flex-row ${i % 2 === 0 ? 'md:flex-row-reverse' : ''} items-start md:items-center pl-10 md:pl-0`}>
                
                {/* Timeline Dot */}
                <div className={`absolute -left-[30px] md:left-[-14px] top-1 md:top-auto w-7 h-7 rounded-full bg-white border-4 border-[var(--color-gold)] flex items-center justify-center shadow-sm z-10`}>
                  <div className="w-2 h-2 rounded-full bg-[var(--color-rose-mid)]" />
                </div>
                
                {/* Content Box */}
                <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:pl-16' : 'md:pr-16 md:text-right'}`}>
                  <span className="text-[var(--color-gold)] font-bold text-xs uppercase tracking-wider mb-2 block">Passo {i + 1}</span>
                  <h3 className="text-xl md:text-2xl font-serif text-[var(--color-dark)] mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-base leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
