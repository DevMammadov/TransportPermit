import { EStatus } from "@/data/enum/status";
import Badge from "@/ui/shared/Badge";
import { TStatusCell, TTableBadgeType } from "@/ui/shared/DataTable/TDataTable";
import XCircleIcon from "@svg/x-circle.svg?react";
import { twMerge } from "tailwind-merge";

const getDefaultBadgeColor = (id: EStatus): TTableBadgeType => {
  switch (id) {
    case EStatus.Draft:
      return { color: "secondary", label: "Qaralama" };
    case EStatus.Pending:
      return { color: "purple", label: "Gözləmədə" };
    case EStatus.Confirmed:
      return { color: "success", label: "Təsdiqlənmiş" };
    case EStatus.Rejected:
      return { color: "warning", label: "Geri qaytarılmış" };
    default:
      return { color: "danger", icon: XCircleIcon, label: "Silinmiş" };
  }
};

export const StatusCell = ({ status, tooltip, overrides }: TStatusCell) => {
  console.log({ tooltip, overrides, status });

  const defaultBadge = getDefaultBadgeColor(status.id);
  const overrideBadge = overrides?.[status.id as EStatus];

  const color = status.color || overrideBadge?.color || defaultBadge.color;
  const label = status.label || overrideBadge?.label || defaultBadge.label;
  const icon = status.icon || overrideBadge?.icon || defaultBadge.icon;

  const isRejected = status.id === EStatus.Rejected;

  return (
    <Badge
      icon={icon}
      color={color}
      label={label}
      tooltip={tooltip}
      className={twMerge(isRejected && tooltip && "cursor-pointer")}
    />
  );
};
