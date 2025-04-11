import { fontPrimary, fontSecondary } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Portal from "@/portals";
import Layout from "@/providers/layout";
import StoreProvider from "@/providers/store-provider";
import "@/styles/globals.css";
import { AnimatePresence } from "motion/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <StoreProvider>
      <Layout className={cn(fontPrimary.className, fontSecondary.variable)}>
        <AnimatePresence mode="wait">
          <Component {...pageProps} />
        </AnimatePresence>
      </Layout>
      <Portal currRoute={router.asPath} />
    </StoreProvider>
  );
}
