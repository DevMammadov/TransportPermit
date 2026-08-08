import { usePermitCodes, useStations } from "@/app/api/libraryApi";
import { CreateWarehouseExitDSO } from "@/data/dso/createWarehouseExit.dso";
import { warehouseExitSteps } from "@/ui/modules/SupplyChain/WarehouseExit/page-data";
import { useWarehouseExitStore } from "@/ui/modules/SupplyChain/WarehouseExit/WarehouseExitStore";
import { useSteps } from "@/ui/shared/Stepper";
import { omit } from "lodash";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

export const QuotaInfoVM = () => {
  const { handleSubmit, control, reset } = useForm<CreateWarehouseExitDSO>({
    defaultValues: {
      totalCount: "0",
    },
  });

  const [startNumber, endNumber] = useWatch({
    control,
    name: ["startNumber", "endNumber"],
  });

  const { declaration, setDeclaration, setLabelsForInfo } =
    useWarehouseExitStore();
  const { nextStep, isEdit } = useSteps<typeof warehouseExitSteps>();

  const { data: permitCodes, mutate: getPermitCodes } = usePermitCodes();
  const { data: stations } = useStations({ isCentral: false });

  const submitForm = (data: CreateWarehouseExitDSO) => {
    setLabelsForInfo({
      regionName: stations?.find((item) => item.id === data.receiverStationId)
        ?.value,
      permitCode: permitCodes?.items?.find((item) => item.id === data.permitId)
        ?.code,
    });

    setDeclaration({
      ...omit(declaration, ["totalCount"]),
      ...data,
    });

    nextStep();
  };

  useEffect(() => {
    if (isEdit || declaration) {
      reset({ ...declaration });
    }
  }, [isEdit, declaration]);

  useEffect(() => {
    getPermitCodes({ pageIndex: 0, pageSize: 5 });
  }, []);

  useEffect(() => {
    const start = Number(startNumber);
    const end = Number(endNumber);

    if (!isNaN(start) && !isNaN(end) && end >= start) {
      reset((prev) => ({ ...prev, totalCount: String(end - start + 1) }));
    } else {
      reset((prev) => ({ ...prev, totalCount: "0" }));
    }
  }, [startNumber, endNumber, reset]);

  return {
    onSubmit: handleSubmit(submitForm),
    control,
    permitCodes,
    stations,
  };
};
