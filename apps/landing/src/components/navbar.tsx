import { Sheet } from "@heroui/react";
import { MenuIcon } from "lucide-react";
import NextLink from "next/link";
import { useState } from "react";
import navigationData from "@/constants/navigation.data";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { cn } from "@/lib/utils";
import { Scales } from "./container";
import { GithubStar } from "./github-star";
import { GithubIcon } from "./icons/github-icon";

const FOCUS_RING = cn(
  "focus-visible:outline-none",
  "focus-visible:ring-2 focus-visible:ring-focus",
  "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
);

const OUTLINE_BUTTON = cn(
  "flex size-10 items-center justify-center rounded-md",
  "border border-foreground/20",
  "text-foreground/70 no-underline",
  "transition-colors duration-200",
  "hover:border-foreground/50 hover:text-foreground",
  "motion-reduce:transition-none",
);

const NAV_LINK = cn(
  "font-primary uppercase tracking-widest",
  "text-foreground/70 no-underline",
  "transition-colors duration-200 hover:text-foreground",
  "motion-reduce:transition-none",
  FOCUS_RING,
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

function Brand() {
  return (
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
  );
}

function DesktopNav() {
  return (
    <nav aria-label="Main navigation" className="hidden md:block">
      <ul className="flex items-center gap-6">
        {navigationData.map((item) => (
          <li key={item.href}>
            <NextLink
              className={cn(NAV_LINK, "block rounded-sm py-1 text-[11px]")}
              href={item.href}
              target={item.external ? "_blank" : "_self"}
            >
              {item.label}
            </NextLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function MobileMenu() {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  if (!isMobile && isOpen) setIsOpen(false);

  const close = () => setIsOpen(false);

  return (
    <>
      <button
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label="Open navigation menu"
        className={cn(OUTLINE_BUTTON, "cursor-pointer md:hidden", FOCUS_RING)}
        onClick={() => setIsOpen(true)}
        type="button"
      >
        <MenuIcon aria-hidden="true" className="size-4.5" />
      </button>

      {isMobile && (
        <Sheet isOpen={isOpen} onOpenChange={setIsOpen} placement="left">
          <Sheet.Backdrop variant="blur">
            <Sheet.Content className="w-[min(20rem,85vw)]">
              <Sheet.Dialog aria-label="Navigation menu" className="glass">
                <Sheet.Header>
                  <Sheet.Heading className="flex items-center gap-3 text-sm font-semibold uppercase tracking-tight">
                    <AcmeLogo />
                    Acme
                  </Sheet.Heading>
                </Sheet.Header>
                <Sheet.Body>
                  <nav aria-label="Main navigation">
                    <ul className="flex flex-col">
                      {navigationData.map((item) => (
                        <li
                          className="border-b border-foreground/10 last:border-b-0"
                          key={item.href}
                        >
                          <NextLink
                            className={cn(
                              NAV_LINK,
                              "flex min-h-12 items-center text-xs",
                            )}
                            href={item.href}
                            onClick={close}
                            rel={item.external ? "noreferrer" : undefined}
                            target={item.external ? "_blank" : "_self"}
                          >
                            {item.label}
                          </NextLink>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </Sheet.Body>
                <Sheet.CloseTrigger />
              </Sheet.Dialog>
            </Sheet.Content>
          </Sheet.Backdrop>
        </Sheet>
      )}
    </>
  );
}

function GithubLink() {
  const isMobile = useIsMobile();

  return (
    <NextLink
      aria-label="Acme on GitHub"
      className={cn(
        OUTLINE_BUTTON,
        "gap-2 sm:w-auto sm:px-4 md:h-9",
        "font-mono text-xs uppercase tracking-widest",
        FOCUS_RING,
      )}
      href="https://github.com/acme"
      rel="noreferrer"
      target="_blank"
    >
      <GithubIcon />
      <span className="hidden sm:inline">GitHub</span>
      {!isMobile && (
        <span className="max-md:hidden">
          <GithubStar />
        </span>
      )}
    </NextLink>
  );
}

export function Navbar() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-999 px-4 pt-3 sm:px-6">
      <div
        className={cn(
          "pointer-events-auto relative isolate mx-auto w-full max-w-7xl",
          "overflow-hidden rounded-3xl",
          "backdrop-blur-md",
        )}
      >
        <Scales className="pointer-events-none -z-10" />
        <div
          className={cn(
            "grid grid-cols-[1fr_auto] items-center md:grid-cols-[1fr_auto_1fr]",
            "h-14 px-4 md:h-16 md:px-6",
          )}
        >
          <Brand />
          <DesktopNav />
          <div className="flex items-center gap-2 justify-self-end">
            <GithubLink />
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
