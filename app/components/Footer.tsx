import { Logo } from "./Logo";
import { NAV_LINKS, SOLUTIONS, CONTACT } from "@/app/lib/content";

export function Footer() {
  return (
    <footer
      id="contacto"
      className="relative border-t border-hairline bg-carbon"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Marca */}
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-base leading-relaxed text-mist">
              Ingeniería electrónica diseñada para un futuro más conectado,
              seguro y eficiente.
            </p>
          </div>

          {/* Menú */}
          <nav aria-label="Menú">
            <h3 className="eyebrow mb-5">Menú</h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-base text-mist transition-colors hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Soluciones */}
          <nav aria-label="Soluciones">
            <h3 className="eyebrow mb-5">Soluciones</h3>
            <ul className="space-y-3">
              {SOLUTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href="#soluciones"
                    className="text-base text-mist transition-colors hover:text-ink"
                  >
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contacto */}
          <div>
            <h3 className="eyebrow mb-5">Contacto</h3>
            <address className="space-y-3 text-base not-italic text-mist">
              <p>
                {CONTACT.addressLines[0]}
                <br />
                {CONTACT.addressLines[1]}
              </p>
              {CONTACT.phones.map((phone) => (
                <p key={phone}>
                  <a
                    href={`tel:${phone.replace(/[^+\d]/g, "")}`}
                    className="transition-colors hover:text-ink"
                  >
                    {phone}
                  </a>
                </p>
              ))}
              <p>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-energy-bright transition-colors hover:text-energy-hover"
                >
                  {CONTACT.email}
                </a>
              </p>
            </address>

            <div className="mt-6 flex gap-3">
              {CONTACT.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-mist transition-all hover:border-energy hover:text-ink"
                >
                  <span className="text-[10px] font-semibold">
                    {s.label.slice(0, 2)}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-hairline pt-8 text-sm text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} MOWIN Technologies. Todos los derechos reservados.</p>
          <p>Engineering Intelligent Mobility.</p>
        </div>
      </div>
    </footer>
  );
}
