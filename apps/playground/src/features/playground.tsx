"use client";

import { Toast } from "@heroui/react";
import { PlaygroundProvider } from "@/context/playground";
import { PlaygroundRuntimeProvider } from "@/context/playground-runtime";
import type { Markup, Project } from "@/types/playground";
import { PlaygroundBody } from "./playground-body";
import { PlaygroundDialogs } from "./playground-dialogs";
import { PlaygroundEffects } from "./playground-effects";

export function Playground({
  starter,
  initialMarkup,
}: {
  starter: Project;
  initialMarkup: Markup;
}) {
  return (
    <>
      <Toast.Provider placement="top" />
      <PlaygroundProvider starter={starter} initialMarkup={initialMarkup}>
        <PlaygroundRuntimeProvider>
          <PlaygroundEffects />
          <div className="mp-shell min-h-dvh text-foreground">
            <PlaygroundBody />
            <PlaygroundDialogs />
          </div>
        </PlaygroundRuntimeProvider>
      </PlaygroundProvider>
    </>
  );
}
