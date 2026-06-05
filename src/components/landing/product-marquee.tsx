"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";
import { ClientInstagramEmbed } from "@/components/ui/client-instagram-embed";

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
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute top-[-58px] left-[-2px] right-[-2px] w-[calc(100%+4px)]">
                      <ClientInstagramEmbed url={post.permalink} width="100%" captioned={false} />
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
