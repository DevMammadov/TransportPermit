import { mergeWith } from "lodash";
import { twMerge } from "tailwind-merge";

export const mergeClassNames = <T extends Partial<{ classNames: unknown }>>(
  defaultClassNames: T["classNames"],
  newClassNames: T["classNames"],
) => {
  return mergeWith(defaultClassNames, newClassNames, (objValue, srcValue) => {
    return twMerge(objValue, srcValue);
  });
};

type PersonWithOptionalFields = {
  [key: string]: any;
  name?: string | null;
  surname?: string | null;
  patronymic?: string | null;
};

export const getFullName = (obj?: PersonWithOptionalFields | null) => {
  if (obj) {
    const { name, patronymic, surname } = obj;
    const fullName = [];

    if (name) {
      fullName.push(name);
    }

    if (surname) {
      fullName.push(surname);
    }

    if (patronymic) {
      fullName.push(patronymic);
    }

    return fullName.join(" ");
  }

  return "";
};
