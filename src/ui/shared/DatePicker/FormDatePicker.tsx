import { Controller, FieldValues } from "react-hook-form";
import DatePicker from ".";
import { TFormDatePicker } from "./TDatePicker";

const FormDatePicker = <TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  rules,
  shouldUnregister,
  defaultValue,
  disabled,
  onChange,
  ...props
}: TFormDatePicker<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      shouldUnregister={shouldUnregister}
      defaultValue={defaultValue}
      disabled={disabled}
      render={({ field: { onChange: onFormChange, value }, fieldState }) => (
        <DatePicker
          {...props}
          onChange={(data) => {
            onChange?.(data);
            onFormChange(data);
          }}
          value={value}
          error={fieldState.invalid}
          errorText={fieldState.error?.message}
          disabled={disabled}
          required={rules && "required" in rules}
        />
      )}
    />
  );
};

export default FormDatePicker;
