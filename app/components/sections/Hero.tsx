"use client";

import Image from "next/image";
import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { Button } from "../Button";
import { HexGrid } from "../HexGrid";

const SCREEN_STATES = [
  {
    id: "inicio",
    title: "MOVILIDAD INTELIGENTE",
    titleLines: ["MOVILIDAD", "INTELIGENTE"],
    detail: "Control · información · conectividad",
    badge: "MOWIN SYSTEMS",
    photoTitle: "PANEL MULTIPLEX",
    image: "/images/products/multiplex-control-panel.png",
    sourceWidth: 1024,
    sourceHeight: 1024,
    cropViewBox: "90 100 850 820",
  },
  {
    id: "control",
    title: "MULTIPLEX",
    titleLines: ["CONTROL", "MULTIPLEX"],
    detail: "Arquitectura modular y confiable",
    badge: "MODULAR",
    photoTitle: "PANEL MULTIPLEX",
    image: "/images/products/multiplex-control-panel.png",
    sourceWidth: 1024,
    sourceHeight: 1024,
    cropViewBox: "90 100 850 820",
  },
  {
    id: "informacion",
    title: "INDICACIÓN LED",
    titleLines: ["INFORMACIÓN", "LED"],
    detail: "Lectura clara en carretera",
    badge: "ALTA VISIBILIDAD",
    photoTitle: "INDICADOR 80 KM/H",
    image: "/images/products/velocimetro-80.png",
    sourceWidth: 1600,
    sourceHeight: 1117,
    cropViewBox: "210 325 1190 465",
  },
  {
    id: "telematica",
    title: "GNSS + BLUETOOTH",
    titleLines: ["TELEMÁTICA", "GNSS + BT"],
    detail: "Monitoreo y conectividad de flota",
    badge: "CONNECTED",
    photoTitle: "SMART TACHOGRAPH",
    image: "/images/products/velocimetro-bus-plus-iso.png",
    sourceWidth: 1600,
    sourceHeight: 1117,
    cropViewBox: "250 65 1110 980",
  },
] as const;

const DEVICE_CONTROLS = [
  { id: "left", label: "Flecha izquierda: pantalla anterior", action: "previous", left: "32%", top: "54%" },
  { id: "minus", label: "Botón menos: volver a la información", action: "info", left: "32%", top: "64%" },
  { id: "menu", label: "Volver a la pantalla inicial", action: "home", left: "48%", top: "65%" },
  { id: "right", label: "Flecha derecha: pantalla siguiente", action: "next", left: "63%", top: "61%" },
  { id: "plus", label: "Botón más: ampliar la fotografía", action: "photo", left: "63%", top: "73%" },
] as const;

type ScreenMode = "info" | "photo";

export function Hero() {
  const reduce = useReducedMotion();
  const [activeScreen, setActiveScreen] = useState(0);
  const [screenMode, setScreenMode] = useState<ScreenMode>("info");
  const [hasInteracted, setHasInteracted] = useState(false);
  const screen = SCREEN_STATES[activeScreen];

  const changeScreen = (action: (typeof DEVICE_CONTROLS)[number]["action"]) => {
    setHasInteracted(true);

    if (action === "home") {
      setActiveScreen(0);
      setScreenMode("info");
      return;
    }

    if (action === "photo" || action === "info") {
      setScreenMode(action);
      return;
    }

    setActiveScreen((current) => {
      const direction = action === "next" ? 1 : -1;
      return (current + direction + SCREEN_STATES.length) % SCREEN_STATES.length;
    });
    setScreenMode("info");
  };

  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section
      id="inicio"
      className="relative flex min-h-[min(860px,100svh)] items-center overflow-hidden bg-void pb-8 pt-24 sm:pb-12 sm:pt-28 lg:pb-12 lg:pt-24"
    >
      <HexGrid className="z-0" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_48%,rgba(15,78,210,0.18),transparent_30%),radial-gradient(circle_at_55%_100%,rgba(14,57,133,0.13),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-void" />

      <div className="pointer-events-none relative z-10 mx-auto grid w-full max-w-[1360px] items-center gap-4 px-6 sm:gap-6 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-4 lg:px-12 xl:px-16 [&_a]:pointer-events-auto">
        <div className="relative">
          <motion.p {...rise(0.05)} className="eyebrow mb-4 text-energy-bright sm:mb-5">
            Ingeniería automotriz · Pereira, Colombia
          </motion.p>

          <motion.h1
            {...rise(0.12)}
            className="max-w-[720px] font-display text-[clamp(2rem,3.25vw,3.45rem)] font-bold uppercase leading-[1.08]"
          >
            Control e información para la{" "}
            <span className="text-energy-gradient">movilidad.</span>
          </motion.h1>

          <motion.p
            {...rise(0.22)}
            className="mt-6 max-w-[560px] text-base leading-7 text-mist sm:mt-7 sm:text-lg sm:leading-8"
          >
            Diseñamos y fabricamos soluciones electrónicas para la industria
            automotriz y el ecosistema IoT, aplicadas a buses, camiones y
            carrocerías de transporte de pasajeros.
          </motion.p>

          <motion.p
            {...rise(0.28)}
            className="mt-5 max-w-[560px] font-display text-xs font-semibold uppercase tracking-[0.16em] text-energy-hover sm:text-sm"
          >
            Multiplex · Información LED · Telemática
          </motion.p>

          <motion.div
            {...rise(0.36)}
            className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-5"
          >
            <Button href="#soluciones" variant="primary">
              Explorar capacidades
            </Button>
            <Button href="#contacto" variant="ghost">
              Hablar con ingeniería
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto relative mx-auto -mt-2 w-full max-w-[360px] touch-pan-y sm:-mt-5 sm:max-w-[400px] md:max-w-[500px] lg:mt-0 lg:mr-[-1rem] lg:max-w-[650px] xl:mr-[-1.5rem]"
          aria-label="Demostración interactiva de un dispositivo MOWIN"
        >
          <div
            className="hero-product-glow pointer-events-none absolute left-1/2 top-1/2 h-[112%] w-[112%] -translate-x-1/2 -translate-y-1/2"
          />

          <div
            className="relative aspect-square w-full"
          >
            <Image
              src="/images/products/multiplex-control-panel-hero.png"
              alt="Dispositivo de control Multiplex MOWIN con pantalla y botones interactivos"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, (min-width: 640px) 650px, 100vw"
              className="pointer-events-none select-none object-contain drop-shadow-[0_26px_35px_rgba(0,0,0,0.5)]"
            />

            <svg
              id="hero-device-screen"
              viewBox="0 0 1024 1024"
              className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
              role="img"
              aria-labelledby="hero-screen-title hero-screen-description"
            >
              <title id="hero-screen-title">{screen.title}</title>
              <desc id="hero-screen-description">
                {screenMode === "photo" ? `Fotografía ampliada: ${screen.photoTitle}` : screen.detail}
              </desc>
              <defs>
                <clipPath id="hero-screen-clip">
                  <rect width="400" height="260" rx="5" />
                </clipPath>
                <linearGradient id="hero-screen-bg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#061125" />
                  <stop offset="0.55" stopColor="#071a35" />
                  <stop offset="1" stopColor="#020710" />
                </linearGradient>
                <linearGradient id="hero-screen-fade" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0.4" stopColor="#061125" stopOpacity="1" />
                  <stop offset="0.75" stopColor="#061125" stopOpacity="0.35" />
                  <stop offset="1" stopColor="#061125" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="hero-photo-fade" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0.48" stopColor="#020710" stopOpacity="0" />
                  <stop offset="1" stopColor="#020710" stopOpacity="0.95" />
                </linearGradient>
              </defs>

              <g transform="matrix(0.9125 0.2475 -0.0038 1.073 302 196)" clipPath="url(#hero-screen-clip)">
                <rect width="400" height="260" fill="url(#hero-screen-bg)" />
                <AnimatePresence initial={false}>
                  <motion.g
                    key={`${screen.id}-${screenMode}`}
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    {screenMode === "photo" ? (
                      <>
                        <rect width="400" height="260" fill="#020710" />
                        <svg
                          x="14"
                          y="8"
                          width="372"
                          height="238"
                          viewBox={screen.cropViewBox}
                          preserveAspectRatio="xMidYMid meet"
                        >
                          <image
                            href={screen.image}
                            width={screen.sourceWidth}
                            height={screen.sourceHeight}
                          />
                        </svg>
                        <rect width="400" height="260" fill="url(#hero-photo-fade)" />
                        <rect x="20" y="18" width="66" height="25" rx="12.5" fill="#1f6bff" />
                        <text x="37" y="35" fill="#fff" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="800">
                          FOTO
                        </text>
                        <image href="/images/brand/logo_mowin_new.svg" x="300" y="11" width="79" height="39" />
                        <text
                          x="24"
                          y="229"
                          fill="#ffffff"
                          fontSize="22"
                          fontWeight="750"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {screen.photoTitle}
                        </text>
                      </>
                    ) : screen.id === "inicio" ? (
                      <>
                        <circle cx="332" cy="134" r="102" fill="#0b2c68" opacity="0.38" />
                        <circle cx="332" cy="134" r="70" fill="none" stroke="#1f6bff" strokeWidth="1" opacity="0.38" />
                        <path d="M245 210 L392 63 M276 239 L399 116" stroke="#3e8bff" strokeWidth="1" opacity="0.24" />
                        <image href="/images/brand/logo_mowin_new.svg" x="29" y="20" width="168" height="84" />
                        <path d="M30 111 H190" stroke="#3e8bff" strokeWidth="2" />
                        {screen.titleLines.map((line, index) => (
                          <text
                            key={line}
                            x="30"
                            y={155 + index * 34}
                            fill={index === 1 ? "#65a6ff" : "#ffffff"}
                            fontSize="28"
                            fontWeight="750"
                            letterSpacing="-0.5"
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            {line}
                          </text>
                        ))}
                        <text x="31" y="224" fill="#d7e5f7" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="600">
                          {screen.detail}
                        </text>
                      </>
                    ) : (
                      <>
                        <svg x="213" y="41" width="174" height="174" viewBox={screen.cropViewBox} preserveAspectRatio="xMidYMid meet">
                          <image href={screen.image} width={screen.sourceWidth} height={screen.sourceHeight} />
                        </svg>
                        <rect width="278" height="260" fill="url(#hero-screen-fade)" />
                        <rect x="24" y="25" width="5" height="67" rx="2.5" fill="#3e8bff" />
                        <image href="/images/brand/logo_mowin_new.svg" x="304" y="12" width="76" height="38" />
                        {screen.titleLines.map((line, index) => (
                          <text
                            key={line}
                            x="42"
                            y={68 + index * 35}
                            fill={index === 1 ? "#65a6ff" : "#ffffff"}
                            fontSize="29"
                            fontWeight="750"
                            letterSpacing="-0.5"
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            {line}
                          </text>
                        ))}
                        <text x="42" y="158" fill="#d7e5f7" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="600">
                          {screen.detail}
                        </text>
                        <rect x="41" y="185" width="139" height="32" rx="16" fill="#0f284c" stroke="#2f79e8" />
                        <circle cx="58" cy="201" r="4" fill="#52d78f" />
                        <text x="70" y="205" fill="#eef6ff" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="800" letterSpacing="0.8">
                          {screen.badge}
                        </text>
                      </>
                    )}
                  </motion.g>
                </AnimatePresence>
                <path d="M0 238 H400" stroke="#1f6bff" strokeWidth="1" opacity="0.45" />
                <path d="M370 0 V260" stroke="#54a0ff" strokeWidth="0.7" opacity="0.22" />
              </g>
            </svg>

            {DEVICE_CONTROLS.map((control) => (
              <motion.button
                key={control.id}
                type="button"
                data-device-control={control.id}
                aria-label={control.label}
                aria-controls="hero-device-screen"
                aria-describedby={!hasInteracted && control.id === "right" ? "hero-device-guide" : undefined}
                onClick={() => changeScreen(control.action)}
                whileTap={reduce ? undefined : { scale: 0.9 }}
                className={`hero-device-control absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer touch-manipulation rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy-hover focus-visible:ring-offset-2 focus-visible:ring-offset-void ${
                  !hasInteracted && control.id === "right" ? "is-guided" : ""
                }`}
                style={{
                  left: control.left,
                  top: control.top,
                  width: "clamp(2.75rem, 6.5vw, 4.35rem)",
                  height: "clamp(2.75rem, 6.5vw, 4.35rem)",
                }}
              >
                <span className="sr-only">{control.label}</span>
              </motion.button>
            ))}
          </div>

          <div className="relative z-30 -mt-[6%] flex flex-col items-center text-center sm:-mt-[8%]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                id="hero-device-guide"
                key={hasInteracted ? "controls" : "guide"}
                initial={reduce ? false : { opacity: 0, y: 7, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, y: -5, scale: 0.97 }}
                transition={{ duration: 0.24 }}
                className={`hero-device-hint inline-flex items-center gap-2 font-display text-[10px] font-semibold uppercase tracking-[0.14em] sm:text-[11px] ${
                  hasInteracted ? "text-energy-hover" : "hero-device-onboarding text-white"
                }`}
              >
                {hasInteracted ? (
                  <>
                    <span className="relative flex h-2 w-2" aria-hidden="true">
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-energy-hover" />
                    </span>
                    ← → Soluciones · + Foto · − Información · centro Inicio
                  </>
                ) : (
                  <>
                    <span className="hero-onboarding-arrow" aria-hidden="true">→</span>
                    <span>Pulsa la flecha para explorar</span>
                  </>
                )}
              </motion.p>
            </AnimatePresence>
            <motion.p
              key={`${screen.id}-${screenMode}`}
              role="status"
              aria-live="polite"
              initial={reduce ? false : { opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18 }}
              className="mt-2 max-w-[390px] text-sm leading-5 text-mist sm:text-sm"
            >
              <span className="text-faint">
                {screenMode === "photo" ? "Vista fotográfica" : `Pantalla ${activeScreen + 1}/${SCREEN_STATES.length}`}
              </span>
              {" · "}{screenMode === "photo" ? screen.photoTitle : `${screen.title} — ${screen.detail}`}
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
