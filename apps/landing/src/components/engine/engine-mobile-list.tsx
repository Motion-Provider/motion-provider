import { Button } from "@heroui/react";
import { ENGINE_GROUPS } from "@/constants/engine.data";
import type { EngineNodeId } from "@/types/engine.type";
import { NODES_BY_GROUP } from "@/utils/engineDiagram";
import { toneStyle } from "@/utils/engineTone";

interface EngineMobileListProps {
  onSelect: (id: EngineNodeId) => void;
}

/** Below `lg` the wired canvas is unreadable, so the same dataset renders as grouped lists. */
export function EngineMobileList({ onSelect }: EngineMobileListProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:hidden">
      {ENGINE_GROUPS.map((group) => (
        <section
          key={group.id}
          style={toneStyle(group.tone)}
          className="rounded-2xl border border-[color-mix(in_oklch,var(--tone)_28%,transparent)] bg-[color-mix(in_oklch,var(--tone)_5%,transparent)] p-4"
        >
          <h3 className="font-secondary text-sm font-medium text-(--tone)">
            {group.label}
          </h3>
          <ul className="mt-3 flex flex-col gap-2">
            {NODES_BY_GROUP[group.id].map((node) => (
              <li key={node.id}>
                <Button
                  variant="tertiary"
                  className="h-auto w-full justify-between gap-3 py-2"
                  onPress={() => onSelect(node.id)}
                >
                  <span className="text-left text-sm">{node.label}</span>
                  {node.file && (
                    <span className="font-annotation text-xs text-muted">
                      {node.file}
                    </span>
                  )}
                </Button>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
