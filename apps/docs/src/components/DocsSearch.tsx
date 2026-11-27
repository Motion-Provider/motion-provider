import {
  Autocomplete,
  Button,
  Description,
  Label,
  Menu,
  Modal,
  SearchField,
} from "@heroui/react";
import {
  Anchor,
  ArrowUpRight,
  BookOpen,
  FileText,
  Hash,
  Library,
  SlidersHorizontal,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  indexSearchPages,
  type SearchEntry,
  type SearchPage,
  searchDocs,
} from "../lib/docs-search";

const base = import.meta.env.BASE_URL.replace(/\/$/, "");

const indexUrl = `${base}/docs-search.json`;

type SearchLink = Pick<SearchEntry, "href" | "pageTitle" | "title"> & {
  icon?: typeof FileText;
};

const quickLinks: readonly SearchLink[] = [
  { title: "Start Here", href: `${base}/learn`, icon: BookOpen },

  {
    title: "Controllers overview",
    href: `${base}/controllers/overview`,
    icon: SlidersHorizontal,
  },

  { title: "Hooks overview", href: `${base}/hooks/overview`, icon: Anchor },

  {
    title: "Registry overview",
    href: `${base}/registry/overview`,
    icon: Library,
  },
];

type SearchIndex =
  | { status: "idle" | "loading" | "error" }
  | { status: "ready"; entries: SearchEntry[] };

export default function DocsSearch() {
  const [isOpen, setIsOpen] = useState(false);

  const [query, setQuery] = useState("");

  const [index, setIndex] = useState<SearchIndex>({ status: "idle" });

  const input = useRef<HTMLInputElement>(null);

  const loadIndex = useCallback(async () => {
    setIndex({ status: "loading" });

    try {
      const response = await fetch(indexUrl);

      if (!response.ok) throw new Error("Could not load the search index");

      const pages: SearchPage[] = await response.json();

      setIndex({ status: "ready", entries: indexSearchPages(pages) });
    } catch {
      setIndex({ status: "error" });
    }
  }, []);

  const onOpenChange = useCallback(
    (open: boolean) => {
      setIsOpen(open);

      if (!open) setQuery("");
      else if (index.status === "idle" || index.status === "error")
        void loadIndex();
    },
    [index.status, loadIndex],
  );

  useEffect(() => {
    function onShortcut(event: KeyboardEvent) {
      if (
        event.defaultPrevented ||
        event.isComposing ||
        event.altKey ||
        event.shiftKey ||
        !(event.metaKey || event.ctrlKey) ||
        event.key.toLowerCase() !== "k"
      )
        return;

      event.preventDefault();

      if (event.repeat) return;

      if (isOpen) input.current?.focus();
      else onOpenChange(true);
    }

    document.addEventListener("keydown", onShortcut);

    return () => document.removeEventListener("keydown", onShortcut);
  }, [isOpen, onOpenChange]);

  const showQuickLinks = !query.trim();

  const links = useMemo<readonly SearchLink[]>(() => {
    if (showQuickLinks) return quickLinks;

    return index.status === "ready" ? searchDocs(index.entries, query) : [];
  }, [index, query, showQuickLinks]);

  const showStatus = links.length === 0 || index.status === "error";

  const statusMessage = {
    idle: "Loading documentation…",
    loading: "Loading documentation…",
    error: "Could not load documentation search.",
    ready: "No results found.",
  }[index.status];

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Trigger<"button">
        render={(props) => <button {...props} type="button" />}
        aria-label="Search documentation"
        aria-keyshortcuts="Meta+K Control+K"
        aria-haspopup="dialog"
        className="inline-flex size-9 shrink-0 items-center justify-center gap-2 rounded-md bg-transparent text-[#a5a198] transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none md:h-11.5 md:w-64 md:max-w-[calc(100vw-2rem)] md:justify-start md:rounded-none md:border-l md:border-[#2a2822] md:px-3 md:focus-visible:border-[#51483a]"
      >
        <svg
          viewBox="0 0 24 24"
          className="size-4 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="10.8" cy="10.8" r="6.3" />
          <path d="m15.5 15.5 4 4" />
        </svg>
        <span className="hidden min-w-0 flex-1 text-left text-[13px] text-[#aaa49a] md:block">
          Search docs...
        </span>
        <kbd className="hidden h-5 shrink-0 items-center rounded border border-[#39352c] px-1.5 font-sans text-[10px] leading-none text-[#aaa49a] md:inline-flex">
          ⌘K
        </kbd>
      </Modal.Trigger>

      <Modal.Backdrop className="bg-black/65 animate-none!">
        <Modal.Container
          className="animate-none!"
          placement="top"
          scroll="inside"
          size="lg"
        >
          <Modal.Dialog className="gap-0 rounded-2xl border border-border bg-background p-0 text-foreground shadow-2xl">
            <Modal.Heading className="sr-only">
              Search documentation
            </Modal.Heading>
            <Modal.CloseTrigger
              aria-label="Close search"
              className="top-3 right-3 text-muted"
            />

            <Modal.Body
              className="m-0 flex flex-col overflow-hidden p-0"
              onKeyDownCapture={(event) => {
                if (event.key !== "Escape" || event.nativeEvent.isComposing)
                  return;

                event.preventDefault();

                event.stopPropagation();

                onOpenChange(false);
              }}
            >
              <Autocomplete.Filter inputValue={query} onInputChange={setQuery}>
                <div className="shrink-0 border-b border-border p-2 pr-13">
                  <SearchField
                    aria-label="Search titles and headings"
                    autoFocus
                    fullWidth
                  >
                    <SearchField.Group className="bg-transparent text-foreground shadow-none">
                      <SearchField.SearchIcon className="text-muted" />
                      <SearchField.Input
                        ref={input}
                        autoComplete="off"
                        placeholder="Search docs..."
                        className="text-base placeholder:text-muted"
                      />
                      <SearchField.ClearButton />
                    </SearchField.Group>
                  </SearchField>
                </div>

                {showQuickLinks && (
                  <p className="shrink-0 px-4 pt-3 text-xs font-medium text-muted">
                    Quick links
                  </p>
                )}

                {links.length > 0 && (
                  <Menu
                    aria-label={
                      showQuickLinks ? "Quick links" : "Search results"
                    }
                    className="min-h-0 overflow-y-auto overscroll-contain p-2"
                    items={links}
                    onAction={() => onOpenChange(false)}
                  >
                    {(link) => {
                      const Icon =
                        link.icon ?? (link.pageTitle ? Hash : FileText);

                      return (
                        <Menu.Item
                          id={link.href}
                          href={link.href}
                          textValue={link.title}
                          className="gap-3 rounded-lg px-3 py-2.5 text-foreground data-focused:bg-accent/12 data-hovered:bg-accent/12"
                        >
                          <span
                            aria-hidden="true"
                            className={
                              link.icon
                                ? "grid size-8 shrink-0 place-items-center rounded-md bg-accent/12 text-accent"
                                : "shrink-0 text-muted"
                            }
                          >
                            <Icon className="size-4" />
                          </span>
                          <span className="min-w-0 flex-1 wrap-anywhere">
                            <Label className="block text-sm">
                              {link.title}
                            </Label>
                            {link.pageTitle && (
                              <Description className="block text-xs text-muted">
                                {link.pageTitle}
                              </Description>
                            )}
                          </span>
                          <ArrowUpRight
                            aria-hidden="true"
                            className="size-4 shrink-0 text-muted"
                          />
                        </Menu.Item>
                      );
                    }}
                  </Menu>
                )}

                <div
                  className={
                    showStatus ? "px-4 py-5 text-sm text-muted" : "sr-only"
                  }
                >
                  <p role="status">{showStatus ? statusMessage : ""}</p>
                  {index.status === "error" && (
                    <Button
                      className="mt-2"
                      onPress={() => {
                        input.current?.focus();

                        void loadIndex();
                      }}
                      size="sm"
                      variant="secondary"
                    >
                      Retry
                    </Button>
                  )}
                </div>
              </Autocomplete.Filter>
            </Modal.Body>

            <Modal.Footer
              className="hidden shrink-0 justify-start gap-4 border-t border-border px-4 py-2 text-xs text-muted sm:flex"
              aria-hidden="true"
            >
              <span>
                <kbd>↑</kbd> <kbd>↓</kbd> Navigate
              </span>
              <span>
                <kbd>↵</kbd> Open
              </span>
              <span>
                <kbd>Esc</kbd> Close
              </span>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
