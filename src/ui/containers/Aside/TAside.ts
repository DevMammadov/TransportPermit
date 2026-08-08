import { TIcon } from "@/data/types/Common";
import { Dispatch, ReactNode, SetStateAction } from "react";

export type TMenuContext = {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
  toggleMenu(): void;
};

export type TMenuProvider = {
  children: ReactNode;
};

export type TMenuButton = {
  children?: ReactNode;
  onClick?(): void;
  to?: string;
  Icon?: TIcon;
  exact?: boolean;
  collapsed?: boolean;
};
