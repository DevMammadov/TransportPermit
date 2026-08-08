import { usePermitCodes, useStations } from "@/app/api/libraryApi";
import { CreatePointTransferDSO } from "@/data/dso/createPointTransfer.dso";
import { pointTransferSteps } from "@/ui/modules/SupplyChain/PointTransfer/page-data";
import { usePointTransferStore } from "@/ui/modules/SupplyChain/PointTransfer/PointTransferStore";
import { useSteps } from "@/ui/shared/Stepper";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export const QuotaInfoVM = () => {
  const { handleSubmit, control, reset } = useForm<CreatePointTransferDSO>();
  const { declaration, setDeclaration } = usePointTransferStore();
  const { nextStep, isEdit } = useSteps<typeof pointTransferSteps>();

  const { data: permitCodes } = usePermitCodes();
  const { data: receivingRegions } = useStations({ isCentral: false });

  const submitForm = (data: CreatePointTransferDSO) => {
    setDeclaration({
      ...declaration,
      ...data,
    });
    nextStep();
  };

  useEffect(() => {
    if (isEdit || declaration) {
      reset({ ...declaration });
    }

    if (!declaration) {
      reset({ totalCount: "2500 ədəd" });
    } //!del
  }, [isEdit, declaration]);

  return {
    onSubmit: handleSubmit(submitForm),
    control,
    permitCodes: permitCodes,
    receivingRegions,
  };
};
