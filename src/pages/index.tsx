import Head from "next/head";
import { cn } from "@/motion/lib/utils";
import { Inter } from "next/font/google";
import { FC } from "react";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600"],
});

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function Home() {
  return (
    <>
      <Meta />
      <PageLayout>
        <Header />
        <CardWrapper />
      </PageLayout>
    </>
  );
}

const Card: FC<CardProps> = ({ children, ...props }) => (
  <div {...props}>{children}</div>
);

/** Layout */

const PageLayout: FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <main
    className={cn(
      "h-screen w-full overflow-y-scroll flex items-center justify-center-safe flex-col gap-4",
      inter.className,
      className
    )}
  >
    <Banner />
    {children}
    <Footer />
  </main>
);

/* Meta */

const Meta = () => (
  <Head>
    <title>Motion Provider</title>
    <meta httpEquiv="Content-Language" content="en" />
    <meta name="robots" content="index, follow" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta
      name="description"
      content="Motion Provider is a performance-first motion engine for React. Build delightful animations with clean APIs, optimized rendering, and developer-first tools."
    />
    <meta
      property="og:title"
      content="Motion Provider — Performance-First Motion Engine"
    />
    <meta
      property="og:description"
      content="Build delightful React animations with Motion Provider. Performance-first rendering, intuitive APIs, and seamless developer experience."
    />
    <meta property="og:type" content="website" />
    <meta
      property="og:image"
      content="https://motionprovider.dev/assets/screenshots/motion-provider-desktop-screenshot.png"
    />
    <meta property="og:url" content="https://motionprovider.dev" />
    <meta property="og:site_name" content="motionprovider.dev" />
    <meta name="msapplication-TileColor" content="#0b1220" />
    <meta name="referrer" content="no-referrer-when-downgrade" />
    <link rel="icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/site.webmanifest" />
  </Head>
);

/* Components */

const Banner = () => (
  <aside className="top-0 fixed w-full h-10 bg-gradient-to-b from-transparent to-muted-foreground/10 border-b border-muted-foreground/20 shadow-2xs rounded-b-2xl grid place-items-center lg:text-sm text-xs tracking-tight">
    <p>Fugiat sunt excepteur ex officia quis nostrud laboris.</p>
  </aside>
);

const Header = () => {
  return (
    <header className="flex flex-col items-center lg:gap-4 gap-2 justify-center">
      <h1 className="lg:text-8xl text-6xl tracking-tighter bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent">
        Motion Provider.
      </h1>
      <p className="text-muted-foreground lg:max-w-xl max-w-sm text-center tracking-tight lg:text-base text-sm">
        Build delightful animations with Motion Provider. Performance-first
        rendering, intuitive APIs, and seamless developer experience.
      </p>
    </header>
  );
};

const CardWrapper = () => {
  return (
    <div className="w-auto lg:min-w-5xl min-w-xl mx-auto lg:h-72 h-auto border border-muted-foreground/20 rounded-2xl p-4 flex lg:flex-wrap flex-col gap-2 items-center justify-center mt-8">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card
          key={i}
          className="bg-muted rounded-lg flex items-center justify-center w-[calc(50%-0.5rem)] h-[calc(50%-0.5rem)] "
        >
          Card {i}
        </Card>
      ))}
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="fixed bottom-8 text-muted-foreground text-xs text-center w-full md:w-auto">
      ©{new Date().getFullYear()} Motion Provider —{" "}
      <Link
        href="https://burakdev.com"
        target="_blank"
        className="hover:underline underline-offset-2 hover:text-foreground transition-all duration-200 ease-in-out"
      >
        crafted by Burak Bilen
      </Link>
    </footer>
  );
};
