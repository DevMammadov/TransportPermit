import { useMedia } from "@/app/hooks/useMedia";
import { colorType } from "@/ui/shared/Badge";
import Button from "@/ui/shared/Button";
import {
  TActionButton,
  TActionTypes,
  TTableActions,
} from "@/ui/shared/DataTable/TDataTable";
import { twMerge } from "tailwind-merge";

import EditIcon from "@svg/edit.svg?react";
import EyeIcon from "@svg/eye.svg?react";
import RefreshIcon from "@svg/refresh.svg?react";
import DeleteIcon from "@svg/trash.svg?react";
import CheckIcon from "@svg/check.svg?react";
import ReverceLeftIcon from "@svg/reverse-left.svg?react";

const actions: Record<TTableActions, TActionTypes> = {
  edit: { icon: EditIcon, color: "warning" },
  delete: { icon: DeleteIcon, color: "danger" },
  view: { icon: EyeIcon, color: "white" },
  confirm: { icon: CheckIcon, color: "primary" },
  return: { icon: ReverceLeftIcon, color: "warning" },
  refresh: { icon: RefreshIcon, color: "primary" },
};

export const ActionButton = ({ className, action, ...rest }: TActionButton) => {
  const { isMobile } = useMedia();
  const { color, icon } = actions[action];

  return (
    <Button
      {...rest}
      icon={icon}
      className={twMerge("p-2 h-auto", color && colorType[color], className)}
      iconPosition={isMobile ? "end" : "start"}
      variant={isMobile ? "OUTLINED" : "LINK"}
    />
  );
};
