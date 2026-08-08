import { RejectedItemsListDSO } from "@/data/dso/rejectedItemsList.dso";
import { TColumn } from "@/ui/shared/DataTable/TDataTable";

export const useViewRejectedBlankColumns = () => {
  const columns: TColumn<RejectedItemsListDSO>[] = [
    {
      field: "startNumber",
      title: "Nömrəsi",
    },
    {
      field: "damageType",
      title: "Zədələnmə növü",
    },
    {
      field: "reason",
      title: "Səbəb",
    },
  ];

  const BLOCK_CLASS = "flex flex-col gap-3 bg-gray-50 p-4 rounded-md text-sm";

  return { columns, BLOCK_CLASS };
};
