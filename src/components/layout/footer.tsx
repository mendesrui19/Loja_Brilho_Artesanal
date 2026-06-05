import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[var(--color-dark)] border-t border-[rgba(201,168,76,0.15)] py-11 px-6 md:px-12 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-6 text-center md:text-left">
      <div className="font-serif text-[var(--color-gold-light)] text-lg">
        Brilho Artesanal
        <small className="block text-white/30 font-sans text-xs mt-1">
          Feito à mão com 💕 em Felgueiras
        </small>
      </div>

      <div className="flex justify-center gap-4">
        <Link href="/#porta-chaves" className="text-white/30 text-xs hover:text-[var(--color-gold-light)] transition-colors">
          Porta-chaves
        </Link>
        <Link href="/catalogo" className="text-white/30 text-xs hover:text-[var(--color-gold-light)] transition-colors">
          Catálogo
        </Link>
        <Link href="/inspiracao" className="text-white/30 text-xs hover:text-[var(--color-gold-light)] transition-colors">
          Inspiração
        </Link>
      </div>

      <div className="flex flex-col items-center md:items-end gap-2 text-white/20 text-xs">
        <div className="flex gap-4 text-white/40 mb-1">
          <a href="https://www.instagram.com/brilho__artesanal/" target="_blank" rel="noreferrer" className="hover:text-[var(--color-gold-light)] transition-colors">
            Instagram
          </a>
          <a href="https://tiktok.com/@brilho__artesanal" target="_blank" rel="noreferrer" className="hover:text-[var(--color-gold-light)] transition-colors">
            TikTok
          </a>
        </div>
        <div>
          © {new Date().getFullYear()} Brilho Artesanal.<br/>
          Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
