import { az } from "date-fns/locale/az";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { twMerge } from "tailwind-merge";
import "./datePicker.css";
import DatePickerInput from "./DatePickerInput";
import PickerHeader from "./PickerHeader";
import { TDatePicker } from "./TDatePicker";

registerLocale("az", az);

const DatePicker = ({
  value,
  onChange,
  label,
  error,
  errorText,
  inputClassnames,
  required,
  labelPosition = "inside",
  placeholder,
  ...props
}: TDatePicker) => {
  return (
    <ReactDatePicker
      selected={value ? new Date(value) : null}
      onChange={(date: any) => onChange?.(date)}
      placeholderText={placeholder}
      customInput={
        <DatePickerInput
          label={label}
          labelPosition={labelPosition}
          placeholder={placeholder}
          error={error}
          errorText={errorText}
          required={required}
        />
      }
      renderCustomHeader={PickerHeader}
      wrapperClassName={twMerge("w-full", props.wrapperClassName)}
      dateFormat="MMMM d, yyyy"
      locale="az"
      disabled={props.disabled}
      {...props}
    />
  );
};

export default DatePicker;
