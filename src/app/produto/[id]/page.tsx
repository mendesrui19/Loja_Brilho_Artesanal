import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { WhatsAppFloat } from '@/components/layout/whatsapp-float';
export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Read the feed JSON
  const feedPath = path.join(process.cwd(), 'instagram-feed.json');
  let feedData = [];
  try {
    const fileContent = fs.readFileSync(feedPath, 'utf8');
    feedData = JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading feed:', error);
  }

  const product = feedData.find((p: any) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[var(--color-cream)] pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <Link 
            href="/catalogo" 
            className="inline-flex items-center text-gray-500 hover:text-[var(--color-rose-mid)] transition-colors mb-12"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar para o catálogo
          </Link>

          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
            {/* Left side: Instagram Embed */}
            <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-gray-100">
              <div className="w-full flex justify-center items-center">
                {product.local_image_url ? (
                  <img 
                    src={product.local_image_url} 
                    alt={product.title} 
                    className="w-full h-auto object-contain max-h-[600px] rounded-lg" 
                  />
                ) : (
                  <div className="w-full h-64 md:h-[600px] flex flex-col items-center justify-center bg-gray-50 text-gray-300 rounded-lg">
                    <svg className="w-12 h-12 opacity-40 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm font-medium">Imagem não descarregada</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right side: Product Details */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col">
              <span className="text-[0.65rem] tracking-[3px] uppercase text-[var(--color-gold)] mb-4 font-bold">
                Detalhes da Peça
              </span>
              <h1 className="font-serif text-3xl md:text-4xl text-[var(--color-dark)] mb-6 leading-tight">
                {product.title}
              </h1>
              
              <div className="prose prose-sm text-gray-600 mb-8 whitespace-pre-wrap flex-grow">
                {product.caption}
              </div>

              <div className="mt-auto flex flex-col gap-4">
                <a 
                  href={`https://wa.me/351913685068?text=${encodeURIComponent(`Olá! Quero mais informações sobre esta peça: ${product.permalink}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center px-8 py-4 rounded-full bg-[var(--color-rose-mid)] text-white font-bold tracking-wide transition-all hover:bg-[var(--color-rose-dark)] shadow-[0_4px_14px_rgba(139,26,74,0.3)] hover:shadow-[0_6px_20px_rgba(139,26,74,0.4)] hover:-translate-y-0.5"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Encomendar pelo WhatsApp
                </a>

                <a 
                  href={product.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-gray-200 text-gray-700 font-bold tracking-wide transition-all hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] hover:-translate-y-0.5"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  Ver publicação no Instagram
                </a>

                <p className="text-center text-xs text-gray-400 mt-2">
                  Envia-nos uma mensagem para saberes mais sobre preço e personalização.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
