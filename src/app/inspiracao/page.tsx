"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { FadeIn } from "@/components/ui/fade-in";

const INSPIRATIONS = [
  { title: "Look minimal dourado", desc: "Combinação elegante para oferta de aniversário." },
  { title: "Tema floral delicado", desc: "Perfeito para peças de dia da mãe e madrinhas." },
  { title: "Conjunto cerimónia", desc: "Kit completo com linguagem visual consistente." },
  { title: "Memória de casamento", desc: "Flores preservadas e data especial gravada." },
  { title: "Efeito oceano", desc: "Texturas e cores de mar para decoração moderna." },
  { title: "Coleção brilho rosa", desc: "Acabamentos cintilantes sem exagero visual." },
  { title: "Porta-chaves com inicial", desc: "Peça rápida de produção e ótima para lembrança." },
  { title: "Edição limitada", desc: "Modelos sazonais em pequenas quantidades." },
];

export default function Inspiracao() {
  return (
    <>
      <Navbar />
      
      <main className="min-h-screen pt-32 pb-24 px-6 max-w-[1100px] mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <h1 className="font-serif text-[clamp(2rem,5vw,3.5rem)] text-[var(--color-dark)] mb-4">
              Galeria de Inspiração
            </h1>
            <p className="text-[#999] max-w-[600px] mx-auto mb-8">
              Uma seleção de estilos, cores e temas para te ajudar a imaginar a tua próxima peça. Desde lembranças delicadas a conjuntos decorativos arrojados.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <a 
                href="https://wa.me/351913685068?text=Olá!%20Quero%20uma%20peça%20inspirada%20na%20galeria%20✨" 
                target="_blank"
                className="bg-[#25d366] text-white px-6 py-3 rounded-full font-bold shadow-md transition-all hover:scale-105 hover:shadow-lg"
              >
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </FadeIn>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {INSPIRATIONS.map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="break-inside-avoid bg-white p-6 rounded-2xl shadow-sm border border-[rgba(26,8,16,0.08)] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-[rgba(201,168,76,0.3)] group">
                <div className="w-full h-40 bg-[var(--color-cream-dark)] rounded-xl mb-4 overflow-hidden relative">
                  {/* Placeholder for images if they are added later */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-cream-dark)] to-[rgba(201,168,76,0.2)] opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center text-[var(--color-gold-light)] text-opacity-50 text-4xl font-serif">
                    ✨
                  </div>
                </div>
                <h3 className="font-serif text-xl text-[var(--color-dark)] mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
