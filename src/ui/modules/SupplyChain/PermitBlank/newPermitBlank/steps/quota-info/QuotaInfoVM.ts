import {
  useStations,
  useExchangeTypes,
  usePermitCodes,
} from "@/app/api/libraryApi";
import { usePermitBlankById } from "@/app/api/permitBlankApi";
import { usePermitById } from "@/app/api/permitsApi";
import { links } from "@/app/routes/links";
import { permitBlankSteps } from "@/ui/modules/SupplyChain/PermitBlank/page-data";
import { usePermitBlankStore } from "@/ui/modules/SupplyChain/PermitBlank/PermitBlankStore";
import { TCreatePermitBlankForm } from "@/ui/modules/SupplyChain/PermitBlank/TPermitBlank";
import { useDialog } from "@/ui/shared/Dialog";
import { useSteps } from "@/ui/shared/Stepper";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export const QuotaInfoVM = () => {
  const { id } = useParams();

  const { handleSubmit, control, reset } = useForm<TCreatePermitBlankForm>({
    defaultValues: {
      totalCount: "0",
      country: "-",
      deficiencyLevelType: "-",
      permitType: "-",
      permitCategory: "-",
    },
  });

  const [codeValue, startNumber, endNumber] = useWatch({
    control,
    name: ["permitId", "startNumber", "endNumber"],
  });

  const { declaration, setDeclaration, setLabelsForInfo } =
    usePermitBlankStore();
  const { alert } = useDialog();
  const navigate = useNavigate();
  const { nextStep } = useSteps<typeof permitBlankSteps>();

  const { data: permitCodes, mutate: getPermitCodes } = usePermitCodes();

  const { data: exchangeTypes } = useExchangeTypes();

  const { data: declarationView } = usePermitBlankById(id);

  const { data: centralWarehouses } = useStations({
    isCentral: false,
  });

  const { data: permitById, isLoading: permitLoading } =
    usePermitById(codeValue);

  const submitForm = (data: TCreatePermitBlankForm) => {
    setLabelsForInfo({
      country: permitById?.country.value,
      deficiencyLevelType: permitById?.deficiencyLevelType.value,
      permitType: permitById?.permitType.value,
      permitCategory: permitById?.permitCategory.name,
      stationId: centralWarehouses?.find((item) => item.id === data.stationId)
        ?.value,
      exchangeTypeId: exchangeTypes?.find(
        (item) => item.id === data.exchangeTypeId,
      )?.value,
      permitId: permitCodes?.items?.find((item) => item.id === data.permitId)
        ?.code,
    });

    setDeclaration({
      ...declaration,
      ...data,
      country: permitById?.country.id,
      permitType: permitById?.permitType.id,
      permitCategory: permitById?.permitCategory.id,
      deficiencyLevelType: permitById?.deficiencyLevelType.id,
    });

    nextStep();
  };

  const handleCancel = () => {
    alert(
      "İmtina et",
      "İmtina etdiyiniz təqdirdə doldurduğunuz xanalar yadda saxlanılmayacaq!",
      {
        type: "DANGER",
        okText: "İmtina et",
        cancelText: "Bağla",
      },
    ).then((data) => {
      if (!data?.ok) {
        return;
      }
      navigate(links.permitBlankRegistration.baseUrl);
    });
  };

  useEffect(() => {
    const start = Number(startNumber);
    const end = Number(endNumber);

    if (!isNaN(start) && !isNaN(end) && end >= start) {
      reset((prev) => ({ ...prev, totalCount: String(end - start + 1) }));
    } else {
      reset((prev) => ({ ...prev, totalCount: "0" }));
    }
  }, [startNumber, endNumber, reset]);

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
    getPermitCodes({ pageIndex: 0, pageSize: 5 });
  }, []);

  useEffect(() => {
    if (declarationView) {
      reset({
        id: declarationView.id,
        permitId: declarationView.permitId,
        expirationDate: declarationView.expirationDate,
        applicableYear: declarationView.applicableYear,
        startNumber: declarationView.startNumber,
        endNumber: declarationView.endNumber,
        exchangeTypeId: declarationView.exchangeTypeId,
        stationId: declarationView.stationId,
        description: declarationView.description,
      });
    }
  }, [declarationView]);

  return {
    onSubmit: handleSubmit(submitForm),
    handleCancel,
    control,
    permitCodes: permitCodes?.items || [],
    exchangeTypes,
    permitLoading,
    centralWarehouses,
  };
};
