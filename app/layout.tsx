import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Svarah Interiors | Luxury Interior Design Studio",
  description:
    "Svarah Interiors crafts refined, harmonious spaces rooted in timeless elegance. Residential, commercial, and hospitality design across India.",
  keywords: [
    "interior design",
    "luxury interiors",
    "Svarah Interiors",
    "all over India",
    "India",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${dmSans.variable} font-sans antialiased`}
      >
        <div className="relative min-h-screen overflow-x-hidden">{children}</div>
      </body>
    </html>
  );
}
