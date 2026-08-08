import { ReactNode } from "react";

export type TListItem = {
  label?: string;
  value?: ReactNode;
  vertical?: boolean;
  className?: string;
  classNames?: TListItemClassNames;
  emptyValue?: string;
};

export type TListItemClassNames = {
  value?: string;
  label?: string;
};
