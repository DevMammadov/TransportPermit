import { CreateWarehouseExitDSO } from "@/data/dso/createWarehouseExit.dso";

export enum EWarehouseExitSteps {
  QUOTA_INFO = "quota-info",
  INFO_CONFIRM = "info-confirm",
}

export type TWarehouseExitState = {
  declaration: CreateWarehouseExitDSO | null;
  labelsForInfo: TLabelsForInfo | null;
};

export type TWarehouseExitActions = {
  setDeclaration: (data: CreateWarehouseExitDSO | null) => void;
  setLabelsForInfo: (data: TLabelsForInfo | null) => void;
  resetState: () => void;
};

export type TWarehouseExitColumns = {
  onEdit(id: number): void;
  onRemove(id: number): void;
  onSend(id: number): void;
};

type TLabelsForInfo = {
  regionName?: string;
  permitCode?: string;
};
