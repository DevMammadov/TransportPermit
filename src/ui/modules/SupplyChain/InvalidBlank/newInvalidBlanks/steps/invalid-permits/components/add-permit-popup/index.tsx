import { required } from "@/app/utils/formValidators";
import FilterPopup from "@/ui/components/FilterPopup";
import { TAddPermitPopup } from "@/ui/modules/SupplyChain/InvalidBlank/newInvalidBlanks/steps/invalid-permits/components/add-permit-popup/TAddPermitPopup";
import Checkbox from "@/ui/shared/Checkbox";
import FormInput from "@/ui/shared/Input/FormInput";
import FormSelect from "@/ui/shared/Select/FormSelect";

const AddPermitPopup = ({
  control,
  onSubmit,
  isModalOpen,
  setIsModalOpen,
  ranged,
  setRanged,
  renderTrigger,
  damageTypes,
}: TAddPermitPopup) => {
  return (
    <FilterPopup
      title="Yarasız icazə əlavə et"
      subTitle="Yararsız kvotalar haqqında təsvir əlavə edin."
      submitText="Əlavə et"
      resetText="Bağla"
      onSubmit={onSubmit}
      open={isModalOpen}
      onOpenChange={setIsModalOpen}
      renderTrigger={renderTrigger}
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
        name="damageType"
        data={damageTypes}
        optionValue={(d) => d.name}
        optionLabel={(d) => d.name}
        label="Zədələnmə növü"
        labelPosition="outside"
        placeholder="Seçin..."
        control={control}
        rules={required()}
      />
      <FormInput
        name="reason"
        label="Səbəb"
        labelPosition="outside"
        placeholder="Daxil edin..."
        multiline
        control={control}
        rules={required()}
      />
    </FilterPopup>
  );
};

export default AddPermitPopup;
