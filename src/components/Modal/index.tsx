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
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleOutsideClick}
    >
      <dialog
        ref={modalRef}
        className="max-h-screen overflow-y-auto bg-transparent  py-6 px-2"
        open
      >
        {showCloseButton && (
          <Button
            onClick={handleClose}
            variant="secondary"
            title="Fechar"
            className="absolute top-9 right-5 text-gray-500 hover:text-black flex items-center justify-center"
          >
            X
          </Button>
        )}
        {children}
      </dialog>
    </div>
  );
};

export default Modal;
