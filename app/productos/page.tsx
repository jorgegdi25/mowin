import type { Metadata } from "next";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ProductCatalog } from "../components/ProductCatalog";
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

  return (
    <>
      <Header />
      <main className="relative min-h-screen pt-32 pb-24 overflow-hidden">
        <div className="circuit-grid pointer-events-none absolute inset-0 -z-10" />
        
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-12 text-center">
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
          </div>

          <ProductCatalog products={products} />
        </div>
      </main>
      <Footer />
    </>
  );
}
