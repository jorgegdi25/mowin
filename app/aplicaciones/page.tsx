import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ApplicationCatalog } from "../components/ApplicationCatalog";

export const metadata: Metadata = {
  title: "Aplicaciones y software",
  description:
    "Centro oficial de aplicaciones MOWIN para configurar, programar y diagnosticar sistemas Multiplex, paneles LED y equipos telemáticos.",
};

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function SoftwareHeroImage() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[29rem]">
      <div className="energy-glow absolute inset-0 scale-110" aria-hidden="true" />
      <Image
        src="/images/software/software-control-hub-bus.png"
        alt="Software MOWIN para el control de buses presentado en un portátil y un teléfono Android"
        fill
        priority
        sizes="(min-width: 1024px) 42vw, 90vw"
        className="relative z-10 object-contain drop-shadow-[0_30px_70px_rgba(0,0,0,0.65)]"
      />
      <div
        className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(to_bottom,transparent_72%,#050505_100%)]"
        aria-hidden="true"
      />
      <div className="absolute left-[7%] top-[7%] z-30 rounded-xl border border-white/10 bg-black/35 px-3 py-2 backdrop-blur-md">
        <Image
          src="/images/brand/logo_mowin_new.svg"
          alt="MOWIN"
          width={92}
          height={46}
          className="h-auto w-[5.75rem]"
        />
      </div>
    </div>
  );
}

export default function AplicacionesPage() {
  return (
    <>
      <Header />
      <main className="overflow-hidden">
        <section className="relative border-b border-hairline bg-void pb-12 pt-28 sm:pb-16 sm:pt-32 lg:pb-18">
          <div className="circuit-grid absolute inset-0 opacity-55" />
          <div className="pointer-events-none absolute -left-40 top-0 h-[32rem] w-[32rem] rounded-full bg-energy/10 blur-[120px]" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-10">
            <div className="max-w-3xl">
              <p className="eyebrow flex items-center gap-3 text-energy-hover">
                <span className="inline-block h-px w-8 bg-energy" />
                Centro oficial de software
              </p>
              <h1
                className="mt-5 max-w-2xl font-display font-black uppercase tracking-[-0.02em] text-ink"
                style={{ fontSize: "clamp(2.05rem, 4vw, 3.7rem)", lineHeight: 1.08 }}
              >
                El control de tus equipos,
                <span className="text-energy-gradient block">en un solo lugar.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-mist sm:text-lg">
                Encuentra la aplicación correcta para configurar, programar o
                diagnosticar cada sistema MOWIN. Descargas oficiales y acceso a
                soporte técnico cuando lo necesites.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#catalogo"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-energy px-6 py-3 text-base font-semibold text-white shadow-[0_12px_35px_-10px_rgba(31,107,255,0.85)] transition-all hover:bg-energy-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy"
                >
                  Buscar mi aplicación
                  <span aria-hidden="true">↓</span>
                </a>
                <a
                  href="mailto:contactenos@mowin-tech.com?subject=Ayuda%20para%20elegir%20una%20aplicaci%C3%B3n"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-hairline-strong px-6 py-3 text-base font-semibold text-ink transition-all hover:border-energy hover:text-energy-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy"
                >
                  Necesito ayuda para elegir
                </a>
              </div>
            </div>

            <SoftwareHeroImage />
          </div>

          <div className="relative mx-auto mt-10 max-w-7xl px-6 lg:px-10">
            <div className="grid overflow-hidden rounded-2xl border border-hairline bg-carbon/80 backdrop-blur sm:grid-cols-3">
              {[
                ["Fuentes verificadas", "Google Play y canales MOWIN"],
                ["Compatibilidad clara", "Equipo, plataforma y conexión"],
                ["Soporte directo", "Acompañamiento del equipo técnico"],
              ].map(([title, description], index) => (
                <div
                  key={title}
                  className={`flex gap-4 p-5 sm:p-6 ${index > 0 ? "border-t border-hairline sm:border-l sm:border-t-0" : ""}`}
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-energy/15 text-energy-hover">
                    <CheckIcon />
                  </span>
                  <div>
                    <p className="font-semibold text-ink">{title}</p>
                    <p className="mt-1 text-sm text-mist">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="catalogo" className="relative bg-void py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <ApplicationCatalog />
          </div>
        </section>

        <section className="border-y border-hairline bg-carbon py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
              <div>
                <p className="eyebrow text-energy-hover">Descarga segura</p>
                <h2 className="mt-4 font-display text-3xl font-extrabold uppercase leading-tight text-ink sm:text-4xl">
                  Tres pasos. Cero confusión.
                </h2>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-mist">
                  El centro de software está diseñado para que instaladores,
                  técnicos y operadores lleguen a la herramienta correcta sin
                  depender de enlaces informales.
                </p>
              </div>

              <ol className="grid gap-4 sm:grid-cols-3">
                {[
                  ["01", "Identifica", "Ubica la familia del equipo o sistema que necesitas controlar."],
                  ["02", "Verifica", "Confirma plataforma, conexión y dispositivos compatibles."],
                  ["03", "Descarga", "Instala desde la tienda oficial o solicita acceso técnico."],
                ].map(([number, title, description]) => (
                  <li key={number} className="rounded-2xl border border-hairline bg-void p-6">
                    <span className="font-display text-sm font-black text-energy-hover">{number}</span>
                    <h3 className="mt-8 font-display text-lg font-bold uppercase text-ink">{title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-mist">{description}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="relative bg-void py-20 sm:py-24">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(31,107,255,0.15),transparent_45%)]" />
          <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
            <p className="eyebrow text-energy-hover">Soporte MOWIN</p>
            <h2 className="mt-5 font-display text-3xl font-extrabold uppercase leading-tight text-ink sm:text-4xl">
              ¿No sabes cuál aplicación necesita tu equipo?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-mist">
              Comparte la referencia del dispositivo y nuestro equipo te orientará
              con la aplicación, versión y método de conexión correctos.
            </p>
            <a
              href="mailto:contactenos@mowin-tech.com?subject=Soporte%20de%20aplicaciones%20MOWIN"
              className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-energy px-7 py-3.5 text-base font-semibold text-white shadow-[0_12px_36px_-10px_rgba(31,107,255,0.8)] transition-all hover:bg-energy-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy"
            >
              Hablar con soporte técnico
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
