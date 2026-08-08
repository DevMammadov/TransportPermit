import {
  useChangeStatusPermitBlank,
  usePermitBlankById,
} from "@/app/api/permitBlankApi";
import { usePermitById } from "@/app/api/permitsApi";
import { links } from "@/app/routes/links";
import Toast from "@/ui/components/Toast";
import { EPermitBlankSteps } from "@/ui/modules/SupplyChain/PermitBlank/TPermitBlank";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const ViewPermitBlankVM = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: blankView } = usePermitBlankById(id);

  const { data: permitById, isLoading: permitLoading } = usePermitById(
    blankView?.permitId,
  );

  const { mutate: changeStatus, isPending: isChangingStatus } =
    useChangeStatusPermitBlank();

  const handleEdit = () => {
    navigate(
      `${links.permitBlankRegistration.baseUrl}/update/${EPermitBlankSteps.QUOTA_INFO}/${id}`,
    );
  };

  const handleChangeStatus = () => {
    changeStatus(id, {
      onSuccess: () => {
        toast(<Toast type="confirm" title="Müraciətin statusu dəyişdirildi" />);
      },
    });
  };

  return {
    handleEdit,
    isChangingStatus,
    handleChangeStatus,
    blankView,
    permitById,
    permitLoading,
  };
};
