import Button from "@/ui/shared/Button";
import { TTab } from "./TTab";
import { twMerge } from "tailwind-merge";

const Tab = ({ children, count, active, ...props }: TTab) => {
  return (
    <Button
      {...props}
      className={twMerge(
        "bg-white rounded-none text-gray-500 gap-2 border-solid border-b-2 border-b-transparent transition-all duration-200 hover:text-primary text-xl font-semibold",
        active && "border-b-primary text-primary",
        props.className,
      )}
      classNames={{ content: "gap-2 flex", ...props.classNames }}
    >
      {children}
      {count && (
        <span
          className={twMerge(
            "rounded-full h-[22px] w-[22px] border border-gray-200 bg-gray-50 flex-center text-sm text-gray-600 font-md",
            active && "text-primary border-blue-200 bg-blue-50",
          )}
        >
          {count}
        </span>
      )}
    </Button>
  );
};

export default Tab;
