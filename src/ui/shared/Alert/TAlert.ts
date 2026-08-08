import { TIcon } from "@/data/types/Common";
import { ReactNode } from "react";

export type TAlertType = "Warning" | "Confirm";

type TAlertClassNames = {
  wrapper?: string;
  title?: string;
  text?: string;
  icon?: string;
};

export type TAlert = {
  type?: TAlertType;
  title?: string | ReactNode;
  text?: ReactNode;
  icon?: TIcon;
  className?: string;
  classNames?: TAlertClassNames;
};

export type TAlertDifferences = {
  container: string;
  text: string;
  icon: TIcon;
  iconColor: string;
};
