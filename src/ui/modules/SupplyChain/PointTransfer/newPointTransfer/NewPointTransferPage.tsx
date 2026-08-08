import { NewPointTransferVM } from "@/ui/modules/SupplyChain/PointTransfer/newPointTransfer/NewPointTransferVM";
import InfoConfirmPage from "@/ui/modules/SupplyChain/PointTransfer/newPointTransfer/steps/info-confirm/InfoConfirmPage";
import QuotaInfoPage from "@/ui/modules/SupplyChain/PointTransfer/newPointTransfer/steps/quota-info/QuotaInfoPage";
import { pointTransferSteps } from "@/ui/modules/SupplyChain/PointTransfer/page-data";

import Stepper from "@/ui/shared/Stepper";

const NewPointTransferPage = () => {
  const {} = NewPointTransferVM();

  return (
    <Stepper
      baseUrl={(l) => l.pointTransfer.baseUrl}
      stepUrls={pointTransferSteps}
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

export default NewPointTransferPage;
