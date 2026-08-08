import {
  useCreatePermitBlank,
  useUpdatePermitBlank,
} from "@/app/api/permitBlankApi";
import { links } from "@/app/routes/links";
import Toast from "@/ui/components/Toast";
import { permitBlankSteps } from "@/ui/modules/SupplyChain/PermitBlank/page-data";
import { usePermitBlankStore } from "@/ui/modules/SupplyChain/PermitBlank/PermitBlankStore";
import { useSteps } from "@/ui/shared/Stepper";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const InfoConfirmVM = () => {
  const { handleSubmit, control } = useForm();
  const navigate = useNavigate();
  const { declaration, labelsForInfo, resetState } = usePermitBlankStore();
  const { prevStep, editId } = useSteps<typeof permitBlankSteps>();

  const { mutate: createPermitBlank, isPending: createLoading } =
    useCreatePermitBlank();
  const { mutate: updatePermitBlank, isPending: updateLoading } =
    useUpdatePermitBlank();

  const submitForm = () => {
    if (!declaration) {
      return;
    }

    const onSuccess = () => {
      toast(<Toast type="confirm" title="İcazə təsdiq edildi" />);
      resetState();
      navigate(links.permitBlankRegistration.baseUrl);
    };

    if (editId) {
      updatePermitBlank(declaration, { onSuccess });
    } else {
      createPermitBlank(declaration, { onSuccess });
    }
  };

  return {
    declaration,
    labelsForInfo,
    prevStep,
    onSubmit: handleSubmit(submitForm),
    control,
    sendingLoading: createLoading || updateLoading,
  };
};
