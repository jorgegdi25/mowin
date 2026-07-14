import { STATS } from "@/app/lib/content";
import { Reveal } from "../Reveal";

const PILLARS = [
  {
    n: "01",
    title: "Hardware propio",
    text: "Diseñamos nuestras propias placas y electrónica, optimizadas para las condiciones reales del transporte.",
  },
  {
    n: "02",
    title: "Firmware in-house",
    text: "El comportamiento de cada dispositivo se programa en casa, dándonos control total sobre precisión y fiabilidad.",
  },
  {
    n: "03",
    title: "Software conectado",
    text: "Plataformas que convierten la telemetría del vehículo en información útil para las flotas.",
  },
];

export function Technology() {
  return (
    <section
      id="tecnologia"
      className="relative overflow-hidden border-t border-hairline bg-void py-24 lg:py-32"
    >
      <div className="circuit-grid pointer-events-none absolute inset-0 -z-10 opacity-60" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="flex items-baseline gap-6">
          <span className="font-display text-sm font-bold text-energy">03</span>
          <div className="max-w-3xl">
            <p className="eyebrow mb-3">I+D+i · Tecnología</p>
            <h2
              className="font-display font-extrabold uppercase leading-[var(--text-section--line-height)] tracking-tight"
              style={{ fontSize: "var(--text-section)" }}
            >
              La innovación es nuestro pilar
            </h2>
            <p className="mt-6 text-base leading-relaxed text-mist">
              Un equipo de I+D+i comprometido con desarrollar tecnología propia:
              del laboratorio a la carretera. No integramos piezas de terceros;
              creamos el hardware, el firmware y el software que mueven la
              movilidad inteligente.
            </p>
          </div>
        </Reveal>

        {/* Pilares */}
        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-hairline bg-hairline md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal
              key={p.n}
              delay={i * 0.08}
              className="group relative bg-carbon p-8 transition-colors duration-500 hover:bg-graphite lg:p-10"
            >
              <span className="font-display text-sm font-bold text-energy">
                {p.n}
              </span>
              <h3 className="mt-6 font-display text-xl font-bold tracking-tight">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-mist">{p.text}</p>
              <span className="absolute right-8 top-8 h-2 w-2 rotate-45 bg-energy/0 transition-colors duration-500 group-hover:bg-energy" />
            </Reveal>
          ))}
        </div>

        {/* Indicadores */}
        <div className="mt-14 grid grid-cols-2 gap-8 border-t border-hairline pt-14 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <p className="font-display text-4xl font-extrabold tracking-tight text-ink lg:text-5xl">
                {s.value}
              </p>
              <p className="mt-2 text-sm text-mist">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
