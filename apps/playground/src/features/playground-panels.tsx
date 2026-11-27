import { ShortcutsModal } from "@/components/shortcuts-modal";
import { report } from "@/lib/report";
import { Inspector } from "@/sections/inspector";
import { Preview } from "@/sections/preview";
import { Workspace } from "@/sections/workspace";
import { settingsFor } from "../constants/motion.config";
import { usePlayground } from "../context/playground";
import { usePlaygroundRuntime } from "../context/playground-runtime";
import { useCopy } from "../hooks/use-clipboard";
import { useSaveProject } from "../hooks/use-save-project";
import { randomized } from "../lib/motion";

export function PreviewPanel() {
  const { state, actions } = usePlayground();
  const { active, total, playback, utilities, code } = usePlaygroundRuntime();
  const copy = useCopy();

  return (
    <Preview
      project={state.project}
      markup={state.markup}
      selected={state.selected}
      active={active}
      total={total}
      playback={playback}
      view={state.view}
      css={utilities.css}
      code={code}
      device={state.device}
      before={state.before}
      onSelect={actions.select}
      onView={(view) => actions.patchView({ view })}
      onDevice={(device) => actions.patchView({ device })}
      onBefore={(before) => actions.patchView({ before })}
      onCopy={copy}
      onError={(message) => report(message, true)}
    />
  );
}

export function WorkspacePanel() {
  const { state, actions } = usePlayground();
  const { saving, save } = useSaveProject();

  return (
    <Workspace
      project={state.project}
      layers={state.markup.layers}
      selected={state.selected}
      saving={saving}
      shortcuts={<ShortcutsModal save={save} saving={saving} />}
      onSelect={actions.select}
      onImport={() => actions.openDialog("import")}
      onSave={save}
      onExport={() => actions.openDialog("export")}
      onOpen={() => actions.openDialog("saved")}
    />
  );
}

export function InspectorPanel() {
  const { state, layer, settings, actions } = usePlayground();

  return (
    <Inspector
      scope={state.scope}
      onScopeChange={(scope) => actions.patchView({ scope })}
      layer={layer}
      settings={settings}
      assigned={!!(layer && state.project.assignments[layer.id])}
      onChange={actions.patchSettings}
      onRemove={actions.removeAnimation}
      onReset={() => {
        if (layer) actions.patchSettings(settingsFor(layer.kind));
      }}
      onRandomize={() => {
        if (settings) actions.patchSettings(randomized(settings));
      }}
    />
  );
}
