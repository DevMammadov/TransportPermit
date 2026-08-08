import Tab from "@/ui/shared/Tab";
import { twMerge } from "tailwind-merge";

type TProgressStepperProps = {
  steps: { label: string }[];
  activeStep: number;
  onStepClick: (index: number) => void;
};

const ProgressStepper = ({
  steps,
  activeStep,
  onStepClick,
}: TProgressStepperProps) => {
  return (
    <div className="wrapper pb-0! flex items-center w-full gap-5 bg-white">
      {steps.map((step, index) => {
        const isCompleted = index < activeStep;
        const isActive = index === activeStep;

        return (
          <div
            key={index}
            className="flex-1 flex flex-col gap-2 sm:gap-3 min-w-0"
          >
            <div
              className={twMerge(
                "h-1.5 sm:h-2 w-full rounded transition-all duration-200",
                isCompleted
                  ? "bg-blue-200"
                  : isActive
                    ? "bg-blue-600"
                    : "bg-gray-200",
              )}
            />

            <Tab
              active={isActive}
              disabled={!isCompleted && !isActive}
              onClick={() => onStepClick(index)}
              className="w-full bg-transparent p-0 justify-start items-start border-none hover:text-inherit cursor-pointer select-none text-left flex flex-col h-auto normal-case whitespace-normal"
              classNames={{
                content:
                  "flex flex-col w-full min-w-0 whitespace-normal break-words",
              }}
            >
              <p
                className={twMerge(
                  "text-xs font-normal transition-colors duration-200 wrap-break-words whitespace-normal w-full",
                  isCompleted
                    ? "text-blue-500"
                    : isActive
                      ? "text-gray-500"
                      : "text-gray-400",
                )}
              >
                Addım {index + 1}
              </p>
              <p
                className={twMerge(
                  "text-sm sm:text-base font-medium transition-colors duration-200 wrap-break-words whitespace-normal w-full",
                  isActive || isCompleted ? "text-gray-900" : "text-gray-400",
                )}
              >
                {step.label}
              </p>
            </Tab>
          </div>
        );
      })}
    </div>
  );
};

export default ProgressStepper;
