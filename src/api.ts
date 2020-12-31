export type Currency = "USD" | "EUR" | "PLN";

interface ApiResponse {
  base: Currency;
  date: string;
  rates: Record<Currency, number>;
}

export async function api(
  fromCurrency: Currency,
  toCurrency: Currency
): Promise<ApiResponse> {
  const url = `https://api.exchangeratesapi.io/latest?base=${fromCurrency}&symbols=${toCurrency}`;
  const res = await fetch(url);
  return res.json();
}
