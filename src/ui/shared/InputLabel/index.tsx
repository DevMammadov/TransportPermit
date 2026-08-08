import { TInputLabel } from "@/ui/shared/InputLabel/TInputLabel";
import { twMerge } from "tailwind-merge";

const InputLabel = ({
  className,
  active,
  children,
  error,
  required,
}: TInputLabel) => {
  return (
    children && (
      <label
        className={twMerge(
          "block truncate text-gray-500 transition-all duration-200 cursor-text",
          !className?.includes("relative") && "absolute top-1/2 -translate-y-1/2 w-full",
          active && !className?.includes("relative") && "text-sm top-0 -translate-y-1",
          error && "text-danger-500",
          className
        )}
      >
        {children} {required ? <span className="text-red-500">*</span> : ""}
      </label>
    )
  );
};

export default InputLabel;
