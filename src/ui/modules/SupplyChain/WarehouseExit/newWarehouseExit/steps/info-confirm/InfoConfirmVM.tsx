import {
  useCreateWarehouseExit,
  useUpdateWarehouseExit,
} from "@/app/api/warehouseExitApi";
import { links } from "@/app/routes/links";
import Toast from "@/ui/components/Toast";
import { warehouseExitSteps } from "@/ui/modules/SupplyChain/WarehouseExit/page-data";
import { useWarehouseExitStore } from "@/ui/modules/SupplyChain/WarehouseExit/WarehouseExitStore";
import { useDialog } from "@/ui/shared/Dialog";
import { useSteps } from "@/ui/shared/Stepper";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const InfoConfirmVM = () => {
  const { handleSubmit, control } = useForm();
  const { alert } = useDialog();
  const navigate = useNavigate();
  const { declaration, resetState, labelsForInfo } = useWarehouseExitStore();
  const { prevStep, editId } = useSteps<typeof warehouseExitSteps>();

  const { mutate: createWarehouseExit, isPending: createLoading } =
    useCreateWarehouseExit();

  const { mutate: updateWarehouseExit, isPending: updateLoading } =
    useUpdateWarehouseExit();

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
        resetState();
        navigate(links.warehouseExit.baseUrl);
      };

      if (editId) {
        updateWarehouseExit(declaration, { onSuccess });
      } else {
        createWarehouseExit(declaration, { onSuccess });
      }
    });
  };

  return {
    declaration,
    prevStep,
    onSubmit: handleSubmit(submitForm),
    control,
    sendingLoading: createLoading || updateLoading,
    labelsForInfo,
  };
};
