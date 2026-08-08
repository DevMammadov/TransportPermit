import { usePointTransferById } from "@/app/api/pointTransferApi";
import { usePointTransferStore } from "@/ui/modules/SupplyChain/PointTransfer/PointTransferStore";
import { isEmpty } from "lodash";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const NewPointTransferVM = () => {
  const { resetState, declaration, setDeclaration } = usePointTransferStore();
  const { id, page } = useParams();
  const isEdit = page === "update" && !!id;

  const { mutate: pointTransferById } = usePointTransferById();

  useEffect(() => {
    if (isEdit && isEmpty(declaration)) {
      pointTransferById(Number(id), {
        onSuccess: (res) => setDeclaration(res),
      });
    }
  }, [id]);

  useEffect(() => {
    return () => {
      resetState();
    };
  }, []);

  return {};
};
