//custom hook

import { stringify } from "postcss";
import { useEffect, useState } from "react";
import { api, Currency } from "../api";

export function useExchange() {
  const [inputOne, setinputOne] = useState<number | null>(null);
  const [inputTwo, setinputTwo] = useState<number | null>(null);
  const [currencyOne, setCurrencyOne] = useState<Currency>("EUR");
  const [currencyTwo, setCurrencyTwo] = useState<Currency>("USD");
  const [rate, setRate] = useState(1);
  const [date, setDate] = useState("");
  const [processedData, setprocessedData] = useState<ProcessData[]>([]);
  const [inputOneChanged, setInputOneChanged] = useState<Boolean>(false);
  const [startDate, setStartDate] = useState<string>(
    new Date(Date.now() - 604800000)
      .toISOString()
      .replace(/T.*/, "")
      .split("-")
      .join("-")
  ); //YYYY-MM-DD, will be changed depending on period
  const todayDate: string = new Date()
    .toISOString()
    .replace(/T.*/, "")
    .split("-")
    .join("-");

  function handleStartDate(event: React.MouseEvent<HTMLElement>): void {
    event.preventDefault();
    const buttonVal = (event.target as HTMLInputElement).value;
    switch (buttonVal) {
      case "week":
        setStartDate(
          new Date(Date.now() - 604800000)
            .toISOString()
            .replace(/T.*/, "")
            .split("-")
            .join("-")
        );
        break;
      case "month":
        setStartDate(
          new Date(Date.now() - 2629800000)
            .toISOString()
            .replace(/T.*/, "")
            .split("-")
            .join("-")
        );
        break;
      case "year":
        setStartDate(
          new Date(Date.now() - 31557600000)
            .toISOString()
            .replace(/T.*/, "")
            .split("-")
            .join("-")
        );
        break;
    }
  }

  interface ProcessData {
    date: string;
    rate: number;
  }

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

  type Rates = Record<Currency, number>;

  function processData(data: Record<string, Rates>) {
    const sortedArrOfObj = Object.entries(data)
      .map(([key, value]) => ({
        date: key,
        rate: value[currencyTwo],
      }))
      .sort((a, b) => {
        let x = a.date;
        let y = b.date;
        return x < y ? -1 : x > y ? 1 : 0;
      });
    setRate(sortedArrOfObj[sortedArrOfObj.length - 1].rate);
    setDate(sortedArrOfObj[sortedArrOfObj.length - 1].date);
    setprocessedData(sortedArrOfObj);
  }

  async function getRates() {
    const data = await api(currencyOne, currencyTwo, startDate, todayDate);
    processData(data.rates); //object of objects: {"2020-12-03":{"EUR":0.2235486106},"2020-12-23":{"EUR":0.222098834},...
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
    processedData,
    processData,
    handleStartDate,
  };
}
