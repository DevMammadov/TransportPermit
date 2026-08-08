import {
  PointInboundListItemDTO,
  PointInboundSubItemDTO,
} from "@/data/dto/pointInbound.dto";
import { EStatus } from "@/data/enum/status";
import { ActionButton } from "@/ui/shared/DataTable/ActionButton";
import { StatusCell } from "@/ui/shared/DataTable/StatusCell";
import { TColumn } from "@/ui/shared/DataTable/TDataTable";
import { TPointInboundColumns } from "./TPointInbound";

export const usePointInboundColumns = ({
  onConfirm,
  onReturn,
}: TPointInboundColumns) => {
  const mainColumns: TColumn<PointInboundListItemDTO>[] = [
    { field: "code", title: "Kod" },
    { field: "senderCountry", title: "Göndərən ölkə" },
    { field: "permitType", title: "İcazənin növü" },
    { field: "givenPermitsCount", title: "Verilmiş icazələr" },
    { field: "remainingPermitsCount", title: "Qalıq icazələr" },
    { field: "approvedCount", title: "Təsdiq edilən" },
    { field: "pendingCount", title: "Gözləmədə" },
    { field: "deficitStatus", title: "Defisitlik dərəcəsi" },
  ];

  const subColumns: TColumn<PointInboundSubItemDTO>[] = [
    { field: "count", title: "Göndərilən say" },
    { field: "startNumber", title: "Başlama nömrəsi" },
    { field: "endNumber", title: "Bitmə nömrəsi" },
    { field: "sendDate", title: "Göndərilmə tarixi" },
    { field: "expiryDate", title: "Qüvvədə olma tarixi" },
    { field: "activeYear", title: "Qüvvədə olan il" },
    { field: "exchangeType", title: "Mübadilə növü" },
    {
      field: "statusId",
      title: "Status",
      render: ({ statusId, statusLabel, rejectReason }) => (
        <StatusCell
          status={{ id: statusId, label: statusLabel }}
          tooltip={statusId === EStatus.Rejected ? rejectReason : undefined}
        />
      ),
    },
    {
      field: "id",
      title: "Əməliyyatlar",
      render: ({ id, statusId }) =>
        statusId === EStatus.Pending ? (
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
