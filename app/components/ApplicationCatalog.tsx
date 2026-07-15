"use client";

import { useMemo, useState } from "react";
import {
  APPLICATIONS,
  type ApplicationCategory,
  type MowinApplication,
} from "@/app/lib/applications";

type Filter = "all" | ApplicationCategory;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "Todas" },
  { id: "multiplex", label: "Multiplex" },
  { id: "led", label: "Paneles LED" },
  { id: "telematics", label: "Telemática" },
];

function ArrowIcon({ external = false }: { external?: boolean }) {
  return external ? (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M14 5h5v5M19 5l-9 9" />
      <path d="M19 13v6H5V5h6" />
    </svg>
  ) : (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function AppCard({ app }: { app: MowinApplication }) {
  return (
    <article
      className={`group relative flex min-h-[32rem] flex-col overflow-hidden rounded-[1.75rem] border bg-carbon p-6 transition-all duration-500 sm:p-8 ${
        app.featured
          ? "border-energy/45 shadow-[0_24px_80px_-46px_rgba(31,107,255,0.75)]"
          : "border-hairline hover:border-hairline-strong"
      }`}
    >
      <div className="pointer-events-none absolute -right-28 -top-32 h-72 w-72 rounded-full bg-energy/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-energy/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative flex items-start justify-between gap-4">
        <div
          className="grid h-16 w-16 shrink-0 place-items-center bg-gradient-to-br from-energy to-[#0a378f] shadow-[0_12px_36px_-12px_rgba(31,107,255,0.8)] [clip-path:polygon(25%_7%,75%_7%,100%_50%,75%_93%,25%_93%,0_50%)]"
          aria-hidden="true"
        >
          <span className="font-display text-sm font-black tracking-wider text-white">
            {app.shortName}
          </span>
        </div>

        <div
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${
            app.availability === "public"
              ? "border-energy/35 bg-energy/10 text-energy-hover"
              : "border-hairline-strong bg-white/[0.03] text-mist"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              app.availability === "public"
                ? "bg-energy-hover shadow-[0_0_10px_rgba(94,168,255,0.9)]"
                : "bg-mist"
            }`}
          />
          {app.availability === "public" ? "Descarga pública" : "Acceso asistido"}
        </div>
      </div>

      <div className="relative mt-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-energy-hover">
          {app.eyebrow}
        </p>
        <h2 className="mt-3 font-display text-2xl font-extrabold uppercase leading-tight text-ink">
          {app.name}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-mist">
          {app.description}
        </p>
      </div>

      <dl className="relative mt-7 grid gap-4 border-t border-hairline pt-6 text-sm">
        <div className="grid grid-cols-[6.5rem_1fr] gap-3">
          <dt className="text-faint">Sistema</dt>
          <dd className="font-medium text-ink">{app.categoryLabel}</dd>
        </div>
        <div className="grid grid-cols-[6.5rem_1fr] gap-3">
          <dt className="text-faint">Plataforma</dt>
          <dd className="flex flex-wrap gap-2">
            {app.platforms.map((platform) => (
              <span
                key={platform}
                className="rounded-md border border-hairline-strong bg-white/[0.03] px-2 py-0.5 font-medium text-ink"
              >
                {platform}
              </span>
            ))}
          </dd>
        </div>
        <div className="grid grid-cols-[6.5rem_1fr] gap-3">
          <dt className="text-faint">Conexión</dt>
          <dd className="font-medium text-ink">{app.connection}</dd>
        </div>
      </dl>

      <div className="relative mt-auto pt-7">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-faint">
          Compatible con {app.compatibleWith.join(" · ")}
        </p>
        <div className="flex flex-wrap gap-3">
          {app.actions.map((action) => (
            <a
              key={action.label}
              href={action.href}
              target={action.external ? "_blank" : undefined}
              rel={action.external ? "noreferrer" : undefined}
              className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 py-3 text-center text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy ${
                action.primary
                  ? "bg-energy text-white shadow-[0_10px_30px_-10px_rgba(31,107,255,0.8)] hover:bg-energy-hover"
                  : "border border-hairline-strong text-ink hover:border-energy"
              }`}
            >
              {action.label}
              <ArrowIcon external={action.external} />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

export function ApplicationCatalog() {
  const [filter, setFilter] = useState<Filter>("all");

  const visibleApplications = useMemo(
    () =>
      filter === "all"
        ? APPLICATIONS
        : APPLICATIONS.filter((app) => app.category === filter),
    [filter]
  );

  return (
    <div>
      <div className="mb-10 flex flex-col gap-5 border-b border-hairline pb-7 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">Encuentra tu herramienta</p>
          <h2 className="mt-3 font-display text-2xl font-extrabold uppercase text-ink sm:text-3xl">
            Aplicaciones por sistema
          </h2>
        </div>

        <div
          className="flex max-w-full gap-2 overflow-x-auto pb-1"
          role="group"
          aria-label="Filtrar aplicaciones por sistema"
        >
          {FILTERS.map((item) => {
            const active = item.id === filter;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                aria-pressed={active}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy ${
                  active
                    ? "border-energy bg-energy text-white"
                    : "border-hairline-strong text-mist hover:border-energy hover:text-ink"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {visibleApplications.length} aplicaciones visibles
      </p>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visibleApplications.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>
    </div>
  );
}
