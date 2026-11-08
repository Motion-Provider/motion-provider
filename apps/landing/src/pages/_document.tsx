import { Head, Html, Main, NextScript } from "next/document";
import { SEO } from "@/constants/seo.config";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Head>
          <meta name="application-name" content={SEO.siteName} />
          <meta name="apple-mobile-web-app-title" content={SEO.siteName} />
          <meta name="theme-color" content={SEO.themeColor} />
          <link rel="icon" href="/favicon.ico" sizes="48x48" />
          <link rel="icon" href="/icon.svg" type="image/svg+xml" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/site.webmanifest" />
        </Head>
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
