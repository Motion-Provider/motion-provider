import { Head, Html, Main, NextScript } from "next/document";
import { SEO } from "@/constants/seo.config";

export default function Document() {
  return (
    <Html lang="en" data-theme="dark">
      <Head>
        <meta name="application-name" content={SEO.siteName} />
        <meta name="apple-mobile-web-app-title" content={SEO.siteName} />
        <meta name="theme-color" content={SEO.themeColor} />
        <link rel="icon" href="/favicon/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
