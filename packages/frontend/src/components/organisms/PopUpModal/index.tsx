import { Button, Modal } from "flowbite-react";

interface PopUpModalProps {
  onClickConfirm: () => void;
  onClickCancel: () => void;
  onClose: () => void;
  title?: string;
  confirmText?: string;
  cancelText?: string;
  show: boolean;
}

export const PopUpModal = ({
  onClickConfirm,
  onClickCancel,
  onClose,
  title,
  confirmText,
  cancelText,
  show,
  ...props
}: PopUpModalProps) => {
  return (
    <>
      <Modal {...props} show={show} size="md" popup={true} onClose={onClose}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            {/*<HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />*/}
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {title || "Are you sure?"}
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="gray" onClick={onClickCancel}>
                {cancelText || "Cancel"}
              </Button>
              <Button color="failure" onClick={onClickConfirm}>
                {confirmText || "Yes"}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
