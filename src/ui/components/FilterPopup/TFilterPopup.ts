import { FormEvent, ReactNode } from "react";

export type TFilterPopup = {
  children: ReactNode;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onReset?: () => void;
  title?: string;
  renderTrigger?: (openModal: () => void) => ReactNode;
  resetText?: string;
  submitText?: string;
  subTitle?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onOpen?: () => void;
};
