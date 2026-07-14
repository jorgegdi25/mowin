"use client";

import { useMemo, useRef } from "react";

interface HexPolygon {
  points: string;
}

/**
 * Genera una malla de hexágonos flat-top que cubre un viewBox fijo.
 * El viewBox se escala con `preserveAspectRatio="xMidYMid slice"`, así que
 * cubre cualquier contenedor sin necesidad de un patrón infinito perfecto.
 */
function buildHexGrid(
  viewW: number,
  viewH: number,
  size: number
): HexPolygon[] {
  const hexes: HexPolygon[] = [];
  const horizSpacing = size * 1.5;
  const vertSpacing = size * Math.sqrt(3);
  const cols = Math.ceil(viewW / horizSpacing) + 2;
  const rows = Math.ceil(viewH / vertSpacing) + 2;

  for (let col = -1; col < cols; col++) {
    for (let row = -1; row < rows; row++) {
      const cx = col * horizSpacing;
      const cy = row * vertSpacing + (col % 2 !== 0 ? vertSpacing / 2 : 0);
      const points = Array.from({ length: 6 }, (_, i) => {
        const angle = (Math.PI / 180) * (60 * i);
        const x = cx + size * Math.cos(angle);
        const y = cy + size * Math.sin(angle);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      }).join(" ");
      hexes.push({ points });
    }
  }
  return hexes;
}

const VIEW_W = 1200;
const VIEW_H = 700;
const HEX_SIZE = 34;

/**
 * Fondo de hexágonos que se ilumina en azul alrededor del cursor.
 * El tracking del mouse se hace por CSS custom properties vía ref
 * (sin re-render de React en cada movimiento) para mantenerlo fluido.
 */
export function HexGrid({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hexes = useMemo(() => buildHexGrid(VIEW_W, VIEW_H, HEX_SIZE), []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    el.style.setProperty("--active", "1");
  };

  const gridSvg = (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      fill="none"
    >
      {hexes.map((h, i) => (
        <polygon key={i} points={h.points} stroke="currentColor" strokeWidth={1} />
      ))}
    </svg>
  );

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={() =>
        containerRef.current?.style.setProperty("--active", "0")
      }
      className={`hero-interactive-bg pointer-events-auto absolute inset-0 overflow-hidden ${className}`}
      style={
        {
          "--mx": "50%",
          "--my": "50%",
          "--active": "0",
        } as React.CSSProperties
      }
    >
      {/* Halo azul que acompaña al cursor. */}
      <div
        className="absolute inset-0 transition-opacity duration-500 ease-out"
        style={{
          opacity: "var(--active)",
          background:
            "radial-gradient(circle 260px at var(--mx) var(--my), rgba(31,107,255,0.2), rgba(31,107,255,0.06) 45%, transparent 72%)",
        }}
      />

      {/* La malla solo existe visualmente dentro del halo. */}
      <div
        className="absolute inset-0 text-energy-bright transition-opacity duration-500 ease-out"
        style={{
          opacity: "calc(var(--active) * 0.42)",
          maskImage:
            "radial-gradient(circle 230px at var(--mx) var(--my), black 0%, rgba(0,0,0,0.7) 48%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(circle 230px at var(--mx) var(--my), black 0%, rgba(0,0,0,0.7) 48%, transparent 100%)",
        }}
      >
        {gridSvg}
      </div>
    </div>
  );
}
