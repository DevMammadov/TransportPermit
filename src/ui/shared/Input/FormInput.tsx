import { Controller, FieldValues } from "react-hook-form";
import Input from ".";
import { TFormInput } from "./TInput";

const FormInput = <TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  rules,
  shouldUnregister,
  defaultValue,
  disabled,
  ...props
}: TFormInput<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      shouldUnregister={shouldUnregister}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => {
        return (
          <Input
            {...field}
            {...props}
            error={fieldState.invalid}
            errorText={fieldState.error?.message}
            disabled={disabled}
            required={rules && "required" in rules}
          />
        );
      }}
    />
  );
};

export default FormInput;
