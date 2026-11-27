import { cn } from "@heroui/react";
import { PlaygroundHeader } from "./playground-header";
import {
  InspectorPanel,
  PreviewPanel,
  WorkspacePanel,
} from "./playground-panels";

export function PlaygroundBody() {
  return (
    <main
      className={cn(
        "mx-auto grid max-w-[1760px] gap-3.5 px-4 pt-3.5 sm:px-6 sm:pt-4.5 lg:px-8",
        "lg:grid-cols-[minmax(198px,0.89fr)_minmax(0,3fr)_minmax(242px,1fr)]",
        "lg:grid-rows-[52px_minmax(522px,calc(100dvh-142px))]",
      )}
    >
      <PlaygroundHeader />
      <PreviewPanel />
      <WorkspacePanel />
      <InspectorPanel />
    </main>
  );
}
