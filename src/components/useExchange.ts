//custom hook
import { useEffect, useState } from "react";
import { api, Currency } from "../api";

export function useExchange() {
  const [inputOne, setinputOne] = useState<number | null>(null);
  const [inputTwo, setinputTwo] = useState<number | null>(null);
  const [currencyOne, setCurrencyOne] = useState<Currency>("EUR");
  const [currencyTwo, setCurrencyTwo] = useState<Currency>("USD");
  const [rate, setRate] = useState<number>(1);
  const [date, setDate] = useState<string>("");
  const [processedData, setprocessedData] = useState<ProcessData[]>([]);
  const [inputOneChanged, setInputOneChanged] = useState<Boolean>(false);
  const [startDate, setStartDate] = useState<string>(
    new Date().toISOString().replace(/T.*/, "").split("-").join("-")
  );
  const todayDate: string = new Date()
    .toISOString()
    .replace(/T.*/, "")
    .split("-")
    .join("-");

  function handleStartDate(event: React.MouseEvent<HTMLElement>): void {
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

  type Rates = Record<Currency, number>;

  function processData(data: any) {
    // const sortedArrOfObj = Object.entries(data)
    //   .map(([key, value]) => ({
    //     date: key,
    //     rate: value[currencyTwo],
    //   }))
    //   .sort((a, b) => {
    //     let x = a.date;
    //     let y = b.date;
    //     return x < y ? -1 : x > y ? 1 : 0;
    //   });
    // setRate(sortedArrOfObj[sortedArrOfObj.length - 1].rate);
    // setDate(sortedArrOfObj[sortedArrOfObj.length - 1].date);
    // setprocessedData(sortedArrOfObj);
    console.log(data);
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

  const resultFieldDate: string = new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const displayFieldPadding =
    inputOne !== null ? { paddingTop: 0 } : { paddingTop: 41.6 };

  const inputOneValue = inputOneChanged
    ? inputOne || undefined
    : exchangedAmount || undefined;

  const inputTwoValue = !inputOneChanged
    ? inputTwo || undefined
    : exchangedAmount || undefined;

  const ratesHistoryStartDate = new Date(startDate).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  );

  const ratesHistoryEndDate = new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

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
    date,
    inputOneChanged,
    processedData,
    processData,
    handleStartDate,
    startDate,
    resultField,
    resultFieldDisplay,
    resultFieldDate,
    displayFieldPadding,
    inputOneValue,
    inputTwoValue,
    ratesHistoryStartDate,
    ratesHistoryEndDate,
    disabledOptionSelectOne,
    disabledOptionSelectTwo,
  };
}
