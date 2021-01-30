import { act, renderHook } from "@testing-library/react-hooks";
import { useExchange } from "./useExchange";

describe("useExchange", () => {
  it("change inputOne", () => {
    const { result } = renderHook(() => useExchange());
    act(() => {
      result.current.inputOneChange({ currentTarget: { value: "15" } } as any);
    });

    expect(result.current.inputOne).toBe(15);
  });
  it("change inputTwo", () => {
    const { result } = renderHook(() => useExchange());
    act(() => {
      result.current.inputTwoChange({ currentTarget: { value: "10" } } as any);
    });

    expect(result.current.inputTwo).toBe(10);
  });

  it("change currencyOne", () => {
    const { result } = renderHook(() => useExchange());
    act(() => {
      result.current.currencyOneChange({
        currentTarget: { value: "EUR" },
      } as any);
    });
    expect(result.current.currencyOne).toBe("EUR");
  });

  it("change currencyTwo", () => {
    const { result } = renderHook(() => useExchange());
    act(() => {
      result.current.currencyTwoChange({
        currentTarget: { value: "USD" },
      } as any);
    });
    expect(result.current.currencyTwo).toBe("USD");
  });

  it("handle startDate", () => {
    const { result } = renderHook(() => useExchange());
    act(() => {
      result.current.handleStartDate({
        target: { value: "week" },
      } as any);
    });
    expect(result.current.startDate).toBe(
      new Date(Date.now() - 604800000)
        .toISOString()
        .replace(/T.*/, "")
        .split("-")
        .join("-")
    );
  });
});
