"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  productName: string;
  images: string[];
}

export function ProductGallery({ productName, images }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [zoomStyle, setZoomStyle] = useState({});
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeImage = images[selectedIndex];
  
  if (!images || images.length === 0) {
    return (
      <div className="flex flex-col gap-4 self-start lg:sticky lg:top-32 w-full">
        <div className="relative overflow-hidden rounded-3xl border border-hairline bg-white p-8 sm:p-12 min-h-[400px] flex items-center justify-center">
          <div className="text-mist font-mono uppercase">Sin Imagen</div>
        </div>
      </div>
    );
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2.5)",
    });
  };

  return (
    <div className="flex flex-col gap-4 self-start lg:sticky lg:top-32 w-full">
      {/* Lupa / Zoom container */}
      <div 
        ref={containerRef}
        className="relative overflow-hidden rounded-3xl border border-hairline bg-white p-8 sm:p-12 h-[400px] lg:h-[500px] flex items-center justify-center cursor-crosshair group"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          setZoomStyle({ transform: "scale(1)" });
        }}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={activeImage}
          alt={productName}
          width={800}
          height={800}
          className="w-full h-full object-contain transition-transform duration-200 ease-out pointer-events-none"
          style={isHovering ? zoomStyle : { transform: "scale(1)" }}
        />
        
        {/* Overlay helper instruction */}
        <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-void/80 px-4 py-2 backdrop-blur-md transition-opacity duration-300 ${isHovering ? 'opacity-0' : 'opacity-100'}`}>
          <p className="text-xs font-mono uppercase tracking-widest text-mist">Pasa el cursor para lupa</p>
        </div>
      </div>
      
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 mt-2">
          {images.map((url: string, i: number) => {
            const isSelected = i === selectedIndex;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedIndex(i)}
                className={`relative aspect-square overflow-hidden rounded-xl border flex items-center justify-center transition-all ${
                  isSelected 
                    ? "border-energy ring-1 ring-energy" 
                    : "border-hairline bg-white hover:border-mist"
                }`}
              >
                <div className="absolute inset-0 bg-white" />
                <Image
                  src={url}
                  alt={`${productName} - Vista ${i + 1}`}
                  fill
                  className="object-contain p-2 relative z-10"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
