import { NewInvalidBlanksVM } from "@/ui/modules/SupplyChain/InvalidBlank/newInvalidBlanks/NewInvalidBlanksVM";
import InfoConfirmPage from "@/ui/modules/SupplyChain/InvalidBlank/newInvalidBlanks/steps/info-confirm/InfoConfirmPage";
import InvalidPermitsPage from "@/ui/modules/SupplyChain/InvalidBlank/newInvalidBlanks/steps/invalid-permits2/InvalidPermitsPage";
import PermitInfoPage from "@/ui/modules/SupplyChain/InvalidBlank/newInvalidBlanks/steps/permit-info/PermitInfoPage";
import { invalidBlankSteps } from "@/ui/modules/SupplyChain/InvalidBlank/page-data";
import Stepper from "@/ui/shared/Stepper";

const NewInvalidBlanksPage = () => {
  const {} = NewInvalidBlanksVM();
  return (
    <Stepper
      baseUrl={(l) => l.invalidPermitBlank.baseUrl}
      stepUrls={invalidBlankSteps}
    >
      <Stepper.Step label="İcazə məlumatları">
        <PermitInfoPage />
      </Stepper.Step>

      <Stepper.Step label="Zədələnmiş icazələr">
        <InvalidPermitsPage />
      </Stepper.Step>

      <Stepper.Step label="Məlumatların təsdiqi">
        <InfoConfirmPage />
      </Stepper.Step>
    </Stepper>
  );
};

export default NewInvalidBlanksPage;
