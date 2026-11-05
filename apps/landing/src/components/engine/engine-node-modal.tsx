import { Chip, Modal, Sheet } from "@heroui/react";
import { MotionText } from "motion-provider";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { fontPrimary } from "@/lib/fonts";
import { getAnimation } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { EngineNodeId } from "@/types/engine.type";
import {
  getEngineNodeSourceUrl,
  NODE_BY_ID,
  NODE_LINKS,
} from "@/utils/engineDiagram";
import { GithubButton } from "../github-button";
import { EngineMiniMap } from "./engine-minimap";

interface EngineNodeModalProps {
  nodeId: EngineNodeId | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: (id: EngineNodeId) => void;
}

const glassSurfaceClassName = [
  "border border-glass-border",
  "bg-glass-surface",
  "backdrop-blur-[var(--glass-blur)]",
  "backdrop-saturate-[var(--glass-saturation)]",
  "shadow-[0_16px_48px_var(--glass-shadow)]",
].join(" ");

const glassBackdropClassName = [
  "backdrop-blur-[var(--glass-blur)]",
  "backdrop-saturate-[var(--glass-saturation)]",
].join(" ");

const [chipAnimation, headerAnimation] = [
  getAnimation("engineNodeModalChip"),
  getAnimation("engineNodeModalHeader"),
];
export function EngineNodeModal({
  nodeId,
  isOpen,
  onOpenChange,
  onNavigate,
}: EngineNodeModalProps) {
  const isMobile = useIsMobile();

  const node = nodeId ? NODE_BY_ID[nodeId] : null;
  const links = nodeId ? NODE_LINKS[nodeId] : null;

  const isIsolated = Boolean(
    links && links.incoming.length === 0 && links.outgoing.length === 0,
  );

  const content =
    node && links ? (
      <>
        {node.file && (
          <div className="absolute top-6 right-6 flex gap-2">
            <GithubButton
              buttonProps={{
                className: "font-primary text-xs",
                variant: "outline",
                type: "button",
                isIconOnly: true,
              }}
              href={getEngineNodeSourceUrl(node)}
              target="_blank"
              rel="noopener noreferrer"
            />
          </div>
        )}

        <p className="text-sm text-muted max-w-sm">{node.summary}</p>

        <EngineMiniMap nodeId={node.id} onNavigate={onNavigate} />

        {isIsolated && (
          <p className="text-sm text-muted max-w-xs">
            This module is not wired to other modules in the engine.
          </p>
        )}
      </>
    ) : null;

  if (isMobile) {
    return (
      <Sheet isOpen={isOpen} onOpenChange={onOpenChange} placement="bottom">
        <Sheet.Backdrop variant="blur">
          <Sheet.Content className="w-full">
            <Sheet.Dialog
              aria-label={node?.label ?? "Engine node details"}
              className={cn(
                "flex max-h-[85dvh] flex-col overflow-hidden rounded-3xl",
                "rounded-t-3xl",
                glassSurfaceClassName,
              )}
            >
              <Sheet.Handle />
              {node && (
                <Sheet.Header className="shrink-0">
                  <Sheet.Heading>
                    <MotionText
                      key={node.id}
                      className="text-3xl tracking-tight"
                      {...headerAnimation}
                    >
                      {node.label}
                    </MotionText>
                  </Sheet.Heading>
                </Sheet.Header>
              )}
              <Sheet.Body
                className={cn(
                  "flex min-h-0 flex-col ",
                  "overflow-y-auto  pb-6",
                  glassBackdropClassName,
                )}
              >
                {content}
              </Sheet.Body>
            </Sheet.Dialog>
          </Sheet.Content>
        </Sheet.Backdrop>
      </Sheet>
    );
  }

  return (
    <Modal>
      <Modal.Backdrop
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        variant="transparent"
        className={cn(fontPrimary.variable, glassBackdropClassName)}
      >
        <Modal.Container scroll="inside">
          <Modal.Dialog
            aria-label={node?.label ?? "Engine node details"}
            className={cn(
              "sm:max-w-2xl",
              "items-center font-primary rounded-3xl",
              glassSurfaceClassName,
            )}
          >
            {node && (
              <Modal.Header>
                <Modal.Heading
                  className={cn(
                    node.file && "flex flex-col gap-1 items-center",
                  )}
                >
                  <MotionText
                    key={node.id}
                    className="laptop:text-3xl tracking-tighter desktop:text-3xl"
                    {...headerAnimation}
                  >
                    {node.label}
                  </MotionText>
                  {node.file && (
                    <Chip
                      variant="soft"
                      color="accent"
                      className="font-primary text-xs shrink-0 max-h-fit "
                    >
                      <MotionText key={node.file} {...chipAnimation}>
                        {node.file}
                      </MotionText>
                    </Chip>
                  )}
                </Modal.Heading>
              </Modal.Header>
            )}

            <Modal.Body className="flex flex-col gap-5 items-center text-center overflow-visible">
              {content}
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
