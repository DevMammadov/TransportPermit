import { InputHTMLAttributes } from "react";
import { FieldValues, UseControllerProps } from "react-hook-form";

type TCheckboxClassNames = {
  container?: string;
  input?: string;
  label?: string;
  errorText?: string;
};

export type TCheckbox = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value" | "checked"
> & {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  error?: boolean;
  errorText?: string;
  classNames?: TCheckboxClassNames;
  required?: boolean;
};

// export type TFormCheckbox = TCheckbox & Omit<ControllerProps<any>, "render">;
export type TFormCheckbox<TFieldValues extends FieldValues = FieldValues> =
  Omit<TCheckbox, "name" | "defaultValue"> &
    Omit<UseControllerProps<TFieldValues>, "defaultValue"> & {
      defaultValue?: any;
    };
