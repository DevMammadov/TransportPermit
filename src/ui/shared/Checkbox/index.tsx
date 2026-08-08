import { twMerge } from "tailwind-merge";
import { TCheckbox } from "./TCheckbox";

const Checkbox = ({
  id,
  label,
  name,
  checked = false,
  onChange,
  disabled,
  error,
  errorText,
  required,
  className,
  classNames,
  ...props
}: TCheckbox) => {
  return (
    <div className={twMerge("flex flex-col gap-1 w-full", className)}>
      <div
        className={twMerge(
          "flex items-center gap-3 select-none",
          classNames?.container,
        )}
      >
        <input
          {...props}
          id={name}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => {
            if (disabled) return;
            onChange?.(e.target.checked);
          }}
          className={twMerge(
            "w-6 h-6 appearance-none rounded-sm border-2 border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none cursor-pointer transition-all relative flex items-center justify-center",
            "checked:after:content-['✓'] checked:after:text-white checked:after:text-md checked:after:font-bold",
            disabled &&
              "bg-gray-100 border-gray-300 cursor-not-allowed opacity-60 checked:bg-gray-400 checked:border-gray-400",
            error && "border-error-500 ring-error-500",
            classNames?.input,
          )}
        />

        {label && (
          <label
            htmlFor={name}
            className={twMerge(
              "text-sm font-medium text-gray-700 cursor-pointer",
              disabled && "cursor-not-allowed opacity-60",
              error && "text-error-600",
              classNames?.label,
            )}
          >
            {label} {required && <span className="text-error-500">*</span>}
          </label>
        )}
      </div>

      {errorText && (
        <span
          className={twMerge("text-xs text-error-500", classNames?.errorText)}
        >
          {errorText}
        </span>
      )}
    </div>
  );
};

export default Checkbox;
