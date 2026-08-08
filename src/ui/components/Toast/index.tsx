import { twMerge } from "tailwind-merge";

import { variantMap } from "@/ui/components/Toast/helpers";
import { TToast } from "./TToast";

const Toast = ({ title, type = "confirm" }: TToast) => {
  const current = variantMap[type];
  const Icon = current?.icon;

  return (
    <div
      className={twMerge(
        "w-full rounded-md border-l-4 flex items-center gap-3",
        current.container,
      )}
    >
      <div
        className={twMerge(
          "ml-4 p-1.5 rounded-full flex items-center justify-center shadow-inner border-6 box-content stroke-white",
          current.iconContainer,
        )}
      >
        <Icon className="w-3 h-3" />
      </div>

      <span className="text-sm font-semibold text-gray-900 mt-1">{title}</span>
    </div>
  );
};

export default Toast;
