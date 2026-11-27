import { useCallback, useState } from "react";
import { useReport } from "../context/notice";
import { usePlayground } from "../context/playground";
import { saveProject } from "../lib/storage";

export function useSaveProject(): {
  saving: boolean;
  save: () => Promise<void>;
} {
  const {
    state: { project },
  } = usePlayground();
  const report = useReport();
  const [saving, setSaving] = useState(false);

  const save = useCallback(async () => {
    setSaving(true);

    try {
      await saveProject(project);
      report("Project saved in this browser.");
    } catch {
      report("Could not save this project in this browser.", true);
    } finally {
      setSaving(false);
    }
  }, [project, report]);

  return { saving, save };
}
