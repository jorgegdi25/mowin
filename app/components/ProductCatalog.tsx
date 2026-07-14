"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SOLUTIONS } from "../lib/content";
import { SolutionIcon } from "./SolutionIcon";

// Helper to map Sanity category to a Solution ID
const mapCategoryToSolutionId = (category: string | null): string => {
  if (!category) return "miscellaneous";
  const lower = category.toLowerCase();
  
  if (lower.includes("multiplex")) return "multiplex";
  if (lower.includes("led") || lower.includes("iluminación")) return "led";
  if (lower.includes("multimedia") || lower.includes("audio")) return "audio";
  if (lower.includes("telemática") || lower.includes("telematics")) return "telematics";
  
  return "miscellaneous";
};

export function ProductCatalog({ products }: { products: any[] }) {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredProducts = activeFilter === "all" 
    ? products 
    : products.filter(p => mapCategoryToSolutionId(p.category) === activeFilter);

  return (
    <div>
      {/* Category Filters */}
      <div className="-mx-6 flex snap-x gap-2 overflow-x-auto px-6 pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:justify-center lg:px-0 mb-8">
        <button
          type="button"
          onClick={() => setActiveFilter("all")}
          className={`group flex shrink-0 snap-start items-center gap-2 rounded-full border px-4 py-2 transition-colors duration-300 ${
            activeFilter === "all"
              ? "border-energy/60 bg-energy/10 text-ink"
              : "border-hairline-strong bg-carbon hover:border-energy/40 text-faint hover:text-mist"
          }`}
        >
          <span className="text-sm font-semibold whitespace-nowrap">Todos los productos</span>
        </button>

        {SOLUTIONS.map((s) => {
          const isActive = s.id === activeFilter;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveFilter(s.id)}
              className={`group flex shrink-0 snap-start items-center gap-2 rounded-full border px-3 py-2 transition-colors duration-300 ${
                isActive
                  ? "border-energy/60 bg-energy/10 text-ink"
                  : "border-hairline-strong bg-carbon hover:border-energy/40 text-faint hover:text-mist"
              }`}
            >
              <span className={`flex h-6 w-6 items-center justify-center transition-colors ${
                isActive ? "text-energy-bright" : "text-mist group-hover:text-ink"
              }`}>
                <SolutionIcon name={s.icon} className="h-5 w-5" />
              </span>
              <span className="whitespace-nowrap text-sm font-semibold">
                {s.name}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mb-8 text-center text-sm font-mono uppercase tracking-widest text-faint">
        {filteredProducts.length} productos
      </div>

      {/* Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((p: any) => (
          <Link 
            href={`/productos/${p._id}`}
            key={p._id} 
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-hairline bg-graphite transition-colors hover:border-energy"
          >
            <div className="relative aspect-[4/3] bg-white p-6 flex items-center justify-center">
              {(() => {
                const imageSrc = p.imageUrl || (p.galleryUrls && p.galleryUrls.length > 0 ? p.galleryUrls[0] : null);
                return imageSrc ? (
                  <Image
                    src={imageSrc}
                    alt={p.name}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-105 p-4"
                  />
                ) : (
                  <div className="text-mist text-sm font-mono uppercase">Sin Imagen</div>
                );
              })()}
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="mb-3 flex items-center justify-between gap-4">
                <p className="font-mono text-sm text-energy">{p.reference || 'N/A'}</p>
                <p className="font-mono text-sm text-faint">{p.category || 'General'}</p>
              </div>
              <h3 className="mb-4 font-display text-xl font-bold uppercase leading-tight text-ink">
                {p.name}
              </h3>
              <p className="mt-auto text-base leading-relaxed text-mist line-clamp-3" title={p.description}>
                {p.description}
              </p>
            </div>
          </Link>
        ))}
        {filteredProducts.length === 0 && (
          <div className="col-span-full py-20 text-center text-mist">
            No se encontraron productos en esta categoría.
          </div>
        )}
      </div>
    </div>
  );
}
