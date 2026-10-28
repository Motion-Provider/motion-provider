import { Modal } from "@heroui/react";

export function ShowcaseInfo({
  children,
  rendered,
}: {
  children: React.ReactNode;
  rendered: React.ReactNode;
}) {
  return (
    <Modal>
      {children}
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog>
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon />
              <Modal.Heading />
            </Modal.Header>
            <Modal.Body>{rendered}</Modal.Body>
            <Modal.Footer />
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
