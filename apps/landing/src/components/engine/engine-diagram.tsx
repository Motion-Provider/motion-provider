import { useState } from "react";
import { EngineLabelsProvider } from "@/providers/engine.provider";
import type { EngineNodeId } from "@/types/engine.type";
import { EngineCanvas } from "./engine-canvas";
import { EngineMobileList } from "./engine-mobile-list";
import { EngineNodeModal } from "./engine-node-modal";
import { EngineLabelsSwitch } from "./engine-switch";

export function EngineDiagram() {
  const [activeId, setActiveId] = useState<EngineNodeId | null>(null);
  const [selectedId, setSelectedId] = useState<EngineNodeId | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const select = (id: EngineNodeId) => {
    setSelectedId(id);
    setIsOpen(true);
  };

  return (
    <>
      <EngineLabelsProvider>
        <EngineLabelsSwitch
          className="absolute rounded-full w-fit desktop:-top-12 laptop:-top-8 -translate-1/2 left-1/2 bg-glass-surface px-3 py-2 text-muted"
          size="lg"
        />
        <EngineCanvas
          activeId={activeId}
          onActivate={setActiveId}
          onSelect={select}
        />
      </EngineLabelsProvider>
      <EngineMobileList onSelect={select} />
      <EngineNodeModal
        nodeId={selectedId}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        onNavigate={setSelectedId}
      />
    </>
  );
}
