"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { NAV_LINKS } from "@/app/lib/content";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>("/#inicio");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: resalta en el nav la sección visible cerca del centro del viewport
  useEffect(() => {
    if (pathname !== "/") return;

    const sections = NAV_LINKS.map((link) =>
      document.getElementById(link.sectionId)
    ).filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHref(`/#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  // Bloquea el scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        scrolled
          ? "border-b border-hairline bg-void/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" aria-label="MOWIN inicio">
          <Logo />
        </Link>

        {/* Nav desktop */}
        <nav className="hidden items-center gap-5 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive =
              (pathname === "/" && activeHref === link.href) ||
              (link.sectionId === "producto" && pathname.startsWith("/productos"));
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative text-sm font-medium transition-colors duration-300 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-energy after:transition-all after:duration-300 hover:after:w-full ${
                  isActive
                    ? "text-ink after:w-full"
                    : "text-mist hover:text-ink after:w-0"
                }`}
              >
                {link.label}
              </a>
            );
          })}
          <a
            href="/aplicaciones"
            aria-current={pathname === "/aplicaciones" ? "page" : undefined}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 ${
              pathname === "/aplicaciones"
                ? "border-energy bg-energy/15 text-ink shadow-[0_0_24px_rgba(31,107,255,0.2)]"
                : "border-hairline-strong text-mist hover:border-energy hover:text-ink"
            }`}
          >
            Aplicaciones
          </a>
        </nav>

        <div className="hidden lg:block">
          <Button href="#contacto" variant="outline">
            Hablemos
          </Button>
        </div>

        {/* Botón menú móvil */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={`h-px w-6 bg-ink transition-all duration-300 ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-ink transition-all duration-300 ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Overlay móvil */}
      <div
        className={`fixed inset-0 z-40 flex flex-col bg-void/98 backdrop-blur-xl transition-all duration-500 lg:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="mt-28 flex flex-col gap-2 px-8">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-hairline py-4 font-display text-2xl font-bold text-ink transition-colors hover:text-energy-hover"
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/aplicaciones"
            onClick={() => setOpen(false)}
            className="border-b border-energy/40 py-4 font-display text-2xl font-bold text-energy-bright transition-colors hover:text-energy-hover"
          >
            Aplicaciones
          </a>
          <div className="mt-8">
            <Button href="#contacto" variant="primary">
              Hablemos
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
