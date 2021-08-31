//custom hook
import { useEffect, useState } from "react";
import { api, Currency } from "../api";

export function useExchange() {
  const [inputOne, setinputOne] = useState<number | null>(null);
  const [inputTwo, setinputTwo] = useState<number | null>(null);
  const [currencyOne, setCurrencyOne] = useState<Currency>("EUR");
  const [currencyTwo, setCurrencyTwo] = useState<Currency>("USD");
  const [rate, setRate] = useState<number>(1);
  const [inputOneChanged, setInputOneChanged] = useState<Boolean>(false);
  const [startDate, setStartDate] = useState<string>(
    new Date().toISOString().replace(/T.*/, "").split("-").join("-")
  );

  useEffect(() => {
    getRates();
  }, [currencyOne, currencyTwo, startDate]);

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

  function processData(data: any) {
    const rate = data[currencyTwo];
    setRate(rate);
  }

  async function getRates() {
    const data = await api(currencyOne, currencyTwo, startDate);
    processData(data.rates);
  }

  let exchangedAmount: number | null;

  if (inputOneChanged) {
    exchangedAmount =
      inputOne !== null ? parseFloat((inputOne * rate).toFixed(4)) : null;
  } else {
    exchangedAmount =
      inputTwo !== null ? parseFloat((inputTwo / rate).toFixed(4)) : null;
  }

  const resultField: string = inputOneChanged
    ? `${inputOne} ${currencyOne} equals${" "}
${exchangedAmount}${" "}
${currencyTwo}`
    : `${exchangedAmount} ${currencyOne} equals${" "}
${inputTwo}${" "}
${currencyTwo}`;

  const resultFieldDisplay =
    inputOne !== null || inputTwo !== null
      ? resultField
      : `Fill the inputs to exchange`;

  const displayFieldPadding =
    inputOne !== null ? { paddingTop: 0 } : { paddingTop: 41.6 };

  const inputOneValue = inputOneChanged
    ? inputOne || undefined
    : exchangedAmount || undefined;

  const inputTwoValue = !inputOneChanged
    ? inputTwo || undefined
    : exchangedAmount || undefined;

  function disabledOptionSelectOne(props: string) {
    return currencyTwo === props ? true : false;
  }

  function disabledOptionSelectTwo(props: string) {
    return currencyOne === props ? true : false;
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
    inputOneChanged,
    processData,
    startDate,
    setStartDate,
    resultField,
    resultFieldDisplay,
    displayFieldPadding,
    inputOneValue,
    inputTwoValue,
    disabledOptionSelectOne,
    disabledOptionSelectTwo,
  };
}
