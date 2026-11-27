import { useCallback, useRef, useState } from "react";
import { report } from "@/lib/report";
import { usePlayground } from "../context/playground";
import { saveProject } from "../lib/storage";

export function useSaveProject(): {
  saving: boolean;
  save: () => Promise<void>;
} {
  const {
    state: { project },
  } = usePlayground();
  const [saving, setSaving] = useState(false);
  const inFlight = useRef(false);

  const save = useCallback(async () => {
    if (inFlight.current) return;
    inFlight.current = true;
    setSaving(true);

    try {
      await saveProject(project);
      report("Project saved in this browser.");
    } catch {
      report("Could not save this project in this browser.", true);
    } finally {
      inFlight.current = false;
      setSaving(false);
    }
  }, [project]);

  return { saving, save };
}
