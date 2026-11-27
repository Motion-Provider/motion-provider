import { useEffect, useState } from "react";
import { listProjects } from "../lib/storage";
import type { Draft } from "../types/playground";

interface SavedProjects {
  drafts: Draft[];
  loading: boolean;
  error?: string;
}

export function useSavedProjects(): SavedProjects {
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

  return saved;
}
