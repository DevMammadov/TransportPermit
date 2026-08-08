import { TInput } from "@/ui/shared/Input/TInput";
import { DatePickerProps } from "react-datepicker";
import { FieldValues, UseControllerProps } from "react-hook-form";

export type TDatePicker = Omit<
  DatePickerProps,
  "onChange" | "value" | "selectsMultiple" | "selectsRange" | "selectsRange"
> & {
  value?: string | Date | null;
  onChange?(date: any): void;
  label?: string;
  error?: boolean;
  errorText?: string;
  inputClassnames?: TInput["classNames"];
  required?: boolean;
  labelPosition?: "inside" | "outside";
  placeholder?: string;
};

export type DatePickerInputProps = TInput & {
  labelPosition?: "inside" | "outside";
};

// export type TFormDatePicker = TDatePicker &
//   Omit<ControllerProps<any>, "render">;
export type TFormDatePicker<TFieldValues extends FieldValues = FieldValues> =
  Omit<TDatePicker, "name" | "defaultValue"> &
    Omit<UseControllerProps<TFieldValues>, "rules"> & {
      rules?: any;
    };
