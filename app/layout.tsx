import type React from "react";
import type { Metadata } from "next";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

import { Inter, Source_Serif_4 } from "next/font/google";

// Initialize fonts with CSS variable names
const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-sans",
});
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Al Ferro Putra Yusanda | UI/UX Designer & AI Engineer",
  description:
    "Portfolio of Al Ferro Putra Yusanda - UI/UX Designer and Generative AI Engineer. Available for freelance projects.",
  openGraph: {
    title: "Al Ferro Putra Yusanda | UI/UX Designer & AI Engineer",
    description:
      "Portfolio of Al Ferro Putra Yusanda - UI/UX Designer and Generative AI Engineer.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${sourceSerif.variable} bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
