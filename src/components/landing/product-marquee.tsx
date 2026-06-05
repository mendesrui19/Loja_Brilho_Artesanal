"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { FadeIn } from "@/components/ui/fade-in";

export function ProductMarquee() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/feed")
      .then((res) => res.json())
      .then((data) => {
        // Select 6 unique/diverse posts for the marquee
        const selected = data.slice(0, 6);
        setPosts(selected);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch marquee data", err);
        setLoading(false);
      });
  }, []);

  // Process Instagram embeds once they are loaded
  useEffect(() => {
    if (!loading && (window as any).instgrm) {
      setTimeout(() => {
        (window as any).instgrm.Embeds.process();
      }, 500);
    }
  }, [loading, posts]);

  if (loading || posts.length === 0) return null;

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
        {/* Left Gradient Mask */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        
        {/* Right Gradient Mask */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex w-fit animate-marquee hover:[animation-play-state:paused]">
          {/* Double the posts to create a seamless infinite loop */}
          {[...posts, ...posts].map((post, i) => (
            <div
              key={`${post.id}-${i}`}
              className="w-[320px] md:w-[350px] mx-4 shrink-0 transition-transform duration-500 hover:scale-[1.02]"
            >
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={post.permalink}
                data-instgrm-version="14"
                style={{
                  background: "#FFF",
                  border: 0,
                  borderRadius: "16px",
                  boxShadow: "0 10px 30px -10px rgba(139,26,74,0.15)",
                  margin: "1px",
                  maxWidth: "100%",
                  minWidth: "100%",
                  padding: 0,
                  width: "100%"
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <Script src="https://www.instagram.com/embed.js" strategy="lazyOnload" />
    </section>
  );
}
