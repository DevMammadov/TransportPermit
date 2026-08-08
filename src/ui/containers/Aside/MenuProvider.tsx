import { useMedia } from "@/app/hooks/useMedia";
import { TMenuContext, TMenuProvider } from "@/ui/containers/Aside/TAside";
import { createContext, useContext, useState } from "react";

const MenuContext = createContext<TMenuContext>({
  collapsed: false,
  setCollapsed: () => false,
  toggleMenu: () => {},
});

export const MenuProvider = ({ children }: TMenuProvider) => {
  const { isMobile } = useMedia();

  const [collapsed, setCollapsed] = useState(isMobile ? true : false);

  const toggleMenu = () => setCollapsed(!collapsed);

  return (
    <MenuContext.Provider value={{ collapsed, setCollapsed, toggleMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);
