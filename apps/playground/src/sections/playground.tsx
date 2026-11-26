"use client";

import { Button } from "@heroui/react";
import {
  AudioWaveform,
  BookOpen,
  CircleAlert,
  CodeXml,
  Layers,
  LayoutTemplate,
  Moon,
  Play,
  Sun,
  WifiOff,
} from "lucide-react";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";
import { IconButton, Segmented } from "../components/controls";
import {
  ExportDialog,
  ImportDialog,
  SavedDialog,
} from "../components/project-dialogs";
import { settingsFor } from "../constants/motion.config";
import {
  STARTER,
  TEMPLATES,
  templateHtml,
  templateProject,
  type Template,
} from "../constants/templates.data";
import { usePlayback } from "../hooks/use-playback";
import { useUtilities } from "../hooks/use-utilities";
import { exportComponent } from "../lib/export";
import { importMarkup } from "../lib/import-markup";
import { animationTime, randomized, readProject } from "../lib/motion";
import {
  DRAFT_KEY,
  listProjects,
  saveProject,
  THEME_KEY,
} from "../lib/storage";
import { copyText, pack, unpack } from "../lib/transfer";
import type {
  Device,
  Draft,
  Markup,
  MotionSettings,
  Project,
  Scope,
  View,
} from "../types/playground";
import { Inspector } from "./inspector";
import { Preview } from "./preview";
import { Workspace } from "./workspace";

const Presets = dynamic(
  () => import("./presets").then((module) => module.Presets),
  {
    loading: () => (
      <p role="status" className="p-6 text-sm text-muted">
        Loading the presets…
      </p>
    ),
  },
);

type Mode = "playground" | "presets";
type Dialog = "import" | "export" | "saved";
type Notice = { text: string; error?: boolean };
const modes = [
  { id: "playground", label: "Playground", icon: AudioWaveform },
  { id: "presets", label: "Presets", icon: LayoutTemplate },
] as const;
const scopes = [
  { id: "individual", label: "Individual" },
  { id: "batch", label: "Batch" },
] as const;

function initialLayer(markup: Markup, project: Project) {
  return (
    markup.layers.find(
      (layer) => project.assignments[layer.id] && layer.kind !== "MotionImage",
    )?.id ??
    markup.layers.find((layer) => project.assignments[layer.id])?.id ??
    markup.layers.find((layer) => layer.kind !== "MotionContainer")?.id ??
    markup.layers[0]?.id
  );
}

export function Playground({
  starter,
  initialMarkup,
}: {
  starter: Project;
  initialMarkup: Markup;
}) {
  const [project, setProject] = useState(starter);
  const [markup, setMarkup] = useState(initialMarkup);
  const [selected, setSelected] = useState(() =>
    initialLayer(initialMarkup, starter),
  );
  const [mode, setMode] = useState<Mode>("playground");
  const [view, setView] = useState<View>("preview");
  const [scope, setScope] = useState<Scope>("individual");
  const [device, setDevice] = useState<Device>("desktop");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [dialog, setDialog] = useState<Dialog>();
  const [notice, setNotice] = useState<Notice>();
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [opening, setOpening] = useState(false);
  const [libraryError, setLibraryError] = useState<string>();
  const [saving, setSaving] = useState(false);
  const [restored, setRestored] = useState(false);
  const [online, setOnline] = useState(true);
  const [origin, setOrigin] = useState("");
  const [before, setBefore] = useState(false);
  const [loadingPreset, setLoadingPreset] = useState(false);
  const [replay, setReplay] = useState(0);

  const layer = markup.layers.find((item) => item.id === selected);
  const settings = layer
    ? (project.assignments[layer.id] ?? settingsFor(layer.kind))
    : undefined;
  const active = useMemo(
    () =>
      new Set(
        scope === "batch"
          ? Object.keys(project.assignments)
          : selected && project.assignments[selected]
            ? [selected]
            : [],
      ),
    [scope, project.assignments, selected],
  );
  const total = useMemo(
    () =>
      Math.max(
        0,
        ...markup.layers
          .filter((item) => active.has(item.id))
          .map((item) =>
            animationTime(item, project.assignments[item.id]!, markup),
          ),
      ),
    [active, markup, project.assignments],
  );
  const playback = usePlayback(
    total,
    JSON.stringify([
      Object.entries(project.assignments),
      selected,
      scope,
      before,
      view,
      mode,
    ]),
  );
  const needsCode = view === "code" || dialog === "export";
  const code = useMemo(
    () => (needsCode ? exportComponent(project, markup, origin) : ""),
    [needsCode, project, markup, origin],
  );
  const utilities = useUtilities(markup.classes, !project.template, online);

  const clearNotice = useCallback(() => setNotice(undefined), []);
  const report = useCallback(
    (text: string, error = false) => setNotice({ text, error }),
    [],
  );
  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(clearNotice, notice.error ? 7500 : 4500);
    return () => window.clearTimeout(timer);
  }, [notice, clearNotice]);

  useEffect(() => {
    let current = true;
    const url = new URL(window.location.href);
    const query = url.searchParams;
    const syncOnline = () => setOnline(navigator.onLine);
    window.addEventListener("online", syncOnline);
    window.addEventListener("offline", syncOnline);
    syncOnline();
    setOrigin(url.origin);
    setMode(query.get("mode") === "presets" ? "presets" : "playground");
    setView(query.get("view") === "code" ? "code" : "preview");
    setScope(query.get("scope") === "batch" ? "batch" : "individual");
    setDevice(query.get("device") === "mobile" ? "mobile" : "desktop");
    setBefore(query.get("compare") === "original");

    async function restore() {
      const shared = query.get("project");
      try {
        setTheme(
          localStorage.getItem(THEME_KEY) === "light" ? "light" : "dark",
        );
        const requested = query.get("template");
        const template = TEMPLATES.find((item) => item.id === requested);
        const local = localStorage.getItem(DRAFT_KEY);
        const saved: unknown = shared
          ? JSON.parse(await unpack(shared))
          : local
            ? JSON.parse(local)
            : null;
        let nextMarkup = initialMarkup;
        let nextProject = starter;
        const savedHtml =
          saved && typeof saved === "object" && "html" in saved
            ? saved.html
            : undefined;
        const savedTemplate =
          saved && typeof saved === "object" && "template" in saved
            ? saved.template
            : undefined;
        if (
          typeof savedHtml === "string" &&
          (shared || !template || savedTemplate === template.id)
        ) {
          nextMarkup =
            savedHtml === starter.html
              ? initialMarkup
              : await importMarkup(savedHtml);
          const restored = readProject(saved, nextMarkup);
          if (restored) nextProject = restored;
        } else if (template && template.id !== STARTER.id) {
          nextMarkup = await importMarkup(templateHtml(template));
          nextProject = templateProject(template, nextMarkup);
        }
        if (!current) return;
        setMarkup(nextMarkup);
        setProject(nextProject);
        const requestedLayer = query.get("layer");
        setSelected(
          nextMarkup.layers.find((item) => item.id === requestedLayer)?.id ??
            initialLayer(nextMarkup, nextProject),
        );
      } catch {
        if (current)
          report(
            shared
              ? "The shared project could not be opened."
              : "The last draft could not be restored.",
            true,
          );
      } finally {
        if (current) setRestored(true);
      }
    }
    void restore();
    return () => {
      current = false;
      window.removeEventListener("online", syncOnline);
      window.removeEventListener("offline", syncOnline);
    };
  }, [initialMarkup, starter, report]);

  useEffect(() => {
    if (!restored) return;
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* Browser privacy settings may prevent local storage. */
    }
  }, [restored, theme]);

  useEffect(() => {
    if (!restored) return;
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(project));
    } catch {
      /* Explicit saves also have an IndexedDB path. */
    }
  }, [restored, project]);

  useEffect(() => {
    if (!restored) return;
    const url = new URL(window.location.href);
    const values = {
      mode,
      view,
      scope,
      device,
      layer: selected,
      template: project.template,
      compare: before ? "original" : undefined,
    };
    const defaults = new Set([
      "playground",
      "preview",
      "individual",
      "desktop",
    ]);
    for (const [key, value] of Object.entries(values)) {
      if (value && !defaults.has(value)) url.searchParams.set(key, value);
      else url.searchParams.delete(key);
    }
    url.searchParams.delete("project");
    if (url.href !== window.location.href)
      window.history.replaceState(window.history.state, "", url);
  }, [restored, mode, view, scope, device, selected, before, project.template]);

  const play = playback.play;
  const pause = playback.pause;
  const playing = playback.display.state === "playing";
  useEffect(() => {
    if (replay === 0 || before || view !== "preview" || mode !== "playground")
      return;
    const timer = window.setTimeout(() => play(true), 160);
    return () => window.clearTimeout(timer);
    // Replay is an explicit request from the inspector. Layout and view edits reset the timeline.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [replay]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (
        dialog ||
        event.repeat ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        (event.target instanceof Element &&
          event.target.closest(
            "input, textarea, select, button, a, [contenteditable], [role=slider]",
          ))
      )
        return;
      if (
        event.code === "Space" &&
        mode === "playground" &&
        view === "preview" &&
        !before &&
        total > 0
      ) {
        event.preventDefault();
        if (playing) pause();
        else play();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [before, dialog, mode, pause, play, playing, total, view]);

  function setCurrent(nextProject: Project, nextMarkup: Markup) {
    setProject(nextProject);
    setMarkup(nextMarkup);
    setSelected(initialLayer(nextMarkup, nextProject));
    setView("preview");
    setMode("playground");
    setBefore(false);
  }

  async function loadHtml(html: string, name: string) {
    const nextMarkup =
      html === project.html ? markup : await importMarkup(html);
    if (!nextMarkup.layers.length)
      throw new Error(
        "Add at least one visible HTML element, such as a heading or image.",
      );
    const nextProject =
      html === project.html
        ? { ...project, name }
        : { name, html, assignments: {} };
    setCurrent(nextProject, nextMarkup);
    setDialog(undefined);
    report(
      nextMarkup.omitted
        ? `Imported ${nextMarkup.layers.length} layers. Active or unsupported markup was skipped.`
        : `Imported ${nextMarkup.layers.length} ${nextMarkup.layers.length === 1 ? "layer" : "layers"}.`,
    );
  }

  async function pickTemplate(template: Template) {
    if (loadingPreset) return;
    if (project.template === template.id) {
      setMode("playground");
      return;
    }
    setLoadingPreset(true);
    try {
      const nextMarkup =
        template.id === STARTER.id
          ? initialMarkup
          : await importMarkup(templateHtml(template));
      setCurrent(templateProject(template, nextMarkup), nextMarkup);
      report(`${template.name} loaded.`);
    } catch {
      report("Could not load this preset.", true);
    } finally {
      setLoadingPreset(false);
    }
  }

  function changeSettings(patch: Partial<MotionSettings>) {
    if (!layer || !settings) return;
    setProject((current) => ({
      ...current,
      assignments: {
        ...current.assignments,
        [layer.id]: {
          ...(current.assignments[layer.id] ?? settings),
          ...patch,
        },
      },
    }));
    if (!before && mode === "playground" && view === "preview")
      setReplay((request) => request + 1);
  }

  function removeAnimation() {
    if (!layer) return;
    setProject((current) => {
      const assignments = { ...current.assignments };
      delete assignments[layer.id];
      return { ...current, assignments };
    });
    report("Animation removed.");
  }

  async function save() {
    setSaving(true);
    try {
      await saveProject(project);
      report("Project saved in this browser.");
    } catch {
      report("Could not save this project in this browser.", true);
    } finally {
      setSaving(false);
    }
  }

  async function openLibrary() {
    setDialog("saved");
    setOpening(true);
    setLibraryError(undefined);
    try {
      setDrafts(await listProjects());
    } catch {
      setLibraryError("Could not access saved projects in this browser.");
    } finally {
      setOpening(false);
    }
  }

  async function openDraft(draft: Draft) {
    const nextMarkup = await importMarkup(draft.html);
    const next = readProject(draft, nextMarkup);
    if (!next) throw new Error("Invalid draft.");
    setCurrent(next, nextMarkup);
    setDialog(undefined);
    report("Saved project opened.");
  }

  function copy(value: string, message = "Code copied.") {
    void copyText(value)
      .then(() => report(message))
      .catch(() => report("Clipboard access failed.", true));
  }

  async function share() {
    const token = await pack(JSON.stringify(project));
    if (token.length > 12_000)
      throw new Error(
        "This project is too large for a link. Download the TSX file.",
      );
    const url = new URL(window.location.href);
    url.searchParams.set("project", token);
    await copyText(url.href);
    report("Project link copied.");
  }

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="border-b border-[var(--stroke)] bg-[var(--panel)]">
        <div className="mx-auto grid max-w-[1760px] grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 px-4 py-3 sm:px-6 lg:h-[70px] lg:grid-cols-[1fr_auto_1fr] lg:px-8 lg:py-0">
          <div className="flex min-w-0 items-center gap-2.5">
            <span
              aria-hidden
              className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-accent text-accent-foreground shadow-[0_2px_10px_var(--tint)]"
            >
              <AudioWaveform size={22} strokeWidth={2.4} />
            </span>
            <span className="font-semibold tracking-[-0.045em] sm:text-[18px]">
              Motion Playground
            </span>
          </div>
          <nav
            aria-label="Playground modes"
            className="col-span-2 row-start-2 w-fit lg:col-span-1 lg:col-start-2 lg:row-start-1"
          >
            <Segmented
              label="Mode"
              items={modes}
              value={mode}
              onChange={setMode}
            />
          </nav>
          <div className="col-start-2 row-start-1 flex items-center justify-end gap-1.5 lg:col-start-3 lg:gap-2.5">
            <a
              href="https://docs.motionprovider.dev"
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-md px-2 py-2 text-sm text-muted hover:text-foreground sm:flex"
            >
              <BookOpen size={16} strokeWidth={1.65} /> Docs
            </a>
            <IconButton
              icon={theme === "dark" ? Sun : Moon}
              label={theme === "dark" ? "Use light theme" : "Use dark theme"}
              onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
            />
            <Button
              size="sm"
              onPress={() => setDialog("export")}
              isDisabled={!markup.layers.length}
              aria-label="Export code"
              className="min-h-9 gap-2 rounded-md px-2.5 font-semibold sm:px-3.5"
            >
              <CodeXml size={17} strokeWidth={2.1} />
              <span className="hidden sm:inline">Export code</span>
              <span className="sm:hidden">Export</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto flex max-w-[1760px] flex-col px-4 pt-5 sm:px-6 sm:pt-6 lg:px-8">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-4 sm:mb-5">
          <div>
            <h1 className="text-[30px] leading-tight font-semibold tracking-[-0.05em] sm:text-[34px]">
              {mode === "playground" ? "Playground" : "Presets"}
            </h1>
            <p className="mt-1.5 text-sm leading-relaxed text-muted sm:text-[15px]">
              {mode === "playground"
                ? "Import a component, tune its motion, and take the code with you."
                : "Choose a starter layout to experiment with Motion Provider."}
            </p>
          </div>
          {mode === "playground" && (
            <div className="flex flex-wrap items-center gap-2.5 text-sm">
              <span className="flex items-center gap-2 text-muted">
                <Layers size={15} /> Replay
              </span>
              <Segmented
                label="Replay scope"
                items={scopes}
                value={scope}
                onChange={setScope}
              />
            </div>
          )}
        </div>
        {mode === "playground" ? (
          <div className="grid gap-3.5 lg:grid-cols-[minmax(198px,0.89fr)_minmax(0,3fr)_minmax(242px,1fr)] lg:[grid-template-rows:minmax(522px,calc(100dvh-224px))]">
            <Preview
              project={project}
              markup={markup}
              selected={selected}
              active={active}
              total={total}
              playback={playback}
              view={view}
              css={utilities.css}
              code={code}
              device={device}
              before={before}
              onSelect={setSelected}
              onView={setView}
              onDevice={setDevice}
              onBefore={setBefore}
              onCopy={copy}
              onError={(message) => report(message, true)}
            />
            <Workspace
              project={project}
              layers={markup.layers}
              selected={selected}
              saving={saving}
              onSelect={setSelected}
              onImport={() => setDialog("import")}
              onSave={save}
              onOpen={openLibrary}
            />
            <Inspector
              layer={layer}
              settings={settings}
              assigned={!!(layer && project.assignments[layer.id])}
              onChange={changeSettings}
              onRemove={removeAnimation}
              onReset={() => {
                if (layer) changeSettings(settingsFor(layer.kind));
              }}
              onRandomize={() => {
                if (settings) changeSettings(randomized(settings));
              }}
            />
          </div>
        ) : (
          <Presets current={project.template} onPick={pickTemplate} />
        )}
        <footer className="flex min-h-12 flex-wrap items-center justify-between gap-x-4 gap-y-1 py-2 text-[13px] text-muted">
          <span className="flex items-center gap-2">
            {!online ? (
              <>
                <WifiOff size={15} /> Offline · Local changes are available
              </>
            ) : utilities.status === "loading" ? (
              <span role="status">Building Tailwind styles…</span>
            ) : utilities.status === "stale" ? (
              <>
                <CircleAlert size={15} />
                <span role="status">
                  Preview styles could not be refreshed.
                </span>
              </>
            ) : (
              <>
                <span className="size-1.5 rounded-full bg-success" />{" "}
                <span>
                  {markup.layers.length
                    ? "Sandbox ready"
                    : "No component loaded"}
                </span>
              </>
            )}
          </span>
          {mode === "playground" && (
            <span className="hidden items-center gap-2 sm:flex">
              <Play size={12} />
              <kbd className="rounded border border-[var(--stroke)] bg-[var(--panel)] px-1.5 py-0.5 font-mono text-[12px]">
                Space
              </kbd>
              Play / pause
            </span>
          )}
        </footer>
      </main>
      {dialog === "import" && (
        <ImportDialog
          project={project}
          onImport={loadHtml}
          onClose={() => setDialog(undefined)}
        />
      )}
      {dialog === "export" && (
        <ExportDialog
          project={project}
          source={code}
          onCopy={copy}
          onShare={share}
          onClose={() => setDialog(undefined)}
        />
      )}
      {dialog === "saved" && (
        <SavedDialog
          drafts={drafts}
          loading={opening}
          error={libraryError}
          onLoad={openDraft}
          onClose={() => setDialog(undefined)}
        />
      )}
      {notice && (
        <div
          role={notice.error ? "alert" : "status"}
          className={`pointer-events-none fixed right-4 bottom-4 z-[110] max-w-[calc(100vw-2rem)] rounded-lg border border-[var(--stroke)] bg-[var(--overlay)] px-4 py-3 text-sm shadow-xl ${notice.error ? "text-danger" : "text-foreground"}`}
        >
          {notice.text}
        </div>
      )}
    </div>
  );
}
