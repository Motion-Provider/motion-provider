"use client";

import {
  Button,
  Input,
  Label,
  Modal,
  TextArea,
  TextField,
} from "@heroui/react";
import {
  Clipboard,
  CodeXml,
  Copy,
  Download,
  FileUp,
  FolderOpen,
  Link2,
  Terminal,
} from "lucide-react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { fileName } from "../lib/export";
import { downloadText, pack } from "../lib/transfer";
import type { Draft, Project } from "../types/playground";
import { Segmented } from "./controls";

export function Dialog({
  title,
  description,
  children,
  footer,
  onClose,
  pending,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
  pending?: boolean;
}) {
  return (
    <Modal>
      <Modal.Backdrop
        isOpen
        onOpenChange={(opened) => {
          if (!opened && !pending) onClose();
        }}
        isDismissable={!pending}
        isKeyboardDismissDisabled={pending}
        className="bg-(--scrim)"
      >
        <Modal.Container className="p-3">
          <Modal.Dialog className="w-full max-w-160 rounded-4xl border mp-glass mp-glass-raised p-5 sm:p-6">
            <Modal.CloseTrigger isDisabled={pending} />

            <Modal.Header className="gap-2 pr-7">
              <Modal.Heading className="text-xl font-semibold tracking-tight">
                {title}
              </Modal.Heading>
              {description && (
                <p className="text-sm leading-relaxed text-muted">
                  {description}
                </p>
              )}
            </Modal.Header>

            <Modal.Body className="mt-4 gap-4">{children}</Modal.Body>

            {footer && (
              <Modal.Footer className="mt-5 flex-wrap gap-2">
                {footer}
              </Modal.Footer>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}

export function ImportDialog({
  project,
  onImport,
  onClose,
}: {
  project: Project;
  onImport: (html: string, name: string) => Promise<void>;
  onClose: () => void;
}) {
  const [html, setHtml] = useState("");
  const [name, setName] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const input = useRef<HTMLInputElement>(null);

  async function submit() {
    if (pending || !html.trim()) return;

    setPending(true);
    setError("");

    try {
      await onImport(html, name.trim() || "Imported component");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Could not import HTML.",
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <Dialog
      title="Import HTML"
      description="Paste rendered HTML or open an HTML file. Inline CSS, style blocks, and standard Tailwind classes appear in the preview."
      onClose={onClose}
      pending={pending}
      footer={
        <>
          <Button variant="ghost" onPress={onClose} isDisabled={pending}>
            Cancel
          </Button>
          <Button
            onPress={submit}
            isDisabled={!html.trim()}
            isPending={pending}
          >
            <CodeXml size={16} /> Load into sandbox
          </Button>
        </>
      }
    >
      <TextField value={name} onChange={setName}>
        <Label>Component name</Label>
        <Input maxLength={90} placeholder="Imported component" />
      </TextField>

      <div className="grid gap-2">
        <label htmlFor="source-html" className="text-sm font-medium">
          HTML markup
        </label>
        <TextArea
          id="source-html"
          autoFocus
          value={html}
          onChange={(event) => setHtml(event.currentTarget.value)}
          placeholder={
            '<section class="p-8">\n  <h1>Your component</h1>\n</section>'
          }
          className="min-h-52 resize-y rounded-lg border border-(--stroke) bg-(--inset) font-mono text-sm leading-6"
          maxLength={80_001}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <input
          ref={input}
          type="file"
          hidden
          accept=".html,.htm,text/html"
          onChange={async (event) => {
            const file = event.currentTarget.files?.item(0);

            if (!file) return;
            if (file.size > 320_000) {
              setError("Choose an HTML file under 320 KB.");
              return;
            }

            try {
              setHtml(await file.text());
              setName(file.name.replace(/\.html?$/i, "").slice(0, 90));
              setError("");
            } catch {
              setError("Could not read this file.");
            }
          }}
        />
        <Button
          size="sm"
          variant="outline"
          onPress={() => input.current?.click()}
        >
          <FileUp size={15} /> Open HTML file
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onPress={() => {
            setHtml(project.html);
            setName(project.name);
          }}
        >
          <Clipboard size={15} /> Edit current HTML
        </Button>
      </div>

      {error && (
        <p role="alert" className="text-sm text-danger">
          {error}
        </p>
      )}
    </Dialog>
  );
}

export function ExportDialog({
  project,
  source,
  onCopy,
  onShare,
  onClose,
}: {
  project: Project;
  source: string;
  onCopy: (value: string, message?: string) => void;
  onShare: () => Promise<void>;
  onClose: () => void;
}) {
  const [mode, setMode] = useState<"file" | "cli">("file");
  const [transfer, setTransfer] = useState<{
    source: string;
    command?: string;
    hash?: string;
    error?: string;
  }>();
  const [sharing, setSharing] = useState(false);
  const [shareError, setShareError] = useState("");

  const name = fileName(project);

  useEffect(() => {
    if (mode !== "cli") return;

    let cancelled = false;
    const packageUrl = new URL("/api/motion-cli.tgz", window.location.origin)
      .href;

    void pack(source)
      .then((code) => {
        if (cancelled) return;

        if (code.length > 100_000) {
          setTransfer({
            source,
            error:
              "This component is too large for a shell argument. Download the TSX file.",
          });
          return;
        }

        setTransfer({
          source,
          hash: code.slice(0, 64),
          command: `npx --yes --package="${packageUrl}" motion-playground "${code}" "src/components/${name}"`,
        });
      })
      .catch(() => {
        if (!cancelled)
          setTransfer({
            source,
            error: "Could not generate the CLI command in this browser.",
          });
      });

    return () => {
      cancelled = true;
    };
  }, [mode, source, name]);

  async function share() {
    setSharing(true);
    setShareError("");

    try {
      await onShare();
    } catch (error) {
      setShareError(
        error instanceof Error
          ? error.message
          : "Could not copy the share link.",
      );
    } finally {
      setSharing(false);
    }
  }

  const ready = transfer?.source === source ? transfer : undefined;

  return (
    <Dialog
      title="Export code"
      description="Take the React component and its Motion Provider configuration into your project."
      onClose={onClose}
      footer={
        <Button variant="ghost" onPress={onClose}>
          Done
        </Button>
      }
    >
      <Segmented
        label="Export method"
        value={mode}
        onChange={setMode}
        items={[
          { id: "file", label: "TSX file", icon: CodeXml },
          { id: "cli", label: "CLI command", icon: Terminal },
        ]}
      />

      {mode === "file" ? (
        <div className="grid gap-3">
          <code className="overflow-hidden rounded-lg border border-(--stroke) bg-(--inset) p-3 font-mono text-sm text-ellipsis">
            {name}
          </code>

          <div className="flex flex-wrap gap-2">
            <Button onPress={() => downloadText(name, source)}>
              <Download size={16} /> Download TSX
            </Button>
            <Button variant="outline" onPress={() => onCopy(source)}>
              <Copy size={16} /> Copy code
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid gap-3">
          {ready?.error ? (
            <p role="alert" className="text-sm text-danger">
              {ready.error}
            </p>
          ) : ready?.command ? (
            <>
              <p className="text-sm text-muted">
                Run this command from the root of your project.
              </p>
              <TextArea
                aria-label="CLI command"
                readOnly
                value={ready.command}
                className="min-h-28 resize-y break-all rounded-lg border border-(--stroke) bg-(--inset) font-mono text-[13px]"
              />

              <p className="min-w-0 truncate text-[12px] text-muted">
                Export hash{" "}
                <code className="ml-2 font-mono" title={ready.hash}>
                  {ready.hash}
                </code>
              </p>
              <Button
                className="w-fit"
                // biome-ignore lint/style/noNonNullAssertion: error internally handled
                onPress={() => onCopy(ready.command!, "CLI command copied.")}
              >
                <Copy size={16} /> Copy command
              </Button>
            </>
          ) : (
            <p role="status" className="text-sm text-muted">
              Generating the export command…
            </p>
          )}
        </div>
      )}

      <div className="grid gap-2 border-t border-(--stroke) pt-4">
        <Button
          variant="outline"
          className="w-fit"
          isPending={sharing}
          onPress={() => void share()}
        >
          <Link2 size={16} /> Copy project link
        </Button>
        <p className="text-[13px] text-muted">
          The link includes this project’s HTML and motion settings.
        </p>
        {shareError && (
          <p role="alert" className="text-sm text-danger">
            {shareError}
          </p>
        )}
      </div>
    </Dialog>
  );
}

export function SavedDialog({
  drafts,
  loading,
  error,
  onLoad,
  onClose,
}: {
  drafts: Draft[];
  loading: boolean;
  error?: string;
  onLoad: (draft: Draft) => Promise<void>;
  onClose: () => void;
}) {
  const [pending, setPending] = useState(false);
  const [loadError, setLoadError] = useState("");

  return (
    <Dialog
      title="Saved projects"
      description="Projects saved in this browser."
      onClose={onClose}
      pending={pending}
    >
      {loading ? (
        <p role="status" className="text-sm text-muted">
          Loading saved projects…
        </p>
      ) : error ? (
        <p role="alert" className="text-sm text-danger">
          {error}
        </p>
      ) : drafts.length === 0 ? (
        <p className="text-sm text-muted">
          Use Save project to keep a copy of your current workspace.
        </p>
      ) : (
        <ul className="max-h-80 space-y-2 overflow-auto">
          {drafts.map((draft) => (
            <li key={draft.id}>
              <Button
                variant="outline"
                onPress={async () => {
                  setPending(true);
                  setLoadError("");

                  try {
                    await onLoad(draft);
                  } catch {
                    setLoadError("This saved project could not be opened.");
                  } finally {
                    setPending(false);
                  }
                }}
                isDisabled={pending}
                className="w-full min-w-0 justify-start gap-3 rounded-lg border-(--stroke)"
              >
                <FolderOpen size={17} className="shrink-0 text-accent" />
                <span className="min-w-0 flex-1 truncate text-left">
                  {draft.name}
                </span>
                <span className="shrink-0 text-xs text-muted">
                  {new Date(draft.updated).toLocaleDateString()}
                </span>
              </Button>
            </li>
          ))}
        </ul>
      )}

      {loadError && (
        <p role="alert" className="text-sm text-danger">
          {loadError}
        </p>
      )}
    </Dialog>
  );
}
