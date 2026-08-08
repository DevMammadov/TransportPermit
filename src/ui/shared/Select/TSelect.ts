import { PropsWithChildren, ReactNode, Ref } from "react";
import { FieldValues, UseControllerProps } from "react-hook-form";

type TSelectClassNames = {
  input?: string;
  label?: string;
  icon?: string;
  value?: string;
  options?: string;
  option?: string;
};

export type TSelect<T> = {
  data?: T[];
  optionValue?: (item: T) => T | string | number | boolean | undefined;
  optionLabel?: (item: T) => string | null | undefined;
  label?: string;
  value?: unknown;
  onChange?(value: unknown, item: T | T[]): void;
  option?: (
    label: string | null,
    value: unknown,
    selected: boolean,
  ) => ReactNode;
  disabled?: boolean;
  className?: string;
  classNames?: TSelectClassNames;
  name?: string;
  inputRef?: Ref<HTMLInputElement>;
  error?: boolean;
  errorText?: string;
  multiple?: boolean;
  required?: boolean;
  labelPosition?: "inside" | "outside";
  placeholder?: string;
};

export type TOption<T> = PropsWithChildren & {
  value: T;
  selected?: boolean;
  className?: string;
};

// export type TFormSelect<T> = TSelect<T> & Omit<ControllerProps<any>, "render">;
export type TFormSelect<
  TData,
  TFieldValues extends FieldValues = FieldValues,
> = Omit<TSelect<TData>, "name" | "defaultValue"> &
  Omit<UseControllerProps<TFieldValues>, "rules"> & {
    rules?: any;
  };
