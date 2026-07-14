"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FEATURED_PRODUCTS } from "@/app/lib/content";
import { Button } from "../Button";
import { Reveal } from "../Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

export function FeaturedProduct({ sanityProducts = [] }: { sanityProducts?: any[] }) {
  const [[index, direction], setIndex] = useState<[number, number]>([0, 0]);
  
  const products = sanityProducts.length > 0 ? sanityProducts : FEATURED_PRODUCTS;
  const total = products.length;
  const p = products[index];

  const isFirst = index === 0;
  const isLast = index === total - 1;

  const go = (dir: 1 | -1) =>
    setIndex(([i]) => {
      const next = Math.min(Math.max(i + dir, 0), total - 1);
      return [next, dir];
    });
  const goTo = (target: number) =>
    setIndex(([i]) => [target, target > i ? 1 : -1]);

  return (
    <section
      id="producto"
      className="relative overflow-hidden border-t border-hairline bg-carbon py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-3 flex items-center gap-3">
              <span className="inline-block h-px w-8 bg-energy" />
              Productos destacados
            </p>
            <h2
              className="font-display font-extrabold uppercase leading-[var(--text-section--line-height)] tracking-tight"
              style={{ fontSize: "var(--text-section)" }}
            >
              Ingeniería que se ve en carretera
            </h2>
          </div>
          <Button href="/productos" variant="outline">
            Ver catálogo completo
          </Button>
        </Reveal>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Imagen protagonista */}
          <div className="relative order-2 lg:order-1">
            <div className="energy-glow pointer-events-none absolute inset-0 scale-90 opacity-60" />
            <svg
              viewBox="0 0 100 115"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 text-hairline"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M50 2 L94 27 L94 88 L50 113 L6 88 L6 27 Z"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </svg>
            <div className="relative overflow-hidden rounded-3xl border border-hairline bg-gradient-to-br from-graphite to-void p-8 sm:p-12">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={p.id || p._id}
                  initial={{ opacity: 0, x: direction >= 0 ? 40 : -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction >= 0 ? -40 : 40 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <Image
                    src={p.imageUrl || p.image}
                    alt={`${p.name} — ${p.reference}`}
                    width={720}
                    height={480}
                    className="w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.7)]"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controles del slide */}
            <div
              role="group"
              aria-label="Selector de producto"
              className="mt-6 flex items-center justify-center gap-6 lg:justify-start"
            >
              <button
                type="button"
                onClick={() => go(-1)}
                disabled={isFirst}
                aria-label="Producto anterior"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-hairline-strong text-mist transition-colors duration-300 enabled:hover:border-energy enabled:hover:text-ink disabled:opacity-25 disabled:cursor-not-allowed"
              >
                <ArrowIcon className="rotate-180" />
              </button>

              <div className="flex items-center gap-2">
                {products.map((item, i) => (
                  <button
                    key={item.id || item._id}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Ver ${item.name}`}
                    aria-current={i === index}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === index
                        ? "w-6 bg-energy-bright"
                        : "w-1.5 bg-hairline-strong hover:bg-mist"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => go(1)}
                disabled={isLast}
                aria-label="Siguiente producto"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-hairline-strong text-mist transition-colors duration-300 enabled:hover:border-energy enabled:hover:text-ink disabled:opacity-25 disabled:cursor-not-allowed"
              >
                <ArrowIcon />
              </button>
            </div>
          </div>

          {/* Texto */}
          <div className="relative order-1 lg:order-2">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={p.id || p._id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <p className="font-mono text-sm uppercase tracking-widest text-faint">
                  Producto {index + 1} / {total}
                </p>
                <h3 className="mt-2 font-display text-4xl font-extrabold uppercase leading-none tracking-tight sm:text-5xl">
                  {p.name}
                </h3>
                <p className="mt-3 font-mono text-sm uppercase tracking-widest text-faint">
                  {p.reference}
                </p>
                <p className="mt-6 max-w-md text-base leading-relaxed text-mist">
                  {p.description}
                </p>

                <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline">
                  {p.benefits?.map((b: any) => (
                    <div key={b.label} className="bg-carbon p-5">
                      <dt className="text-sm uppercase tracking-widest text-faint">
                        {b.label}
                      </dt>
                      <dd className="mt-1 font-display text-lg font-bold text-ink">
                        {b.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
