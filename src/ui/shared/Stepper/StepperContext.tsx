import { createContext, useContext } from "react";
import { TStepsContextType } from "./TStepper";

export const StepsContext = createContext<TStepsContextType<any> | null>(null);

export const useSteps = <T extends readonly string[]>() => {
  const ctx = useContext(StepsContext);
  if (!ctx) {
    throw new Error("useSteps must be used inside <Stepper>");
  }
  return ctx as TStepsContextType<T>;
};