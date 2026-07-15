/**
 * Contenido central del sitio MOWIN.
 * Fuente única de verdad para navegación, soluciones, producto y contacto.
 */

export const NAV_LINKS = [
  { label: "Inicio", href: "/#inicio", sectionId: "inicio" },
  { label: "Soluciones", href: "/#soluciones", sectionId: "soluciones" },
  { label: "Productos", href: "/#producto", sectionId: "producto" },
  { label: "Tecnología", href: "/#tecnologia", sectionId: "tecnologia" },
  { label: "Nosotros", href: "/#nosotros", sectionId: "nosotros" },
  { label: "Contacto", href: "/#contacto", sectionId: "contacto" },
] as const;

export type SolutionIcon =
  | "multiplex"
  | "led"
  | "audio"
  | "telematics"
  | "miscellaneous";

export interface Solution {
  id: string;
  name: string;
  icon: SolutionIcon;
  tagline: string;
  description: string;
  bullets: string[];
}

export const SOLUTIONS: Solution[] = [
  {
    id: "multiplex",
    name: "Multiplex Systems",
    icon: "multiplex",
    tagline: "Arquitectura eléctrica inteligente",
    description:
      "Reemplazamos el cableado tradicional por redes multiplexadas que reducen peso, fallos y tiempos de instalación, dando control total sobre cada función del vehículo.",
    bullets: [
      "Menos cableado, mayor confiabilidad",
      "Diagnóstico y control centralizado",
      "Escalable a cualquier configuración de carrocería",
    ],
  },
  {
    id: "led",
    name: "LED Systems",
    icon: "led",
    tagline: "Información visual de alto impacto",
    description:
      "Paneles e indicadores LED diseñados para máxima legibilidad en carretera, con electrónica propia optimizada para el consumo y la durabilidad.",
    bullets: [
      "Alta luminosidad y contraste",
      "Bajo consumo energético",
      "Diseño robusto para uso vehicular",
    ],
  },
  {
    id: "audio",
    name: "Audio Systems",
    icon: "audio",
    tagline: "Sonido claro para el pasajero",
    description:
      "Sistemas de audio y avisos integrados a la electrónica del vehículo, pensados para comunicación clara en entornos exigentes.",
    bullets: [
      "Integración con la red del vehículo",
      "Audio nítido en cabina",
      "Control programable de mensajes",
    ],
  },
  {
    id: "telematics",
    name: "Telematics Systems",
    icon: "telematics",
    tagline: "Vehículos conectados y monitoreados",
    description:
      "Telemetría, GPS y registro de eventos en tiempo real. Conectamos cada vehículo a la información que las flotas necesitan para operar con seguridad.",
    bullets: [
      "Monitoreo GNSS en tiempo real",
      "Registro de eventos y velocidad",
      "Conectividad Bluetooth y datos",
    ],
  },
  {
    id: "miscellaneous",
    name: "Miscellaneous",
    icon: "miscellaneous",
    tagline: "Ingeniería a la medida",
    description:
      "Desarrollos electrónicos específicos para necesidades particulares de cada cliente: del concepto al producto final, con hardware y firmware propios.",
    bullets: [
      "Diseño de hardware a medida",
      "Firmware desarrollado en casa",
      "Del prototipo a la producción",
    ],
  },
];

export interface FeaturedProduct {
  id: string;
  name: string;
  reference: string;
  description: string;
  benefits: { label: string; value: string }[];
  image: string;
}

/** Productos protagonistas del slide en Home. Catálogo completo: /productos. */
export const FEATURED_PRODUCTS: FeaturedProduct[] = [
  {
    id: "multiplex-panel",
    name: "Panel Multiplex Systems",
    reference: "Control Multiplex",
    description:
      "Centro de control multiplexado con pantalla LCD y botones retroiluminados. Gestiona múltiples funciones del vehículo desde una sola interfaz, en carcasa de fibra de carbono para máxima durabilidad.",
    benefits: [
      { label: "Display", value: "LCD a color" },
      { label: "Control", value: "Táctil retroiluminado" },
      { label: "Carcasa", value: "Fibra de carbono" },
      { label: "Red", value: "Multiplexada" },
    ],
    image: "/images/products/multiplex-control-panel.png",
  },
  {
    id: "bus-plus",
    name: "Velocímetro Bus Plus",
    reference: "Serie 7203319 · REV00",
    description:
      "Visualización clara y precisa de la velocidad para el conductor. Diseño robusto para las condiciones más exigentes del transporte, con display de alto contraste legible en cualquier luz.",
    benefits: [
      { label: "Display", value: "Alto contraste" },
      { label: "Precisión", value: "Señal GNSS" },
      { label: "Carcasa", value: "Grado vehicular" },
      { label: "Instalación", value: "Plug & play" },
    ],
    image: "/images/products/velocimetro-bus-plus.png",
  },
  {
    id: "smart-tachograph",
    name: "Smart Tachograph",
    reference: "Serie 7200419 · REV02",
    description:
      "Tacógrafo inteligente con GNSS y Bluetooth integrados. Registra velocidad, ubicación y eventos del vehículo en tiempo real, en una carcasa compacta de instalación discreta.",
    benefits: [
      { label: "GNSS", value: "Tiempo real" },
      { label: "Conectividad", value: "Bluetooth" },
      { label: "Carcasa", value: "Compacta" },
      { label: "Instalación", value: "Empotrable" },
    ],
    image: "/images/products/velocimetro-bus-plus-iso.png",
  },
  {
    id: "van",
    name: "Velocímetro Van",
    reference: "Serie 7203219",
    description:
      "Versión compacta para vehículos livianos. El mismo display de alto contraste en un formato delgado, pensado para tableros con espacio reducido.",
    benefits: [
      { label: "Display", value: "Alto contraste" },
      { label: "Formato", value: "Compacto" },
      { label: "Carcasa", value: "Aluminio" },
      { label: "Instalación", value: "Plug & play" },
    ],
    image: "/images/products/velocimetro-van.png",
  },
  {
    id: "bus",
    name: "Velocímetro Bus",
    reference: "Serie 7200820",
    description:
      "Visualización robusta de velocidad para buses de servicio intensivo. Diseño resistente a vibración y a las condiciones exigentes de la operación diaria.",
    benefits: [
      { label: "Display", value: "LED rojo" },
      { label: "Resistencia", value: "Uso intensivo" },
      { label: "Carcasa", value: "Grado vehicular" },
      { label: "Instalación", value: "Universal" },
    ],
    image: "/images/products/velocimetro-80.png",
  },
];

export const CLIENTS = [
  { name: "KAE", logo: "/images/clients/empresas_1.png" },
  { name: "Fábrica Nacional de Amortecedores", logo: "/images/clients/empresas_2.png" },
  { name: "Sinalsul", logo: "/images/clients/empresas_3.png" },
  { name: "Express del Futuro", logo: "/images/clients/client-20.png" },
  { name: "Cliente", logo: "/images/clients/client-21.png" },
];

export const STATS = [
  { value: "+15", label: "Años de ingeniería propia" },
  { value: "100%", label: "Hardware y firmware in-house" },
  { value: "5", label: "Líneas de solución" },
  { value: "24/7", label: "Vehículos monitoreados" },
];

export const CONTACT = {
  addressLines: ["Carrera 17 N. 16 B – 09", "Pereira, Risaralda, Colombia"],
  phones: ["+57 (6) 316 39 10", "+57 322 212 21 00"],
  email: "contactenos@mowin-tech.com",
  socials: [
    { label: "LinkedIn", href: "#" },
    { label: "YouTube", href: "#" },
    { label: "Instagram", href: "#" },
  ],
};
