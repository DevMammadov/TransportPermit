import InfoConfirmPage from "@/ui/modules/SupplyChain/PermitBlank/newPermitBlank/steps/info-confirm/InfoConfirmPage";
import QuotaInfoPage from "@/ui/modules/SupplyChain/PermitBlank/newPermitBlank/steps/quota-info/QuotaInfoPage";
import { permitBlankSteps } from "@/ui/modules/SupplyChain/PermitBlank/page-data";

import Stepper from "@/ui/shared/Stepper";

const NewPermitBlankPage = () => {
  return (
    <Stepper
      baseUrl={(l) => l.permitBlankRegistration.baseUrl}
      stepUrls={permitBlankSteps}
    >
      <Stepper.Step label="Kvota məlumatları">
        <QuotaInfoPage />
      </Stepper.Step>

      <Stepper.Step label="Məlumatların təsdiqi">
        <InfoConfirmPage />
      </Stepper.Step>
    </Stepper>
  );
};

export default NewPermitBlankPage;
