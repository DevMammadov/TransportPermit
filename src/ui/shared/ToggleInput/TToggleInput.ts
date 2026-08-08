import { TInput } from "@/ui/shared/Input/TInput";
import { TSelect } from "@/ui/shared/Select/TSelect";
import { ControllerProps } from "react-hook-form";

type TToggleInputClassNames = {
  errorText?: string;
  input?: string;
  select?: string;
  container?: string;
};

export type TToggleInput = {
  selectProps?: TSelect<{ value: number; label: string }>;
  inputProps?: TInput;
  confirmLabel?: string;
  denyLabel?: string;
  label?: string;
  error?: boolean;
  errorText?: string;
  classNames?: TToggleInputClassNames;
  disabled?: boolean;
  required?: boolean;
  active?: boolean;
};

export type TFormToggleInput = TToggleInput &
  Omit<ControllerProps<any>, "render">;
