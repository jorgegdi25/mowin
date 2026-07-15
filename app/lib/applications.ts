export type ApplicationCategory = "multiplex" | "led" | "telematics";

export interface MowinApplication {
  id: string;
  name: string;
  shortName: string;
  category: ApplicationCategory;
  categoryLabel: string;
  eyebrow: string;
  description: string;
  compatibleWith: string[];
  platforms: string[];
  connection: string;
  availability: "public" | "assisted";
  featured?: boolean;
  actions: {
    label: string;
    href: string;
    external?: boolean;
    primary?: boolean;
  }[];
}

const supportEmail = "mailto:contactenos@mowin-tech.com";

export const APPLICATIONS: MowinApplication[] = [
  {
    id: "multiplex-scanner",
    name: "Multiplex Scanner",
    shortName: "MS",
    category: "multiplex",
    categoryLabel: "Multiplex Systems",
    eyebrow: "Diagnóstico en campo",
    description:
      "Conecta por Bluetooth con los teclados del sistema MOWIN y consulta el estado de la red de forma práctica y segura.",
    compatibleWith: ["Teclados Multiplex", "Red MOWIN"],
    platforms: ["Android"],
    connection: "Bluetooth",
    availability: "public",
    featured: true,
    actions: [
      {
        label: "Descargar en Google Play",
        href: "https://play.google.com/store/apps/details?id=com.multiplex.diagnostics.app",
        external: true,
        primary: true,
      },
    ],
  },
  {
    id: "bus-panel-editor",
    name: "Bus Panel Editor",
    shortName: "BPE",
    category: "led",
    categoryLabel: "LED Systems",
    eyebrow: "Edición de rutas",
    description:
      "Crea mensajes, rutas, efectos e íconos; simula el resultado y transfiere el proyecto directamente a los paneles MOWIN.",
    compatibleWith: ["Paneles LED", "PIP MOWIN"],
    platforms: ["Android"],
    connection: "Bluetooth",
    availability: "public",
    featured: true,
    actions: [
      {
        label: "Descargar en Google Play",
        href: "https://play.google.com/store/apps/details?id=com.mowintech.buspaneleditor",
        external: true,
        primary: true,
      },
    ],
  },
  {
    id: "multiplex-design-studio",
    name: "Multiplex Design Studio",
    shortName: "MDS",
    category: "multiplex",
    categoryLabel: "Multiplex Systems",
    eyebrow: "Programación de proyectos",
    description:
      "Entorno de ingeniería para crear, configurar y transferir proyectos Multiplex a los equipos instalados en cada vehículo.",
    compatibleWith: ["Módulos Multiplex", "Proyectos MDS"],
    platforms: ["Windows", "Android"],
    connection: "USB / Bluetooth",
    availability: "assisted",
    actions: [
      {
        label: "Solicitar acceso",
        href: `${supportEmail}?subject=Acceso%20a%20Multiplex%20Design%20Studio`,
        primary: true,
      },
    ],
  },
  {
    id: "velocimetro-gps",
    name: "Velocímetro GPS",
    shortName: "GPS",
    category: "telematics",
    categoryLabel: "Telematics Systems",
    eyebrow: "Reportes de operación",
    description:
      "Consulta y organiza la información registrada por los velocímetros MOWIN para apoyar el seguimiento y control de la operación.",
    compatibleWith: ["Velocímetro Bus Plus", "Smart Tachograph"],
    platforms: ["Android", "Web"],
    connection: "Bluetooth / Datos",
    availability: "assisted",
    actions: [
      {
        label: "Solicitar acceso",
        href: `${supportEmail}?subject=Acceso%20a%20Veloc%C3%ADmetro%20GPS`,
        primary: true,
      },
    ],
  },
  {
    id: "pip-programmable",
    name: "PIP Programmable",
    shortName: "PIP",
    category: "led",
    categoryLabel: "LED Systems",
    eyebrow: "Mensajería programable",
    description:
      "Crea, edita y transfiere contenidos para paneles PIP MOWIN, con control de mensajes y presentación desde una sola herramienta.",
    compatibleWith: ["PIP Message", "Paneles informativos"],
    platforms: ["Windows"],
    connection: "USB / Bluetooth",
    availability: "assisted",
    actions: [
      {
        label: "Solicitar acceso",
        href: `${supportEmail}?subject=Acceso%20a%20PIP%20Programmable`,
        primary: true,
      },
    ],
  },
];
