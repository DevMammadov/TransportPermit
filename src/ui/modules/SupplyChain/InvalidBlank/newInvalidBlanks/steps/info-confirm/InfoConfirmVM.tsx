import {
  useCreateInvalidBlank,
  useUpdateInvalidBlank,
} from "@/app/api/invalidBlankApi";
import { links } from "@/app/routes/links";
import Toast from "@/ui/components/Toast";
import { useInvalidBlankStore } from "@/ui/modules/SupplyChain/InvalidBlank/InvalidBlankStore";
import { invalidBlankSteps } from "@/ui/modules/SupplyChain/InvalidBlank/page-data";
import { useDialog } from "@/ui/shared/Dialog";
import { useSteps } from "@/ui/shared/Stepper";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const InfoConfirmVM = () => {
  const { handleSubmit, control } = useForm();
  const navigate = useNavigate();
  const { declaration, labelsForInfo } = useInvalidBlankStore();
  const { prevStep, editId } = useSteps<typeof invalidBlankSteps>();
  const { alert } = useDialog();

  const { mutate: createInvalidBlank, isPending: createLoading } =
    useCreateInvalidBlank();
  const { mutate: updateInvalidBlank, isPending: updateLoading } =
    useUpdateInvalidBlank();

  const submitForm = () => {
    if (!declaration) {
      return;
    }

    const onSuccess = () => {
      toast(<Toast type="confirm" title="Zədələnmiş icazələr əlavə edildi" />);
      navigate(links.invalidPermitBlank.baseUrl);
    };

    alert("Təsdiq et", "Təsdiq etmək istədiyinizə əminsiniz?", {
      okText: "Təsdiq et",
      cancelText: "Bağla",
    }).then((data) => {
      if (data?.ok) {
        if (editId) {
          updateInvalidBlank(
            { ...declaration, id: Number(editId) },
            { onSuccess },
          );
        } else {
          createInvalidBlank(declaration, { onSuccess });
        }
      }
    });
  };

  return {
    declaration,
    prevStep,
    labelsForInfo,
    onSubmit: handleSubmit(submitForm),
    control,
    sendingLoading: createLoading || updateLoading,
  };
};
