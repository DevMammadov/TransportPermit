import { TSwitch } from "@/ui/shared/Switch/TSwitch";
import { Switch as HeadlessSwitch } from "@headlessui/react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const Switch = ({ className, onChange, checked, ...rest }: TSwitch) => {
  const [enabled, setEnabled] = useState(false);
  const active = checked || enabled;

  return (
    <HeadlessSwitch
      checked={active}
      onChange={(enabled) => {
        setEnabled(enabled);
        onChange?.(enabled);
      }}
      className={twMerge(
        active ? "bg-blue-600" : "bg-gray-200",
        "relative inline-flex h-[22px] w-11 items-center rounded-full",
        className
      )}
      {...rest}
    >
      <span className="sr-only">Enable notifications</span>
      <span
        className={`${
          active ? "translate-x-6" : "translate-x-1"
        } inline-block h-[18px] w-[18px] transform rounded-full bg-white transition`}
      />
    </HeadlessSwitch>
  );
};

export default Switch;
