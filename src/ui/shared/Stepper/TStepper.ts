import { links } from "@/app/routes/links";
import { ReactNode } from "react";

export type TStepperProps<T> = {
  stepUrls: T;
  baseUrl: (url: typeof links) => string;
  children: ReactNode;
  className?: string;
};

export type TStepProps = {
  label: string;
  children: ReactNode;
};

export type TStepsContextType<T extends readonly string[]> = {
  steps: T;
  step?: T[number];
  toStep: (target: T[number]) => void;
  nextStep: () => void;
  prevStep: () => void;
  currentIndex: number;
  isLastStep: boolean;
  isEdit: boolean;
  editId?: string;
};

export type TStepperUrlParams = {
  step?: string;
  id?: string;
  page?: string;
};

type TStepLayoutClassNames = {
  content?: string;
};

export type TStepLayoutProps = {
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
  classNames?: TStepLayoutClassNames;
};
