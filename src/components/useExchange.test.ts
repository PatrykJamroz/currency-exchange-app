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
});
