import {
  TWarehouseExitActions,
  TWarehouseExitState,
} from "@/ui/modules/SupplyChain/WarehouseExit/TWarehouseExit";
import { create } from "zustand";

const initialState: TWarehouseExitState = {
  declaration: null,
  labelsForInfo: null,
};

export const useWarehouseExitStore = create<
  TWarehouseExitState & TWarehouseExitActions
>((set) => ({
  ...initialState,
  setDeclaration: (data) => set({ declaration: data }),
  setLabelsForInfo: (data) => set({ labelsForInfo: data }),
  resetState: () => set(initialState),
}));
