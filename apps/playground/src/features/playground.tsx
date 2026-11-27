"use client";

import { NoticeProvider } from "@/context/notice";
import { PlaygroundProvider } from "@/context/playground";
import { PlaygroundRuntimeProvider } from "@/context/playground-runtime";
import type { Markup, Project } from "@/types/playground";
import { PlaygroundBody } from "./playground-body";
import { PlaygroundDialogs } from "./playground-dialogs";
import { PlaygroundEffects } from "./playground-effects";
import { PlaygroundHeader } from "./playground-header";

export function Playground({
  starter,
  initialMarkup,
}: {
  starter: Project;
  initialMarkup: Markup;
}) {
  return (
    <NoticeProvider>
      <PlaygroundProvider starter={starter} initialMarkup={initialMarkup}>
        <PlaygroundRuntimeProvider>
          <PlaygroundEffects />
          <div className="mp-shell min-h-dvh text-foreground">
            <PlaygroundHeader />
            <main className="mx-auto flex max-w-[1760px] flex-col px-4 pt-5 sm:px-6 sm:pt-6 lg:px-8">
              <PlaygroundBody />
            </main>
            <PlaygroundDialogs />
          </div>
        </PlaygroundRuntimeProvider>
      </PlaygroundProvider>
    </NoticeProvider>
  );
}
