import Modal from "@/ui/shared/Modal";
import { TDialogCallback } from "./TDialog";
import Button from "@/ui/shared/Button";
import CheckIcon from "@svg/check.svg?react";
import FileSuccessIcon from "@svg/file-success-big.svg?react";

const Callback = ({ onClose, open, text, okText }: TDialogCallback) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      classNames={{ panel: "sm:min-w-[560px]" }}
    >
      <div className="flex flex-col items-center">
        <span className="mt-3 text-5xl font-bold">{text}</span>

        <div className="relative my-8">
          <FileSuccessIcon />
          <div className="absolute bg-success-500 h-[40px] w-[40px] rounded-full flex-center right-0 bottom-0">
            <CheckIcon className="absolute stroke-white" />
          </div>
        </div>

        <Button onClick={onClose} variant="OUTLINED" size="BIG">
          {okText || "Bağla"}
        </Button>
      </div>
    </Modal>
  );
};

export default Callback;
