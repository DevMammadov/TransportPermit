import { CreatePermitBlankDSO } from "@/data/dto/permitBlankList.dto";

export enum EPermitBlankSteps {
  QUOTA_INFO = "quota-info",
  INFO_CONFIRM = "info-confirm",
}

export type TPermitBlankState = {
  declaration: CreatePermitBlankDSO | null;
  labelsForInfo: TLabelsForInfo | null;
};

export type TPermitBlankActions = {
  setDeclaration: (data: CreatePermitBlankDSO | null) => void;
  setLabelsForInfo: (data: TLabelsForInfo | null) => void;
  resetState: () => void;
};

export type TPermitBlankColumns = {
  onEdit: (id: number) => void;
  onView: (id: number) => void;
};

export type TCreatePermitBlankForm = Omit<
  CreatePermitBlankDSO,
  "country" | "permitType" | "permitCategory" | "deficiencyLevelType"
> & {
  country?: string;
  permitType?: string;
  permitCategory?: string;
  deficiencyLevelType?: string;
};

export type TLabelsForInfo = {
  permitId?: string;
  country?: string;
  deficiencyLevelType?: string;
  permitType?: string;
  permitCategory?: string;
  stationId?: string;
  exchangeTypeId?: string;
};
