import {
  useCountries,
  usePermitKinds,
  usePermitTypes,
  useStations,
  useStatuses,
} from "@/app/api/libraryApi";
import {
  useConfirmWarehouseEntrance,
  useExportWarehouseEntranceExcel,
  useReturnWarehouseEntrance,
  useWarehouseEntranceList,
  useWarehouseEntranceSubList,
} from "@/app/api/warehouseEntranceApi";
import { useFilter } from "@/app/hooks/useFilter";
import { BlankFilter } from "@/data/types/Common";
import Toast from "@/ui/components/Toast";
import { useWarehouseEntranceColumns } from "@/ui/modules/SupplyChain/WarehouseEntrance/page-data";
import { TWearhouseEntranceTableData } from "@/ui/modules/SupplyChain/WarehouseEntrance/TWarehouseEntrance";
import { useDialog } from "@/ui/shared/Dialog";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const WarehouseEntranceVM = () => {
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

  const [tableData, setTableData] = useState<TWearhouseEntranceTableData[]>();
  const [loadingSubRows, setLoadingSubRows] = useState<number[]>([]);

  const { data: warehouseEntranceList } = useWarehouseEntranceList(filters);
  const { mutate: getSubList } = useWarehouseEntranceSubList();

  const { mutate: confirmWarehouseEntrance } = useConfirmWarehouseEntrance();
  const { mutate: returnWarehouseEntrance } = useReturnWarehouseEntrance();
  const { mutate: exportWarehouseEntrance, isPending: exportLoading } =
    useExportWarehouseEntranceExcel();
  const { data: permitKinds, mutate: getPermitKinds } = usePermitKinds();
  const { data: permitTypes } = usePermitTypes();
  const { data: countries } = useCountries();
  const { data: statuses } = useStatuses();
  const { data: stations } = useStations({ isCentral: false });

  const onConfirm = (id?: number) => {
    alert("Təsdiq et", "Təsdiq etmək istədiyinizə əminsiniz?", {
      type: "SUCCESS",
      okText: "Təsdiq et",
      cancelText: "Bağla",
    }).then((data) => {
      if (data.ok && id) {
        confirmWarehouseEntrance(id, {
          onSuccess: () =>
            toast(<Toast type="confirm" title="İcazə təsdiq edildi" />),
        });
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
        returnWarehouseEntrance(
          { id, reason: data.value },
          {
            onSuccess: () =>
              toast(<Toast type="return" title="Məxaric geri qayıtdı" />),
          },
        );
      }
    });
  };

  const handleExport = () => {
    exportWarehouseEntrance(filters);
  };

  const { mainColumns, subColumns } = useWarehouseEntranceColumns({
    onConfirm,
    onReturn,
  });

  const onOpenFilterModal = () => {
    getPermitKinds({ pageIndex: 0, pageSize: 5, name: null });
  };

  useEffect(() => {
    if (warehouseEntranceList?.items) {
      setTableData(
        warehouseEntranceList?.items.map((a) => ({ ...a, subItems: [] })),
      );
    }
  }, [warehouseEntranceList]);

  const handleTableRowExpand = (
    item: TWearhouseEntranceTableData,
    index: number,
  ) => {
    if (item.subItems && item.subItems.length > 0) return;

    setLoadingSubRows((prev) => [...prev, index]);

    getSubList(
      { permitId: item.permit.id, applicableYear: item.applicableYear },
      {
        onSuccess: (subData) => {
          setTableData((prev) =>
            prev?.map((row, i) =>
              i === index ? { ...row, subItems: subData } : row,
            ),
          );
        },
        onSettled: () => {
          setLoadingSubRows((prev) => prev.filter((i) => i !== index));
        },
      },
    );
  };

  return {
    page,
    setPage,
    filters,
    mainColumns,
    subColumns,
    warehouseEntranceList,
    handleSearch,
    clearFilter,
    control,
    permitKinds,
    permitTypes,
    countries,
    statuses,
    stations,
    setPageSize,
    pageSize,
    handleExport,
    exportLoading,
    onOpenFilterModal,
    tableData,
    handleTableRowExpand,
    loadingSubRows,
  };
};
