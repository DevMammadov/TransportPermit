import WavesBlue from "@svg/bg-waves-blue.svg?react";
import WavesOrange from "@svg/bg-waves-orange.svg?react";
import WavesRed from "@svg/bg-waves-red.svg?react";
import CheckIcon from "@svg/check.svg?react";
import CloseIcon from "@svg/close.svg?react";
import ReverceLeftIcon from "@svg/reverse-left.svg?react";
import TrashIcon from "@svg/trash.svg?react";
import RefreshIcon from "@svg/refresh.svg?react";

export enum EDialogTypes {
  "CALLBACK" = 1,
  "ALERT",
  "PROMPT",
}

export enum EDialogVariants {
  DANGER = "DANGER",
  REMOVE = "REMOVE",
  INFO = "INFO",
  SUCCESS = "SUCCESS",
  WARNING = "WARNING",
  RESTORE = "RESTORE",
}

export const variantStyles = {
  [EDialogVariants.INFO]: {
    submitBtn: "bg-blue-600",
    iconContainer: "bg-blue-600 stroke-white border-blue-100",
    icon: CheckIcon,
    bgWaves: WavesBlue,
  },
  [EDialogVariants.RESTORE]: {
    submitBtn: "bg-blue-600",
    iconContainer: "bg-blue-600 stroke-white border-blue-100",
    icon: RefreshIcon,
    bgWaves: WavesBlue,
  },
  [EDialogVariants.SUCCESS]: {
    submitBtn: "bg-blue-600",
    iconContainer: "bg-blue-600 stroke-white border-blue-100",
    icon: CheckIcon,
    bgWaves: WavesBlue,
  },
  [EDialogVariants.DANGER]: {
    submitBtn: "bg-error-600",
    iconContainer: "bg-error-600 stroke-white border-error-100",
    icon: CloseIcon,
    bgWaves: WavesRed,
  },
  [EDialogVariants.REMOVE]: {
    submitBtn: "bg-error-600",
    iconContainer: "bg-error-600 stroke-white border-error-100",
    icon: TrashIcon,
    bgWaves: WavesRed,
  },
  [EDialogVariants.WARNING]: {
    submitBtn: "bg-warning-600",
    iconContainer: "bg-warning-600 stroke-white border-warning-100",
    icon: ReverceLeftIcon,
    bgWaves: WavesOrange,
  },
};
