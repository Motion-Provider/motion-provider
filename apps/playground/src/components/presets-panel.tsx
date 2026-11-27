import { Button, Modal } from "@heroui/react";
import { LayoutTemplate } from "lucide-react";
import { MotionContainer } from "motion-provider";
import dynamic from "next/dynamic";
import { usePlayground } from "../context/playground";
import { useDocumentLoader } from "../hooks/use-document-loader";
import { PresetsSkeleton } from "./loading-skeletons";

const Presets = dynamic(
  () => import("@/sections/presets").then((module) => module.Presets),
  { loading: PresetsSkeleton },
);

export function PresetsModal() {
  const {
    state: { project },
  } = usePlayground();
  const { loadTemplate } = useDocumentLoader();

  return (
    <Modal>
      <Button size="sm" variant="outline">
        <LayoutTemplate size={16} /> Presets
      </Button>
      <Modal.Backdrop
        className={
          "backdrop-blur-(--glass-blur) backdrop-saturate-(--glass-saturation)"
        }
      >
        <Modal.Container placement="center" scroll="inside" className="p-3">
          <Modal.Dialog className="w-full max-w-5xl border border-glass-border bg-glass-surface backdrop-blur-[var(--glass-blur)]backdrop-saturate-[var(--glass-saturation)]shadow-[0_16px_48px_var(--glass-shadow)]">
            {({ close }) => (
              <>
                <Modal.CloseTrigger />
                <Modal.Header>
                  <Modal.Heading className="">
                    <MotionContainer
                      animation={{ mode: ["fadeUp", "filterBlurIn"] }}
                      className="text-4xl tracking-tighter"
                    >
                      Presets
                    </MotionContainer>
                  </Modal.Heading>
                </Modal.Header>
                <Modal.Body>
                  <Presets
                    current={project.template}
                    onPick={async (template) => {
                      if (await loadTemplate(template)) close();
                    }}
                  />
                </Modal.Body>
              </>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
