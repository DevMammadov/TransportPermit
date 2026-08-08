import InfoCircleIcon from "@svg/info-circle.svg?react";
import { twMerge } from "tailwind-merge";
import { TBadge, TBadgeColors } from "./TBadge";

export const colorType: Record<TBadgeColors, string> = {
  primary:
    "text-blue-700 [&>svg]:stroke-blue-700 border-blue-300 bg-blue-50 hover:bg-blue-100/50 transition-colors",
  danger:
    "text-error-600 [&>svg]:stroke-error-600 border-error-300 bg-error-100/60 hover:bg-error-100/80 transition-colors",
  secondary:
    "text-gray-600 [&>svg]:stroke-gray-600 border-gray-300 bg-gray-100",
  success:
    "text-success-700 [&>svg]:stroke-success-700 border-success-300 bg-success-50",
  warning:
    "text-warning-600 [&>svg]:stroke-warning-600 border-warning-300 bg-warning-50 hover:bg-warning-100/50 transition-colors",
  white: "bg-white hover:bg-gray-50 ring ring-gray-200 transition-colors",
  purple:
    "text-purple-600 [&>svg]:stroke-purple-600 border-purple-300 bg-purple-200/30",
};

const Badge = ({
  className,
  icon: Icon,
  label,
  color = "primary",
  tooltip,
}: TBadge) => {
  return (
    <div
      className={twMerge(
        `flex items-center justify-center py-1.5 px-4 rounded-[8px] text-xs font-bold ${colorType[color]}`,
        Icon && label && "gap-1.5",
        className,
      )}
      data-tooltip-id="tooltip"
      data-tooltip-content={tooltip}
    >
      {Icon && <Icon className="h-5 w-5" />}
      <span className="mt-0.5">{label}</span>
      {tooltip && <InfoCircleIcon className="h-4 w-4 ml-1" />}
    </div>
  );
};

export default Badge;
