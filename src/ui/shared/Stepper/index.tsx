import { links } from "@/app/routes/links";
import TabPanel from "@/ui/shared/TabPanel";
import React, {
  Children,
  isValidElement,
  useEffect,
  useLayoutEffect,
  useMemo,
} from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import ProgressStepper from "./ProgressStepper";
import { StepsContext } from "./StepperContext";
import { TStepperProps, TStepperUrlParams, TStepProps } from "./TStepper";

const Stepper = <T extends readonly string[]>({
  stepUrls,
  baseUrl,
  className,
  children,
}: TStepperProps<T>) => {
  const { page, step, id } = useParams<TStepperUrlParams>();
  const location = useLocation();
  const navigate = useNavigate();

  const currentIndex = useMemo(() => {
    return step ? stepUrls.indexOf(step) : 0;
  }, [step, stepUrls]);

  const resolvedBaseUrl = useMemo(() => baseUrl(links), [baseUrl]);

  const generateStepUrl = (target: T[number]) => {
    const pagePart = page ? `/${page}` : "";
    const idPart = id ? `/${id}` : "";
    return `${resolvedBaseUrl}${pagePart}/${target}${idPart}${location.search}${location.hash}`;
  };

  const toStep = (target: T[number]) => {
    navigate(generateStepUrl(target));
  };

  const nextStep = () => {
    const nextKey = stepUrls[currentIndex + 1];
    if (nextKey) toStep(nextKey);
  };

  const prevStep = () => {
    const prevKey = stepUrls[currentIndex - 1];
    if (prevKey) toStep(prevKey);
  };

  useEffect(() => {
    if (!step && stepUrls.length > 0) {
      toStep(stepUrls[0]);
    }
  }, [step, stepUrls]);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const ctxValue = useMemo(
    () => ({
      steps: stepUrls,
      step,
      toStep,
      nextStep,
      prevStep,
      currentIndex,
      isLastStep: currentIndex === stepUrls.length - 1,
      isEdit: page === "update",
      editId: id,
    }),
    [stepUrls, step, currentIndex, id],
  );

  const stepMeta = useMemo(() => {
    return Children.toArray(children)
      .filter(
        (child): child is React.ReactElement<TStepProps> =>
          isValidElement(child) && child.type === Stepper.Step,
      )
      .map((child) => ({ label: child.props.label }));
  }, [children]);

  return (
    <StepsContext.Provider value={ctxValue}>
      <div
        className={twMerge(
          "relative h-full flex flex-col gap-6 w-full min-h-0 overflow-hidden",
          className,
        )}
      >
        <ProgressStepper
          steps={stepMeta}
          activeStep={currentIndex}
          onStepClick={(index) => toStep(stepUrls[index])}
        />

        <div className="grow min-h-0 h-full w-full overflow-hidden">
          <TabPanel
            value={currentIndex}
            className="h-full w-full flex flex-col min-h-0"
          >
            {Children.toArray(children).filter(
              (child) => isValidElement(child) && child.type === Stepper.Step,
            )}
          </TabPanel>
        </div>
      </div>
    </StepsContext.Provider>
  );
};

Stepper.Step = ({ children }: TStepProps) => <>{children}</>;

export { useSteps } from "./StepperContext";
export default Stepper;
