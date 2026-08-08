import { useDamageTypes } from "@/app/api/libraryApi";
import { RejectedItemsListDSO } from "@/data/dso/rejectedItemsList.dso";
import { selectMock } from "@/data/mocks/select.mock";
import { useInvalidBlankStore } from "@/ui/modules/SupplyChain/InvalidBlank/InvalidBlankStore";
import { invalidBlankSteps } from "@/ui/modules/SupplyChain/InvalidBlank/page-data";
import { useSteps } from "@/ui/shared/Stepper";
import { isEmpty } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

export const InvalidPermitsVM = () => {
  const { handleSubmit, control, setValue, unregister, reset } =
    useForm<RejectedItemsListDSO>();

  const { declaration, setDeclaration } = useInvalidBlankStore();
  const { prevStep, isEdit, nextStep } = useSteps<typeof invalidBlankSteps>();

  const [ranged, setRanged] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(false);
  const [rejectedPermitsList, setRejectedPermitsList] = useState<
    RejectedItemsListDSO[]
  >([]);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 5;

  const { data: damageTypes } = useDamageTypes();

  const submitForm = (data: RejectedItemsListDSO) => {
    const start = data.startNumber;
    const end = Number(data.endNumber);

    const calculatedCount =
      data.endNumber && end >= start ? end - start + 1 : 1;

    setRejectedPermitsList((prevList) => [
      ...prevList,
      {
        ...data,
        id: crypto.randomUUID(),
        count: calculatedCount,
      },
    ]);
    setIsModalOpen(false);
    setError(false);
  };

  const resetAll = () => {
    reset();
    setRanged(false);
  };

  const handleNext = () => {
    setDeclaration(declaration);
    nextStep();
  };

  // const onRemove = (id?: string) => {
  //   if (!id) return;

  //   alert(
  //     "Zədələnmiş icazəni sil",
  //     "Zədələnmiş icazəni silmək istədiyinizə əminsiniz?",
  //     {
  //       type: "REMOVE",
  //       okText: "Sil",
  //       cancelText: "Bağla",
  //     },
  //   ).then((data) => {
  //     if (data?.ok) {
  //       setRejectedPermitsList((prevList) =>
  //         prevList.filter((item) => item.id !== id),
  //       );
  //     }
  //   });
  // };

  useEffect(() => {
    if (!ranged) {
      setValue("endNumber", "");
      unregister("endNumber");
    }
  }, [ranged, setValue]);

  useEffect(() => {
    if (!isModalOpen) {
      resetAll();
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (
      rejectedPermitsList.length > 0 &&
      page > Math.ceil(rejectedPermitsList.length / PAGE_SIZE)
    ) {
      setPage(Math.ceil(rejectedPermitsList.length / PAGE_SIZE));
    }
  }, [rejectedPermitsList.length, page]);

  useEffect(() => {
    if (isEdit || declaration) {
      setDeclaration(declaration);
    }
  }, [isEdit, declaration]);

  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * PAGE_SIZE;
    return rejectedPermitsList?.slice(startIndex, startIndex + PAGE_SIZE);
  }, [rejectedPermitsList, page]);

  return {
    prevStep,
    onSubmit: handleSubmit(submitForm),
    ranged,
    control,
    setRanged,
    isModalOpen,
    setIsModalOpen,
    columns: [],
    damageTypes: !isEmpty(damageTypes) ? damageTypes : selectMock, //!del
    rejectedPermitsList: paginatedData,
    totalCount: rejectedPermitsList?.length,
    page,
    setPage,
    handleNext,
    error,
    setError,
  };
};
