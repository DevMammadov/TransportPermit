import { CreatePointTransferDSO } from "@/data/dso/createPointTransfer.dso";

export enum EPointTransferSteps {
  QUOTA_INFO = "quota-info",
  INFO_CONFIRM = "info-confirm",
}

export type TPointTransferState = {
  declaration: CreatePointTransferDSO | null;
};

export type TPointTransferActions = {
  setDeclaration: (data: CreatePointTransferDSO | null) => void;
  resetState: () => void;
};

export type TPointTransferColumns = {
  onEdit(id: number): void;
};
