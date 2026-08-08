import Tab from "@/ui/shared/Tab";
import { TTabs } from "@/ui/shared/Tabs/TTabs";
import { MouseEvent, useRef } from "react";

const Tabs = <T,>({
  data,
  optionLabel = () => "",
  optionCount,
  onChange,
  activeTab,
}: TTabs<T>) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = (tab: T, e: MouseEvent<HTMLButtonElement>) => {
    onChange?.(tab);

    if (containerRef.current) {
      const tabRect = e.currentTarget.getBoundingClientRect();
      const tabCenter = tabRect.left + tabRect.width / 2;
      let scrollLeft = containerRef.current.scrollLeft;

      if (tabCenter > window.innerWidth / 2) {
        scrollLeft =
          tabCenter - window.innerWidth / 2 + containerRef.current.scrollLeft;
      } else {
        scrollLeft =
          containerRef.current.scrollLeft - (window.innerWidth / 2 - tabCenter);
      }

      containerRef.current.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex overflow-x-scroll no-scrollbar" ref={containerRef}>
      {data.map((tab) => (
        <Tab
          key={optionLabel(tab)}
          count={optionCount?.(tab)}
          active={activeTab && optionLabel(activeTab) === optionLabel(tab)}
          onClick={(e) => handleClick(tab, e)}
        >
          {optionLabel(tab)}
        </Tab>
      ))}
    </div>
  );
};

export default Tabs;
