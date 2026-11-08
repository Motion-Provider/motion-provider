import { Toast } from "@heroui/react";
import Head from "next/head";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { fontAnnotation, fontPrimary, fontSecondary } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <div
        className={cn(
          fontPrimary.variable,
          fontSecondary.variable,
          fontAnnotation.variable,
          "isolate font-primary relative",
        )}
      >
        <Navbar />
        {children}
        <Footer />
        <Toast.Provider placement="top" />
      </div>
    </>
  );
}
