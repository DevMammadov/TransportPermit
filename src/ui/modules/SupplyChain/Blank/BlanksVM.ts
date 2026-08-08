import { useBlankList } from "@/app/api/blankApi";
import {
  useCountries,
  usePermitKinds,
  usePermitTypes,
  useStations,
  useStatuses,
} from "@/app/api/libraryApi";
import { useExportPermitsExcel } from "@/app/api/permitsApi";
import { useFilter } from "@/app/hooks/useFilter";
import { BlankFilter } from "@/data/types/Common";
import { usePermitColumns } from "@/ui/modules/SupplyChain/Blank/page-data";

export const BlankVM = () => {
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

  const { data: blankList } = useBlankList(filters);

  const { mutate: exportPermits, isPending: exportLoading } =
    useExportPermitsExcel();

  const { data: permitKinds, mutate: getPermitKinds } = usePermitKinds();
  const { data: permitTypes } = usePermitTypes();
  const { data: countries } = useCountries();
  const { data: statuses } = useStatuses();
  const { data: stations } = useStations({ isCentral: false });

  const handleExport = () => {
    exportPermits(filters);
  };

  const { columns } = usePermitColumns();

  const onOpenFilterModal = () => {
    getPermitKinds({ pageIndex: 0, pageSize: 5, name: null });
  };

  return {
    page,
    setPage,
    columns,
    control,
    handleSearch,
    clearFilter,
    filters,
    blankList,
    permitKinds,
    permitTypes,
    countries,
    statuses,
    setPageSize,
    pageSize,
    handleExport,
    exportLoading,
    stations,
    onOpenFilterModal,
  };
};
