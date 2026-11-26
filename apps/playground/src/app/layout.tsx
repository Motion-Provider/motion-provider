import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import type { ReactNode } from "react";
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
      className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
