import { usePermitCodes } from "@/app/api/libraryApi";
import { usePermitById } from "@/app/api/permitsApi";
import { useInvalidBlankStore } from "@/ui/modules/SupplyChain/InvalidBlank/InvalidBlankStore";
import { invalidBlankSteps } from "@/ui/modules/SupplyChain/InvalidBlank/page-data";
import { TPermitInfoForm } from "@/ui/modules/SupplyChain/InvalidBlank/TInvalidBlank";
import { useSteps } from "@/ui/shared/Stepper";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

export const PermitInfoVM = () => {
  const { handleSubmit, control, reset } = useForm<TPermitInfoForm>({
    defaultValues: {
      country: "-",
      permitType: "-",
      permitCategory: "-",
      deficiencyLevelType: "-",
    },
  });

  const codeValue = useWatch({
    control,
    name: "permitId",
  });

  const { declaration, setDeclaration, setLabelsForInfo } =
    useInvalidBlankStore();

  const { nextStep, isEdit } = useSteps<typeof invalidBlankSteps>();

  const { data: permitCodes, mutate: getPermitCodes } = usePermitCodes();

  const { data: permitById, isLoading: permitLoading } =
    usePermitById(codeValue);

  const submitForm = (data: TPermitInfoForm) => {
    setDeclaration({
      permitId: data.permitId,
    });

    setLabelsForInfo({
      permit: permitById,
    });

    nextStep();
  };

  useEffect(() => {
    if (permitById) {
      reset((prevValues) => ({
        ...prevValues,
        country: permitById.country.value,
        permitType: permitById.permitType.value,
        permitCategory: permitById.permitCategory.name,
        deficiencyLevelType: permitById.deficiencyLevelType.value,
      }));
    }
  }, [permitById]);

  useEffect(() => {
    if (isEdit || declaration) {
      setDeclaration(declaration);
      reset({ permitId: declaration?.permitId });
    }
  }, [isEdit, declaration]);

  useEffect(() => {
    getPermitCodes({ pageIndex: 0, pageSize: 5 });
  }, []);

  return {
    onSubmit: handleSubmit(submitForm),
    control,
    permitCodes,
    permitLoading,
  };
};
