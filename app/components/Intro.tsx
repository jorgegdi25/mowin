"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const SESSION_KEY = "mowin-intro-shown";
const EASE = [0.16, 1, 0.3, 1] as const;

/** Trazado de los 3 hexágonos de la marca, en el mismo layout del logo real. */
const HEX_PATHS = [
  "M4.41,54.43l6.34-11,6.34-11H42.45l6.34,11,6.34,11-6.34,11-6.34,11H17.09l-6.34-11ZM0,54.43,7.44,41.54l7.44-12.9H44.65l7.45,12.9,7.44,12.89L52.1,67.32,44.65,80.21H14.88L7.44,67.32Z",
  "M54,25.78l6.34-11,6.34-11H92.06l6.34,11,6.34,11-6.34,11-6.34,11H66.71l-6.34-11Zm-4.41,0,7.44-12.89L64.5,0H94.27l7.44,12.89,7.44,12.89-7.44,12.89L94.27,51.56H64.5L57.06,38.67Z",
  "M4.41,111.72l6.34-11,6.34-11H42.45l6.34,11,6.34,11-6.34,11-6.34,11H17.09l-6.34-11Zm-4.41,0L7.44,98.83l7.44-12.89H44.65L52.1,98.83l7.44,12.89L52.1,124.61,44.65,137.5H14.88L7.44,124.61Z",
];

const WORDMARK_PATH =
  "M276,91.54a5.12,5.12,0,0,1-2,4.29,5.67,5.67,0,0,1-3.62,1.36V74.61H233.6V97.19a5.18,5.18,0,0,1-4.31-2,5.7,5.7,0,0,1-1.35-3.62V74.6A5.17,5.17,0,0,1,230,70.31,5.83,5.83,0,0,1,233.6,69h36.78a5.16,5.16,0,0,1,4.3,2A5.63,5.63,0,0,1,276,74.6Zm-53.76,5.65h-5.66V69h5.66ZM211,91.54a5.62,5.62,0,0,1-1.3,3.56,5.29,5.29,0,0,1-4.36,2.09H168.52a5.76,5.76,0,0,1-3.57-1.3,5.22,5.22,0,0,1-2.09-4.35V74.6a5.54,5.54,0,0,1,1.3-3.55,5.24,5.24,0,0,1,4.36-2.1V91.53h15.56V69h5.66V91.53H205.3V69a5.65,5.65,0,0,1,3.56,1.3A5.24,5.24,0,0,1,211,74.6Zm-59.42,0V74.61H114.75V91.53Zm5.66,0a5.15,5.15,0,0,1-2.1,4.29,5.75,5.75,0,0,1-3.56,1.36H114.75a5.18,5.18,0,0,1-4.3-2,5.71,5.71,0,0,1-1.36-3.62V74.6a5.19,5.19,0,0,1,2-4.35,5.74,5.74,0,0,1,3.62-1.3h36.79a5.16,5.16,0,0,1,4.3,2,5.68,5.68,0,0,1,1.36,3.61Zm-53.76,0a5.12,5.12,0,0,1-2,4.29,5.67,5.67,0,0,1-3.62,1.36V74.61H82.21V97.19H76.56V74.61H61V97.19a5.18,5.18,0,0,1-4.3-2,5.71,5.71,0,0,1-1.36-3.62V74.6a5.18,5.18,0,0,1,2.1-4.29A5.83,5.83,0,0,1,61,69H97.78a5.16,5.16,0,0,1,4.3,2,5.68,5.68,0,0,1,1.36,3.61Z";

/** Tiempo tras el cual aparece el botón "Entrar", una vez el logo terminó de dibujarse. */
const BUTTON_DELAY = 1400;
/** Si nadie hace clic, cuánto esperamos desde que aparece el botón antes de continuar solos. */
const AUTO_CONTINUE_AFTER_BUTTON = 4000;

/**
 * Intro de marca: dibuja los hexágonos, revela el wordmark, muestra un botón
 * "Entrar" (con avance automático si nadie hace clic) y transiciona al sitio.
 * Se muestra una sola vez por sesión de navegador.
 */
export function Intro() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<"idle" | "playing" | "exiting" | "done">(
    "idle"
  );
  const [showButton, setShowButton] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const initialized = useRef(false);

  useEffect(() => {
    // React Strict Mode ejecuta este efecto dos veces en desarrollo; sin este
    // guard, la segunda pasada lee el sessionStorage ya marcado por la
    // primera y salta la intro de inmediato.
    if (initialized.current) return;
    initialized.current = true;

    let alreadyShown = true;
    try {
      alreadyShown = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // sessionStorage no disponible (modo privado, etc.) — no repetir la intro
    }

    if (reduce || alreadyShown) {
      setPhase("done");
      return;
    }

    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {}

    setPhase("playing");
    timers.current.push(
      setTimeout(() => {
        setShowButton(true);
        timers.current.push(
          setTimeout(() => setPhase("exiting"), AUTO_CONTINUE_AFTER_BUTTON)
        );
      }, BUTTON_DELAY)
    );

    return () => timers.current.forEach(clearTimeout);
  }, [reduce]);

  useEffect(() => {
    document.body.style.overflow =
      phase === "playing" || phase === "exiting" ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  const skip = () => {
    timers.current.forEach(clearTimeout);
    setPhase("exiting");
  };

  if (phase === "idle" || phase === "done") return null;

  return (
    <AnimatePresence onExitComplete={() => setPhase("done")}>
      {phase !== "exiting" ? (
        <motion.div
          key="intro"
          onClick={skip}
          exit={{ opacity: 0, scale: 1.06 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="fixed inset-0 z-[100] flex cursor-pointer items-center justify-center bg-void"
        >
          <div className="circuit-grid pointer-events-none absolute inset-0 opacity-50" />
          <div className="energy-glow pointer-events-none absolute h-[420px] w-[420px] opacity-60" />

          <div className="relative w-[220px] sm:w-[320px]">
            <svg viewBox="0 0 276.04 137.5" className="w-full overflow-visible">
              {HEX_PATHS.map((d, i) => (
                <motion.path
                  key={i}
                  d={d}
                  fill="var(--color-ink)"
                  fillOpacity={0}
                  stroke="var(--color-energy-bright)"
                  strokeWidth={1.5}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: 1,
                    opacity: 1,
                    fillOpacity: [0, 0, 1],
                  }}
                  transition={{
                    pathLength: { duration: 0.5, delay: i * 0.12, ease: EASE },
                    opacity: { duration: 0.2, delay: i * 0.12 },
                    fillOpacity: {
                      duration: 0.4,
                      delay: 0.65 + i * 0.05,
                      times: [0, 0.01, 1],
                    },
                  }}
                />
              ))}
              <motion.path
                d={WORDMARK_PATH}
                fill="var(--color-ink)"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.75, ease: EASE }}
              />
            </svg>

            {/* Barrido de energía sobre la marca */}
            <motion.div
              className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-energy-bright/70 to-transparent mix-blend-screen"
              style={{ filter: "blur(6px)" }}
              initial={{ x: "-120%", opacity: 0 }}
              animate={{ x: "220%", opacity: [0, 1, 1, 0] }}
              transition={{ duration: 0.9, delay: 1.15, ease: "easeInOut" }}
            />
          </div>

          {showButton && (
            <motion.button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                skip();
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="group absolute bottom-[28%] flex items-center gap-2.5 rounded-full border border-hairline-strong px-7 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:border-energy hover:text-energy-bright sm:bottom-[22%]"
            >
              Entrar
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </motion.button>
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
