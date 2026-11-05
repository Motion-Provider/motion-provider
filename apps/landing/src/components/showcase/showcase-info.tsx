import { Modal } from "@heroui/react";
import type { FC } from "react";

interface Props {
  header: string;
  children: React.ReactNode;
  className?: string;
  render: () => React.ReactNode;
}

export const ShowcaseInfo: FC<Props> = ({
  children,
  header,
  className,
  render,
}) => (
  <Modal>
    {render()}
    <Modal.Backdrop>
      <Modal.Container>
        <Modal.Dialog className="bg-glass-surface backdrop-blur-lg">
          <Modal.Header>
            <Modal.Heading className={className}>{header}</Modal.Heading>
          </Modal.Header>
          <Modal.Body className="relative overflow-visible">
            {children}
          </Modal.Body>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  </Modal>
);
