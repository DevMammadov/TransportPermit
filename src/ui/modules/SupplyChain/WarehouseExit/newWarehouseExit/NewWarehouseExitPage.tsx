import { NewWarehouseExitVM } from "@/ui/modules/SupplyChain/WarehouseExit/newWarehouseExit/NewWarehouseExitVM";
import InfoConfirmPage from "@/ui/modules/SupplyChain/WarehouseExit/newWarehouseExit/steps/info-confirm/InfoConfirmPage";
import QuotaInfoPage from "@/ui/modules/SupplyChain/WarehouseExit/newWarehouseExit/steps/quota-info/QuotaInfoPage";
import { warehouseExitSteps } from "@/ui/modules/SupplyChain/WarehouseExit/page-data";
import Stepper from "@/ui/shared/Stepper";

const NewWarehouseExitPage = () => {
  const {} = NewWarehouseExitVM();

  return (
    <Stepper
      baseUrl={(l) => l.warehouseExit.baseUrl}
      stepUrls={warehouseExitSteps}
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

export default NewWarehouseExitPage;
