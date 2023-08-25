import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";

interface DebouncedInputProps {
  value: string;
  setValue: (ret: string) => void;
  delay?: number;
}

export const DebouncedInput = ({
  value,
  setValue,
  delay = 500,
}: DebouncedInputProps): JSX.Element => {
  const [currentValue, setCurrentValue] = useState<string>(value);
  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const debouncedValue = useDebounce<string>(currentValue, delay);
  useEffect(() => {
    if (debouncedValue !== value) setValue(debouncedValue);
  }, [debouncedValue, setValue, value]);

  return (
    <input
      type="text"
      style={{ border: "1px solid black" }}
      value={currentValue}
      onChange={(e) => {
        e.stopPropagation();
        setCurrentValue(e.currentTarget.value);
      }}
    />
  );
};
