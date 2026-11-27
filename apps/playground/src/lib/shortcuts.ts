export const shortcutActions = [
  { id: "presets", label: "Open presets", defaultBinding: "Shift+P" },
  { id: "play", label: "Play or pause animation", defaultBinding: "Space" },
  { id: "reset", label: "Reset playback to start", defaultBinding: "Shift+R" },
  { id: "apply", label: "Apply animation", defaultBinding: "Shift+A" },
  { id: "randomize", label: "Randomize animation", defaultBinding: "Shift+D" },
  { id: "scope", label: "Switch replay mode", defaultBinding: "Shift+M" },
  { id: "save", label: "Save project", defaultBinding: "Shift+S" },
  { id: "export", label: "Export code", defaultBinding: "Shift+E" },
] as const;

export type ShortcutAction = (typeof shortcutActions)[number]["id"];
export type ShortcutBindings = Record<ShortcutAction, string | null>;

export const defaultBindings = Object.fromEntries(
  shortcutActions.map(({ id, defaultBinding }) => [id, defaultBinding]),
) as ShortcutBindings;

const modifiers = ["Control", "Alt", "Shift", "Meta"] as const;
const modifierKeys = new Set<string>([...modifiers, "AltGraph", "OS"]);

export function shortcutFor(event: KeyboardEvent): string | undefined {
  const key = event.key;
  if (
    event.isComposing ||
    !key ||
    key === "Unidentified" ||
    key === "Dead" ||
    key === "Process" ||
    modifierKeys.has(key)
  )
    return;

  const held = modifiers.filter((modifier) => event.getModifierState(modifier));
  if (key === "Tab" && held.every((modifier) => modifier === "Shift")) return;
  if (key === "Escape" && held.length === 0) return;

  const name =
    key === " "
      ? "Space"
      : key === "+"
        ? "Plus"
        : key.length === 1
          ? key.toUpperCase()
          : key;
  return [...held, name].join("+");
}
