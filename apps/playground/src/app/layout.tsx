import type { Metadata } from "next";
import type { ReactNode } from "react";
import { fontAnnotation, fontPrimary, fontSecondary } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Motion Playground",
  description:
    "Import HTML, tune Motion Provider animations in a live sandbox, and export React code.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${fontAnnotation.variable} ${fontPrimary.variable} ${fontSecondary.variable} antialiased`}
    >
      <body className="font-primary">{children}</body>
    </html>
  );
}
