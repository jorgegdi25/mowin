import type { SolutionIcon as IconName } from "@/app/lib/content";

/** Iconografía lineal para las soluciones — trazo fino, coherente con la marca. */
export function SolutionIcon({
  name,
  className = "h-7 w-7",
}: {
  name: IconName;
  className?: string;
}) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "multiplex":
      return (
        <svg {...common}>
          <circle cx="12" cy="5" r="2" />
          <circle cx="5" cy="18" r="2" />
          <circle cx="19" cy="18" r="2" />
          <path d="M12 7v3m0 0-5 6m5-6 5 6" />
        </svg>
      );
    case "led":
      return (
        <svg {...common}>
          <rect x="3" y="6" width="18" height="12" rx="1.5" />
          <path d="M7 10h.01M11 10h.01M15 10h.01M7 14h.01M11 14h.01M15 14h.01" />
        </svg>
      );
    case "audio":
      return (
        <svg {...common}>
          <path d="M4 9v6h4l5 4V5L8 9H4Z" />
          <path d="M17 8a5 5 0 0 1 0 8" />
        </svg>
      );
    case "telematics":
      return (
        <svg {...common}>
          <path d="M5 13a7 7 0 0 1 14 0" />
          <path d="M8.5 13a3.5 3.5 0 0 1 7 0" />
          <circle cx="12" cy="13" r="1" />
          <path d="M12 19v-4" />
        </svg>
      );
    case "miscellaneous":
      return (
        <svg {...common}>
          <path d="M12 2 4 7v10l8 5 8-5V7l-8-5Z" />
          <path d="m4 7 8 5 8-5M12 12v10" />
        </svg>
      );
  }
}
