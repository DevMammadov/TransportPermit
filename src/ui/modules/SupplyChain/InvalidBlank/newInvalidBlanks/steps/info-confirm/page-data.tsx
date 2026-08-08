import { RejectedItemsListDSO } from "@/data/dso/rejectedItemsList.dso";
import { TColumn } from "@/ui/shared/DataTable/TDataTable";

export const useInfoConfirmColumns = () => {
  const columns: TColumn<RejectedItemsListDSO>[] = [
    {
      field: "startNumber",
      title: "Başlanğıc nömrə",
    },
    {
      field: "endNumber",
      title: "Son nömrə",
    },
    {
      field: "count",
      title: "Say",
    },
    {
      field: "damageType",
      title: "Zədələnmə növü",
    },
  ];

  return { columns };
};
