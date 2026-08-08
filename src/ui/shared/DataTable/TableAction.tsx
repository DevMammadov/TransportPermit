import { useMedia } from "@/app/hooks/useMedia";
import Button from "@/ui/shared/Button";
import ClickAway from "@/ui/shared/ClickAway";
import Transition from "@/ui/shared/Transition";
import { Portal } from "@headlessui/react";
import Dots from "@svg/dots-horizontal.svg?react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { TTableAction } from "./TDataTable";

const panelWidth = 170;
const arrowHeight = 15;

const TableAction = ({
  className,
  children,
  classNames,
  containerRef,
  disabled,
}: TTableAction) => {
  const [open, setOpen] = useState(false);
  const { isMobile } = useMedia();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [position, setPosition] = useState<{
    panelLeft: number;
    panelTop: number;
  } | null>(null);

  useLayoutEffect(() => {
    if (!open || !buttonRef.current || !containerRef?.current) return;

    const updatePosition = () => {
      const buttonRect = buttonRef.current!.getBoundingClientRect();
      const containerRect = containerRef.current!.getBoundingClientRect();

      let panelLeft = buttonRect.left + buttonRect.width / 2 - panelWidth / 2;
      const panelTop = buttonRect.top + buttonRect.height + arrowHeight;
      const panelRight = panelLeft + panelWidth;

      if (panelRight > containerRect.right) {
        panelLeft = panelLeft - (panelRight - containerRect.right);
      }

      if (panelLeft < containerRect.left) {
        panelLeft = panelLeft + (containerRect.left - panelLeft);
      }

      setPosition({
        panelLeft,
        panelTop,
      });
    };

    updatePosition();

    window.addEventListener("resize", updatePosition);
    window.document.addEventListener("scroll", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.document.removeEventListener("scroll", updatePosition);
    };
  }, [open, containerRef]);

  useEffect(() => {
    if (!open) return;

    const closePanel = () => setOpen(false);

    window.addEventListener("resize", closePanel);
    window.document.addEventListener("scroll", closePanel);

    return () => {
      window.removeEventListener("resize", closePanel);
      window.document.removeEventListener("scroll", closePanel);
    };
  }, [open]);

  if (isMobile) {
    return (
      <div className="[&>button]:w-full [&>button]:gap-3 flex flex-col gap-3">
        {children}
      </div>
    );
  }

  return (
    <div className={twMerge("flex justify-center", className)}>
      <ClickAway onClickAway={() => setOpen(false)}>
        <Button
          ref={buttonRef}
          className={twMerge(
            "p-[10px] duration-200 rounded-lg",
            open && "bg-gray-100",
            classNames?.button,
          )}
          onClick={() => setOpen(!open)}
          variant="LINK"
          disabled={disabled}
          icon={Dots}
          aria-label="table actions"
        />

        <Portal>
          <Transition type="SlideUp" show={open}>
            <div
              className={twMerge("z-10 absolute", classNames?.panel)}
              style={{
                // Fallback to 0 if position hasn't been calculated yet on first tick
                left: position?.panelLeft ?? 0,
                top: position?.panelTop ?? 0,
                width: panelWidth,
              }}
            >
              <div
                className={twMerge(
                  "shadow-md ring-1 ring-black/5 flex flex-col gap-2 rounded-lg p-2 bg-white [&>button]:justify-start",
                  classNames?.content,
                )}
              >
                {children}
              </div>
            </div>
          </Transition>
        </Portal>
      </ClickAway>
    </div>
  );
};

export default TableAction;
