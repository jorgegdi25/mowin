import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Button } from "../../components/Button";
import { client } from "../../../sanity/lib/client";
import { singleProductQuery } from "../../../sanity/lib/queries";

export const revalidate = 60; // Revalidate every minute

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const p = await params;
  const product = await client.fetch(singleProductQuery, { id: p.id });
  if (!product) return { title: "Producto no encontrado" };
  
  return {
    title: `${product.name} | MOWIN`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const p = await params;
  const product = await client.fetch(singleProductQuery, { id: p.id });

  if (!product) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="relative min-h-screen pt-32 pb-24 overflow-hidden">
        <div className="circuit-grid pointer-events-none absolute inset-0 -z-10" />
        
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Link href="/productos" className="inline-flex items-center gap-2 text-energy hover:text-energy-bright transition-colors mb-12">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Volver al catálogo
          </Link>

          <div className="grid gap-12 lg:grid-cols-2 items-start">
            {/* Image */}
            <div className="relative overflow-hidden rounded-3xl border border-hairline bg-white p-8 sm:p-12 min-h-[400px] flex items-center justify-center">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={800}
                  height={800}
                  className="w-full h-auto object-contain"
                />
              ) : (
                <div className="text-mist font-mono uppercase">Sin Imagen</div>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col">
              <div className="mb-4 flex items-center gap-4">
                <span className="inline-block rounded-full border border-energy/30 bg-energy/10 px-3 py-1 font-mono text-xs text-energy">
                  {product.reference || 'N/A'}
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-faint">
                  {product.category || 'General'}
                </span>
              </div>
              
              <h1 className="mb-6 font-display text-4xl font-extrabold uppercase leading-none tracking-tight sm:text-5xl text-ink">
                {product.name}
              </h1>
              
              <div className="prose prose-invert max-w-none mb-10 text-mist">
                <p className="text-lg leading-relaxed">{product.description}</p>
              </div>

              {product.benefits && product.benefits.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-sm font-mono uppercase tracking-widest text-faint mb-6">Especificaciones destacadas</h3>
                  <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline">
                    {product.benefits.map((b: any) => (
                      <div key={b.label} className="bg-carbon p-5">
                        <dt className="text-xs uppercase tracking-widest text-faint mb-1">
                          {b.label}
                        </dt>
                        <dd className="font-display text-lg font-bold text-ink">
                          {b.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              <div className="mt-auto">
                <Button href="/#contacto" variant="primary" className="w-full sm:w-auto justify-center">
                  Solicitar cotización
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
