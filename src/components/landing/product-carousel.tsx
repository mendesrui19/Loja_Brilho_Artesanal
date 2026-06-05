"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export function ProductCarousel() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/feed")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch carousel data", err);
        setLoading(false);
      });
  }, []);

  return <CarouselContent posts={posts} loading={loading} />;
}

function CarouselContent({ posts, loading }: { posts: any[], loading: boolean }) {
  const carouselRef = useRef<HTMLDivElement>(null);

  // Scroll Progress for the carousel
  const { scrollXProgress } = useScroll({ container: carouselRef });
  const progressBarWidth = useTransform(scrollXProgress, [0, 1], ["15%", "100%"]);

  return (
    <section className="py-32 bg-[var(--color-cream-dark)] relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-pink-200/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-200/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
        <FadeIn>
          <span className="block text-[0.68rem] tracking-[4px] uppercase text-[var(--color-gold)] mb-3 font-bold">
            ✦ Em Destaque ✦
          </span>
          <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] text-[var(--color-dark)] leading-[1.2]">
            Uma galeria de<br />
            <em className="not-italic text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-rose)]">peças únicas</em>
          </h2>
        </FadeIn>
        
        <FadeIn delay={0.2} className="flex flex-col items-start md:items-end gap-5">
          <p className="text-gray-500 max-w-[300px] text-sm md:text-base md:text-right">
            Desliza para explorar algumas das nossas criações favoritas, desenhadas com amor e resina.
          </p>
          <Link 
            href="/catalogo"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-[var(--color-gold)] text-[var(--color-gold)] text-sm font-bold tracking-wide transition-all hover:bg-[var(--color-gold)] hover:text-white"
          >
            Ver todo o catálogo →
          </Link>
        </FadeIn>
      </div>

      <div className="relative w-full z-10">
        <div className="relative w-full">
          <div 
            id="carousel-grid"
            ref={carouselRef}
            className={`flex items-stretch overflow-x-auto snap-x snap-mandatory gap-6 md:gap-10 px-6 md:px-[10vw] pb-16 pt-4 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}
          >
            {posts.map((post, i) => (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="snap-center shrink-0 w-[85vw] max-w-[380px] relative group flex flex-col"
              >
                {/* Premium Glass Card Wrapper */}
                <div className="relative flex-grow flex flex-col bg-white/60 backdrop-blur-xl border border-white p-3 md:p-4 rounded-[2rem] shadow-[0_8px_30px_rgba(139,26,74,0.06)] transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(139,26,74,0.15)] group-hover:-translate-y-2 group-hover:bg-white/80">
                  
                  {/* Decorative Pin/Dot */}
                  <div className="absolute top-6 left-6 w-2 h-2 rounded-full bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-rose)] z-20 shadow-sm" />

                  <div className="rounded-[1.5rem] overflow-hidden bg-white flex-grow flex flex-col group/card h-full relative">
                    {/* The clickable overlay for the whole card */}
                    <Link href={`/produto/${post.id}`} className="absolute inset-0 z-20" aria-label={`Ver detalhes de ${post.title}`} />
                    
                    {/* Image Container */}
                    <div className="relative w-full aspect-square bg-gray-50 overflow-hidden flex items-center justify-center pointer-events-none group-hover/card:scale-105 transition-transform duration-700">
                      {post.local_image_url ? (
                        <img 
                          src={post.local_image_url} 
                          alt={post.title} 
                          className="w-full h-full object-contain" 
                          loading="lazy" 
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 text-gray-300">
                          <svg className="w-8 h-8 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
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
                      <div className="mt-auto flex items-center text-[var(--color-rose-mid)] font-bold text-sm tracking-wide uppercase pt-4">
                        <span>Ver Detalhes</span>
                        <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/card:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Spacer at the end so the last card can be centered */}
            <div className="shrink-0 w-[10vw] md:w-[30vw]" />
          </div>
        </div>

        {/* Custom Progress Bar */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-[10vw]">
          <div className="h-1 w-full bg-gray-200/50 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-[var(--color-rose-mid)] to-[var(--color-gold)] rounded-full"
              style={{ width: progressBarWidth }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
