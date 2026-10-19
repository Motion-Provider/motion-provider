import NextLink from "next/link";
import { cn } from "@/lib/utils";
import { GithubIcon } from "./icons/github-icon";

const navigation = [
  { label: "Features", href: "#features" },
  { label: "Docs", href: "/docs" },
  { label: "Pricing", href: "#pricing" },
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

export function Navbar() {
  return (
    <nav
      aria-label="Main navigation"
      className={cn(
        "fixed inset-x-0 top-0 z-999",
        "border-b border-[color-mix(in_oklab,var(--border)_65%,transparent)]",
        "bg-background backdrop-blur-md",
      )}
    >
      <div
        className={cn(
          "mx-auto grid w-full max-w-7xl",
          "grid-cols-[1fr_auto_1fr]",
          "items-center",
          "px-4 sm:px-6 lg:px-8",
          "h-16",
        )}
      >
        <NextLink
          aria-label="Acme home"
          className={cn(
            "flex w-fit items-center gap-2",
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
              "flex size-8 items-center justify-center",
              "rounded-(--radius)",
              "bg-foreground text-background",
            )}
          >
            <AcmeLogo />
          </span>

          <span className="text-small font-semibold tracking-tight">Acme</span>
        </NextLink>

        {/* Navigation */}
        <nav className="hidden md:flex">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => (
              <li key={item.href}>
                <NextLink
                  className={cn(
                    "link",
                    "rounded-(--radius)",
                    "px-3 py-1.5",
                    "text-small font-medium",
                    "text-muted no-underline",
                    "transition-colors",
                    "hover:bg-default/70 hover:text-foreground",
                  )}
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* GitHub */}
        <div className="flex justify-self-end">
          <NextLink
            aria-label="GitHub"
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
      </div>
    </nav>
  );
}
