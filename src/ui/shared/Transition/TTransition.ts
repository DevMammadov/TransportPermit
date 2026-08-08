import { ElementType, ReactNode } from "react";

export type TTransitionType = "Skew" | "Opacity" | "SlideUp" | "Collapse";

export type TTransitionProps = {
  enter?: string;
  enterFrom?: string;
  enterTo?: string;
  entered?: string;
  leave?: string;
  leaveFrom?: string;
  leaveTo?: string;
};

export type TTransition = TTransitionProps & {
  show: boolean;
  unmount?: boolean;
  appear?: boolean;
  as?: ElementType;
  delay?: number;
  beforeEnter?: () => void;
  afterEnter?: () => void;
  beforeLeave?: () => void;
  afterLeave?: () => void;
  className?: string;
  children?: ReactNode;
  type?: TTransitionType;
};
