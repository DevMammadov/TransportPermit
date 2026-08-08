import InfoFillIcon from "@svg/info-fill.svg?react";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { TAlert, TAlertDifferences, TAlertType } from "./TAlert";

const alertType: Record<TAlertType, TAlertDifferences> = {
  ["Warning"]: {
    container: "border-warning-50 bg-warning-50",
    text: "text-warning-600",
    iconColor: "fill-warning-500",
    icon: InfoFillIcon,
  },
  ["Confirm"]: {
    container: "border-blue-50 bg-blue-50",
    text: "text-blue-700",
    iconColor: "fill-blue-500",
    icon: InfoFillIcon,
  },
};

const Alert = forwardRef<HTMLDivElement, TAlert>(
  ({ icon, text, title, type = "Warning", className, classNames }, ref) => {
    const Icon = icon || alertType[type].icon;

    return (
      <div
        ref={ref}
        className={twMerge(
          "rounded-md border py-2.5 px-3 flex items-start",
          alertType[type].container,
          className,
        )}
      >
        <Icon
          className={twMerge(
            "h-5 w-5",
            alertType[type].iconColor,
            classNames?.icon,
          )}
        />

        <div className={twMerge("pl-3.5", classNames?.wrapper)}>
          {title && (
            <h2
              className={twMerge(
                "font-medium text-sm",
                alertType[type].text,
                classNames?.title,
              )}
            >
              {title}
            </h2>
          )}
          <span
            className={twMerge(
              "text-sm",
              alertType[type].text,
              classNames?.text,
            )}
          >
            {text}
          </span>
        </div>
      </div>
    );
  },
);

export default Alert;
