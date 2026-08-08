import { useDamageTypes } from "@/app/api/libraryApi";
import { CreateInvalidBlankDSO } from "@/data/dso/createInvalidBlank.dso";
import { useInvalidBlankStore } from "@/ui/modules/SupplyChain/InvalidBlank/InvalidBlankStore";
import { invalidBlankSteps } from "@/ui/modules/SupplyChain/InvalidBlank/page-data";
import { useSteps } from "@/ui/shared/Stepper";
import { omit } from "lodash";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const InvalidPermitsVM = () => {
  const { handleSubmit, control, setValue, unregister, reset } =
    useForm<CreateInvalidBlankDSO>();

  const { declaration, setDeclaration, setLabelsForInfo, labelsForInfo } =
    useInvalidBlankStore();

  const { prevStep, isEdit, nextStep } = useSteps<typeof invalidBlankSteps>();

  const [ranged, setRanged] = useState(false);

  const { data: damageTypes } = useDamageTypes();

  const submitForm = (data: CreateInvalidBlankDSO) => {
    setDeclaration({ ...declaration, ...data });

    setLabelsForInfo({
      ...labelsForInfo,
      damageReason: damageTypes?.find(
        (item) => item.id === Number(data.damageReason),
      )?.value,
    });

    nextStep();
  };

  useEffect(() => {
    if (!ranged) {
      setValue("endNumber", undefined);
      unregister("endNumber");
    }
  }, [ranged, setValue]);

  useEffect(() => {
    if (isEdit || declaration) {
      reset(omit(declaration, ["permitId"]));

      if (declaration?.endNumber) {
        setRanged(true);
      }
    }
  }, [isEdit, declaration]);

  return {
    prevStep,
    control,
    ranged,
    setRanged,
    damageTypes,
    onSubmit: handleSubmit(submitForm),
  };
};
