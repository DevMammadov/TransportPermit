import { ReactNode } from "react";

export type TInputLabel = {
  active?: boolean;
  className?: string;
  children?: ReactNode;
  error?: boolean;
  required?: boolean;
};
