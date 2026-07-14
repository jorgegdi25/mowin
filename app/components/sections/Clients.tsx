import Image from "next/image";
import { CLIENTS } from "@/app/lib/content";
import { Reveal } from "../Reveal";

export function Clients() {
  return (
    <section
      id="nosotros"
      className="border-t border-hairline bg-carbon py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-baseline gap-6">
            <span className="font-display text-sm font-bold text-energy">
              04
            </span>
            <h2 className="max-w-xs font-display text-2xl font-bold uppercase leading-tight tracking-tight sm:text-3xl">
              Empresas que confían en nosotros
            </h2>
          </div>

          <div className="grid grid-cols-3 items-center gap-x-8 gap-y-6 sm:grid-cols-5 sm:gap-x-10">
            {CLIENTS.map((c, i) => (
              <Reveal
                key={c.name}
                delay={i * 0.06}
                className="flex items-center justify-center"
              >
                <Image
                  src={c.logo}
                  alt={c.name}
                  width={140}
                  height={80}
                  className="h-12 w-auto object-contain opacity-60 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0"
                />
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
