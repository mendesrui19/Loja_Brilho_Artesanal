"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { FadeIn } from "@/components/ui/fade-in";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ClientInstagramEmbed } from "@/components/ui/client-instagram-embed";

const LABELS: Record<string, string> = {
  all: "Todas",
  "porta-chaves": "Porta-chaves",
  bases: "Bases",
  decoracao: "Decoração",
  especiais: "Especiais"
};

export default function Catalogo() {
  const [posts, setPosts] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [renderingInsta, setRenderingInsta] = useState(true);

  useEffect(() => {
    fetch("/api/feed")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch catalog data", err);
        setLoading(false);
      });
  }, []);

  // loading is the only state we need for the skeleton now
  useEffect(() => {
    if (!loading) {
      setRenderingInsta(false);
    }
  }, [loading]);

  const filteredPosts = posts.filter(post => filter === "all" || post.category === filter);

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen pt-32 pb-24 px-6 max-w-[1200px] mx-auto">
        <FadeIn>
          <div className="text-center mb-12">
            <h1 className="font-serif text-[clamp(2rem,5vw,3.5rem)] text-[var(--color-dark)] mb-4">
              Catálogo de Peças
            </h1>
            <p className="text-[#999] max-w-[600px] mx-auto mb-8">
              Navega pelas nossas criações anteriores. Se vires algo que adoras, envia-nos mensagem. Todas as peças podem ser recriadas ou adaptadas ao teu gosto!
            </p>

            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-3">
              {Object.entries(LABELS).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    filter === key
                      ? "bg-[var(--color-brand)] text-white shadow-md scale-105"
                      : "bg-white border border-[rgba(26,8,16,0.15)] text-[var(--color-dark)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        <div className="relative min-h-[400px]">
          {/* LOADER OVERLAY */}
          {(loading || renderingInsta) && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-start pt-20 bg-[#faf8f5]/80 backdrop-blur-sm rounded-3xl">
              <div className="relative w-36 h-36 rounded-full shadow-[0_0_40px_rgba(201,168,76,0.2)] animate-pulse">
                 <div className="absolute inset-0 border-4 border-[var(--color-gold)]/20 rounded-full" />
                 <div className="absolute inset-0 border-4 border-[var(--color-gold)] rounded-full animate-spin border-t-transparent" style={{ animationDuration: '2s' }} />
                 <div className="w-full h-full overflow-hidden rounded-full p-2">
                   <img src="/logo.jpg" alt="A carregar..." className="w-full h-full object-cover scale-[1.35]" />
                 </div>
              </div>
              <p className="text-[var(--color-gold)] font-serif tracking-widest uppercase text-sm animate-pulse mt-6">
                A carregar as peças...
              </p>
            </div>
          )}

          {/* GRID */}
          <motion.div 
            id="insta-grid"
            layout 
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-700 ${(loading || renderingInsta) ? 'opacity-0' : 'opacity-100'}`}
          >
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="relative flex-grow flex flex-col bg-white/60 backdrop-blur-xl border border-white p-3 md:p-4 rounded-[2rem] shadow-[0_8px_30px_rgba(139,26,74,0.06)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(139,26,74,0.15)] hover:-translate-y-2 hover:bg-white/80 group h-full"
                >
                  {/* Decorative Pin/Dot */}
                  <div className="absolute top-6 left-6 w-2 h-2 rounded-full bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-rose)] z-20 shadow-sm" />

                  <div className="rounded-[1.5rem] overflow-hidden bg-white flex-grow flex flex-col group/card h-full relative">
                    {/* The clickable overlay for the whole card */}
                    <Link href={`/produto/${post.id}`} className="absolute inset-0 z-20" aria-label={`Ver detalhes de ${post.title}`} />
                    
                    {/* Image Container */}
                    <div className="relative w-full aspect-[4/5] bg-gray-50 overflow-hidden flex items-center justify-center pointer-events-none group-hover/card:scale-105 transition-transform duration-700">
                      {post.local_image_url ? (
                        <img 
                          src={post.local_image_url} 
                          alt={post.title} 
                          className="w-full h-full object-cover" 
                          loading="lazy" 
                        />
                      ) : (
                        <div className="absolute top-[-58px] left-[-2px] right-[-2px] w-[calc(100%+4px)]">
                          <ClientInstagramEmbed url={post.permalink} width="100%" captioned={false} />
                        </div>
                      )}
                      
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-100 z-10" />
                    </div>
                    
                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow bg-white relative z-10 pointer-events-none">
                      <h3 className="font-serif text-xl text-[var(--color-dark)] line-clamp-2 mb-3 leading-tight">
                        {post.title}
                      </h3>
                      <div className="mt-auto flex items-center justify-between text-[var(--color-rose-mid)] font-bold text-sm tracking-wide uppercase pt-4 border-t border-gray-100">
                        <span className="flex items-center">
                          Ver Detalhes
                          <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/card:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {filteredPosts.length === 0 && (
              <div className="col-span-full text-center py-24 text-gray-500">
                Nenhum produto encontrado nesta categoria.
              </div>
            )}
          </motion.div>
        </div>

        {!loading && (
          <div className="mt-24 p-10 md:p-16 rounded-[3rem] bg-gradient-to-br from-[var(--color-cream-dark)] to-white text-center shadow-[0_20px_50px_rgba(139,26,74,0.05)] border border-pink-100 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-pink-50/50 to-transparent pointer-events-none" />
            
            <span className="block text-[0.7rem] tracking-[4px] uppercase text-[var(--color-gold)] mb-4 font-bold relative z-10">
              ✦ Catálogo Completo ✦
            </span>
            <h3 className="font-serif text-[clamp(2rem,4vw,3rem)] text-[var(--color-dark)] mb-6 relative z-10 leading-[1.1]">
              A verdadeira magia está nas<br/>
              <em className="not-italic text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-rose)]">nossas redes sociais</em>
            </h3>
            
            <p className="text-gray-600 mb-8 max-w-[700px] mx-auto leading-relaxed text-base md:text-lg relative z-10">
              O nosso site mostra apenas uma <strong>pequena seleção</strong> do nosso trabalho. Para veres o nosso <strong>catálogo completo</strong>, com vídeos detalhados de cada peça, o processo de criação nos bastidores e Destaques organizados por temas, segue-nos!
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-5 relative z-10">
              <a href="https://www.instagram.com/brilho__artesanal/" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 bg-gradient-to-r from-pink-500 to-purple-500 px-8 py-4 rounded-full text-base font-bold text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                Instagram
              </a>
              <a href="https://tiktok.com/@brilho__artesanal" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 bg-black px-8 py-4 rounded-full text-base font-bold text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
                TikTok
              </a>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
