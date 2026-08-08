import { links } from "@/app/routes/links";
import Spinner from "@/ui/shared/Spinner";
import { forwardRef } from "react";
import { To, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { EButtonSizes, EButtonVariants } from "./helpers";
import { TButton } from "./TButton";

const variants = {
  [EButtonVariants.FILLED]:
    "bg-primary text-white hover:opacity-75 transition-opacity duration-200",
  [EButtonVariants.OUTLINED]:
    "bg-white text-gray-700 border-gray-300 border-1 hover:bg-gray-100 duration-200",
  [EButtonVariants.LINK]: "p-2 hover:bg-gray-100 duration-200",
  [EButtonVariants.TRANSPARENT]:
    "border border-primary text-primary bg-blue-50 hover:opacity-65 transition-opacity duration-200 font-semibold",
};

const iconColor = {
  [EButtonVariants.FILLED]: "stroke-white",
  [EButtonVariants.OUTLINED]: "stroke-gray-700",
  [EButtonVariants.LINK]: "stroke-gray-700",
  [EButtonVariants.TRANSPARENT]: "stroke-primary",
};

const sizes = {
  [EButtonSizes.BIG]: "min-w-65",
  [EButtonSizes.NORMAL]: "",
};

const Button = forwardRef<HTMLButtonElement, TButton>(
  (
    {
      variant = EButtonVariants.FILLED,
      className,
      disabled,
      children,
      icon: Icon,
      classNames,
      iconPosition = "start",
      loading,
      to,
      size = "NORMAL",
      tooltip,
      ...props
    },
    ref,
  ) => {
    let navigate: ReturnType<typeof useNavigate> | null = null;
    try {
      navigate = useNavigate();
    } catch (error) {
      navigate = null;
    }

    const getIcon = () => {
      if (loading) {
        return (
          <Spinner
            className={twMerge(
              iconPosition === "end" && "order-2",
              variant === EButtonVariants.FILLED &&
                !disabled &&
                "[&>div]:border-white",
            )}
          />
        );
      }

      return (
        Icon && (
          <Icon
            className={twMerge(
              "h-5 w-5 order-1 shrink-0",
              iconColor[variant],
              iconPosition === "end" && "order-2",
              classNames?.icon,
            )}
          />
        )
      );
    };

    return (
      <button
        type="button"
        {...props}
        disabled={disabled}
        className={twMerge(
          "flex justify-center items-center rounded py-3 px-5 select-none gap-2 font-semibold h-[48px] cursor-pointer",
          variants[variant],
          sizes[size],
          disabled &&
            "text-gray-400 [&>svg]:stroke-gray-400 bg-inherit hover:bg-inherit hover:opacity-100 border-slate-300 cursor-not-allowed",
          disabled && classNames?.disabled,
          className,
          classNames?.root,
        )}
        ref={ref}
        onClick={(e) => {
          if (disabled) return;

          if (to) {
            if (navigate) {
              navigate(typeof to === "function" ? to(links) : (to as To));
            } else {
              console.error(
                "Navigation failed: Button component is used with a 'to' prop outside of a Router context.",
              );
            }
          }

          props.onClick?.(e);
        }}
        data-tooltip-id="tooltip"
        data-tooltip-content={tooltip}
      >
        {getIcon()}
        {children && (
          <span className={twMerge("order-1 truncate", classNames?.content)}>
            {children}
          </span>
        )}
      </button>
    );
  },
);

export default Button;
