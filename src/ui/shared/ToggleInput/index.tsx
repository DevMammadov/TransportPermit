import Input from "@/ui/shared/Input";
import Select from "@/ui/shared/Select";
import { TToggleInput } from "@/ui/shared/ToggleInput/TToggleInput";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const ToggleInput = ({
  inputProps,
  selectProps,
  confirmLabel = "Show",
  denyLabel = "Hide",
  label,
  error,
  required,
  errorText,
  classNames,
  active,
}: TToggleInput) => {
  const [selectValue, setSelectValue] = useState<unknown>(
    active ? 1 : undefined
  );

  return (
    <div
      className={twMerge(
        "flex flex-col w-full transition-all gap-3 sm:flex-row sm:w-1/2 rounded border border-gray-300",
        selectValue === 1 && "sm:w-full",
        error && "border-danger-500",
        classNames?.container
      )}
    >
      <Select
        errorText={errorText}
        label={label}
        {...selectProps}
        classNames={{
          input: "border-none",
        }}
        className={twMerge("rounded", classNames?.select)}
        data={[
          { value: 1, label: confirmLabel },
          { value: 2, label: denyLabel },
        ]}
        optionValue={(d) => d.value}
        optionLabel={(d) => d.label}
        value={selectValue}
        onChange={(val, item) => {
          selectProps?.onChange?.(val, item);
          setSelectValue(val);
        }}
        required={required}
      />
      {selectValue === 1 && (
        <span className="bg-gray-300 w-full h-px mt-1.5 select-none sm:h-[36px] sm:w-px"></span>
      )}
      {selectValue === 1 && (
        <Input
          classNames={{ container: "border-none" }}
          className={twMerge("rounded", classNames?.input)}
          {...inputProps}
        />
      )}
    </div>
  );
};

export default ToggleInput;
