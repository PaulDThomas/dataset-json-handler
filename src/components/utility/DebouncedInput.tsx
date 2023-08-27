import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";

interface DebouncedInputProps {
  value: string;
  setValue?: (ret: string) => void;
  delay?: number;
  style?: React.CSSProperties;
  type?: "text" | "number" | "date" | "datetime" | "time";
}

export const DebouncedInput = ({
  value,
  setValue,
  delay = 500,
  style = {},
  type = "text",
}: DebouncedInputProps): JSX.Element => {
  const [currentValue, setCurrentValue] = useState<string>(value);
  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const debouncedValue = useDebounce<string>(currentValue, delay);
  useEffect(() => {
    debouncedValue !== value && setValue && setValue(debouncedValue);
  }, [debouncedValue, setValue, value]);

  return (
    <input
      type={type}
      style={{ border: "1px solid black", padding: "0 4px", ...style }}
      value={currentValue}
      disabled={!setValue}
      onChange={(e) => {
        e.stopPropagation();
        setCurrentValue(e.currentTarget.value);
      }}
    />
  );
};

DebouncedInput.displayName = "DebouncedInput";
