import { ReactNode } from "react";

type TModalClassNames = {
  container?: string;
  wrapper?: string;
  panel?: string;
  header?: string;
  title?: string;
  closeButton?: string;
};

export type TModal = {
  children?: ReactNode;
  open: boolean;
  onClose(): void;
  title?: string;
  className?: string;
  classNames?: TModalClassNames;
};
