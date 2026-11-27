import { useEffect } from "react";
import { report } from "@/lib/report";
import { restoreDocument } from "@/lib/restore-document";
import { usePlayground } from "../context/playground";
import { DRAFT_KEY } from "../lib/storage";
import { setParam, writeViewState } from "../lib/url-state";
import { readViewState } from "../schemas/playground";

export function useRestore(): void {
  const { initial, actions } = usePlayground();

  useEffect(() => {
    let current = true;
    const { searchParams } = new URL(window.location.href);

    actions.patchView(readViewState(searchParams));

    async function run() {
      try {
        const restored = await restoreDocument(searchParams, initial);
        if (current) actions.restore(restored, searchParams.get("layer"));
      } catch {
        if (!current) return;

        report(
          searchParams.get("project")
            ? "The shared project could not be opened."
            : "The last draft could not be restored.",
          true,
        );
        actions.restore();
      }
    }

    void run();
    return () => {
      current = false;
    };
  }, [initial, actions]);
}

export function useDraftAutosave(): void {
  const {
    state: { restored, project },
  } = usePlayground();

  useEffect(() => {
    if (!restored) return;

    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(project));
    } catch {
      /* Explicit saves also have an IndexedDB path. */
    }
  }, [restored, project]);
}

export function useUrlSync(): void {
  const {
    state: { restored, view, scope, device, before, selected, project },
  } = usePlayground();

  useEffect(() => {
    if (!restored) return;

    const url = new URL(window.location.href);

    writeViewState(url.searchParams, { view, scope, device, before });
    setParam(url.searchParams, "layer", selected);
    setParam(url.searchParams, "template", project.template);
    url.searchParams.delete("project");

    if (url.href !== window.location.href)
      window.history.replaceState(window.history.state, "", url);
  }, [restored, view, scope, device, before, selected, project.template]);
}
