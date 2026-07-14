import type { CSSProperties, ReactNode } from "react";

/**
 * Hexágono — elemento principal de la identidad MOWIN.
 * Flat-top hexagon. `strokeOnly` para el contorno de circuito.
 */
export function Hexagon({
  className = "",
  strokeWidth = 1.5,
  fill = "none",
  children,
  style,
}: {
  className?: string;
  strokeWidth?: number;
  fill?: string;
  children?: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <span
      className={`relative inline-flex items-center justify-center ${className}`}
      style={style}
    >
      <svg
        viewBox="0 0 100 115"
        fill="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <path
          d="M50 2 L94 27 L94 88 L50 113 L6 88 L6 27 Z"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          fill={fill}
          className="transition-[fill] duration-300"
        />
      </svg>
      <span className="relative z-10 flex items-center justify-center">
        {children}
      </span>
    </span>
  );
}

/** Hexágono relleno (para logos / marcadores sólidos). */
export function HexagonFilled({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 115"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M50 2 L94 27 L94 88 L50 113 L6 88 L6 27 Z" />
    </svg>
  );
}
