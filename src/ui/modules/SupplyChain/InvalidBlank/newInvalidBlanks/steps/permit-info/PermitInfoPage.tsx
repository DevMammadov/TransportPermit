import { required } from "@/app/utils/formValidators";
import { PermitInfoVM } from "./PermitInfoVM";
import Alert from "@/ui/shared/Alert";
import Button from "@/ui/shared/Button";
import FormInput from "@/ui/shared/Input/FormInput";
import FormSelect from "@/ui/shared/Select/FormSelect";
import { StepLayout } from "@/ui/shared/Stepper/StepLayout";
import ArrowRightIcon from "@svg/arrow-right.svg?react";
import XCloseIcon from "@svg/x-close.svg?react";

const PermitInfoPage = () => {
  const { onSubmit, control, permitCodes } = PermitInfoVM();

  return (
    <StepLayout
      classNames={{ content: "md:w-1/2 md:pr-2.5" }}
      actions={
        <>
          <Button
            variant="LINK"
            className="max-w-60 w-full px-5.5 py-3.5 justify-center text-lg bg-gray-100 text-neutral-900  font-medium leading-6"
            icon={XCloseIcon}
            to={(to) => to.invalidPermitBlank.baseUrl}
          >
            İmtina
          </Button>

          <Button
            className="max-w-60 w-full px-5 py-3.5 justify-center text-lg text-white font-medium leading-6"
            type="submit"
            form="quota-info-form"
            icon={ArrowRightIcon}
            iconPosition="end"
          >
            Növbəti
          </Button>
        </>
      }
    >
      <Alert
        className="mb-6"
        title="Qırmızı ilə işarə edilmiş xanalar vacib doldurulmalı xanalardır!"
      />
      <form
        id="quota-info-form"
        className="flex flex-col gap-3"
        onSubmit={onSubmit}
      >
        <FormSelect
          name="permitId"
          data={permitCodes?.items}
          optionValue={(d) => d.id}
          optionLabel={(d) => d.code}
          label="İcazənin kodu"
          labelPosition="outside"
          placeholder="Seçin..."
          control={control}
          rules={required()}
        />

        <div className="form-row">
          <FormInput disabled name="country" label="Ölkə" control={control} />
          <FormInput
            disabled
            name="deficiencyLevelType"
            label="İcazə blanklarının defisitliyi"
            control={control}
          />
        </div>
        <div className="form-row">
          <FormInput
            disabled
            name="permitType"
            label="İcazənin tipi"
            control={control}
          />
          <FormInput
            disabled
            name="permitCategory"
            label="İcazənin növü"
            control={control}
          />
        </div>
      </form>
    </StepLayout>
  );
};

export default PermitInfoPage;
