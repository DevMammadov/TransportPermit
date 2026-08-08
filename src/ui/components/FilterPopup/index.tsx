import { useMedia } from "@/app/hooks/useMedia";
import { TFilterPopup } from "@/ui/components/FilterPopup/TFilterPopup";
import Button from "@/ui/shared/Button";
import Modal from "@/ui/shared/Modal";
import Settings from "@svg/settings-04.svg?react";
import { FormEvent, useState } from "react";

const FilterPopup = ({
  children,
  onSubmit,
  onReset,
  title = "Filtrlər",
  subTitle,
  renderTrigger,
  resetText = "Təmizlə",
  submitText = "Tətbiq et",
  open: controlledOpen,
  onOpenChange,
  onOpen,
}: TFilterPopup) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const { isMobile } = useMedia();

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const setOpen = (value: boolean) => {
    if (isControlled) {
      onOpenChange?.(value);
    } else {
      setInternalOpen(value);
    }
  };

  const openModal = () => {
    onOpen?.();
    setOpen(true);
  };

  const closeModal = () => setOpen(false);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit(e);

    if (!isControlled) {
      setInternalOpen(false);
    }
  };

  return (
    <>
      {renderTrigger ? (
        renderTrigger(openModal)
      ) : (
        <Button
          onClick={openModal}
          variant="OUTLINED"
          icon={Settings}
          classNames={{ icon: "stroke-gray-800" }}
        >
          {!isMobile && "Filterlər"}
        </Button>
      )}

      <Modal
        open={isOpen}
        onClose={closeModal}
        title={title}
        classNames={{
          title: "text-2xl font-semibold text-gray-900",
          panel: "w-110 p-6",
          closeButton:
            "rounded-md bg-white border border-gray-200 hover:bg-gray-50 cursor-pointer p-4 flex",
        }}
      >
        {subTitle && <p className="text-gray-500 font-normal">{subTitle}</p>}

        <form className="flex flex-col gap-6 pt-6" onSubmit={handleFormSubmit}>
          {children}

          <div className="flex w-full gap-3">
            <Button
              type="button"
              variant="LINK"
              className="w-1/2 px-5 py-3 justify-center text-lg bg-gray-100 text-neutral-900 font-medium leading-6"
              onClick={() => {
                onReset?.();
                closeModal();
              }}
            >
              {resetText}
            </Button>
            <Button
              type="submit"
              className="w-1/2 px-5 py-3 justify-center text-lg text-white font-medium leading-6"
            >
              {submitText}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default FilterPopup;
