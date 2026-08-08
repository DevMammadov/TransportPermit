import { TListItem } from "@/ui/modules/SupplyChain/WarehouseExit/components/list-item/TListItem";
import { twMerge } from "tailwind-merge";

const ListItem = ({
  className,
  classNames,
  label,
  value,
  vertical = false,
  emptyValue = "-",
}: TListItem) => {
  return (
    <p
      className={twMerge(
        "flex justify-between gap-3 ",
        className,
        vertical && "flex-col",
      )}
    >
      <span
        className={twMerge(
          "text-gray-500 font-normal",
          !vertical && "flex-1",
          classNames?.label,
        )}
      >
        {label}
      </span>
      <span
        className={twMerge(
          "font-medium",
          !vertical && "flex-1 text-end",
          classNames?.value,
        )}
      >
        {value || emptyValue}
      </span>
    </p>
  );
};

export default ListItem;
