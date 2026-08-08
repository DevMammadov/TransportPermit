import { menu } from "@/data/menu/menu";
import MenuButton from "@/ui/containers/Aside/MenuButton";
import { useMenu } from "@/ui/containers/Aside/MenuProvider";
import Arrow from "@svg/arrow.svg?react";
import AynaLogoBig from "@svg/ayna-logo-big.svg?react";
import AynaLogo from "@svg/ayna-logo.svg?react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import Transition from "../../shared/Transition";

export const Aside = () => {
  const { collapsed: asideCollapsed, toggleMenu } = useMenu();
  const location = useLocation();
  const navRef = useRef<HTMLElement | null>(null);

  const [openedMenus, setOpenedMenus] = useState<Set<number>>(new Set());

  const [indicatorStyle, setIndicatorStyle] = useState({
    top: 0,
    height: 0,
    opacity: 0,
  });

  const toggleMenuItem = (index: number) => {
    setOpenedMenus((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  useEffect(() => {
    if (asideCollapsed) {
      setOpenedMenus(new Set());
    }
  }, [asideCollapsed]);

  useEffect(() => {
    const activeParents = menu
      .map((item, index) =>
        item.children?.some((child) =>
          child.exact
            ? location.pathname === child.link
            : child.link &&
              location.pathname.startsWith(child.link) &&
              child.link !== "/",
        )
          ? index
          : null,
      )
      .filter((x): x is number => x !== null);

    setOpenedMenus((prev) => {
      const next = new Set(prev);
      activeParents.forEach((index) => next.add(index));
      return next;
    });
  }, [location.pathname]);

  const updateIndicatorPosition = () => {
    if (!navRef.current) return;

    const activeSubElement = navRef.current.querySelector(
      ".sub-menu-list .active, .sub-menu-list [aria-current='page']",
    ) as HTMLElement;

    if (activeSubElement) {
      const containerRect = navRef.current.getBoundingClientRect();
      const elementRect = activeSubElement.getBoundingClientRect();

      if (elementRect.height > 0) {
        const parentLi = activeSubElement.closest("nav > ul > li");
        if (parentLi) {
          const index = Array.from(parentLi.parentNode?.children || []).indexOf(
            parentLi,
          );

          if (!openedMenus.has(index)) {
            setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
            return;
          }
        }

        setIndicatorStyle({
          top: elementRect.top - containerRect.top,
          height: elementRect.height,
          opacity: 1,
        });
        return;
      }
    }

    setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
  };

  useLayoutEffect(() => {
    if (!navRef.current) return;

    const observer = new ResizeObserver(() => {
      updateIndicatorPosition();
    });

    observer.observe(navRef.current);
    updateIndicatorPosition();

    return () => observer.disconnect();
  }, [location.pathname, openedMenus, asideCollapsed]);

  return (
    <aside className="z-50">
      <div
        className={twMerge(
          "transform lg:w-[292px] bg-blue-900 text-white max-lg:h-screen lg:min-h-screen transition-width duration-300 z-50 absolute lg:relative w-3/4",
          asideCollapsed && "lg:w-[72px] max-lg:-translate-x-full",
        )}
      >
        <div
          className={twMerge(
            asideCollapsed ? "py-[44px] lg:py-[35px]" : "py-6.5",
            "flex items-center px-4 border-b-2 border-primary",
          )}
        >
          {asideCollapsed ? (
            <AynaLogo className="shrink-0 h-[40px] w-[40px] max-lg:hidden" />
          ) : (
            <>
              <AynaLogoBig className="lg:h-[60px] lg:w-[140px] h-[40px] w-[90px] shrink-0" />
              <div className="flex flex-col pl-3 ml-3 border-s-2 leading-4 text-sm h-[40px]">
                <span>Fiziki</span>
                <span>İcazələr</span>
              </div>
            </>
          )}
        </div>

        <nav
          ref={navRef}
          className="py-4 px-3 relative block h-auto overflow-visible"
        >
          <div
            className="absolute w-[6px] bg-blue-500 rounded-se-xl rounded-ee-xl transition-all duration-150 ease-in-out pointer-events-none z-30"
            style={{
              top: `${indicatorStyle.top + (indicatorStyle.height - 32) / 2}px`,
              height: "32px",
              opacity: indicatorStyle.opacity,
              left: "44px",
            }}
          />

          <ul className="relative flex flex-col gap-2">
            {menu.map((menuItem, i) => (
              <li key={menuItem?.label || menuItem.title}>
                <MenuButton
                  to={menuItem.link}
                  Icon={menuItem.icon}
                  exact={menuItem.exact}
                  onClick={() => toggleMenuItem(i)}
                  collapsed={openedMenus.has(i)}
                >
                  {menuItem?.label || menuItem.title}
                </MenuButton>

                {menuItem.children && (
                  <Transition show={openedMenus.has(i)} type="Collapse">
                    <div className="relative my-2 ml-8">
                      <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-blue-800" />

                      <ul className="sub-menu-list pl-4 flex flex-col gap-0.5">
                        {menuItem.children.map((subItem) => (
                          <li key={subItem.label || subItem.title}>
                            <MenuButton
                              to={subItem.link}
                              Icon={subItem.icon}
                              exact={subItem.exact}
                            >
                              {subItem.label || subItem.title}
                            </MenuButton>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Transition>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <button
          className="flex-center absolute right-0 bottom-[48px] h-[66px] w-4 bg-primary rounded-ss-xl rounded-es-xl cursor-pointer"
          onClick={() => toggleMenu()}
          aria-label="toggle menu button"
        >
          <Arrow className="stroke-white" />
        </button>
      </div>

      <Transition type="Opacity" show={!asideCollapsed}>
        <div
          className="absolute top-0 left-0 bg-black h-full w-full z-10 opacity-80 lg:hidden"
          onClick={() => toggleMenu()}
        ></div>
      </Transition>
    </aside>
  );
};

export default Aside;
