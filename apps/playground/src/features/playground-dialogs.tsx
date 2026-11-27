import { Button } from "@heroui/react";
import {
  Dialog,
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
    actions,
  } = usePlayground();

  switch (dialog) {
    case "import":
      return <ImportDialogContainer />;
    case "export":
      return <ExportDialogContainer />;
    case "saved":
      return <SavedDialogContainer />;
    case "resetAnimations":
      return (
        <Dialog
          title="Reset all animations?"
          onClose={actions.closeDialog}
          footer={
            <>
              <Button variant="ghost" onPress={actions.closeDialog}>
                Cancel
              </Button>
              <Button variant="danger" onPress={actions.resetAnimations}>
                Reset animations
              </Button>
            </>
          }
        >
          <p className="text-sm text-secondary-text">
            Remove the animation settings from every layer in this workspace.
          </p>
        </Dialog>
      );
    default:
      return null;
  }
}
