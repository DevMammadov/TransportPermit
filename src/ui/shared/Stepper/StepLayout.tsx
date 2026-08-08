import { TStepLayoutProps } from "@/ui/shared/Stepper/TStepper";
import { twMerge } from "tailwind-merge";

export const StepLayout = ({
  children,
  className,
  actions,
  classNames,
}: TStepLayoutProps) => {
  return (
    <div className="flex flex-col h-full w-full overflow-hidden justify-between">
      <div
        className={twMerge(
          "wrapper py-0! flex-1 overflow-y-auto min-h-0",
          className,
        )}
      >
        <div className={classNames?.content}>{children}</div>
      </div>

      {actions && (
        <div className="flex gap-3 items-center wrapper py-4! sm:py-6! w-full bg-white mt-auto shadow border-t-gray-50 border-t">
          {actions}
        </div>
      )}
    </div>
  );
};
