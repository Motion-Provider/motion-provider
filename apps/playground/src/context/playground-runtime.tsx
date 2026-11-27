import { createContext, type ReactNode, useMemo } from "react";
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

  const active = useMemo(
    () => activeLayerIds(project.assignments, selected, scope),
    [project.assignments, selected, scope],
  );
  const total = useMemo(
    () => totalDuration(markup, project.assignments, active),
    [markup, project.assignments, active],
  );
  const resetKey = useMemo(
    () =>
      JSON.stringify([
        Object.entries(project.assignments),
        selected,
        scope,
        before,
        view,
      ]),
    [project.assignments, selected, scope, before, view],
  );
  const playback = usePlayback(total, resetKey);

  const needsCode = view === "code" || dialog === "export";
  const code = useMemo(
    () => (needsCode ? exportComponent(project, markup, origin) : ""),
    [needsCode, project, markup, origin],
  );
  const utilities = useUtilities(markup.classes, !project.template, online);

  const value = useMemo(
    () => ({ active, total, playback, utilities, code, online }),
    [active, total, playback, utilities, code, online],
  );

  return (
    <RuntimeContext.Provider value={value}>{children}</RuntimeContext.Provider>
  );
}

export function usePlaygroundRuntime(): PlaygroundRuntime {
  return useRequiredContext(RuntimeContext, "usePlaygroundRuntime");
}
