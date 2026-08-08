import { InvalidBlankDTO } from "@/data/dto/rejectedBlankList.dto";
import {
  EInvalidBlankSteps,
  TInvalidBlankColumns,
} from "@/ui/modules/SupplyChain/InvalidBlank/TInvalidBlank";
import { ActionButton } from "@/ui/shared/DataTable/ActionButton";
import { TColumn } from "@/ui/shared/DataTable/TDataTable";
import dayjs from "dayjs";

export const useInvalidBlankColumns = ({
  onRestore,
  onRemove,
  onEdit,
  onView,
}: TInvalidBlankColumns) => {
  const columns: TColumn<InvalidBlankDTO>[] = [
    {
      field: "createdBy",
      title: "Kim tərəfindən yaradılıb",
    },
    {
      field: "createdDate",
      title: "Yaradılma tarixi",
      render: ({ createdDate }) => dayjs(createdDate).format("DD.MM.YYYY"),
    },
    {
      field: "permit",
      title: "Kod",
      render: ({ permit }) => permit.code,
    },
    {
      field: "permit",
      title: "Ölkə",
      render: ({ permit }) => permit.country,
    },
    {
      field: "permit",
      title: "İcazə növü",
      render: ({ permit }) => permit.category,
    },
    {
      field: "startNumber",
      title: "Başlama nömrəsi",
    },
    {
      field: "endNumber",
      title: "Bitmə nömrəsi",
    },
    {
      field: "id",
      title: "Əməliyyatlar",
      render: ({ id }) => {
        return (
          <div className="flex items-center gap-2 justify-end">
            <ActionButton onClick={() => onRestore(id)} action="refresh" />
            <ActionButton onClick={() => onRemove(id)} action="delete" />
            <ActionButton onClick={() => onEdit(id)} action="edit" />
            <ActionButton onClick={() => onView(id)} action="view" />
          </div>
        );
      },
    },
  ];

  return { columns };
};

export const invalidBlankSteps = Object.values(EInvalidBlankSteps);
