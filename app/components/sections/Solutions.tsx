"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SOLUTIONS } from "@/app/lib/content";
import { SolutionIcon } from "../SolutionIcon";
import { Reveal } from "../Reveal";

export function Solutions() {
  const [active, setActive] = useState(0);
  const solution = SOLUTIONS[active];

  return (
    <section
      id="soluciones"
      className="relative border-t border-hairline bg-void py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Encabezado */}
        <Reveal className="flex items-baseline gap-6">
          <span className="font-display text-base font-bold text-energy">02</span>
          <div>
            <p className="eyebrow mb-3">Nuestras soluciones</p>
            <h2
              className="font-display font-extrabold uppercase leading-[var(--text-section--line-height)] tracking-tight"
              style={{ fontSize: "var(--text-section)" }}
            >
              Cinco sistemas.
              <br className="sm:hidden" /> Una sola ingeniería.
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-[auto_1fr] lg:gap-20">
          {/* Selector hexagonal */}
          <div className="-mx-6 flex snap-x gap-2 overflow-x-auto px-6 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:flex-col lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0">
            {SOLUTIONS.map((s, i) => {
              const isActive = i === active;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  className={`group flex shrink-0 snap-start items-center gap-2 rounded-full border px-3 py-2 text-left transition-colors duration-300 lg:gap-4 lg:rounded-none lg:border-0 lg:p-0 ${
                    isActive
                      ? "border-energy/60 bg-energy/10"
                      : "border-hairline-strong bg-carbon hover:border-energy/40"
                  }`}
                >
                  <span className="relative flex h-9 w-8 shrink-0 items-center justify-center lg:h-14 lg:w-[52px]">
                    <svg
                      viewBox="0 0 100 115"
                      className={`absolute inset-0 h-full w-full transition-colors duration-300 ${
                        isActive
                          ? "text-energy"
                          : "text-hairline-strong group-hover:text-mist"
                      }`}
                      fill={isActive ? "rgba(31,107,255,0.12)" : "transparent"}
                      aria-hidden="true"
                    >
                      <path
                        d="M50 3 L93 28 L93 87 L50 112 L7 87 L7 28 Z"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      />
                    </svg>
                    <span
                      className={`relative transition-colors duration-300 ${
                        isActive
                          ? "text-energy-bright"
                          : "text-mist group-hover:text-ink"
                      }`}
                    >
                      <SolutionIcon name={s.icon} className="h-6 w-6" />
                    </span>
                  </span>
                  <span
                    className={`whitespace-nowrap text-sm font-semibold transition-colors duration-300 lg:text-base ${
                      isActive ? "text-ink" : "text-faint group-hover:text-mist"
                    }`}
                  >
                    {s.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Visor de la solución protagonista */}
          <div className="relative min-h-[340px] overflow-hidden rounded-3xl border border-hairline bg-gradient-to-br from-carbon to-graphite p-8 sm:p-12">
            <div className="energy-glow pointer-events-none absolute -right-20 -top-20 h-72 w-72 opacity-40" />
            <AnimatePresence mode="wait">
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <p className="eyebrow mb-4 text-energy-bright">
                  {solution.tagline}
                </p>
                <h3 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                  {solution.name}
                </h3>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-mist">
                  {solution.description}
                </p>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {solution.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 text-base text-mist"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-energy" />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>

            {/* Índice grande de fondo */}
            <span className="pointer-events-none absolute bottom-4 right-8 font-display text-[7rem] font-extrabold leading-none text-ink/[0.03]">
              0{active + 1}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
