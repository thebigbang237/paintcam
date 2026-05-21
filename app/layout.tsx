import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/LenisProvider";

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
    <html lang="fr" className={manrope.variable}>
      <body>
        <div className="grain-overlay" aria-hidden="true" />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
