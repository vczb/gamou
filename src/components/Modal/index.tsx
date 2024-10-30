import { ReactNode, useRef } from "react";
import Button from "../Button";

export type ModalProps = {
  isOpen?: boolean;
  showCloseButton?: boolean;
  onClose?: () => void;
  children: ReactNode;
};

const Modal = ({ isOpen, onClose, showCloseButton, children }: ModalProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleOutsideClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      modalRef.current.close();
      onClose?.();
    }
  };

  const handleClose = () => {
    if (modalRef.current) {
      modalRef.current?.close();
    }
    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 min-h-screen h-full overflow-y-auto flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleOutsideClick}
    >
      <dialog ref={modalRef} className="relative h-full bg-transparent" open>
        {showCloseButton && (
          <Button
            onClick={handleClose}
            variant="secondary"
            title="Fechar"
            className="absolute top-9 right-5 flex items-center justify-center"
          >
            X
          </Button>
        )}
        <div className="py-6 px-2 pb-24">{children}</div>
      </dialog>
    </div>
  );
};

export default Modal;
