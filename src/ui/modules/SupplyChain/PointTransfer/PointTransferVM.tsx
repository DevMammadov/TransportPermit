import {
  useCountries,
  usePermitKinds,
  usePermitTypes,
  useStations,
  useStatuses,
} from "@/app/api/libraryApi";
import {
  useExportPointTransferExcel,
  usePointTransferById,
  usePointTransferList,
} from "@/app/api/pointTransferApi";
import { useFilter } from "@/app/hooks/useFilter";
import { pointTransferMockData } from "@/data/mocks/pointTransfer.mock";
import { BlankFilter } from "@/data/types/Common";
import { usePointTransferColumns } from "@/ui/modules/SupplyChain/PointTransfer/page-data";
import { usePointTransferStore } from "@/ui/modules/SupplyChain/PointTransfer/PointTransferStore";
import { EPointTransferSteps } from "@/ui/modules/SupplyChain/PointTransfer/TPointTransfer";
import { useNavigate } from "react-router-dom";

export const PointTransferVM = () => {
  const { setDeclaration } = usePointTransferStore();
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

  const { data: pointTransferList } = usePointTransferList(filters);
  const { mutate: pointTransferById } = usePointTransferById();
  const { mutate: exportPointTransfer, isPending: exportLoading } =
    useExportPointTransferExcel();

  const { data: permitKinds } = usePermitKinds();
  const { data: permitTypes } = usePermitTypes();
  const { data: countries } = useCountries();
  const { data: statuses } = useStatuses();
  const { data: destinations } = useStations({ isCentral: false });

  const onEdit = (id: number) => {
    pointTransferById(id, {
      onSuccess: (res) => {
        setDeclaration(res);
        navigate(`update/${EPointTransferSteps.QUOTA_INFO}/${id}`);
      },
    });
    navigate(`update/${EPointTransferSteps.QUOTA_INFO}/${id}`); //!del
  };

  const handleExport = () => {
    exportPointTransfer(filters);
  };

  const { columns } = usePointTransferColumns({ onEdit });

  return {
    page,
    setPage,
    filters,
    columns,
    pointTransferList: pointTransferList ?? pointTransferMockData,
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
