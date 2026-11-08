import Head from "next/head";
import { SEO } from "@/constants/seo.config";

type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | readonly JsonLdValue[]
  | { readonly [key: string]: JsonLdValue };

const ROBOTS =
  "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

const MIT = "https://opensource.org/licenses/MIT";

const abs = (path: string): string => new URL(path, SEO.siteUrl).toString();

const HOME = abs("/");
const CANONICAL = HOME;
const OG_IMAGE = abs(SEO.ogImage.path);
const ORG_ID = abs("/#organization");
const WEBSITE_ID = abs("/#website");
const WEBPAGE_ID = abs("/#webpage");
const SOFTWARE_ID = abs("/#software");
const SOURCE_ID = abs("/#source");

const JSON_LD: JsonLdValue = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: SEO.siteName,
      url: HOME,
      logo: {
        "@type": "ImageObject",
        url: abs(SEO.logoPath),
        width: 512,
        height: 512,
      },
      founder: {
        "@type": "Person",
        name: SEO.author.name,
        url: SEO.author.url,
      },
      sameAs: [SEO.links.githubOrg, SEO.links.github, SEO.links.npm],
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: HOME,
      name: SEO.siteName,
      description: SEO.description,
      inLanguage: SEO.language,
      publisher: { "@id": ORG_ID },
    },
    {
      "@type": "WebPage",
      "@id": WEBPAGE_ID,
      url: HOME,
      name: SEO.title,
      description: SEO.description,
      inLanguage: SEO.language,
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": SOFTWARE_ID },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: OG_IMAGE,
        width: SEO.ogImage.width,
        height: SEO.ogImage.height,
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": SOFTWARE_ID,
      name: SEO.siteName,
      description: SEO.description,
      url: HOME,
      applicationCategory: "DeveloperApplication",
      applicationSubCategory: "JavaScript animation library",
      operatingSystem: "Any",
      downloadUrl: SEO.links.npm,
      softwareHelp: { "@type": "CreativeWork", url: SEO.links.docs },
      license: MIT,
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      author: { "@id": ORG_ID },
      sameAs: [SEO.links.github, SEO.links.npm],
    },
    {
      "@type": "SoftwareSourceCode",
      "@id": SOURCE_ID,
      name: `${SEO.siteName} source code`,
      codeRepository: SEO.links.github,
      programmingLanguage: "TypeScript",
      runtimePlatform: "Web browser, React",
      license: MIT,
      targetProduct: { "@id": SOFTWARE_ID },
    },
  ],
};

const JSON_LD_STRING = JSON.stringify(JSON_LD).replace(/</g, "\\u003c");

export function SeoHead() {
  return (
    <Head>
      <title key="title">{SEO.title}</title>
      <meta key="description" name="description" content={SEO.description} />
      <meta key="keywords" name="keywords" content={SEO.keywords.join(", ")} />
      <meta key="author" name="author" content={SEO.author.name} />
      <meta key="robots" name="robots" content={ROBOTS} />
      <link key="canonical" rel="canonical" href={CANONICAL} />

      <meta key="og:type" property="og:type" content="website" />
      <meta key="og:site_name" property="og:site_name" content={SEO.siteName} />
      <meta key="og:locale" property="og:locale" content={SEO.locale} />
      <meta key="og:url" property="og:url" content={CANONICAL} />
      <meta key="og:title" property="og:title" content={SEO.title} />
      <meta
        key="og:description"
        property="og:description"
        content={SEO.description}
      />
      <meta key="og:image" property="og:image" content={OG_IMAGE} />
      <meta
        key="og:image:type"
        property="og:image:type"
        content={SEO.ogImage.type}
      />
      <meta
        key="og:image:width"
        property="og:image:width"
        content={String(SEO.ogImage.width)}
      />
      <meta
        key="og:image:height"
        property="og:image:height"
        content={String(SEO.ogImage.height)}
      />
      <meta
        key="og:image:alt"
        property="og:image:alt"
        content={SEO.ogImage.alt}
      />

      <meta
        key="twitter:card"
        name="twitter:card"
        content="summary_large_image"
      />
      <meta key="twitter:title" name="twitter:title" content={SEO.title} />
      <meta
        key="twitter:description"
        name="twitter:description"
        content={SEO.description}
      />
      <meta key="twitter:image" name="twitter:image" content={OG_IMAGE} />
      <meta
        key="twitter:image:alt"
        name="twitter:image:alt"
        content={SEO.ogImage.alt}
      />
      {SEO.twitterHandle ? (
        <meta
          key="twitter:site"
          name="twitter:site"
          content={SEO.twitterHandle}
        />
      ) : null}
      {SEO.twitterHandle ? (
        <meta
          key="twitter:creator"
          name="twitter:creator"
          content={SEO.twitterHandle}
        />
      ) : null}

      <script
        key="ld-json"
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: safe to use in this static app
        dangerouslySetInnerHTML={{ __html: JSON_LD_STRING }}
      />
    </Head>
  );
}
