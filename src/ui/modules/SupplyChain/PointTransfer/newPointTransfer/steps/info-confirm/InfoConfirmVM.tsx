import {
  useCreatePointTransfer,
  useUpdatePointTransfer,
} from "@/app/api/pointTransferApi";
import { links } from "@/app/routes/links";
import Toast from "@/ui/components/Toast";
import { pointTransferSteps } from "@/ui/modules/SupplyChain/PointTransfer/page-data";
import { usePointTransferStore } from "@/ui/modules/SupplyChain/PointTransfer/PointTransferStore";
import { useDialog } from "@/ui/shared/Dialog";
import { useSteps } from "@/ui/shared/Stepper";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const InfoConfirmVM = () => {
  const { handleSubmit, control } = useForm();
  const { alert } = useDialog();
  const navigate = useNavigate();
  const { declaration } = usePointTransferStore();
  const { prevStep, editId } = useSteps<typeof pointTransferSteps>();

  const { mutate: createPointTransfer, isPending: createLoading } =
    useCreatePointTransfer();
  const { mutate: updatePointTransfer, isPending: updateLoading } =
    useUpdatePointTransfer();

  const submitForm = () => {
    if (!declaration) {
      return;
    }

    alert("Məxaric et", "Məxaric etmək istədiyinizə əminsiniz?", {
      type: "SUCCESS",
      okText: "Məxaric et",
      cancelText: "Bağla",
    }).then((data) => {
      if (!data?.ok) {
        return;
      }

      const onSuccess = () => {
        toast(<Toast type="confirm" title="İcazə təsdiq edildi" />);
        navigate(links.pointTransfer.baseUrl);
      };

      if (editId) {
        updatePointTransfer({ ...declaration, id: editId }, { onSuccess });
      } else {
        createPointTransfer(declaration, { onSuccess });
      }
      onSuccess(); //!del
    });
  };

  return {
    declaration,
    prevStep,
    onSubmit: handleSubmit(submitForm),
    control,
    sendingLoading: createLoading || updateLoading,
  };
};
