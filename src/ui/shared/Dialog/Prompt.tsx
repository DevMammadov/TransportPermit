import Input from "@/ui/shared/Input";
import Modal from "@/ui/shared/Modal";
import { TDialogPrompt } from "./TDialog";
import Button from "@/ui/shared/Button";
import { useState } from "react";

const Prompt = ({
  open,
  onClose,
  title,
  label,
  onOk,
  onCancel,
  cancelText,
  okText,
  placeholder,
  multiline = true,
  onChange,
  value,
  required,
  requiredText = "Mütləq doldurulmalıdır",
}: TDialogPrompt) => {
  const [error, setError] = useState(false);

  const handleOk = () => {
    if (required && !value) {
      setError(true);
    } else {
      onOk();
      setError(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        onClose();
        setError(false);
      }}
      title={title}
      classNames={{ panel: "p-8 sm:min-w-[560px]" }}
    >
      <div className="flex flex-col gap-6 pt-4">
        <label>
          {label} {required ? <span className="text-red-500">*</span> : ""}
        </label>

        <Input
          placeholder={placeholder || "Mətni daxil edin"}
          onChange={(e) => onChange?.(e.target.value)}
          value={value}
          multiline={multiline}
          error={error}
          errorText={error ? requiredText : undefined}
          name="prompt"
        />

        <div className="flex gap-3">
          <Button
            onClick={() => {
              onCancel?.();
              setError(false);
            }}
            variant="OUTLINED"
            className="w-full"
          >
            {cancelText || "İmtina"}
          </Button>
          <Button
            className="w-full"
            onClick={handleOk}
            disabled={required && !value}
          >
            {okText || "Bəli"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default Prompt;
