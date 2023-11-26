import { Dispatch, useEffect, useRef, useState } from "react";

/**
 * Returns a debounced value, a function to update it before the debounce occurs, with an inbuilt abort controller
 * @param value The value to be debounced
 * @param setValue Used to update the value after debounce
 * @param debounceMilliseconds Number of milliseconds to debounce by, defaults to 500
 * @returns currentValue, setCurrentValue
 */
export const useDebounce = (
  value: string,
  setValue: Dispatch<string>,
  debounceMilliseconds = 500,
): {
  currentValue: string;
  setCurrentValue: Dispatch<string>;
} => {
  const [currentValue, setCurrentValue] = useState<string>(value);
  const [debouncedValue, setDebouncedValue] = useState<string>(value);
  const debounceController = useRef<AbortController>(new AbortController());

  // Top down update
  useEffect(() => {
    debounceController.current.abort();
    setCurrentValue(value);
    setDebouncedValue(value);
  }, [value]);

  // Update value from debouncedValue
  useEffect(() => {
    if (debouncedValue !== value && !debounceController.current.signal.aborted) {
      setCurrentValue(debouncedValue);
      setValue(debouncedValue);
    }
  }, [debouncedValue, setValue, value]);

  // Update debounce from current
  useEffect(() => {
    if (currentValue !== debouncedValue) {
      debounceController.current.abort();
      debounceController.current = new AbortController();

      const timer = setTimeout(() => {
        if (!debounceController.current.signal.aborted) {
          setDebouncedValue(currentValue);
        }
      }, debounceMilliseconds);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [currentValue, debounceMilliseconds, debouncedValue]);

  return { currentValue, setCurrentValue };
};
