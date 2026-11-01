import { Modal } from "@heroui/react";
import { XIcon } from "lucide-react";

interface Props {
  header: string;
  children: React.ReactNode;
  className?: string;
  render: () => React.ReactNode;
}

export function ShowcaseInfo({ children, header, className, render }: Props) {
  return (
    <Modal>
      {render()}
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="bg-glass-surface backdrop-blur-lg">
            <Modal.CloseTrigger>
              <XIcon />
            </Modal.CloseTrigger>
            <Modal.Header>
              <Modal.Heading className={className}>{header}</Modal.Heading>
            </Modal.Header>
            <Modal.Body className="relative">{children}</Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
