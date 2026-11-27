import { useEffect, useState } from "react";
import { deleteProject, listProjects } from "../lib/storage";
import type { Draft } from "../types/playground";

interface SavedProjects {
  drafts: Draft[];
  loading: boolean;
  error?: string;
}

export function useSavedProjects(): SavedProjects & {
  remove: (id: string) => Promise<void>;
} {
  const [saved, setSaved] = useState<SavedProjects>({
    drafts: [],
    loading: true,
  });

  useEffect(() => {
    let current = true;

    listProjects()
      .then((drafts) => {
        if (current) setSaved({ drafts, loading: false });
      })
      .catch(() => {
        if (current)
          setSaved({
            drafts: [],
            loading: false,
            error: "Could not access saved projects in this browser.",
          });
      });

    return () => {
      current = false;
    };
  }, []);

  async function remove(id: string) {
    await deleteProject(id);
    setSaved((current) => ({
      ...current,
      drafts: current.drafts.filter((draft) => draft.id !== id),
    }));
  }

  return { ...saved, remove };
}
