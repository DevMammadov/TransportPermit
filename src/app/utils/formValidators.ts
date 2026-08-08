import dayjs from "dayjs";
import { isNil } from "lodash";
import { RegisterOptions } from "react-hook-form";

export const required = (
  message = "Mütləq doldurulmalıdır",
): Partial<RegisterOptions> => ({
  required: { value: true, message },
  validate: (value: string) => {
    if (isNil(value) || value === "" || value.length === 0) {
      return message;
    }
    return true;
  },
});

export const maxLength = (
  max: number,
  message = `Maximum ${max} simvol ola bilər`,
): Partial<RegisterOptions> => ({
  maxLength: { value: max, message },
});

export const minLength = (
  min: number,
  message = `Minimum ${min} simvol ola bilər`,
): Partial<RegisterOptions> => ({
  minLength: { value: min, message },
});

export const lengthRange = (
  min: number,
  max: number,
  minMessage?: string,
  maxMessage?: string,
): Partial<RegisterOptions> =>
  validate(minLength(min, minMessage), maxLength(max, maxMessage));

export const minDate = (
  date?: Date | string,
  message = `Tarix ${dayjs(date).format("YYYY-MM-DD")}-dən böyük olmalıdır`,
): Partial<RegisterOptions> => ({
  validate: (value: Date) => {
    if (!date) return true;

    const inputDate = dayjs(value);
    if (inputDate.isBefore(dayjs(date))) {
      return message;
    }
    return true;
  },
});

export const maxDate = (
  date?: Date,
  message = `Tarix ${dayjs(date).format("YYYY-MM-DD")}-dən kiçik olmalıdır`,
): Partial<RegisterOptions> => ({
  validate: (value: Date) => {
    if (!date) return true;

    const inputDate = dayjs(value);
    if (inputDate.isAfter(date)) {
      return message;
    }
    return true;
  },
});

export const email = (
  message = "Email düzgün formatda deyil",
): Partial<RegisterOptions> => ({
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message,
  },
});

export const validate = (
  ...validators: Partial<RegisterOptions>[]
): RegisterOptions => {
  return validators.reduce(
    (acc, validator) => ({ ...acc, ...validator }) as RegisterOptions,
    {},
  );
};
