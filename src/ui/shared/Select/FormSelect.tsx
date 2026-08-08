import { Controller, FieldValues } from "react-hook-form";
import { TFormSelect } from "./TSelect";
import Select from "./index";

const FormSelect = <TData, TFieldValues extends FieldValues = FieldValues>({
  rules,
  control,
  name,
  shouldUnregister,
  defaultValue,
  disabled,
  onChange,
  ...props
}: TFormSelect<TData, TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      shouldUnregister={shouldUnregister}
      defaultValue={defaultValue}
      disabled={disabled}
      render={({
        field: { ref, onChange: onFormChange, ...rest },
        fieldState,
      }) => (
        <Select
          onChange={(value, item): void => {
            onChange?.(value, item);
            onFormChange(value);
          }}
          {...props}
          {...rest}
          disabled={disabled}
          inputRef={ref}
          error={fieldState.invalid}
          errorText={fieldState.error?.message}
          required={rules && "required" in rules}
        />
      )}
    />
  );
};

export default FormSelect;
