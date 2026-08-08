import { TIcon } from "@/data/types/Common";
import { ChangeEvent, FocusEvent, InputHTMLAttributes } from "react";
import { FieldValues, UseControllerProps } from "react-hook-form";

type TInputClassNames = {
  label?: string;
  icon?: string;
  input?: string;
  container?: string;
  errorText?: string;
};

export type InputElement = HTMLInputElement | HTMLTextAreaElement;

export type TInput = InputHTMLAttributes<InputElement> & {
  label?: string;
  name?: string;
  className?: string;
  icon?: TIcon;
  iconPosition?: "start" | "end";
  error?: boolean;
  errorText?: string;
  classNames?: TInputClassNames;
  multiline?: boolean;
  required?: boolean;
  onChange?: (e: ChangeEvent<InputElement>) => void;
  onFocus?: (e: FocusEvent<InputElement>) => void;
  onBlur?: (e: FocusEvent<InputElement>) => void;
  leading?: string;
  uppercase?: boolean;
  labelPosition?: "inside" | "outside";
  placeholder?: string;
};

// export type TFormInput = TInput & Omit<ControllerProps<any>, "render">;
export type TFormInput<TFieldValues extends FieldValues = FieldValues> = Omit<
  TInput,
  "name" | "defaultValue"
> &
  Omit<UseControllerProps<TFieldValues>, "rules"> & {
    rules?: any;
  };
