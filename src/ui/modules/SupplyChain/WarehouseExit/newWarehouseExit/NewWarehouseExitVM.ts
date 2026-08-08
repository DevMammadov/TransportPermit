import { useWarehouseExitById } from "@/app/api/warehouseExitApi";
import { useWarehouseExitStore } from "@/ui/modules/SupplyChain/WarehouseExit/WarehouseExitStore";
import isEmpty from "lodash/isEmpty";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const NewWarehouseExitVM = () => {
  const { resetState, declaration, setDeclaration } = useWarehouseExitStore();
  const { id, page } = useParams();
  const isEdit = page === "update" && !!id;

  const { mutate: warehouseExitById } = useWarehouseExitById();

  useEffect(() => {
    if (isEdit && isEmpty(declaration)) {
      warehouseExitById(Number(id), {
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
