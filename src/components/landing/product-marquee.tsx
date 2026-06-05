"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";

export function ProductMarquee() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/feed")
      .then((res) => res.json())
      .then((data) => {
        // Pick diverse posts across categories
        const selected = data.slice(0, 8);
        setPosts(selected);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading || posts.length === 0) return null;

  const doubled = [...posts, ...posts];

  return (
    <section className="py-24 bg-white overflow-hidden relative">
      <FadeIn>
        <div className="text-center mb-12 px-6">
          <span className="block text-[0.68rem] tracking-[4px] uppercase text-[var(--color-gold)] mb-3 font-bold">
            ✦ Em Destaque ✦
          </span>
          <h2 className="font-serif text-[clamp(2rem,4vw,2.8rem)] text-[var(--color-dark)] leading-[1.2]">
            Favoritos de<br />
            <em className="not-italic text-transparent bg-clip-text bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-rose-light)]">quem nos escolhe</em>
          </h2>
        </div>
      </FadeIn>

      <div className="relative flex w-full max-w-[100vw] overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex w-fit animate-marquee hover:[animation-play-state:paused] py-4">
          {doubled.map((post, i) => (
            <Link
              key={`${post.id}-${i}`}
              href={`/produto/${post.id}`}
              className="w-[260px] md:w-[300px] mx-3 shrink-0 group"
            >
              <div className="rounded-2xl overflow-hidden bg-[var(--color-cream-dark)] shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 border border-pink-50">
                <div className="aspect-square overflow-hidden relative bg-white flex items-center justify-center">
                  {post.local_image_url ? (
                    <img
                      src={post.local_image_url}
                      alt={post.title}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 gap-3">
                      <svg className="w-8 h-8 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10 pointer-events-none" />
                </div>
                <div className="px-5 py-4 bg-white relative z-20">
                  <p className="text-sm font-medium text-[var(--color-dark)] line-clamp-1">{post.title}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
