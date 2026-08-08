import Button from "@/ui/shared/Button";
import Input from "@/ui/shared/Input";
import Modal from "@/ui/shared/Modal";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { EDialogVariants, variantStyles } from "./helpers";
import { TDialogAlert } from "./TDialog";

const Alert = ({
  onCancel,
  onClose,
  onOk,
  text,
  title,
  type = "INFO",
  open,
  okText,
  cancelText,
  loading,
  showInput = false,
  inputLabel = "Təsvir",
  inputPlaceholder = "Daxil edin...",
  required = true,
}: TDialogAlert) => {
  const currentVariant =
    variantStyles[type as EDialogVariants] ||
    variantStyles[EDialogVariants.INFO];

  const Icon = currentVariant.icon;
  const BgWaves = currentVariant.bgWaves;

  const [inputValue, setInputValue] = useState("");
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!open) {
      setInputValue("");
      setHasError(false);
    }
  }, [open]);

  const handleSubmit = () => {
    if (showInput && required && !inputValue.trim()) {
      setHasError(true);
      return;
    }
    setHasError(false);
    onOk?.(inputValue);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      classNames={{
        panel: "px-8 pb-8 pt-6 sm:min-w-120 max-w-125 rounded-2xl",
        closeButton:
          "bg-white border border-gray-200 rounded-[8px] p-2.5 hover:bg-gray-50 -mb-8 z-10",
        wrapper: "bg-[#102A56]/80 backdrop-blur-sm z-100",
      }}
    >
      <div className="flex flex-col items-center text-center">
        <div className="relative w-full h-65 flex items-center justify-center">
          {BgWaves && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-1">
              <BgWaves className="w-auto h-full" />
            </div>
          )}

          {Icon && (
            <div
              className={twMerge(
                "p-6 rounded-full flex items-center justify-center shadow-inner z-2 border-16 box-content mt-8",
                currentVariant.iconContainer,
              )}
            >
              <Icon className="w-12 h-12" />
            </div>
          )}
        </div>

        <h3 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500 px-4 mb-12">{text}</p>

        {showInput && (
          <div className="w-full text-left mb-12">
            <Input
              className=""
              classNames={{
                errorText: "text-error-500",
                container: twMerge(hasError && "border-error-500"),
              }}
              label={inputLabel}
              labelPosition="outside"
              required={required}
              multiline={true}
              placeholder={inputPlaceholder}
              value={inputValue}
              error={hasError}
              errorText={hasError ? "Mütləq doldurulmalıdır" : undefined}
              onChange={(e) => {
                setInputValue(e.target.value);
                if (e.target.value.trim()) {
                  setHasError(false);
                }
              }}
            />
          </div>
        )}

        <div className="flex gap-3 w-full max-sm:flex-col">
          <Button
            onClick={onCancel}
            className="w-full bg-gray-100 text-neutral-900 text-lg"
          >
            {cancelText || "Bağla"}
          </Button>
          <Button
            className={twMerge(
              "w-full text-white text-lg",
              currentVariant.submitBtn,
            )}
            onClick={() => !loading && handleSubmit()}
            loading={loading}
          >
            {okText || "Təsdiq et"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default Alert;
