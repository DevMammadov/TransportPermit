import { Controller, FieldValues } from "react-hook-form";
import { TFormCheckbox } from "./TCheckbox";
import Checkbox from "./index";

const FormCheckbox = <TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  rules,
  shouldUnregister,
  defaultValue = false,
  disabled,
  onChange,
  ...props
}: TFormCheckbox<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      shouldUnregister={shouldUnregister}
      defaultValue={defaultValue}
      disabled={disabled}
      render={({
        field: { ref, value, onChange: onFormChange, ...rest },
        fieldState,
      }) => (
        <Checkbox
          {...props}
          {...rest}
          name={name}
          checked={!!value}
          onChange={(checked) => {
            onChange?.(checked);
            onFormChange(checked);
          }}
          disabled={disabled}
          error={fieldState.invalid}
          errorText={fieldState.error?.message}
          required={rules && "required" in rules}
        />
      )}
    />
  );
};

export default FormCheckbox;
