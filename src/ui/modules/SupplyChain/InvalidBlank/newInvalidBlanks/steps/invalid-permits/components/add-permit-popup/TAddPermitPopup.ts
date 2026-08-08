import { DocTypeDTO } from "@/data/dto/docType.dto";
import { ReactNode } from "react";

export type TAddPermitPopup = {
  control: any;
  onSubmit: (e: any) => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  ranged: boolean;
  setRanged: (checked: boolean) => void;
  renderTrigger: (openModal: () => void) => ReactNode;
  damageTypes: Partial<DocTypeDTO>[];
};
