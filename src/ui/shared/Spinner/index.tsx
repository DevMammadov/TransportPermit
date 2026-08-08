import { TSpinner, TSpinnerSize } from "./TSpinner";
import { twMerge } from "tailwind-merge";

const spinnerSizes: Record<TSpinnerSize, string> = {
  sm: "h-6 w-6",
  md: "h-12 w-12",
  lg: "h-18 w-18",
};

const Spinner = ({ className, size = "sm" }: TSpinner) => {
  return (
    <div className={twMerge("relative", className)}>
      <div
        className={`border-primary opacity-5 border-2 rounded-full ${spinnerSizes[size]}`}
      ></div>
      <div
        className={twMerge(
          `border-primary opacity-70 border-t-2 animate-spin rounded-full absolute left-0 top-0`,
          spinnerSizes[size]
        )}
      ></div>
    </div>
  );
};

export default Spinner;
