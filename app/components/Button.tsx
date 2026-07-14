import type { ReactNode } from "react";

type Variant = "primary" | "ghost" | "outline";

const base =
  "group inline-flex items-center gap-2.5 rounded-full text-base font-semibold tracking-wide transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy focus-visible:ring-offset-2 focus-visible:ring-offset-void";

const variants: Record<Variant, string> = {
  primary:
    "bg-energy px-7 py-3.5 text-white shadow-[0_8px_30px_-6px_rgba(31,107,255,0.6)] hover:bg-energy-hover hover:shadow-[0_10px_40px_-6px_rgba(31,107,255,0.8)]",
  outline:
    "border border-hairline-strong px-7 py-3.5 text-ink hover:border-energy hover:text-energy-hover",
  ghost: "px-2 py-2 text-mist hover:text-ink",
};

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
  withArrow = true,
}: {
  children: ReactNode;
  href: string;
  variant?: Variant;
  className?: string;
  withArrow?: boolean;
}) {
  return (
    <a href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
      {withArrow && (
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      )}
    </a>
  );
}
