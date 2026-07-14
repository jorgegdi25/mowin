import type { Metadata } from "next";
import { Inter, Orbitron, Plus_Jakarta_Sans } from "next/font/google";
import { Intro } from "./components/Intro";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mowin-tech.com.co"),
  title: {
    default: "MOWIN Technologies — Tecnología que impulsa la movilidad inteligente",
    template: "%s · MOWIN Technologies",
  },
  description:
    "Desarrollamos sistemas electrónicos innovadores —hardware, firmware y software propio— que conectan vehículos, información y personas para transformar el transporte del futuro.",
  keywords: [
    "MOWIN",
    "movilidad inteligente",
    "ingeniería electrónica",
    "telemática",
    "tacógrafo",
    "velocímetro bus",
    "sistemas multiplex",
    "transporte Colombia",
  ],
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: "MOWIN Technologies",
    title: "MOWIN Technologies — Engineering Intelligent Mobility",
    description:
      "Sistemas electrónicos para la movilidad inteligente. Hardware, firmware y software desarrollados en Colombia.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${jakarta.variable} ${orbitron.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <Intro />
        {children}
      </body>
    </html>
  );
}
