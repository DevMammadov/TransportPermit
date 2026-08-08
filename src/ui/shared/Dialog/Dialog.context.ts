import { createContext, useContext } from "react";
import { TDialogContext } from "./TDialog";

export const DialogContext = createContext<TDialogContext>({
  alert: () => Promise.reject(),
  callback: () => Promise.reject(),
  prompt: () => Promise.reject(),
});

export const useDialog = () => useContext(DialogContext);
