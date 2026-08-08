import { PermitBlankListItem } from "@/data/dto/permitBlankList.dto";
import {
  EPermitBlankSteps,
  TPermitBlankColumns,
} from "@/ui/modules/SupplyChain/PermitBlank/TPermitBlank";
import { ActionButton } from "@/ui/shared/DataTable/ActionButton";
import { StatusCell } from "@/ui/shared/DataTable/StatusCell";
import { TColumn } from "@/ui/shared/DataTable/TDataTable";

export const usePermitBlankColumns = ({
  onEdit,
  onView,
}: TPermitBlankColumns) => {
  const columns: TColumn<PermitBlankListItem>[] = [
    {
      field: "permit",
      title: "Kod",
      render: ({ permit }) => permit.code,
    },
    {
      field: "permit",
      title: "Göndərən ölkə",
      render: ({ permit }) => permit.country,
    },
    {
      field: "permit",
      title: "İcazənin növü",
      render: ({ permit }) => permit.category,
    },
    {
      field: "expirationDate",
      title: "Qüvvədə olan tarixi",
    },
    {
      field: "count",
      title: "Qüvvədə Olan Say",
    },
    {
      field: "exchangeType",
      title: "Mübadilə növü",
    },
    {
      field: "permit",
      title: "Defisitlik dərəcəsi",
      render: ({ permit }) => permit.deficiencyLevelType,
    },
    {
      field: "count",
      title: "Ümumi Say",
    },
    {
      field: "status",
      title: "Status",
      render: ({ status }) => {
        return (
          <StatusCell
            status={{ id: status.id, label: status.value }}
            tooltip={status.description}
          />
        );
      },
    },
    {
      field: "id",
      title: "Əməliyyatlar",
      render: ({ id }) => {
        const isEditable = true;

        return (
          <div className="flex items-center gap-2">
            {isEditable ? (
              <ActionButton onClick={() => onEdit(id)} action="edit" />
            ) : (
              <div className="flex-1"></div>
            )}
            <ActionButton onClick={() => onView(id)} action="view" />
          </div>
        );
      },
    },
  ];

  return { columns };
};

export const permitBlankSteps = Object.values(EPermitBlankSteps);
