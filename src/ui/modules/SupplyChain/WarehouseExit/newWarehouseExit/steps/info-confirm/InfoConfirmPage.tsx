import { required } from "@/app/utils/formValidators";
import ListItem from "@/ui/modules/SupplyChain/WarehouseExit/components/list-item";
import { InfoConfirmVM } from "@/ui/modules/SupplyChain/WarehouseExit/newWarehouseExit/steps/info-confirm/InfoConfirmVM";
import Alert from "@/ui/shared/Alert";
import Button from "@/ui/shared/Button";
import FormCheckbox from "@/ui/shared/Checkbox/FormCheckbox";
import { StepLayout } from "@/ui/shared/Stepper/StepLayout";
import ArrowLeftIcon from "@svg/arrow-left.svg?react";
import CheckIcon from "@svg/check.svg?react";

const InfoConfirmPage = () => {
  const {
    declaration,
    prevStep,
    control,
    onSubmit,
    sendingLoading,
    labelsForInfo,
  } = InfoConfirmVM();

  return (
    <StepLayout
      classNames={{ content: "md:w-1/2 md:pr-2.5" }}
      actions={
        <>
          <Button
            variant="LINK"
            className="max-w-60 w-full px-5.5 py-3.5 justify-center text-lg bg-gray-100 text-neutral-900  font-medium leading-6"
            onClick={prevStep}
            icon={ArrowLeftIcon}
            disabled={sendingLoading}
          >
            Geriyə
          </Button>

          <Button
            className="max-w-60 w-full px-5 py-3.5 justify-center text-lg text-white font-medium leading-6"
            icon={CheckIcon}
            iconPosition="end"
            type="submit"
            form="info-confirm-form"
            disabled={sendingLoading}
            loading={sendingLoading}
          >
            Təsdiq et
          </Button>
        </>
      }
    >
      <div className="border border-gray-200 rounded-2xl p-6 text-lg text-slate-800 font-semibold">
        <h3>Kod: {labelsForInfo?.permitCode}</h3>

        <hr className="border-0 h-px bg-gray-200 my-4" />

        <div className="flex flex-col gap-3 text-base text-slate-800">
          <h4 className="font-semibold">Kvota məlumatları</h4>

          <ListItem
            label="Göndərilən region"
            value={labelsForInfo?.regionName}
          />

          <hr className="border-0 h-px bg-gray-200 my-2" />

          <ListItem label="Başlanğıc nömrə" value={declaration?.startNumber} />
          <ListItem label="Son nömrə" value={declaration?.endNumber} />
          <ListItem label="Ümumi say" value={declaration?.totalCount} />

          <hr className="border-0 h-px bg-gray-200 my-2" />

          <ListItem label="Təsvir" value={declaration?.description} vertical />
        </div>
      </div>
      <Alert
        classNames={{ icon: "hidden", wrapper: "p-0" }}
        type="Confirm"
        className="mt-4 border-dashed"
        text={
          <form
            id="info-confirm-form"
            onSubmit={onSubmit}
            className="flex gap-3"
          >
            <FormCheckbox
              label="Məlumatların tam və düzgün olduğunu təsdiq edirəm"
              name="isConfirmed"
              control={control}
              rules={required()}
            />
          </form>
        }
      />
    </StepLayout>
  );
};

export default InfoConfirmPage;
