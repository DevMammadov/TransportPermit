import { WarehouseExitDTO } from "@/data/dto/warehouseExitList.dto";
import { EStatus } from "@/data/enum/status";
import {
  EWarehouseExitSteps,
  TWarehouseExitColumns,
} from "@/ui/modules/SupplyChain/WarehouseExit/TWarehouseExit";
import { ActionButton } from "@/ui/shared/DataTable/ActionButton";
import { StatusCell } from "@/ui/shared/DataTable/StatusCell";
import { TColumn } from "@/ui/shared/DataTable/TDataTable";

export const useWarehouseExitColumns = ({
  onEdit,
  onRemove,
  onSend,
}: TWarehouseExitColumns) => {
  const columns: TColumn<WarehouseExitDTO>[] = [
    {
      field: "permit",
      title: "Kod",
      render: ({ permit }) => permit.code,
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
      field: "receiverStation",
      title: "Məntəqənin adı",
      render: ({ receiverStation }) => receiverStation.value,
    },
    {
      field: "count",
      title: "Ümumi say",
    },
    {
      field: "permit",
      title: "Göndərən ölkə",
      render: ({ permit }) => permit.country,
    },
    {
      field: "status",
      title: "Status",
      render: ({ status: { id, value, description } }) => {
        return (
          <StatusCell status={{ id, label: value }} tooltip={description} />
        );
      },
    },
    {
      field: "id",
      title: "Əməliyyatlar",
      render: ({ status, id }) =>
        status.id === EStatus.Draft || status.id === EStatus.Rejected ? (
          <div className="flex items-center gap-2">
            <ActionButton onClick={() => onEdit(id)} action="edit" />
            <ActionButton onClick={() => onSend(id)} action="confirm" />
            <ActionButton onClick={() => onRemove(id)} action="delete" />
          </div>
        ) : (
          <></>
        ),
    },
  ];

  return { columns };
};

export const warehouseExitSteps = Object.values(EWarehouseExitSteps);
