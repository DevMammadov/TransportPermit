import { CreateInvalidBlankDSO } from "@/data/dso/createInvalidBlank.dso";
import { PermitDTO } from "@/data/dto/permit.dto";

export enum EInvalidBlankSteps {
  PERMIT_INFO = "permit-info",
  REJECTED_PERMITS = "rejected-permits",
  INFO_CONFIRM = "info-confirm",
}

export type TInvalidBlankState = {
  declaration: CreateInvalidBlankDSO | null;
  labelsForInfo: Partial<TLabelsForInfo> | null;
};

export type TInvalidBlankActions = {
  setDeclaration: (data: CreateInvalidBlankDSO | null) => void;
  setLabelsForInfo: (data: Partial<TLabelsForInfo> | null) => void;
  resetState: () => void;
};

export type TInvalidBlankColumns = {
  onRestore: (id: number) => void;
  onRemove: (id: number) => void;
  onEdit: (id: number) => void;
  onView: (id: number) => void;
};

export type TPermitInfoForm = {
  permitId: number;
  country: string;
  permitType: string;
  permitCategory: string;
  deficiencyLevelType: string;
};

type TLabelsForInfo = {
  permit?: PermitDTO;
  damageReason: string;
};
