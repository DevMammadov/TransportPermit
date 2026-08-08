import {
  TInvalidBlankActions,
  TInvalidBlankState,
} from "@/ui/modules/SupplyChain/InvalidBlank/TInvalidBlank";
import { create } from "zustand";

const initialState: TInvalidBlankState = {
  declaration: null,
  labelsForInfo: null,
};

export const useInvalidBlankStore = create<
  TInvalidBlankState & TInvalidBlankActions
>((set) => ({
  ...initialState,
  setDeclaration: (data) => set({ declaration: data }),
  setLabelsForInfo: (data) => set({ labelsForInfo: data }),
  resetState: () => set(initialState),
}));
