import type { Metadata } from "next";
import type { ReactNode } from "react";
import { fontAnnotation, fontPrimary, fontSecondary } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Motion Playground",
  manifest: "/favicon/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: { url: "/favicon/apple-touch-icon.png", sizes: "180x180" },
  },
  description:
    "Import HTML, tune Motion Provider animations in a live sandbox, and export React code.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${fontAnnotation.variable} ${fontPrimary.variable} ${fontSecondary.variable} scrollbar antialiased`}
    >
      <body className="font-primary">{children}</body>
    </html>
  );
}
