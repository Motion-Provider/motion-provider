import { Button } from "@heroui/react";
import { MotionChain } from "motion-provider";
import { ENGINE_GROUPS } from "@/constants/engine.data";
import { useIsMobile } from "@/hooks/use-is-mobile";
import type { EngineNodeId } from "@/types/engine.type";
import { NODES_BY_GROUP } from "@/utils/engineDiagram";
import { toneStyle } from "@/utils/engineTone";

interface EngineMobileListProps {
  onSelect: (id: EngineNodeId) => void;
}

export function EngineMobileList({ onSelect }: EngineMobileListProps) {
  const isMobile = useIsMobile();

  if (!isMobile) return null;
  return (
    <div className="grid gap-4 sm:grid-cols-2">
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
            <MotionChain
              key={"b"}
              animation={{
                mode: "fadeUp",
                duration: 1.5,
                transition: "bounceSoft",
              }}
              controller={{
                scroll: {
                  axis: "y",
                  start: 0,
                  end: 0.35,
                  mode: "view",
                },
              }}
              elementType="li"
            >
              {NODES_BY_GROUP[group.id].map((node) => (
                <Button
                  key={node.id}
                  variant="outline"
                  className="h-auto w-full justify-between gap-3 py-2"
                  onPress={() => onSelect(node.id)}
                >
                  <span className="text-left text-sm">{node.label}</span>
                  {node.file && (
                    <span className=" text-xs text-muted">{node.file}</span>
                  )}
                </Button>
              ))}
            </MotionChain>
          </ul>
        </section>
      ))}
    </div>
  );
}
