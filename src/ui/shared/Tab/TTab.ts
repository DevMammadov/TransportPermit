import { TButton } from "@/ui/shared/Button/TButton";

export type TTab = TButton & {
  active?: boolean;
  count?: number;
};
