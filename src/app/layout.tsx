import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Zelená Střecha | Zahradnictví & Krajinná architektura",
    template: "%s | Zelená Střecha",
  },
  description:
    "Profesionální zahradnictví a krajinná architektura. Navrhujeme a pečujeme o zahrady, terasy a balkóny po celé ČR.",
  keywords: ["zahradnictví", "krajinná architektura", "zahrada", "terasa", "balkón"],
  openGraph: {
    title: "Zelená Střecha | Zahradnictví & Krajinná architektura",
    description: "Profesionální zahradnictví a krajinná architektura po celé ČR.",
    locale: "cs_CZ",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
