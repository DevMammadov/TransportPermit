import { useInvalidBlankById } from "@/app/api/invalidBlankApi";
import { useInvalidBlankStore } from "@/ui/modules/SupplyChain/InvalidBlank/InvalidBlankStore";
import { isEmpty } from "lodash";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const NewInvalidBlanksVM = () => {
  const { resetState, declaration, setDeclaration } = useInvalidBlankStore();
  const { id, page } = useParams();
  const isEdit = page === "update" && !!id;

  const { mutate: invalidBlankById } = useInvalidBlankById();

  useEffect(() => {
    if (isEdit && isEmpty(declaration)) {
      invalidBlankById(Number(id), {
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
