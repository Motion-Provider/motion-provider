import { Button, Modal } from "@heroui/react";
import type { EngineEdge, EngineNodeId } from "@/types/engine.type";
import { NODE_BY_ID, NODE_LINKS } from "@/utils/engineDiagram";

interface ConnectionListProps {
  title: string;
  edges: readonly EngineEdge[];
  /** Which end of each edge is the *other* node. */
  side: "from" | "to";
  onNavigate: (id: EngineNodeId) => void;
}

function ConnectionList({
  title,
  edges,
  side,
  onNavigate,
}: ConnectionListProps) {
  if (edges.length === 0) return null;
  return (
    <div>
      <h4 className="mb-2 text-sm font-medium text-foreground">{title}</h4>
      <ul className="flex flex-wrap gap-2">
        {edges.map((edge) => {
          const other = NODE_BY_ID[edge[side]];
          return (
            <li key={edge.id}>
              <Button
                size="sm"
                variant="tertiary"
                onPress={() => onNavigate(other.id)}
              >
                <span className="text-muted">{edge.label}</span>
                <span>{other.label}</span>
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

interface EngineNodeModalProps {
  nodeId: EngineNodeId | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: (id: EngineNodeId) => void;
}

export function EngineNodeModal({
  nodeId,
  isOpen,
  onOpenChange,
  onNavigate,
}: EngineNodeModalProps) {
  const node = nodeId ? NODE_BY_ID[nodeId] : null;
  const links = nodeId ? NODE_LINKS[nodeId] : null;
  const isIsolated =
    links !== null &&
    links.incoming.length === 0 &&
    links.outgoing.length === 0;

  return (
    <Modal.Backdrop isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Container>
        <Modal.Dialog className="sm:max-w-md">
          {node && links && (
            <>
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Heading>{node.label}</Modal.Heading>
              </Modal.Header>
              <Modal.Body className="flex flex-col gap-5">
                {node.file && (
                  <code className="font-secondary text-xs text-muted">
                    {node.file}
                  </code>
                )}
                <p className="text-sm text-foreground">{node.summary}</p>
                <ConnectionList
                  title="Receives from"
                  edges={links.incoming}
                  side="from"
                  onNavigate={onNavigate}
                />
                <ConnectionList
                  title="Sends to"
                  edges={links.outgoing}
                  side="to"
                  onNavigate={onNavigate}
                />
                {isIsolated && (
                  <p className="text-sm text-muted">
                    This module is not wired to other modules in the engine.
                  </p>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button slot="close" variant="secondary">
                  Close
                </Button>
              </Modal.Footer>
            </>
          )}
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
}
