import { PointTransferListItemDTO } from "@/data/dto/pointTransferList.dto";
import { EStatus } from "@/data/enum/status";
import {
  EPointTransferSteps,
  TPointTransferColumns,
} from "@/ui/modules/SupplyChain/PointTransfer/TPointTransfer";
import { ActionButton } from "@/ui/shared/DataTable/ActionButton";
import { StatusCell } from "@/ui/shared/DataTable/StatusCell";
import { TColumn } from "@/ui/shared/DataTable/TDataTable";

export const usePointTransferColumns = ({ onEdit }: TPointTransferColumns) => {
  const columns: TColumn<PointTransferListItemDTO>[] = [
    {
      field: "code",
      title: "Kod",
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
      field: "pointName",
      title: "Məntəqənin adı",
    },
    {
      field: "totalCount",
      title: "Ümumi say",
    },
    {
      field: "senderCountry",
      title: "Göndərən ölkə",
    },
    {
      field: "statusId",
      title: "Status",
      render: ({ statusId, statusLabel, rejectReason }) => {
        return (
          <StatusCell
            status={{ id: statusId, label: statusLabel }}
            tooltip={statusId === EStatus.Rejected ? rejectReason : undefined}
          />
        );
      },
    },
    {
      field: "id",
      title: "Əməliyyatlar",
      render: ({ id, statusId }) =>
        statusId === EStatus.Draft || statusId === EStatus.Rejected ? (
          <div className="flex items-center gap-2">
            <ActionButton onClick={() => onEdit(id)} action="edit" />
          </div>
        ) : (
          <></>
        ),
    },
  ];

  return { columns };
};

export const pointTransferSteps = Object.values(EPointTransferSteps);
