import { ReactNode } from "react";
import { EDialogTypes, EDialogVariants } from "./helpers";

export type TDialogTypes = "alert" | "callback" | "prompt";
export type TDialogCloseReason = "ok" | "cancel" | "close" | undefined;

export type TResolver = {
  ok: boolean;
  reason: TDialogCloseReason;
  value?: string;
};

export type TResolve = {
  type?: EDialogTypes;
  resolve: ((value: TResolver) => void) | null;
};

export type TDialogState = {
  alert?: Partial<TDialogAlert>;
  callback?: Partial<TDialogCallback>;
  prompt?: Partial<TDialogPrompt>;
};

// ----

export type TDialogAlert = {
  type?: keyof typeof EDialogVariants;
  title?: string;
  text?: string;
  onClose(): void;
  open: boolean;
  onOk?(value?: string): void;
  onCancel?(): void;
  cancelText?: string;
  okText?: string;
  loading?: boolean;

  showInput?: boolean; 
  inputLabel?: string; 
  inputPlaceholder?: string;
  required?: boolean;
};

export type TDialogCallback = {
  text?: string;
  onClose(): void;
  open: boolean;
  okText?: string;
};

export type TDialogPrompt = {
  title?: string;
  label?: string;
  open: boolean;
  onClose(): void;
  onCancel?(): void;
  onOk(): void;
  value?: string;
  onChange?(val: string): void;
  okText?: string;
  cancelText?: string;
  placeholder?: string;
  multiline?: boolean;
  required?: boolean;
  requiredText?: string;
};

// --- Provider ----

export type TDialogProvider = {
  children: ReactNode;
};

export type TDialogContext = {
  alert(
    title?: string,
    text?: string,
    props?: Partial<TDialogAlert>,
  ): Promise<TResolver>;
  callback(text?: string, props?: Partial<TDialogCallback>): Promise<unknown>;
  prompt(
    title?: string,
    label?: string,
    props?: Partial<TDialogPrompt>,
  ): Promise<TResolver>;
};
