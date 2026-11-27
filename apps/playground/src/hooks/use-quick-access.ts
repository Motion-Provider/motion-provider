import { useEffect, useEffectEvent, useState } from "react";
import { usePlayground } from "../context/playground";
import { usePlaygroundRuntime } from "../context/playground-runtime";
import { randomized } from "../lib/motion";
import {
  defaultBindings,
  type ShortcutAction,
  type ShortcutBindings,
  shortcutActions,
  shortcutFor,
} from "../lib/shortcuts";
import { SHORTCUTS_KEY } from "../lib/storage";

const editable =
  'input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="textbox"], [role="combobox"], [role="listbox"], [role="slider"]';
const interactive =
  'button, a, [role="button"], [role="radio"], [role="menuitem"]';

function readBindings(): ShortcutBindings {
  try {
    const stored: unknown = JSON.parse(
      localStorage.getItem(SHORTCUTS_KEY) ?? "null",
    );
    if (!stored || typeof stored !== "object") return defaultBindings;

    const bindings = { ...defaultBindings };
    for (const { id } of shortcutActions) {
      const binding = (stored as Record<string, unknown>)[id];
      if (
        binding === null ||
        (typeof binding === "string" && binding.length > 0)
      )
        bindings[id] = binding;
    }

    const assigned = Object.values(bindings).filter(
      (binding) => binding !== null,
    );
    if (new Set(assigned).size === assigned.length) return bindings;
  } catch {}

  return defaultBindings;
}

export function useQuickAccess(save: () => Promise<void>, saving: boolean) {
  const { state, actions, settings } = usePlayground();
  const { playback, total } = usePlaygroundRuntime();
  const [bindings, setBindings] = useState(defaultBindings);

  useEffect(() => {
    setBindings(readBindings());
  }, []);

  function updateBindings(next: ShortcutBindings) {
    setBindings(next);
    try {
      localStorage.setItem(SHORTCUTS_KEY, JSON.stringify(next));
    } catch {}
  }

  const onKeyDown = useEffectEvent((event: KeyboardEvent) => {
    if (event.defaultPrevented || event.repeat || state.dialog) return;

    const target = event.target as Element | null;
    if (target?.closest?.(editable)) return;
    if (
      !event.ctrlKey &&
      !event.altKey &&
      !event.metaKey &&
      target?.closest?.(interactive) &&
      [
        " ",
        "Enter",
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
      ].includes(event.key)
    )
      return;

    const binding = shortcutFor(event);
    if (!binding) return;
    const action = shortcutActions.find(({ id }) => bindings[id] === binding);
    if (!action) return;

    const canPlay = state.view === "preview" && !state.before && total > 0;
    const hasLayers = state.markup.layers.length > 0;
    const commands: Record<ShortcutAction, (() => void) | undefined> = {
      presets: () => actions.openDialog("presets"),
      play: canPlay ? playback.toggle : undefined,
      reset: canPlay
        ? () => {
            actions.cancelReplay();
            playback.seek(0);
          }
        : undefined,
      apply: settings ? () => actions.patchSettings({}) : undefined,
      randomize: settings
        ? () => actions.patchSettings(randomized(settings))
        : undefined,
      scope: () =>
        actions.patchView({
          scope: state.scope === "individual" ? "batch" : "individual",
        }),
      save: hasLayers && !saving ? save : undefined,
      export: hasLayers ? () => actions.openDialog("export") : undefined,
    };
    const run = commands[action.id];
    if (!run) return;

    event.preventDefault();
    run();
  });

  useEffect(() => {
    const selector = "iframe[data-playground-preview]";
    let preview: Document | null | undefined;

    function connectPreview(frame: HTMLIFrameElement | null) {
      const next = frame?.contentDocument;
      if (preview === next) return;
      preview?.removeEventListener("keydown", onKeyDown);
      preview = next;
      preview?.addEventListener("keydown", onKeyDown);
    }

    function onLoad({ target }: Event) {
      if (target instanceof HTMLIFrameElement && target.matches(selector))
        connectPreview(target);
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("load", onLoad, true);
    connectPreview(document.querySelector<HTMLIFrameElement>(selector));

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("load", onLoad, true);
      connectPreview(null);
    };
  }, []);

  return { bindings, updateBindings };
}
