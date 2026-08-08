import {
  TPermitBlankActions,
  TPermitBlankState,
} from "@/ui/modules/SupplyChain/PermitBlank/TPermitBlank";
import { create } from "zustand";

const initialState: TPermitBlankState = {
  declaration: null,
  labelsForInfo: null,
};

export const usePermitBlankStore = create<
  TPermitBlankState & TPermitBlankActions
>((set) => ({
  ...initialState,
  setDeclaration: (data) => set({ declaration: data }),
  setLabelsForInfo: (data) => set({ labelsForInfo: data }),
  resetState: () => set(initialState),
}));
