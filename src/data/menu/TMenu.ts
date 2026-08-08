import { TIcon } from "@/data/types/Common";

export type TMenu = TMenuItem & {
  children?: TMenuItem[];
};

export type TMenuItem = {
  title?: string;
  label?: string;
  icon?: TIcon;
  link?: string;
  isIndex?: boolean;
  exact?: boolean;
};
