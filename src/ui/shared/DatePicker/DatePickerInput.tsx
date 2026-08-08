import { mergeClassNames } from "@/app/helpers/string";
import { DatePickerInputProps } from "@/ui/shared/DatePicker/TDatePicker";
import { TInput } from "@/ui/shared/Input/TInput";
import Calendar from "@svg/calendar.svg?react";
import { forwardRef } from "react";
import Input from "../Input";

const DatePickerInput = forwardRef<HTMLInputElement, DatePickerInputProps>(
  (
    {
      value: displayValue,
      onClick,
      onChange: _unused,
      classNames,
      labelPosition,
      ...rest
    },
    ref,
  ) => (
    <Input
      ref={ref}
      onClick={onClick}
      value={displayValue}
      readOnly
      icon={Calendar}
      labelPosition={labelPosition}
      classNames={
        mergeClassNames(
          {
            container: "h-full w-full",
            icon: "cursor-pointer",
          },
          classNames,
        ) as TInput["classNames"]
      }
      {...rest}
    />
  ),
);

DatePickerInput.displayName = "DatePickerInput";

export default DatePickerInput;
