import {
  useCountries,
  usePermitKinds,
  usePermitTypes,
  useStations,
  useStatuses,
} from "@/app/api/libraryApi";
import {
  useExportWarehouseExitExcel,
  useWarehouseExitById,
  useWarehouseExitList,
} from "@/app/api/warehouseExitApi";
import { useFilter } from "@/app/hooks/useFilter";
import { BlankFilter } from "@/data/types/Common";
import { useWarehouseExitColumns } from "@/ui/modules/SupplyChain/WarehouseExit/page-data";
import { EWarehouseExitSteps } from "@/ui/modules/SupplyChain/WarehouseExit/TWarehouseExit";
import { useWarehouseExitStore } from "@/ui/modules/SupplyChain/WarehouseExit/WarehouseExitStore";
import { useNavigate } from "react-router-dom";

export const WarehouseExitVM = () => {
  const { setDeclaration } = useWarehouseExitStore();
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
  const navigate = useNavigate();

  const { data: warehouseExitList } = useWarehouseExitList(filters);

  const { mutate: warehouseExitById } = useWarehouseExitById();
  const { mutate: exportWarehouseExit, isPending: exportLoading } =
    useExportWarehouseExitExcel();

  const { data: permitKinds, mutate: getPermitKinds } = usePermitKinds();
  const { data: permitTypes } = usePermitTypes();
  const { data: countries } = useCountries();
  const { data: statuses } = useStatuses();
  const { data: stations } = useStations({ isCentral: false });

  const onEdit = (id: number) => {
    warehouseExitById(id, {
      onSuccess: (res) => {
        setDeclaration(res);
        navigate(`update/${EWarehouseExitSteps.QUOTA_INFO}/${id}`);
      },
    });
    navigate(`update/${EWarehouseExitSteps.QUOTA_INFO}/${id}`); //!del
  };

  const onRemove = () => {};

  const onSend = () => {};

  const handleExport = () => {
    exportWarehouseExit(filters);
  };

  const { columns } = useWarehouseExitColumns({ onEdit, onRemove, onSend });

  const onOpenFilterModal = () => {
    getPermitKinds({ pageIndex: 0, pageSize: 5, name: null });
  };

  return {
    page,
    setPage,
    filters,
    columns,
    warehouseExitList,
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
  };
};
