import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/LenisProvider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PAINTCAM Industries S.A. — 20 ans en couleurs",
  description:
    "Invitation officielle aux 20 ans de PAINTCAM Industries S.A. à One Rooftop, Bonapriso, Douala.",
  openGraph: {
    title: "PAINTCAM Industries S.A. — 20 ans en couleurs",
    description:
      "Marquons deux décennies de passion, d'innovation et de confiance.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${playfair.variable} ${manrope.variable}`}>
      <body>
        <div className="grain-overlay" aria-hidden="true" />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
