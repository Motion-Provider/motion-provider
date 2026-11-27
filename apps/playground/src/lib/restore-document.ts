import {
  STARTER,
  TEMPLATES,
  templateHtml,
  templateProject,
} from "../constants/templates.data";
import type { PlaygroundDocument } from "../context/playground-reducer";
import { persistedDraftSchema } from "../schemas/playground";
import { importMarkup } from "./import-markup";
import { readProject } from "./motion";
import { DRAFT_KEY } from "./storage";
import { unpack } from "./transfer";

export async function restoreDocument(
  params: URLSearchParams,
  initial: PlaygroundDocument,
): Promise<PlaygroundDocument> {
  const shared = params.get("project");
  const template = TEMPLATES.find((item) => item.id === params.get("template"));

  const raw = shared ? await unpack(shared) : localStorage.getItem(DRAFT_KEY);
  const saved: unknown = raw ? JSON.parse(raw) : null;
  const draft = persistedDraftSchema.safeParse(saved);

  if (
    draft.success &&
    (Boolean(shared) || !template || draft.data.template === template.id)
  ) {
    const markup =
      draft.data.html === initial.project.html
        ? initial.markup
        : await importMarkup(draft.data.html);
    const project = readProject(saved, markup);

    if (project) return { project, markup };
  }

  if (template && template.id !== STARTER.id) {
    const markup = await importMarkup(templateHtml(template));
    return { project: templateProject(template, markup), markup };
  }

  return initial;
}
