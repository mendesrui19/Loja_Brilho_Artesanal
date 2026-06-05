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

      <div className="flex justify-center">
        <Link href="/" aria-label="Voltar à página inicial">
          <div className="w-20 h-20 rounded-full border border-[rgba(201,168,76,0.3)] overflow-hidden shrink-0 shadow-lg flex items-center justify-center hover:border-[var(--color-gold)] transition-colors duration-300">
            <img src="/logo.jpg" alt="Brilho Artesanal Logo" className="w-full h-full object-cover scale-[1.35]" />
          </div>
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
