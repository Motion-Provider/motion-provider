import { createContext, type ReactNode } from "react";
import { useOnline } from "@/hooks/use-online";
import { useOrigin } from "@/hooks/use-origin";
import { usePlayback } from "@/hooks/use-playback";
import { useRequiredContext } from "@/hooks/use-required";
import { useUtilities } from "@/hooks/use-utilities";
import { exportComponent } from "@/lib/export";
import { activeLayerIds, totalDuration } from "@/lib/layers";
import { usePlayground } from "./playground";

interface PlaygroundRuntime {
  active: Set<string>;
  total: number;
  playback: ReturnType<typeof usePlayback>;
  utilities: ReturnType<typeof useUtilities>;
  code: string;
  online: boolean;
}

const RuntimeContext = createContext<PlaygroundRuntime | null>(null);

export function PlaygroundRuntimeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { state } = usePlayground();
  const { project, markup, selected, scope, view, before, dialog } = state;
  const online = useOnline();
  const origin = useOrigin();

  const active = activeLayerIds(project.assignments, selected, scope);
  const total = totalDuration(markup, project.assignments, active);
  const resetKey = JSON.stringify([
    Object.entries(project.assignments),
    selected,
    scope,
    before,
    view,
  ]);
  const playback = usePlayback(total, resetKey);

  const needsCode = view === "code" || dialog === "export";
  const code = needsCode ? exportComponent(project, markup, origin) : "";
  const utilities = useUtilities(markup.classes, !project.template, online);

  const value = { active, total, playback, utilities, code, online };

  return (
    <RuntimeContext.Provider value={value}>{children}</RuntimeContext.Provider>
  );
}

export function usePlaygroundRuntime(): PlaygroundRuntime {
  return useRequiredContext(RuntimeContext, "usePlaygroundRuntime");
}
