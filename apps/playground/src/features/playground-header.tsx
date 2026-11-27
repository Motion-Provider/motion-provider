import { Button } from "@heroui/react";
import { AudioWaveform, BookOpen, CodeXml } from "lucide-react";
import { PresetsModal } from "@/components/presets-panel";
import { ThemeToggle } from "@/components/theme-toggle";
import { usePlayground } from "../context/playground";

export function PlaygroundHeader() {
  const {
    state: { markup },
    actions,
  } = usePlayground();

  return (
    <header className="border-b mp-glass">
      <div className="mx-auto grid max-w-[1760px] grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 px-4 py-3 sm:px-6 lg:h-17.5 lg:grid-cols-[1fr_auto_1fr] lg:px-8 lg:py-0">
        <div className="flex min-w-0 items-center gap-2.5">
          <span
            aria-hidden
            className="grid size-9 shrink-0 place-items-center rounded-md bg-accent text-accent-foreground shadow-[0_2px_10px_var(--tint)]"
          >
            <AudioWaveform size={22} strokeWidth={2.4} />
          </span>
          <span className="font-semibold tracking-[-0.045em] sm:text-[18px]">
            Motion Playground
          </span>
        </div>

        <div className="col-span-2 row-start-2 lg:col-span-1 lg:col-start-2 lg:row-start-1">
          <PresetsModal />
        </div>

        <div className="col-start-2 row-start-1 flex items-center justify-end gap-1.5 lg:col-start-3 lg:gap-2.5">
          <a
            href="https://docs.motionprovider.dev"
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-md px-2 py-2 text-sm text-muted hover:text-foreground sm:flex"
          >
            <BookOpen size={16} strokeWidth={1.65} /> Docs
          </a>
          <ThemeToggle />
          <Button
            size="sm"
            onPress={() => actions.openDialog("export")}
            isDisabled={!markup.layers.length}
            aria-label="Export code"
            className="min-h-9 gap-2 rounded-md px-2.5 font-semibold sm:px-3.5"
          >
            <CodeXml size={17} strokeWidth={2.1} />
            <span className="hidden sm:inline">Export code</span>
            <span className="sm:hidden">Export</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
