import { TButton } from "@/ui/shared/Button/TButton";

export type TNoResult = {
  title?: string;
  loading?: boolean;
  to?: TButton["to"];
  buttonTitle?: string;
  showButton?: boolean;
};
