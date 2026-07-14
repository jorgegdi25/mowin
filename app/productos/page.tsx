import type { Metadata } from "next";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Button } from "../components/Button";
import { FEATURED_PRODUCTS } from "../lib/content";

export const metadata: Metadata = {
  title: "Catálogo de productos",
  description:
    "Catálogo completo de sistemas MOWIN: multiplex, LED, audio, telemática y desarrollos a medida.",
};

export default function ProductosPage() {
  return (
    <>
      <Header />
      <main className="relative flex min-h-screen items-center overflow-hidden pt-24">
        <div className="circuit-grid pointer-events-none absolute inset-0 -z-10" />
        <div className="energy-glow pointer-events-none absolute -right-40 top-1/3 -z-10 h-[600px] w-[600px] opacity-60" />

        <div className="mx-auto max-w-3xl px-6 py-24 text-center lg:px-10">
          <p className="eyebrow mb-6 flex items-center justify-center gap-3">
            <span className="inline-block h-px w-8 bg-energy" />
            Catálogo completo
            <span className="inline-block h-px w-8 bg-energy" />
          </p>
          <h1
            className="font-display font-extrabold uppercase leading-[1.1] tracking-tight"
            style={{ fontSize: "var(--text-section)" }}
          >
            Estamos construyendo esta página
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-mist">
            Muy pronto encontrarás aquí la ficha completa de cada sistema
            MOWIN — Multiplex, LED, Audio, Telemática y desarrollos a medida —
            con especificaciones y descargas técnicas.
          </p>
          <p className="mt-2 text-sm text-faint">
            Mientras tanto, puedes ver algunos de nuestros productos
            destacados en la Home o escribirnos directamente.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href="/#producto" variant="primary">
              Ver productos destacados
            </Button>
            <Button href="/#contacto" variant="outline">
              Contáctanos
            </Button>
          </div>

          <p className="mt-16 text-xs uppercase tracking-widest text-faint">
            {FEATURED_PRODUCTS.length} sistemas ya disponibles · más en camino
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
