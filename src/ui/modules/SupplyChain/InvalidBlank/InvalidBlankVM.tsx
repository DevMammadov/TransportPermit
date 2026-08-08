import {
  useExchangeTypes,
  usePermitCodes,
  usePermitKinds,
  usePermitTypes,
  useStations,
  useStatuses,
} from "@/app/api/libraryApi";
import {
  useExportInvalidBlankExcel,
  useInvalidBlankById,
  useInvalidBlankList,
  useRemoveInvalidBlank,
  useRestoreInvalidBlank,
} from "@/app/api/invalidBlankApi";
import { useFilter } from "@/app/hooks/useFilter";
import Toast from "@/ui/components/Toast";
import { useInvalidBlankStore } from "@/ui/modules/SupplyChain/InvalidBlank/InvalidBlankStore";
import { useInvalidBlankColumns } from "@/ui/modules/SupplyChain/InvalidBlank/page-data";
import { EInvalidBlankSteps } from "@/ui/modules/SupplyChain/InvalidBlank/TInvalidBlank";
import { useDialog } from "@/ui/shared/Dialog";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GetInvalidBlankListDSO } from "@/data/dso/getRejectedBlankList.dso";

export const InvalidBlankVM = () => {
  const { setDeclaration } = useInvalidBlankStore();
  const {
    page,
    setPage,
    filters,
    control,
    handleSearch,
    clearFilter,
    setPageSize,
    pageSize,
  } = useFilter<GetInvalidBlankListDSO>();
  const { alert } = useDialog();
  const navigate = useNavigate();

  const { data: invalidBlankList } = useInvalidBlankList(filters);
  const { mutate: invalidBlankById } = useInvalidBlankById();
  const { mutate: restoreInvalidBlank } = useRestoreInvalidBlank();
  const { mutate: removeInvalidBlank } = useRemoveInvalidBlank();
  const { mutate: exportInvalidBlank, isPending: exportLoading } =
    useExportInvalidBlankExcel();

  const { data: permitKinds, mutate: getPermitKinds } = usePermitKinds();
  const { data: permitCodes, mutate: getPermitCodes } = usePermitCodes();

  const { data: permitTypes } = usePermitTypes();
  const { data: statuses } = useStatuses();
  const { data: exchangeTypes } = useExchangeTypes();
  const { data: stations } = useStations({ isCentral: false });

  const onEdit = (id: number) => {
    invalidBlankById(id, {
      onSuccess: (res) => {
        setDeclaration(res);
        navigate(`update/${EInvalidBlankSteps.PERMIT_INFO}/${id}`);
      },
    });
  };

  const onRemove = (id: number) => {
    alert("Zədələnmişi sil", "Zədələnmişi silmək istədiyinizə əminsiniz?", {
      type: "REMOVE",
      okText: "Sil",
      cancelText: "Bağla",
    }).then((data) => {
      if (data.ok && id) {
        removeInvalidBlank(id, {
          onSuccess: () =>
            toast(<Toast type="remove" title="Zədələnmiş icazələr silindi" />),
        });
      }
    });
  };

  const onRestore = (id: number) => {
    alert("Bərpa et", "Bərpa etmək istədiyinizə əminsiniz?", {
      type: "RESTORE",
      okText: "Bərpa et",
      cancelText: "Bağla",
      showInput: true,
      inputLabel: "Təsvir",
      inputPlaceholder: "Daxil edin...",
    }).then((data) => {
      if (data.ok && id) {
        restoreInvalidBlank(
          { id, reason: data.value },
          {
            onSuccess: () =>
              toast(
                <Toast
                  type="confirm"
                  title="Zədələnmiş icazələr bərpa edildi"
                />,
              ),
          },
        );
      }
    });
  };

  const onView = (id: number) => {
    invalidBlankById(id, {
      onSuccess: (res) => {
        setDeclaration(res);
        navigate(`view/${id}`);
      },
    });
  };

  const handleExport = () => {
    exportInvalidBlank(filters);
  };

  const openFilterModal = () => {
    getPermitKinds({ pageIndex: 0, pageSize: 5, name: null });
    getPermitCodes({ pageIndex: 0, pageSize: 5 });
  };

  const { columns } = useInvalidBlankColumns({
    onEdit,
    onRemove,
    onRestore,
    onView,
  });

  return {
    openFilterModal,
    permitCodes,
    statuses,
    permitKinds,
    permitTypes,
    exchangeTypes,
    stations,
    page,
    setPage,
    filters,
    control,
    handleSearch,
    clearFilter,
    setPageSize,
    pageSize,
    columns,
    invalidBlankList,
    handleExport,
    exportLoading,
  };
};
