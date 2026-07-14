import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { client } from "../../sanity/lib/client";
import { productsQuery } from "../../sanity/lib/queries";

export const revalidate = 60; // Revalidate every minute

export const metadata: Metadata = {
  title: "Catálogo de productos",
  description:
    "Catálogo completo de sistemas MOWIN: multiplex, LED, audio, telemática y desarrollos a medida.",
};

export default async function ProductosPage() {
  let products = [];
  try {
    products = await client.fetch(productsQuery);
  } catch (err) {
    console.error("Error fetching Sanity products", err);
  }

  const count = products.length;

  return (
    <>
      <Header />
      <main className="relative min-h-screen pt-32 pb-24 overflow-hidden">
        <div className="circuit-grid pointer-events-none absolute inset-0 -z-10" />
        
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-16 text-center">
            <p className="eyebrow mb-6 flex items-center justify-center gap-3">
              <span className="inline-block h-px w-8 bg-energy" />
              Catálogo completo
              <span className="inline-block h-px w-8 bg-energy" />
            </p>
            <h1
              className="font-display font-extrabold uppercase leading-[1.1] tracking-tight"
              style={{ fontSize: "var(--text-section)" }}
            >
              Sistemas MOWIN
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-mist">
              Explora nuestro catálogo completo de soluciones electrónicas para el sector transporte.
            </p>
            <p className="mt-4 text-sm font-mono uppercase tracking-widest text-faint">
              {count} productos disponibles
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p: any) => (
              <Link 
                href={`/productos/${p._id}`}
                key={p._id} 
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-hairline bg-graphite transition-colors hover:border-energy"
              >
                <div className="relative aspect-[4/3] bg-white p-6 flex items-center justify-center">
                  {p.imageUrl ? (
                    <Image
                      src={p.imageUrl}
                      alt={p.name}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-105 p-4"
                    />
                  ) : (
                    <div className="text-mist text-sm font-mono uppercase">Sin Imagen</div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <p className="font-mono text-xs text-energy">{p.reference || 'N/A'}</p>
                    <p className="font-mono text-xs text-faint">{p.category || 'General'}</p>
                  </div>
                  <h3 className="mb-3 font-display text-lg font-bold uppercase leading-tight text-ink">
                    {p.name}
                  </h3>
                  <p className="mt-auto text-sm leading-relaxed text-mist line-clamp-3" title={p.description}>
                    {p.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
