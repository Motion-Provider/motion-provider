import { Button, Input, Modal } from "@heroui/react";
import { Keyboard, X } from "lucide-react";
import { type KeyboardEvent, useState } from "react";
import { usePlayground } from "../context/playground";
import { useQuickAccess } from "../hooks/use-quick-access";
import {
  defaultBindings,
  type ShortcutAction,
  shortcutActions,
  shortcutFor,
} from "../lib/shortcuts";
import { IconButton } from "./controls";

export function ShortcutsModal({
  save,
  saving,
}: {
  save: () => Promise<void>;
  saving: boolean;
}) {
  const { state, actions } = usePlayground();
  const { bindings, updateBindings } = useQuickAccess(save, saving);
  const [recording, setRecording] = useState<ShortcutAction>();
  const [focusAction, setFocusAction] = useState<ShortcutAction>();
  const [conflict, setConflict] = useState("");

  function stopRecording(action?: ShortcutAction) {
    setRecording(undefined);
    setConflict("");
    setFocusAction(action);
  }

  function record(event: KeyboardEvent<HTMLInputElement>, id: ShortcutAction) {
    if (
      event.key === "Tab" &&
      !event.altKey &&
      !event.ctrlKey &&
      !event.metaKey
    )
      return;

    event.preventDefault();
    event.stopPropagation();
    if (event.repeat) return;

    if (
      event.key === "Escape" &&
      !event.altKey &&
      !event.ctrlKey &&
      !event.metaKey &&
      !event.shiftKey
    ) {
      stopRecording(id);
      return;
    }

    const binding = shortcutFor(event.nativeEvent);
    if (!binding) return;

    const duplicate = shortcutActions.find(
      (action) => action.id !== id && bindings[action.id] === binding,
    );
    if (duplicate) {
      setConflict(`Already assigned to ${duplicate.label}.`);
      return;
    }

    updateBindings({ ...bindings, [id]: binding });
    stopRecording(id);
  }

  return (
    <Modal>
      <IconButton
        variant="outline"
        icon={Keyboard}
        label="Shortcuts"
        className="h-9 shrink-0 rounded-md"
        onPress={() => actions.openDialog("shortcuts")}
      />
      <Modal.Backdrop
        isOpen={state.dialog === "shortcuts"}
        onOpenChange={(open) => {
          if (open) actions.openDialog("shortcuts");
          else {
            stopRecording();
            actions.closeDialog();
          }
        }}
      >
        <Modal.Container placement="center" scroll="inside" className="p-3">
          <Modal.Dialog className="max-w-lg p-4 sm:p-6">
            <Modal.CloseTrigger />
            <Modal.Header className="gap-2 pr-8">
              <Modal.Heading className="text-xl font-semibold tracking-tight">
                Keyboard shortcuts
              </Modal.Heading>
              <p className="text-sm text-muted">
                Select a shortcut and press a new combination. Escape cancels
                recording.
              </p>
            </Modal.Header>
            <Modal.Body>
              <ul className="divide-y divide-stroke">
                {shortcutActions.map(({ id, label }) => {
                  const binding = bindings[id];
                  const display = binding?.split("+").join(" + ");

                  return (
                    <li
                      key={id}
                      className="grid grid-cols-2 items-center gap-2 py-2"
                    >
                      <span className="text-secondary-text">{label}</span>
                      <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-1">
                        {recording === id ? (
                          <Input
                            aria-label={`Record ${label} shortcut`}
                            className="w-full min-w-0 px-1 text-center"
                            placeholder="Press keys"
                            readOnly
                            autoFocus
                            onBlur={() => stopRecording()}
                            onKeyDown={(event) => record(event, id)}
                          />
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-auto min-h-9 w-full min-w-0 rounded-md px-1 py-1 whitespace-normal"
                            aria-label={`Change ${label} shortcut (${display ?? "Unassigned"})`}
                            autoFocus={focusAction === id}
                            onPress={() => {
                              setFocusAction(undefined);
                              setRecording(id);
                            }}
                          >
                            {display ? (
                              <kbd className="font-mono text-xs wrap-anywhere">
                                {display}
                              </kbd>
                            ) : (
                              "Unassigned"
                            )}
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          isIconOnly
                          isDisabled={!binding}
                          aria-label={`Clear ${label} shortcut`}
                          onPress={() =>
                            updateBindings({ ...bindings, [id]: null })
                          }
                        >
                          <X size={14} aria-hidden />
                        </Button>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <p role="status" className="text-sm text-danger">
                {conflict}
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="ghost"
                onPress={() => updateBindings(defaultBindings)}
              >
                Restore defaults
              </Button>
              <Button slot="close">Done</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
