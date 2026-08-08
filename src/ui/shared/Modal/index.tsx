import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { TModal } from "./TModal";
import CloseIcon from "@svg/close.svg?react";
import { twMerge } from "tailwind-merge";
import Button from "../Button";

const Modal = ({
  children,
  onClose,
  open,
  classNames,
  className,
  title,
}: TModal) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className={twMerge("relative z-60", className)}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div
          className={twMerge(
            "fixed inset-0 overflow-y-auto",
            classNames?.container,
          )}
        >
          <div
            className={twMerge(
              "flex-center min-h-full p-4 text-center",
              classNames?.wrapper,
            )}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={twMerge(
                  "w-full max-w-md transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all p-4",
                  classNames?.panel,
                )}
              >
                <div
                  className={twMerge(
                    "flex justify-between",
                    classNames?.header,
                  )}
                >
                  <span
                    className={twMerge(
                      "select-none font-semibold text-5xl",
                      classNames?.title,
                    )}
                  >
                    {title}
                  </span>
                  <Button
                    icon={CloseIcon}
                    onClick={onClose}
                    className={twMerge(
                      "rounded-full bg-gray-100 p-2 h-8 w-8",
                      classNames?.closeButton,
                    )}
                    classNames={{ icon: "stroke-gray-700" }}
                  />
                </div>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
