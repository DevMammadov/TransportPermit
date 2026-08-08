import { TIcon } from "@/data/types/Common";

export type TBadgeColors =
  | "primary"
  | "success"
  | "warning"
  | "secondary"
  | "danger"
  | "purple"
  | "white";

export type TBadge = {
  className?: string;
  icon?: TIcon;
  label?: string;
  color?: TBadgeColors;
  tooltip?: string;
};
