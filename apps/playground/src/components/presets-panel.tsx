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
      <Button size="sm" variant="outline" className="h-9 rounded-full">
        <LayoutTemplate size={16} className="hidden min-[360px]:block" />
        Presets
      </Button>
      <Modal.Backdrop>
        <Modal.Container
          placement="center"
          scroll="inside"
          className="p-3 md:max-h-11/12"
        >
          <Modal.Dialog className="max-w-5xl bg-(--glass-surface)">
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
