import Logo from "@assets/brand-lockup.png";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import { PresetsModal } from "@/components/presets-panel";
import { ThemeToggle } from "@/components/theme-toggle";

export function PlaygroundHeader() {
  return (
    <header className="lg:col-start-2 lg:row-start-1">
      <nav
        aria-label="Primary"
        className="mp-glass flex h-13 items-center justify-between gap-1 rounded-full px-1.5 min-[360px]:gap-2 min-[360px]:px-2.5 sm:pr-3 sm:pl-6"
      >
        <a
          href="/"
          className="shrink-0 rounded-md in-data-[theme=light]:bg-neutral-800"
        >
          <Image
            src={Logo}
            loading="eager"
            alt="Motion Provider Logo"
            className="my-auto h-9 w-27 shrink-0"
            height={144}
            width={432}
            sizes="108px"
          />
        </a>

        <div className="flex shrink-0 items-center gap-0.5 min-[360px]:gap-1 sm:gap-1.5">
          <ThemeToggle />
          <a
            href="https://docs.motionprovider.dev"
            target="_blank"
            rel="noreferrer"
            aria-label="Docs"
            className="grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-default hover:text-foreground"
          >
            <BookOpen size={16} strokeWidth={1.65} aria-hidden />
          </a>
          <PresetsModal />
        </div>
      </nav>
    </header>
  );
}
