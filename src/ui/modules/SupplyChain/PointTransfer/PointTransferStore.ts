import {
  TPointTransferActions,
  TPointTransferState,
} from "@/ui/modules/SupplyChain/PointTransfer/TPointTransfer";
import { create } from "zustand";

const initialState: TPointTransferState = {
  declaration: null,
};

export const usePointTransferStore = create<
  TPointTransferState & TPointTransferActions
>((set) => ({
  ...initialState,
  setDeclaration: (data) => set({ declaration: data }),
  resetState: () => set(initialState),
}));
