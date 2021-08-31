import { start } from "repl";

export type Currency = "USD" | "EUR" | "PLN";

export type Rates = Record<Currency, number>;

interface ApiResponse {
  success: boolean;
  timestamp: number;
  base: Currency;
  date: string;
  rates: Rates;
}

export async function api(
  fromCurrency: Currency,
  toCurrency: Currency,
  startDate: string
): Promise<ApiResponse> {
  const url = `http://api.exchangeratesapi.io/v1/${startDate}?access_key=4b94652614852d67e26f6271773b4bbc&base=${fromCurrency}&symbols=${toCurrency}`;
  const res = await fetch(url);
  return res.json();
}

// legacy url: `https://api.exchangeratesapi.io/history?start_at=${startDate}&end_at=${todayDate}&base=${fromCurrency}&symbols=${toCurrency}`
