import {
  WarehouseEnteranceDTO,
  WarehouseSubItemDTO,
} from "@/data/dto/warehouseEntrance.dto";
import { EStatus } from "@/data/enum/status";
import { TWarehouseEntranceColumns } from "@/ui/modules/SupplyChain/WarehouseEntrance/TWarehouseEntrance";
import { ActionButton } from "@/ui/shared/DataTable/ActionButton";
import { StatusCell } from "@/ui/shared/DataTable/StatusCell";
import { TColumn } from "@/ui/shared/DataTable/TDataTable";

export const useWarehouseEntranceColumns = ({
  onConfirm,
  onReturn,
}: TWarehouseEntranceColumns) => {
  const mainColumns: TColumn<WarehouseEnteranceDTO>[] = [
    { field: "permit", title: "Kod", render: ({ permit }) => permit.code },
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
    { field: "baseCount", title: "Baza" },
    { field: "additionalCount", title: "Əlavə" },
    { field: "confirmedCount", title: "Təsdiq edilən" },
    { field: "pendingCount", title: "Gözləmədə" },
    {
      field: "permit",
      title: "Defisitlik dərəcəsi",
      render: ({ permit }) => permit.deficiencyLevelType,
    },
  ];

  const subColumns: TColumn<WarehouseSubItemDTO>[] = [
    { field: "count", title: "Göndərilən say" },
    { field: "startNumber", title: "Başlama nömrəsi" },
    { field: "endNumber", title: "Bitmə nömrəsi" },
    { field: "sentDate", title: "Göndərilmə tarixi" },
    { field: "expirationDate", title: "Qüvvədə olma tarixi" },
    { field: "applicableYear", title: "Qüvvədə olan il" },
    {
      field: "exchangeType",
      title: "Mübadilə növü",
      render: ({ exchangeType }) => exchangeType.value,
    },
    {
      field: "status",
      title: "Status",
      render: ({ status: { value, id, description } }) => (
        <StatusCell status={{ id: id, label: value }} tooltip={description} />
      ),
    },
    {
      field: "status",
      title: "Əmeli̇yyatlar",
      render: ({ status, id }) =>
        status.id === EStatus.Pending ? (
          <div className="flex items-center gap-2">
            <ActionButton action="return" onClick={() => onReturn(id)} />
            <ActionButton action="confirm" onClick={() => onConfirm(id)} />
          </div>
        ) : (
          <></>
        ),
    },
  ];

  return { mainColumns, subColumns };
};
