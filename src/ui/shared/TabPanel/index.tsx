import { TTabPanel } from "@/ui/shared/TabPanel/TTabPanel";
import React from "react";
import { twMerge } from "tailwind-merge";

const TabPanel = ({ children, value, className }: TTabPanel) => {
  const activeChild = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child) && index === value) {
      return child;
    }
  });

  return <div className={twMerge("h-full", className)}>{activeChild}</div>;
};

export default TabPanel;
