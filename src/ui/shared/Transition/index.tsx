import { Transition as HeadlessTransition } from "@headlessui/react";
import { TTransition, TTransitionProps, TTransitionType } from "./TTransition";
import { Fragment } from "react";

const transitionTypes: Record<TTransitionType, TTransitionProps> = {
  Skew: {
    enter: "ease-out duration-300",
    enterFrom: "opacity-0 scale-95",
    enterTo: "opacity-100 scale-100",
    leave: "ease-in duration-200",
    leaveFrom: "opacity-100 scale-100",
    leaveTo: "opacity-0 scale-95",
  },
  Opacity: {
    enter: "transition-opacity duration-300",
    enterFrom: "opacity-0",
    enterTo: "opacity-100",
    leave: "transition-opacity duration-300",
    leaveFrom: "opacity-100",
    leaveTo: "opacity-0",
  },
  SlideUp: {
    enter: "transition ease-out duration-200",
    enterFrom: "opacity-0 translate-y-1",
    enterTo: "opacity-100 translate-y-0",
    leave: "transition ease-in duration-150",
    leaveFrom: "opacity-100 translate-y-0",
    leaveTo: "opacity-0 translate-y-1",
  },
  Collapse: {
    enter: "transition-[max-height] duration-200 ease-in-out overflow-hidden",
    enterFrom: "max-h-0",
    enterTo: "max-h-60",
    leave: "transition-[max-height] duration-200 ease-in-out overflow-hidden",
    leaveFrom: "max-h-60",
    leaveTo: "max-h-0",
  },
};

const addDelay = (transitionObj: TTransitionProps, delay?: number) => {
  return { ...transitionObj, enter: `${transitionObj.enter} delay-${delay}` };
};

const Transition = ({ type = "Skew", delay = 0, ...props }: TTransition) => {
  return (
    <HeadlessTransition
      appear
      as={Fragment}
      {...addDelay(transitionTypes[type], delay)}
      {...props}
    >
      {props.children}
    </HeadlessTransition>
  );
};

export default Transition;
