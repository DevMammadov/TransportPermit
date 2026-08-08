import {
  useExchangeTypes,
  usePermitCodes,
  usePermitKinds,
  usePermitTypes,
  useStatuses,
} from "@/app/api/libraryApi";
import {
  useExportPermitBlankExcel,
  usePermitBlankList,
} from "@/app/api/permitBlankApi";
import { useFilter } from "@/app/hooks/useFilter";
import { GetPermitBlankListDSO } from "@/data/dso/getPermitBlankList.dso";
import { usePermitBlankColumns } from "@/ui/modules/SupplyChain/PermitBlank/page-data";
import { EPermitBlankSteps } from "@/ui/modules/SupplyChain/PermitBlank/TPermitBlank";
import { useNavigate } from "react-router-dom";

export const PermitBlankVM = () => {
  const {
    page,
    setPage,
    filters,
    control,
    handleSearch,
    clearFilter,
    setPageSize,
    pageSize,
  } = useFilter<GetPermitBlankListDSO>();

  const navigate = useNavigate();

  const { data: permitBlankList } = usePermitBlankList(filters);
  const { mutate: exportPermitBlank, isPending: exportLoading } =
    useExportPermitBlankExcel();

  const { data: statuses } = useStatuses();

  const { data: exchangeTypes } = useExchangeTypes();
  const { data: permitTypes } = usePermitTypes();
  const { data: permitKinds, mutate: getPermitKinds } = usePermitKinds();
  const { data: permitCodes, mutate: getPermitCodes } = usePermitCodes();

  const onEdit = (id: number) => {
    navigate(`update/${EPermitBlankSteps.QUOTA_INFO}/${id}`);
  };

  const onView = (id: number) => {
    navigate(`view/${id}`);
  };

  const handleExport = () => {
    exportPermitBlank(filters);
  };

  const openFilterModal = () => {
    getPermitKinds({ pageIndex: 0, pageSize: 5, name: null });
    getPermitCodes({ pageIndex: 0, pageSize: 5 });
  };

  const { columns } = usePermitBlankColumns({ onEdit, onView });

  return {
    permitCodes: permitCodes?.items || [],
    statuses,
    permitKinds: permitKinds?.items || [],
    permitTypes,
    exchangeTypes,
    columns,
    control,
    filters,
    page,
    setPage,
    clearFilter,
    handleSearch,
    permitBlankList,
    setPageSize,
    pageSize,
    handleExport,
    exportLoading,
    openFilterModal,
  };
};
