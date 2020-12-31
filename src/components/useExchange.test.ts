import { act, renderHook } from "@testing-library/react-hooks";
import { useExchange } from "./useExchange";

describe("useExchange", () => {
  it("change amount", () => {
    const { result } = renderHook(() => useExchange());
    act(() => {
      result.current.amountChange({ currentTarget: { value: "15" } } as any);
    });

    expect(result.current.amount).toBe(15);
  });
});
