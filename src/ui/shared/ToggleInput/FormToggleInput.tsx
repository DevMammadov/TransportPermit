import { Controller } from "react-hook-form";
import { TFormToggleInput } from "@/ui/shared/ToggleInput/TToggleInput";
import ToggleInput from ".";

const FormToggleInput = ({
  name,
  control,
  rules,
  shouldUnregister,
  defaultValue,
  disabled,
  error,
  errorText,
  required,
  selectProps,
  inputProps,
  ...props
}: TFormToggleInput) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      shouldUnregister={shouldUnregister}
      defaultValue={defaultValue}
      disabled={disabled}
      render={({ field, fieldState }) => {
        return (
          <ToggleInput
            error={fieldState.invalid}
            selectProps={{
              error: fieldState.invalid,
              errorText: fieldState.error?.message,
              ...selectProps,
            }}
            inputProps={{
              ...field,
              ...inputProps,
            }}
            disabled={disabled}
            required={rules && "required" in rules}
            {...props}
          />
        );
      }}
    />
  );
};

export default FormToggleInput;
