import { Geist_Mono, Sora } from "next/font/google";

const fontPrimary = Sora({
  variable: "--font-primary",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  preload: true,
});

const fontSecondary = Geist_Mono({
  variable: "--font-secondary",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export { fontPrimary, fontSecondary };
