import { Geist_Mono, Inter } from "next/font/google";

const fontSecondary = Geist_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-secondary",
});
const fontPrimary = Inter({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-primary",
});

export { fontSecondary, fontPrimary };
