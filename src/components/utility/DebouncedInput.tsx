import { useDebounce } from "../../hooks/useDebounce";

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
  const { currentValue, setCurrentValue } = useDebounce(
    value,
    setValue ?? (() => ({})),
    debounceMilliseconds,
  );
  return (
    <input
      {...rest}
      type={type}
      style={{ border: "1px solid black", padding: "0 4px", ...style }}
      value={currentValue}
      disabled={!setValue || disabled}
      onChange={(e) => {
        e.preventDefault();
        setValue && setCurrentValue(e.currentTarget.value);
      }}
      onBlur={(e) => {
        e.preventDefault();
        setValue && setValue(e.currentTarget.value);
      }}
    />
  );
};

DebouncedInput.displayName = "DebouncedInput";
