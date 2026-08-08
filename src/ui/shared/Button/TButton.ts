import { ButtonHTMLAttributes } from "react";
import { TIcon } from "@/data/types/Common";
import { links } from "@/app/routes/links";
import { To } from "react-router-dom";
import { EButtonSizes, EButtonVariants } from "./helpers";

type TButtonClassNames = {
  root?: string;
  icon?: string;
  content?: string;
  disabled?:string;
};

export type TButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof EButtonVariants;
  size?: keyof typeof EButtonSizes;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  icon?: TIcon;
  classNames?: TButtonClassNames;
  iconPosition?: "start" | "end";
  to?: ((to: typeof links) => string) | To | number;
  tooltip?: string;
};
