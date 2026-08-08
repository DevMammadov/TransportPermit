import { links } from "@/app/routes/links";
import { useInvalidBlankStore } from "@/ui/modules/SupplyChain/InvalidBlank/InvalidBlankStore";
import { useInvalidBlankColumns } from "@/ui/modules/SupplyChain/InvalidBlank/page-data";
import { EInvalidBlankSteps } from "@/ui/modules/SupplyChain/InvalidBlank/TInvalidBlank";
import { isArray } from "lodash";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const ViewInvalidBlanksVM = () => {
  const { declaration } = useInvalidBlankStore();
  const { id } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 5;

  const handleEdit = () => {
    navigate(
      `${links.invalidPermitBlank.baseUrl}/update/${EInvalidBlankSteps.PERMIT_INFO}/${id}`,
    );
  };

  useEffect(() => {
    if (
      isArray(declaration?.rejectedPermits) &&
      declaration?.rejectedPermits?.length > 0 &&
      page > Math.ceil(declaration?.rejectedPermits?.length / PAGE_SIZE)
    ) {
      setPage(Math.ceil(declaration?.rejectedPermits?.length / PAGE_SIZE));
    }
  }, [declaration?.rejectedPermits?.length, page]);

  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * PAGE_SIZE;
    return declaration?.rejectedPermits?.slice(
      startIndex,
      startIndex + PAGE_SIZE,
    );
  }, [declaration?.rejectedPermits, page]);

  const { columns } = useInvalidBlankColumns();

  return {
    quotaInfo: declaration?.permitInfo,
    columns,

    rejectedPermitsList: paginatedData,
    totalCount: declaration?.rejectedPermits?.length,
    declaration,
    page,
    setPage,
    handleEdit,
  };
};
