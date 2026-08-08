import { required } from "@/app/utils/formValidators";
import { QuotaInfoVM } from "@/ui/modules/SupplyChain/PointTransfer/newPointTransfer/steps/quota-info/QuotaInfoVM";
import Alert from "@/ui/shared/Alert";
import Button from "@/ui/shared/Button";
import FormInput from "@/ui/shared/Input/FormInput";
import FormSelect from "@/ui/shared/Select/FormSelect";
import { StepLayout } from "@/ui/shared/Stepper/StepLayout";
import ArrowRightIcon from "@svg/arrow-right.svg?react";
import XCloseIcon from "@svg/x-close.svg?react";

const QuotaInfoPage = () => {
  const { onSubmit, control, receivingRegions } = QuotaInfoVM();

  return (
    <StepLayout
      classNames={{ content: "md:w-1/2 md:pr-2.5" }}
      actions={
        <>
          <Button
            variant="LINK"
            className="max-w-60 w-full px-5.5 py-3.5 justify-center text-lg bg-gray-100 text-neutral-900  font-medium leading-6"
            to={(to) => to.pointTransfer.baseUrl}
            icon={XCloseIcon}
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
          name="permitCode"
          data={[]}
          optionValue={(d) => d}
          optionLabel={(d) => d}
          label="İcazənin kodu"
          labelPosition="outside"
          placeholder="Seçin..."
          control={control}
          rules={required()}
        />
        <FormSelect
          name="receivingRegion"
          data={receivingRegions}
          optionValue={(d) => d.id}
          optionLabel={(d) => d.value}
          label="Qəbul edən region"
          labelPosition="outside"
          placeholder="Seçin..."
          control={control}
          rules={required()}
        />
        <div className="form-row">
          <FormInput
            name="startNumber"
            label="Başlanğıc nömrə"
            labelPosition="outside"
            placeholder="Daxil edin..."
            control={control}
            rules={required()}
          />
          <FormInput
            name="endNumber"
            label="Son nömrə"
            labelPosition="outside"
            placeholder="Daxil edin..."
            control={control}
            rules={required()}
          />
        </div>
        <FormInput
          disabled
          name="totalCount"
          label="Ümumi say"
          // labelPosition="outside"
          // placeholder="Daxil edin..."
          control={control}
        />
        <FormInput
          name="description"
          label="Təsvir"
          labelPosition="outside"
          placeholder="Daxil edin..."
          multiline
          control={control}
          rules={required()}
        />
      </form>
    </StepLayout>
  );
};

export default QuotaInfoPage;
