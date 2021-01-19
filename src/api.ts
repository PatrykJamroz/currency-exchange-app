export type Currency = "USD" | "EUR" | "PLN";

type Rates = Record<Currency, number>;

interface ApiResponse {
  base: Currency;
  date: string;
  rates: Record<string, Rates>;
}

export async function api(
  fromCurrency: Currency,
  toCurrency: Currency,
  startDate: string,
  todayDate: string
): Promise<ApiResponse> {
  const url = `https://api.exchangeratesapi.io/history?start_at=${startDate}&end_at=${todayDate}&base=${fromCurrency}&symbols=${toCurrency}`;
  const res = await fetch(url);
  return res.json();
}
