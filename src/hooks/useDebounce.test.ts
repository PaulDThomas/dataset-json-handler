import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "./useDebounce";

describe("useDebounce", () => {
  test("Should return the initial value, and change current value", async () => {
    const { result, rerender } = renderHook(() => useDebounce("initial value", jest.fn()));
    expect(result.current.currentValue).toBe("initial value");

    act(() => {
      rerender();
    });

    expect(result.current.currentValue).toBe("initial value");

    act(() => {
      result.current.setCurrentValue("new value");
    });

    expect(result.current.currentValue).toBe("new value");
  });

  test("Should update debouncedValue and call setValue when debouncedValue changes", () => {
    const setValueMock = jest.fn();
    jest.useFakeTimers();
    const { result } = renderHook(() => useDebounce("initial value", setValueMock));

    expect(result.current.currentValue).toBe("initial value");

    act(() => {
      result.current.setCurrentValue("new value");
    });

    expect(result.current.currentValue).toBe("new value");
    expect(setValueMock).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current.currentValue).toBe("new value");
    expect(setValueMock).toHaveBeenCalledWith("new value");
  });
});
