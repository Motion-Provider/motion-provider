import { useCallback, useRef } from "react";
import {
  STARTER,
  type Template,
  templateHtml,
  templateProject,
} from "../constants/templates.data";
import { useReport } from "../context/notice";
import { usePlayground } from "../context/playground";
import { importMarkup } from "../lib/import-markup";
import { readProject } from "../lib/motion";
import type { Draft, Project } from "../types/playground";

export function useDocumentLoader() {
  const {
    state: { project, markup },
    initial,
    actions,
  } = usePlayground();
  const report = useReport();
  const loadingTemplate = useRef(false);

  const loadHtml = useCallback(
    async (html: string, name: string) => {
      const unchanged = html === project.html;
      const nextMarkup = unchanged ? markup : await importMarkup(html);

      if (!nextMarkup.layers.length)
        throw new Error(
          "Add at least one visible HTML element, such as a heading or image.",
        );

      const nextProject: Project = unchanged
        ? { ...project, name }
        : { name, html, assignments: {} };
      const count = nextMarkup.layers.length;

      actions.load({ project: nextProject, markup: nextMarkup });
      report(
        nextMarkup.omitted
          ? `Imported ${count} layers. Active or unsupported markup was skipped.`
          : `Imported ${count} ${count === 1 ? "layer" : "layers"}.`,
      );
    },
    [project, markup, actions, report],
  );

  const loadTemplate = useCallback(
    async (template: Template) => {
      if (loadingTemplate.current) return false;
      if (project.template === template.id) return true;

      loadingTemplate.current = true;
      try {
        const nextMarkup =
          template.id === STARTER.id
            ? initial.markup
            : await importMarkup(templateHtml(template));

        actions.load({
          project: templateProject(template, nextMarkup),
          markup: nextMarkup,
        });
        report(`${template.name} loaded.`);
        return true;
      } catch {
        report("Could not load this preset.", true);
        return false;
      } finally {
        loadingTemplate.current = false;
      }
    },
    [project.template, initial.markup, actions, report],
  );

  const loadDraft = useCallback(
    async (draft: Draft) => {
      const nextMarkup = await importMarkup(draft.html);
      const nextProject = readProject(draft, nextMarkup);

      if (!nextProject) throw new Error("Invalid draft.");

      actions.load({ project: nextProject, markup: nextMarkup });
      report("Saved project opened.");
    },
    [actions, report],
  );

  return { loadHtml, loadTemplate, loadDraft };
}
