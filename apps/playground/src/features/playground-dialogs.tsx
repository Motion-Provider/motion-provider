import {
  ExportDialog,
  ImportDialog,
  SavedDialog,
} from "../components/project-dialogs";
import { usePlayground } from "../context/playground";
import { usePlaygroundRuntime } from "../context/playground-runtime";
import { useCopy, useShareLink } from "../hooks/use-clipboard";
import { useDocumentLoader } from "../hooks/use-document-loader";
import { useSavedProjects } from "../hooks/use-saved-projects";

function ImportDialogContainer() {
  const {
    state: { project },
    actions,
  } = usePlayground();
  const { loadHtml } = useDocumentLoader();

  return (
    <ImportDialog
      project={project}
      onImport={loadHtml}
      onClose={actions.closeDialog}
    />
  );
}

function ExportDialogContainer() {
  const {
    state: { project },
    actions,
  } = usePlayground();
  const { code } = usePlaygroundRuntime();
  const copy = useCopy();
  const share = useShareLink();

  return (
    <ExportDialog
      project={project}
      source={code}
      onCopy={copy}
      onShare={share}
      onClose={actions.closeDialog}
    />
  );
}

function SavedDialogContainer() {
  const { actions } = usePlayground();
  const { loadDraft } = useDocumentLoader();
  const { drafts, loading, error } = useSavedProjects();

  return (
    <SavedDialog
      drafts={drafts}
      loading={loading}
      error={error}
      onLoad={loadDraft}
      onClose={actions.closeDialog}
    />
  );
}

export function PlaygroundDialogs() {
  const {
    state: { dialog },
  } = usePlayground();

  switch (dialog) {
    case "import":
      return <ImportDialogContainer />;
    case "export":
      return <ExportDialogContainer />;
    case "saved":
      return <SavedDialogContainer />;
    default:
      return null;
  }
}
