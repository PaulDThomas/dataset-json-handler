import { useEffect, useRef, useState } from "react";

interface DebouncedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  setValue?: (ret: string) => void;
  disabled?: boolean;
  debounceMilliseconds?: number;
  style?: React.CSSProperties;
  type?: "text" | "number" | "date" | "datetime" | "time";
}

export const DebouncedInput = ({
  value,
  setValue,
  disabled = false,
  debounceMilliseconds = 500,
  style = {},
  type = "text",
  ...rest
}: DebouncedInputProps): JSX.Element => {
  const [currentValue, setCurrentValue] = useState<string>(value);
  const [debouncedValue, setDebouncedValue] = useState<string>(value);
  const debounceController = useRef<AbortController | null>(null);
  // Top down update
  useEffect(() => {
    if (debounceController.current) {
      debounceController.current.abort();
    }
    setCurrentValue(value);
    setDebouncedValue(value);
  }, [value]);

  // Update value from debouncedValue
  useEffect(() => {
    if (
      debouncedValue !== value &&
      debounceController.current &&
      !debounceController.current?.signal.aborted &&
      setValue
    ) {
      setValue(debouncedValue);
    }
  }, [debouncedValue, setValue, value]);

  // Update debounce from current
  useEffect(() => {
    if (currentValue !== debouncedValue) {
      if (debounceController.current) debounceController.current.abort();
      debounceController.current = new AbortController();

      const timer = setTimeout(() => {
        if (!debounceController.current?.signal.aborted) {
          setDebouncedValue(currentValue);
        }
      }, debounceMilliseconds);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [currentValue, debounceMilliseconds, debouncedValue]);

  return (
    <input
      {...rest}
      type={type}
      style={{ border: "1px solid black", padding: "0 4px", ...style }}
      value={currentValue}
      disabled={!setValue || disabled}
      onChange={(e) => {
        e.stopPropagation();
        e.preventDefault();
        setValue && setCurrentValue(e.currentTarget.value);
      }}
      onBlur={
        setValue
          ? (e) => {
              const n = e.currentTarget.value;
              if (debounceController.current) {
                debounceController.current.abort();
              }
              setCurrentValue(n);
              setDebouncedValue(n);
              n !== value && setValue(n);
            }
          : undefined
      }
    />
  );
};

DebouncedInput.displayName = "DebouncedInput";
