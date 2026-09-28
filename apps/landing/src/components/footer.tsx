import NextLink from "next/link";
import { cn } from "@/lib/utils";

const footerLinks = [
  { label: "Features", href: "#features" },
  { label: "Docs", href: "/docs" },
  { label: "Pricing", href: "#pricing" },
  {
    label: "GitHub",
    href: "https://github.com/acme",
    external: true,
  },
];

function AcmeLogo() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24">
      <path
        className="fill-current"
        d="M12 2.5 20.5 7v10L12 21.5 3.5 17V7L12 2.5Z"
      />
      <path
        className="fill-background"
        d="m12 6.25 4.75 2.5v6.5L12 17.75l-4.75-2.5v-6.5L12 6.25Z"
      />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4.25"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.42-4.04-1.42-.55-1.4-1.34-1.77-1.34-1.77-1.09-.75.08-.73.08-.73 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.49.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6-.01c2.3-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.76.84 1.23 1.91 1.23 3.22 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer
      className={cn(
        "border-t",
        "border-[color-mix(in_oklab,var(--border)_65%,transparent)]",
        "bg-background",
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "flex min-h-24 flex-col",
            "items-center justify-between",
            "gap-6 py-6",
            "sm:flex-row",
          )}
        >
          {/* Brand */}
          <NextLink
            aria-label="Acme home"
            className={cn(
              "flex items-center gap-2",
              "text-foreground no-underline",
              "transition-opacity hover:opacity-70",
              "focus-visible:outline-none",
              "focus-visible:ring-2 focus-visible:ring-focus",
              "focus-visible:ring-offset-2",
            )}
            href="/"
          >
            <span
              className={cn(
                "flex size-7 items-center justify-center",
                "rounded-(--radius)",
                "bg-foreground text-background",
              )}
            >
              <AcmeLogo />
            </span>

            <span className="text-small font-semibold tracking-tight">
              Acme
            </span>
          </NextLink>

          {/* Links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {footerLinks.map((item) => (
                <li key={item.href}>
                  <NextLink
                    className={cn(
                      "link",
                      "text-small",
                      "text-muted no-underline",
                      "transition-colors",
                      "hover:text-foreground",
                    )}
                    href={item.href}
                    rel={item.external ? "noreferrer" : undefined}
                    target={item.external ? "_blank" : undefined}
                  >
                    {item.label}
                  </NextLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* GitHub */}
          <NextLink
            aria-label="Acme on GitHub"
            className={cn(
              "button button--ghost button--sm button--icon-only",
              "size-9 min-w-9",
              "rounded-(--radius)",
              "text-muted",
              "transition-colors",
              "hover:text-foreground",
            )}
            href="https://github.com/acme"
            rel="noreferrer"
            target="_blank"
          >
            <GithubIcon />
          </NextLink>
        </div>

        <div
          className={cn(
            "border-t",
            "border-[color-mix(in_oklab,var(--border)_55%,transparent)]",
            "py-4",
          )}
        >
          <p className="text-center text-tiny text-muted">
            © {new Date().getFullYear()} Acme. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
