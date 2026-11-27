import type { Draft, Project } from "../types/playground";

export const DRAFT_KEY = "motion-playground:draft:1";
export const THEME_KEY = "motion-playground:theme";

async function openLibrary() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open("motion-playground", 1);

    request.onupgradeneeded = () =>
      request.result.createObjectStore("projects", { keyPath: "id" });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function withLibrary<Value>(
  mode: IDBTransactionMode,
  action: (store: IDBObjectStore) => IDBRequest<Value>,
) {
  const database = await openLibrary();

  try {
    return await new Promise<Value>((resolve, reject) => {
      const transaction = database.transaction("projects", mode);
      const request = action(transaction.objectStore("projects"));

      transaction.oncomplete = () => resolve(request.result);
      transaction.onabort = () => reject(transaction.error);
    });
  } finally {
    database.close();
  }
}

export function saveProject(project: Project) {
  const draft: Draft = {
    ...project,
    id: crypto.randomUUID(),
    updated: Date.now(),
  };

  return withLibrary("readwrite", (store) => store.put(draft));
}

export async function listProjects(): Promise<Draft[]> {
  const drafts = await withLibrary("readonly", (store) => store.getAll());

  return drafts.sort((a, b) => b.updated - a.updated);
}
