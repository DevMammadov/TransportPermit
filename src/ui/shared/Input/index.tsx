import InputLabel from "@/ui/shared/InputLabel";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./style.css";

import {
  ChangeEvent,
  RefObject,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";
import { InputElement, TInput } from "./TInput";

const Input = forwardRef<InputElement, TInput>(
  (
    {
      className,
      label,
      value,
      onChange,
      icon: Icon,
      iconPosition = "end",
      error,
      errorText,
      classNames,
      multiline,
      disabled,
      required,
      uppercase,
      leading,
      labelPosition = "inside",
      placeholder,
      ...props
    },
    ref,
  ) => {
    const [inputValue, setInputValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<InputElement>(null);

    useImperativeHandle(ref, () => inputRef.current!);

    useEffect(() => {
      if (value) {
        setInputValue(value.toString());
      } else {
        setInputValue("");
      }
    }, [value]);

    const handleChange = (e: ChangeEvent<InputElement>) => {
      if (disabled) return;
      let value = e.target.value;

      if (uppercase) {
        value = value.toUpperCase();
      }

      setInputValue(value);

      onChange?.({ ...e, target: { ...e.target, value } });
    };

    const inputProps = {
      ...props,
      placeholder,
      onFocus: (e: React.FocusEvent<InputElement>) => {
        setIsFocused(true);
        props.onFocus?.(e);
      },
      onBlur: (e: React.FocusEvent<InputElement>) => {
        setIsFocused(false);
        props.onBlur?.(e);
      },
      className: twMerge(
        "w-full h-full bg-transparent text-gray-900 focus:outline-none",
        multiline && "resize-none",
        classNames?.input,
      ),
      value: inputValue,
      onChange: handleChange,
      disabled: disabled,
    };

    const getInput = () => {
      if (inputProps.type === "tel") {
        return (
          <ReactPhoneInput
            {...inputProps}
            country="az"
            value={inputValue || "994"}
            countryCodeEditable={false}
            inputProps={{ ref: inputRef }}
            onChange={(val, _, e) => {
              inputProps.onChange({
                ...e,
                target: { ...e.target, value: val },
              });
            }}
          />
        );
      } else if (multiline) {
        return (
          <textarea
            {...inputProps}
            ref={inputRef as RefObject<HTMLTextAreaElement>}
          />
        );
      } else {
        return (
          <input
            {...inputProps}
            className={twMerge(
              "min-h-4.5 w-full bg-transparent outline-none",
              disabled &&
                labelPosition === "inside" &&
                "text-gray-800 font-semibold",
            )}
            ref={inputRef as RefObject<HTMLInputElement>}
          />
        );
      }
    };

    return (
      <div
        className={twMerge(
          "w-full relative bg-white",
          !multiline && labelPosition === "inside" && "h-auto",
          !multiline && labelPosition === "outside" && "h-auto",
          className,
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

        <div
          className={twMerge(
            "rounded border border-gray-200 px-4 py-2.5 flex items-center select-none gap-2 h-auto",
            multiline && "h-30",
            error && "border-error-500",
            disabled && "bg-gray-50",
            disabled && labelPosition === "inside" && "bg-gray-100 border-none",
            classNames?.container,
          )}
          onClick={(e) => {
            e.stopPropagation();
            inputRef.current?.focus();
          }}
        >
          <div
            className={twMerge(
              "relative h-full flex items-center order-2 w-full",
              label && labelPosition === "inside" && "pt-4 mt-1 leading-0.5",
            )}
          >
            {label && labelPosition === "inside" && (
              <InputLabel
                required={required}
                error={error}
                active={isFocused || !!value || inputProps.type === "tel"}
                className={twMerge(
                  classNames?.label,
                  disabled && "text-gray-400",
                )}
              >
                {label}
              </InputLabel>
            )}

            {(isFocused || inputValue) && <span>{leading}</span>}

            {getInput()}
          </div>
          {Icon && (
            <Icon
              className={twMerge(
                "order-2 stroke-gray-400 w-5 h-5 shrink-0",
                error && "stroke-error-500",
                iconPosition === "start" && "order-1",
                classNames?.icon,
              )}
            />
          )}
        </div>
        {errorText && (
          <span
            className={twMerge("text-xs text-error-500", classNames?.errorText)}
          >
            {errorText}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
