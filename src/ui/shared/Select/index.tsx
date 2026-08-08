import InputLabel from "@/ui/shared/InputLabel";
import { Listbox, Transition } from "@headlessui/react";
import CheckIcon from "@svg/check.svg?react";
import ChevronDown from "@svg/chevron-down.svg?react";
import { Fragment, useCallback, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { TSelect } from "./TSelect";

const Select = <T,>({
  data = [],
  optionLabel = (d) => String(d),
  optionValue = (d) => d,
  label,
  value,
  className,
  disabled,
  onChange,
  classNames,
  name,
  inputRef,
  error,
  errorText,
  multiple,
  required,
  labelPosition = "inside",
  placeholder,
}: TSelect<T>) => {
  const [selected, setSelected] = useState<T | T[] | undefined>(
    multiple ? [] : undefined,
  );

  const isEqual = useCallback((a: unknown, b: unknown) => {
    if (a && b && typeof a === "object" && typeof b === "object") {
      return (
        (a as any).id === (b as any).id ||
        JSON.stringify(a) === JSON.stringify(b)
      );
    }
    return a === b;
  }, []);

  const getValueItems = useCallback(
    (val?: unknown) => {
      if (!val) return multiple ? [] : undefined;

      if (Array.isArray(val)) {
        return data.filter((d) => val.some((v) => isEqual(optionValue(d), v)));
      } else {
        return data.find((d) => isEqual(optionValue(d), val)) ?? undefined;
      }
    },
    [data, multiple, optionValue, isEqual],
  );

  useEffect(() => {
    setSelected(getValueItems(value));
  }, [value, data, getValueItems]);

  const handleSelect = (valueItem: T | T[]) => {
    setSelected(valueItem);

    if (Array.isArray(valueItem)) {
      onChange?.(
        valueItem.map((d) => optionValue(d)),
        valueItem,
      );
    } else {
      onChange?.(optionValue(valueItem), valueItem);
    }
  };

  const selectedLabel = useCallback(
    (item: T | T[] | undefined) => {
      if (!item) return "";

      if (Array.isArray(item)) {
        return item.map((i) => optionLabel(i)).join(", ");
      } else {
        return optionLabel(item as T);
      }
    },
    [optionLabel],
  );

  const hasValue = Array.isArray(selected)
    ? selected.length > 0
    : selected !== undefined && selected !== null;

  const compareBy = useCallback(
    (a: T, b: T) => {
      if (!a || !b) return false;
      return isEqual(optionValue(a), optionValue(b));
    },
    [optionValue, isEqual],
  );

  return (
    <div
      className={twMerge(
        "w-full relative bg-white",
        className,
        labelPosition === "outside" && "h-auto",
      )}
    >
      {label && labelPosition === "outside" && (
        <div className="mb-2">
          <InputLabel
            required={required}
            error={error}
            active={true}
            className={twMerge(
              "relative top-0 translate-y-0 text-sm font-medium text-gray-700",
              classNames?.label,
            )}
          >
            {label}
          </InputLabel>
        </div>
      )}

      <Listbox
        value={selected}
        onChange={handleSelect}
        disabled={disabled}
        ref={inputRef}
        name={name}
        multiple={multiple}
        by={compareBy}
      >
        {({ open }) => (
          <div className="relative h-12">
            <Listbox.Button
              className={twMerge(
                "relative w-full cursor-default bg-white text-left focus:outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-white/75 text-gray-800 flex items-center px-4 py-2 rounded overflow-hidden border border-gray-200 h-full",
                disabled && "bg-gray-50",
                error && "border-error-500",
                classNames?.input,
              )}
            >
              <div
                className={twMerge(
                  "cursor-pointer relative grow h-full flex items-center w-[calc(100%-1rem)]",
                  label && labelPosition === "inside" && "pt-4",
                )}
              >
                {label && labelPosition === "inside" && (
                  <InputLabel
                    required={required}
                    error={error}
                    active={open || hasValue}
                    className={twMerge(
                      "text-gray-800 font-md",
                      classNames?.label,
                    )}
                  >
                    {label}
                  </InputLabel>
                )}

                <span
                  className={twMerge(
                    "block truncate select-none text-gray-900",
                    !hasValue && "text-gray-400 font-normal",
                    classNames?.value,
                  )}
                >
                  {hasValue
                    ? selectedLabel(selected)
                    : labelPosition === "outside"
                      ? placeholder
                      : ""}
                </span>
              </div>

              <span className="pointer-events-none inset-y-0 right-0 flex items-center">
                <ChevronDown
                  className={twMerge(
                    open ? "rotate-180" : "rotate-0",
                    "h-6 w-6 text-gray-400 stroke-gray-800 duration-200 transition-all",
                    error && "stroke-error-500",
                    classNames?.icon,
                  )}
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                className={twMerge(
                  "absolute mt-1 max-h-60 w-full overflow-auto rounded-ee-md rounded-es-md bg-white py-1 text-base shadow-md ring-1 ring-black/5 focus:outline-none sm:text-lg z-10",
                  classNames?.options,
                )}
              >
                {data.map((item, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active, selected }) =>
                      twMerge(
                        "flex gap-3 [&>svg]:w-0 relative cursor-pointer select-none py-2 pl-4",
                        !selected && "hover:bg-gray-50",
                        active && "bg-primary-transparent",
                        selected && "bg-blue-100/60",
                        selected &&
                          multiple &&
                          "bg-white text-gray-800 [&>svg]:stroke-blue-500 [&>svg]:w-5",
                        classNames?.option,
                      )
                    }
                    value={item}
                  >
                    {multiple && <CheckIcon className="stroke-gray-800" />}
                    <span className="block truncate">{optionLabel(item)}</span>
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
      {errorText && <span className="text-xs text-error-500">{errorText}</span>}
    </div>
  );
};

export default Select;
