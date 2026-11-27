"use client";

import { Button, Card, cn } from "@heroui/react";
import {
  Braces,
  ChevronDown,
  CodeXml,
  FileCode,
  FolderOpen,
  Image,
  Layers,
  ListTree,
  PanelTop,
  Plus,
  Save,
  Type,
} from "lucide-react";
import { type ReactNode, useState } from "react";
import { IconButton, SectionTitle } from "../components/controls";
import type { Assignments, Layer, Project } from "../types/playground";

const icons = {
  MotionImage: Image,
  MotionText: Type,
  MotionChain: ListTree,
  MotionContainer: CodeXml,
};

export function Workspace({
  project,
  layers,
  selected,
  saving,
  shortcuts,
  onSelect,
  onImport,
  onSave,
  onExport,
  onOpen,
}: {
  project: Project;
  layers: Layer[];
  selected?: string;
  saving: boolean;
  shortcuts: ReactNode;
  onSelect: (id: string) => void;
  onImport: () => void;
  onSave: () => void;
  onExport: () => void;
  onOpen: () => void;
}) {
  const [limit, setLimit] = useState(50);
  const assignments: Assignments = project.assignments;

  return (
    <Card
      aria-label="Workspace"
      className="mp-panel @container/workspace lg:col-start-1 lg:row-[1/span_2]"
    >
      <SectionTitle icon={PanelTop}>Workspace</SectionTitle>

      <div className="space-y-3 border-b border-stroke p-3.5">
        <div className="flex min-w-0 items-center gap-2.5 rounded-lg border border-stroke bg-inset p-2.5">
          <span className="grid size-8 shrink-0 place-items-center rounded-md bg-tint text-accent-text">
            <FileCode size={17} strokeWidth={1.7} />
          </span>
          <div className="min-w-0 flex-1">
            <p title={project.name} className="truncate text-sm font-medium">
              {project.name}
            </p>
            <p className="mt-0.5 text-[12px] text-muted">HTML</p>
          </div>
        </div>

        <Button
          variant="outline"
          className="min-h-9 w-full justify-center rounded-md text-sm"
          onPress={onImport}
        >
          <Plus size={16} className="text-accent-text" /> Import HTML
        </Button>
      </div>

      <div className="flex min-h-0 flex-1 flex-col px-2.5 py-3.5">
        <div
          className={cn(
            "mb-2.5 flex items-center justify-between px-2",
            "text-[12px] font-semibold tracking-[0.13em] text-muted uppercase",
          )}
        >
          <h3 className="flex items-center gap-2">
            <Layers size={14} strokeWidth={1.7} /> Layers
          </h3>
          <span className="rounded border border-stroke px-1.5 py-0.5 font-mono tracking-normal">
            {layers.length}
          </span>
        </div>

        {layers.length ? (
          <ul
            aria-label="Component layers"
            className="scrollbar max-h-60 space-y-0.5 overflow-y-auto lg:max-h-107.5"
          >
            {layers
              .slice(
                0,
                Math.max(
                  limit,
                  layers.findIndex((layer) => layer.id === selected) + 1,
                ),
              )
              .map((layer) => {
                const Icon = icons[layer.kind];
                const active = selected === layer.id;

                return (
                  <li key={layer.id}>
                    <Button
                      aria-pressed={active}
                      variant="ghost"
                      size="sm"
                      onPress={() => onSelect(layer.id)}
                      className={cn(
                        "min-h-8 w-full min-w-0 justify-start gap-2",
                        "rounded-md border px-2 text-left text-[13px]",
                        active
                          ? "border-accent-stroke bg-tint text-accent-text"
                          : "border-transparent text-secondary-text hover:bg-default",
                      )}
                    >
                      {layer.depth === 0 ? (
                        <ChevronDown
                          size={12}
                          className="shrink-0 text-muted"
                        />
                      ) : (
                        <span
                          aria-hidden
                          style={{ width: Math.min(layer.depth, 4) * 6 + 4 }}
                          className="shrink-0"
                        />
                      )}
                      <Icon size={15} strokeWidth={1.75} className="shrink-0" />
                      <span className="min-w-0 flex-1 truncate">
                        {layer.name}
                      </span>
                      {assignments[layer.id] && (
                        <span className="size-1.5 shrink-0 rounded-full bg-accent" />
                      )}
                    </Button>
                  </li>
                );
              })}

            {layers.length > limit && (
              <li>
                <Button
                  variant="ghost"
                  size="sm"
                  onPress={() => setLimit(limit + 50)}
                >
                  Show more layers
                </Button>
              </li>
            )}
          </ul>
        ) : (
          <p className="flex items-center gap-2 px-2 py-4 text-sm text-muted">
            <Braces size={16} /> No layers yet
          </p>
        )}
      </div>

      <div className="mt-auto grid shrink-0 gap-2 border-t border-stroke p-3.5">
        <div className="flex min-w-0 items-center gap-1.5">
          <Button
            size="sm"
            variant="outline"
            className="h-9 min-w-0 flex-1 justify-start gap-2 rounded-md px-1.5 text-sm @min-[230px]/workspace:px-2.5"
            isPending={saving}
            onPress={onSave}
            isDisabled={!layers.length}
          >
            <Save
              size={15}
              className="hidden shrink-0 text-muted @min-[230px]/workspace:block"
              aria-hidden
            />
            <span className="truncate">Save project</span>
          </Button>
          <IconButton
            icon={FolderOpen}
            label="Open saved projects"
            variant="outline"
            className="h-9 shrink-0 rounded-md"
            onPress={onOpen}
          />
          {shortcuts}
        </div>
        <Button
          size="sm"
          className="min-h-9 w-full gap-2 rounded-md font-semibold"
          onPress={onExport}
          isDisabled={!layers.length}
        >
          <CodeXml size={17} strokeWidth={2.1} />
          Export code
        </Button>
      </div>
    </Card>
  );
}
