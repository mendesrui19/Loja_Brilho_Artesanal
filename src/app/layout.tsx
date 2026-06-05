import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Brilho Artesanal ✨ | Arte em Resina Epóxi",
  description: "Arte em Resina Epóxi feita à mão em Felgueiras. Porta-chaves, bases, capas, decoração e muito mais — únicos e personalizados com amor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className={`${dmSans.variable} ${playfair.variable} scroll-smooth`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
