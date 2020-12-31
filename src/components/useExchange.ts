import { useEffect, useState } from "react";
import { api, Currency } from "../api";

export function useExchange() {
  const [amount, setAmount] = useState<number | null>(null);
  const [fromCurrency, setFromCurrency] = useState<Currency>("EUR");
  const [toCurrency, setToCurrency] = useState<Currency>("USD");
  const [rate, setRate] = useState(1);
  const [date, setDate] = useState("");

  useEffect(() => {
    getRates();
  }, [toCurrency, fromCurrency]);

  function amountChange(e: React.FormEvent<HTMLInputElement>) {
    setAmount(Number(e.currentTarget.value));
  }

  function fromChange(e: React.FormEvent<HTMLSelectElement>) {
    setFromCurrency(e.currentTarget.value as Currency);
  }

  function toChange(e: React.FormEvent<HTMLSelectElement>) {
    setToCurrency(e.currentTarget.value as Currency);
  }

  async function getRates() {
    const data = await api(fromCurrency, toCurrency);
    setRate(data.rates[toCurrency]);
    setDate(data.date);
  }

  const exchangedAmount = amount !== null ? amount * rate : null;
  return {
    toChange,
    fromChange,
    amount,
    fromCurrency,
    toCurrency,
    exchangedAmount,
    amountChange,
    date,
  };
}
