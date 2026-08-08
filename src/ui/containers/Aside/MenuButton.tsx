import { useMedia } from "@/app/hooks/useMedia";
import { useMenu } from "@/ui/containers/Aside/MenuProvider";
import { TMenuButton } from "@/ui/containers/Aside/TAside";
import Transition from "@/ui/shared/Transition";
import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const MenuNavLink = ({
  children,
  to,
  exact,
  onClick,
  Icon,
  collapsed: collapseActive,
}: TMenuButton) => {
  const { toggleMenu, collapsed } = useMenu();
  const { isMobile } = useMedia();

  const baseClasses =
    "px-4 py-[14px] text-sm flex gap-3 rounded transition-colors duration-200 hover:bg-blue-700 w-full text-left items-center";

  const handleClick = () => {
    if (isMobile) toggleMenu();
    onClick?.();
  };

  if (!to) {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={twMerge(
          baseClasses,
          "cursor-pointer",
          collapseActive && "bg-blue-800",
        )}
      >
        {Icon && <Icon className="stroke-white" />}

        <Transition type="Opacity" show={!collapsed}>
          <span className="whitespace-nowrap">{children}</span>
        </Transition>
      </button>
    );
  }

  return (
    <NavLink
      to={to}
      end={exact}
      onClick={handleClick}
      className={({ isActive }) =>
        twMerge(baseClasses, isActive && "bg-blue-700 font-semibold")
      }
    >
      {Icon && <Icon className="stroke-white" />}

      <Transition type="Opacity" show={!collapsed}>
        <span className="whitespace-nowrap">{children}</span>
      </Transition>
    </NavLink>
  );
};

export default MenuNavLink;
