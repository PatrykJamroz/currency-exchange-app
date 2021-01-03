//custom hook

import { useEffect, useState } from "react";
import { api, Currency } from "../api";

export function useExchange() {
  const [inputOne, setinputOne] = useState<number | null>(null);
  const [inputTwo, setinputTwo] = useState<number | null>(null);
  const [currencyOne, setCurrencyOne] = useState<Currency>("EUR");
  const [currencyTwo, setCurrencyTwo] = useState<Currency>("USD");
  const [rate, setRate] = useState(1);
  const [date, setDate] = useState("");
  const [inputOneChanged, setInputOneChanged] = useState<Boolean>(false);

  useEffect(() => {
    getRates();
  }, [currencyOne, currencyTwo]);

  function inputOneChange(e: React.FormEvent<HTMLInputElement>) {
    setinputOne(Number(e.currentTarget.value));
    setInputOneChanged(true);
  }

  function inputTwoChange(e: React.FormEvent<HTMLInputElement>) {
    setinputTwo(Number(e.currentTarget.value));
    setInputOneChanged(false);
  }

  function currencyOneChange(e: React.FormEvent<HTMLSelectElement>) {
    setCurrencyOne(e.currentTarget.value as Currency);
  }

  function currencyTwoChange(e: React.FormEvent<HTMLSelectElement>) {
    setCurrencyTwo(e.currentTarget.value as Currency);
  }

  async function getRates() {
    const data = await api(currencyOne, currencyTwo);
    setRate(data.rates[currencyTwo]);
    setDate(data.date);
  }

  let exchangedAmount: number | null;

  if (inputOneChanged) {
    exchangedAmount =
      inputOne !== null ? parseFloat((inputOne * rate).toFixed(4)) : null;
  } else {
    exchangedAmount =
      inputTwo !== null ? parseFloat((inputTwo / rate).toFixed(4)) : null;
  }

  return {
    currencyOneChange,
    currencyTwoChange,
    inputOne,
    inputTwo,
    currencyOne,
    currencyTwo,
    exchangedAmount,
    inputOneChange,
    inputTwoChange,
    date,
    inputOneChanged,
  };
}
