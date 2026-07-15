import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Button } from "../../components/Button";
import { ProductGallery } from "../../components/ProductGallery";
import { client } from "../../../sanity/lib/client";
import { singleProductQuery } from "../../../sanity/lib/queries";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const p = await params;
  const product = await client.fetch(singleProductQuery, { id: p.id });
  if (!product) return { title: "Producto no encontrado" };

  return {
    title: `${product.name} | MOWIN`,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const p = await params;
  const product = await client.fetch(singleProductQuery, { id: p.id });

  if (!product) {
    notFound();
  }

  const allImages: string[] = [];
  if (product.imageUrl) allImages.push(product.imageUrl);
  if (product.galleryUrls) allImages.push(...product.galleryUrls);

  return (
    <>
      <Header />
      {/* No overflow-hidden on main — it breaks position:sticky */}
      <main className="relative min-h-screen">
        {/* ── Hero banner with circuit background image ── */}
        <section className="relative pt-28 pb-16 overflow-hidden">
          {/* Circuit board background image */}
          <div className="absolute inset-0 -z-10">
            <Image
              src="/images/circuit-hero.png"
              alt=""
              fill
              className="object-cover opacity-20"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-void/60 via-void/80 to-void" />
          </div>

          {/* Decorative glows */}
          <div className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-energy/[0.04] blur-[120px]" />
          <div className="pointer-events-none absolute bottom-0 left-1/4 h-[300px] w-[300px] rounded-full bg-energy/[0.06] blur-[80px]" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
            {/* Breadcrumb */}
            <nav className="mb-10 flex items-center gap-2 text-sm text-faint">
              <Link href="/" className="transition-colors hover:text-energy">
                Inicio
              </Link>
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M9 5l7 7-7 7" />
              </svg>
              <Link href="/productos" className="transition-colors hover:text-energy">
                Productos
              </Link>
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-mist truncate max-w-[240px]">
                {product.name}
              </span>
            </nav>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-energy/30 bg-energy/10 px-4 py-1.5 font-mono text-sm text-energy backdrop-blur-sm">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                {product.reference || "N/A"}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-hairline/60 bg-carbon/80 px-4 py-1.5 font-mono text-sm uppercase tracking-wider text-mist backdrop-blur-sm">
                {product.category || "General"}
              </span>
            </div>

            {/* Product title */}
            <h1 className="font-display text-4xl font-extrabold uppercase leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl text-ink max-w-4xl">
              {product.name}
            </h1>

            {/* Subtle divider */}
            <div className="mt-10 flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-energy/40 to-transparent" />
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-energy/40" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path d="M12 2L4 7v10l8 5 8-5V7l-8-5Z" />
              </svg>
              <div className="h-px flex-1 bg-gradient-to-l from-energy/40 to-transparent" />
            </div>
          </div>
        </section>

        {/* ── Content: Gallery left (sticky) + Details right ── */}
        <section className="relative pb-24">
          <div className="circuit-grid pointer-events-none absolute inset-0 -z-10" />

          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16 items-start">
              {/* Gallery — sticky on scroll */}
              <div className="lg:sticky lg:top-28 self-start">
                <ProductGallery
                  productName={product.name}
                  images={allImages}
                />
              </div>

              {/* Details column */}
              <div className="flex flex-col gap-8">
                {/* Description card */}
                <div className="rounded-3xl border border-hairline bg-gradient-to-br from-carbon to-graphite p-8 sm:p-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-energy/10 border border-energy/20">
                      <svg viewBox="0 0 24 24" className="h-5 w-5 text-energy" fill="none" stroke="currentColor" strokeWidth={1.5}>
                        <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z" />
                        <path d="M7 7h10M7 12h10M7 17h6" />
                      </svg>
                    </div>
                    <h2 className="font-display text-lg font-bold uppercase tracking-wider text-ink">
                      Descripción del producto
                    </h2>
                  </div>
                  <p className="text-base sm:text-lg leading-relaxed text-mist whitespace-pre-wrap">
                    {product.description}
                  </p>
                </div>

                {/* Specs grid */}
                {product.benefits && product.benefits.length > 0 && (
                  <div className="rounded-3xl border border-hairline bg-gradient-to-br from-carbon to-graphite p-8 sm:p-10">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-energy/10 border border-energy/20">
                        <svg viewBox="0 0 24 24" className="h-5 w-5 text-energy" fill="none" stroke="currentColor" strokeWidth={1.5}>
                          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                          <rect x="9" y="3" width="6" height="4" rx="1" />
                          <path d="M9 14l2 2 4-4" />
                        </svg>
                      </div>
                      <h2 className="font-display text-lg font-bold uppercase tracking-wider text-ink">
                        Especificaciones
                      </h2>
                    </div>
                    <dl className="grid grid-cols-2 gap-4">
                      {product.benefits.map((b: any) => (
                        <div
                          key={b.label}
                          className="group rounded-2xl border border-hairline bg-void/50 p-5 transition-all duration-200 hover:border-energy/30 hover:bg-energy/[0.03] hover:shadow-[0_0_20px_rgba(31,107,255,0.05)]"
                        >
                          <dt className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-faint mb-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-energy/60 group-hover:bg-energy transition-colors" />
                            {b.label}
                          </dt>
                          <dd className="font-display text-xl font-bold text-ink">
                            {b.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}

                {/* CTA */}
                <div className="rounded-3xl border border-energy/20 bg-gradient-to-r from-energy/[0.06] via-energy/[0.03] to-transparent p-8 sm:p-10">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div className="flex-1">
                      <h3 className="font-display text-xl font-bold text-ink mb-2">
                        ¿Interesado en este producto?
                      </h3>
                      <p className="text-mist text-sm leading-relaxed">
                        Solicita una cotización personalizada o consulta con
                        nuestro equipo técnico.
                      </p>
                    </div>
                    <Button
                      href="/#contacto"
                      variant="primary"
                      className="w-full sm:w-auto justify-center shrink-0"
                    >
                      Solicitar cotización
                    </Button>
                  </div>
                </div>

                {/* Back link */}
                <Link
                  href="/productos"
                  className="inline-flex items-center gap-2 text-sm text-energy hover:text-energy-bright transition-colors group"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 transition-transform group-hover:-translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Explorar más productos
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
