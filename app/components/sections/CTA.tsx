import { Button } from "../Button";
import { Reveal } from "../Reveal";

export function CTA() {
  return (
    <section className="relative overflow-hidden border-t border-hairline bg-void py-28 lg:py-40">
      {/* Energía de fondo */}
      <div className="energy-glow pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 opacity-60" />
      <div className="circuit-grid pointer-events-none absolute inset-0 -z-10 opacity-40" />

      {/* Hexágonos decorativos */}
      <svg
        viewBox="0 0 100 115"
        className="pointer-events-none absolute -left-10 bottom-10 h-40 w-40 text-hairline"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M50 2 L94 27 L94 88 L50 113 L6 88 L6 27 Z"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <p className="eyebrow mb-6 text-energy-bright">
            Engineering Intelligent Mobility
          </p>
          <h2 className="font-display text-4xl font-extrabold uppercase leading-[1.05] tracking-tight sm:text-6xl">
            Hablemos del futuro
            <br />
            de la <span className="text-energy-gradient">movilidad</span>
          </h2>
          <p className="mx-auto mt-7 max-w-lg text-base leading-relaxed text-mist sm:text-lg">
            Cuéntanos tu reto de ingeniería. Diseñamos la electrónica que tu
            flota necesita, desde el concepto hasta la producción.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href="mailto:contactenos@mowin-tech.com" variant="primary">
              Contáctanos
            </Button>
            <Button href="tel:+576316391" variant="outline">
              +57 (6) 316 39 10
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
