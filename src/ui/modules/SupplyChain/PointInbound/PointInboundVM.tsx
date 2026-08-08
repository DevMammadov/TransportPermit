import {
  useCountries,
  usePermitKinds,
  usePermitTypes,
  useStations,
  useStatuses,
} from "@/app/api/libraryApi";
import {
  useConfirmPointInbound,
  useExportPointInboundExcel,
  usePointInboundList,
  useReturnPointInbound,
} from "@/app/api/pointInboundApi";
import { useFilter } from "@/app/hooks/useFilter";
import { pointInboundMockData } from "@/data/mocks/pointInbound.mock";
import { BlankFilter } from "@/data/types/Common";

import Toast from "@/ui/components/Toast";
import { usePointInboundColumns } from "@/ui/modules/SupplyChain/PointInbound/page-data";
import { useDialog } from "@/ui/shared/Dialog";
import { toast } from "react-toastify";

export const PointInboundVM = () => {
  const {
    page,
    setPage,
    filters,
    control,
    handleSearch,
    clearFilter,
    setPageSize,
    pageSize,
  } = useFilter<BlankFilter>();
  const { alert } = useDialog();

  const { data: pointInboundList } = usePointInboundList(filters);
  const { mutate: confirmPointInbound } = useConfirmPointInbound();
  const { mutate: returnPointInbound } = useReturnPointInbound();
  const { mutate: exportPointInbound, isPending: exportLoading } =
    useExportPointInboundExcel();

  const { data: permitKinds } = usePermitKinds();
  const { data: permitTypes } = usePermitTypes();
  const { data: countries } = useCountries();
  const { data: statuses } = useStatuses();
  const { data: destinations } = useStations({ isCentral: false });

  const onConfirm = (id?: number) => {
    alert("Təsdiq et", "Təsdiq etmək istədiyinizə əminsiniz?", {
      type: "SUCCESS",
      okText: "Təsdiq et",
      cancelText: "Bağla",
    }).then((data) => {
      if (data.ok && id) {
        confirmPointInbound(id, {
          onSuccess: () =>
            toast(<Toast type="confirm" title="İcazə təsdiq edildi" />),
        });
        toast(<Toast type="confirm" title="İcazə təsdiq edildi" />); //!del
      }
    });
  };

  const onReturn = (id?: number) => {
    alert("Gəriyə qaytar", "Geryə qaytarmaq istədiyinizə əminsiniz?", {
      type: "WARNING",
      okText: "Gəriyə qaytar",
      cancelText: "Bağla",
      showInput: true,
      inputLabel: "Təsvir",
      inputPlaceholder: "Daxil edin...",
    }).then((data) => {
      if (data.ok && id) {
        returnPointInbound(
          { id, reason: data.value },
          {
            onSuccess: () =>
              toast(<Toast type="return" title="Məxaric geri qayıtdı" />),
          },
        );
        toast(<Toast type="return" title="Məxaric geri qayıtdı" />);
      }
    });
  };

  const handleExport = () => {
    exportPointInbound(filters);
  };

  const { mainColumns, subColumns } = usePointInboundColumns({
    onConfirm,
    onReturn,
  });

  return {
    page,
    setPage,
    filters,
    mainColumns,
    subColumns,
    pointInboundList: pointInboundList ?? pointInboundMockData,
    handleSearch,
    clearFilter,
    control,
    permitKinds: permitKinds?.items,
    permitTypes,
    countries,
    statuses,
    destinations,
    setPageSize,
    pageSize,
    handleExport,
    exportLoading,
  };
};
