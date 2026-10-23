import NextLink from "next/link";
import { cn } from "@/lib/utils";
import { Scales } from "./container";
import { GithubIcon } from "./icons/github-icon";

interface NavigationItem {
  readonly label: string;
  readonly href: string;
}

const navigation: readonly NavigationItem[] = [
  { label: "Features", href: "#features" },
  { label: "Docs", href: "/docs" },
  { label: "Pricing", href: "#pricing" },
];

const FOCUS_RING = cn(
  "focus-visible:outline-none",
  "focus-visible:ring-2 focus-visible:ring-focus",
  "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
);

function AcmeLogo() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-auto"
      fill="currentColor"
      viewBox="0 0 40 16"
    >
      <path d="M6 0h5L5 16H0z" />
      <path d="M15 0h5l-6 16H9z" />
      <path d="M24 0h5l-6 16h-5z" />
      <circle cx="35" cy="4" r="3" />
    </svg>
  );
}

export function Navbar() {
  return (
    <header
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-999",
        "px-4 pt-3 sm:px-6",
        "rounded-3xl",
      )}
    >
      <div
        className={cn(
          "pointer-events-auto relative isolate mx-auto w-full md:max-w-7xl",
          "overflow-hidden rounded-3xl",
          "backdrop-blur-md",
          "transition-colors duration-200",
        )}
      >
        <Scales className="size-full pointer-events-none absolute inset-0 -z-10" />
        <div
          className={cn(
            "grid grid-cols-[1fr_auto_1fr] items-center",
            "h-14 px-4 md:h-16 md:px-6",
          )}
        >
          <NextLink
            aria-label="Acme home"
            className={cn(
              "flex w-fit items-center gap-3 rounded-md",
              "text-foreground no-underline",
              "transition-opacity duration-200 hover:opacity-70",
              "motion-reduce:transition-none",
              FOCUS_RING,
            )}
            href="/"
          >
            <AcmeLogo />
            <span className="text-sm font-semibold uppercase tracking-tight">
              Acme
            </span>
          </NextLink>

          <nav aria-label="Main navigation" className="hidden md:block">
            <ul className="flex items-center gap-6">
              {navigation.map((item) => (
                <li key={item.href}>
                  <NextLink
                    className={cn(
                      "group relative block rounded-sm py-1",
                      "font-mono text-xs font-bold uppercase tracking-widest",
                      "text-foreground/70 no-underline",
                      "transition-colors duration-200 hover:text-foreground",
                      "motion-reduce:transition-none",
                      "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px",
                      "after:origin-left after:scale-x-0 after:bg-current",
                      "after:transition-transform after:duration-300 after:ease-out",
                      "hover:after:scale-x-100 focus-visible:after:scale-x-100",
                      "motion-reduce:after:transition-none",
                      FOCUS_RING,
                    )}
                    href={item.href}
                  >
                    {item.label}
                  </NextLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex justify-self-end">
            <NextLink
              aria-label="Acme on GitHub"
              className={cn(
                "flex items-center gap-2 rounded-md",
                "border border-foreground/20",
                "px-3 py-2 sm:px-4",
                "font-mono text-xs uppercase tracking-widest",
                "text-foreground/70 no-underline",
                "transition-colors duration-200",
                "hover:border-foreground/50 hover:text-foreground",
                "motion-reduce:transition-none",
                FOCUS_RING,
              )}
              href="https://github.com/acme"
              rel="noreferrer"
              target="_blank"
            >
              <GithubIcon />
              <span className="hidden sm:inline">GitHub</span>
            </NextLink>
          </div>
        </div>
      </div>
    </header>
  );
}
