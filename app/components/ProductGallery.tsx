"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  productName: string;
  images: string[];
}

export function ProductGallery({ productName, images }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({});
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeImage = images[selectedIndex];

  if (!images || images.length === 0) {
    return (
      <div className="relative w-full overflow-hidden rounded-3xl border border-hairline bg-gradient-to-br from-carbon to-graphite min-h-[420px] flex items-center justify-center">
        <div className="text-mist font-mono uppercase text-lg">Sin Imagen</div>
      </div>
    );
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2.5)",
    });
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Main image with zoom */}
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-3xl border border-hairline bg-white min-h-[420px] lg:min-h-[520px] flex items-center justify-center cursor-crosshair group"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          setZoomStyle({});
        }}
        onMouseMove={handleMouseMove}
      >
        {/* Subtle decorative glow */}
        <div className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full bg-energy/5 blur-3xl" />
        
        <Image
          src={activeImage}
          alt={productName}
          width={800}
          height={800}
          className="w-full h-full object-contain p-8 sm:p-12 transition-transform duration-200 ease-out pointer-events-none"
          style={isHovering ? zoomStyle : { transform: "scale(1)" }}
        />

        {/* Zoom hint overlay */}
        <div
          className={`absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-void/70 px-5 py-2.5 backdrop-blur-lg transition-opacity duration-300 ${
            isHovering ? "opacity-0" : "opacity-100"
          }`}
        >
          <p className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-mist">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
              <path d="M11 8v6M8 11h6" />
            </svg>
            Pasa el cursor para lupa
          </p>
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {images.map((url: string, i: number) => {
            const isSelected = i === selectedIndex;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedIndex(i)}
                className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200 ${
                  isSelected
                    ? "border-energy ring-2 ring-energy/30 scale-105"
                    : "border-hairline hover:border-mist"
                }`}
              >
                <div className="absolute inset-0 bg-white" />
                <Image
                  src={url}
                  alt={`${productName} - Vista ${i + 1}`}
                  fill
                  className="object-contain p-1.5 relative z-10"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
