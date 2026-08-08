import { required } from "@/app/utils/formValidators";
import { InvalidPermitsVM } from "./InvalidPermitsVM";
import Button from "@/ui/shared/Button";
import Checkbox from "@/ui/shared/Checkbox";
import FormInput from "@/ui/shared/Input/FormInput";
import FormSelect from "@/ui/shared/Select/FormSelect";
import { StepLayout } from "@/ui/shared/Stepper/StepLayout";
import ArrowLeftIcon from "@svg/arrow-left.svg?react";
import ArrowRightIcon from "@svg/arrow-right.svg?react";
import { range } from "lodash";

const InvalidPermitsPage = () => {
  const { prevStep, control, onSubmit, ranged, setRanged, damageTypes } =
    InvalidPermitsVM();

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
          >
            Geriyə
          </Button>

          <Button
            className="max-w-60 w-full px-5 py-3.5 justify-center text-lg text-white font-medium leading-6"
            form="invalid-blank-form"
            type="submit"
            icon={ArrowRightIcon}
            iconPosition="end"
          >
            Növbəti
          </Button>
        </>
      }
    >
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-3"
        id="invalid-blank-form"
      >
        <FormInput
          name="startNumber"
          label="Başlanğıc nömrə"
          labelPosition="outside"
          placeholder="Daxil edin..."
          type="number"
          control={control}
          rules={required()}
        />
        <Checkbox
          classNames={{ label: "text-sm text-gray-900" }}
          label="Aralıq daxil et"
          name="range"
          checked={ranged}
          onChange={setRanged}
        />
        <FormInput
          name="endNumber"
          label="Son nömrə"
          labelPosition="outside"
          placeholder="Daxil edin..."
          type="number"
          control={control}
          rules={ranged && required()}
          disabled={!ranged}
        />
        <FormSelect
          name="applicableYear"
          data={range(1950, new Date().getFullYear() + 1).reverse()}
          optionValue={(d) => d}
          optionLabel={(d) => `${d}`}
          label="İcazənin aid olduğu il"
          labelPosition="outside"
          placeholder="Seçin..."
          control={control}
          rules={required()}
        />
        <FormSelect
          name="damageTypeId"
          data={damageTypes}
          optionValue={(d) => d.id}
          optionLabel={(d) => d.value}
          label="Zədələnmə növü"
          labelPosition="outside"
          placeholder="Seçin..."
          control={control}
          rules={required()}
        />

        <FormInput
          name="damageReason"
          label="Səbəb"
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

export default InvalidPermitsPage;
