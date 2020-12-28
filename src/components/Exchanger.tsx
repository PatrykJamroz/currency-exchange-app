import React, { ButtonHTMLAttributes, useState } from "react";

export default function Exchanger() {
  const [amount, setAmount] = useState<number | null>(null);
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [exchangedVal, setExchangedVal] = useState(0);
  const [date, setDate] = useState("");

  function amountChange(e: React.FormEvent<HTMLInputElement>) {
    setAmount(Number(e.currentTarget.value));
    //console.log(amount);
  }

  function fromChange(e: React.FormEvent<HTMLSelectElement>) {
    setFromCurrency(e.currentTarget.value);
    //console.log(fromCurrency);
  }

  function toChange(e: React.FormEvent<HTMLSelectElement>) {
    setToCurrency(e.currentTarget.value);
    //console.log(toCurrency);
  }

  function exchange(fromCurrency: string, toCurrency: string, amount: number) {
    let link = `https://api.exchangeratesapi.io/latest?base=${fromCurrency}&symbols=${toCurrency}`;
    fetch(link)
      .then((res) => res.json())
      //.then((data) => console.log(data.rates[toCurrency]));
      .then((data) => {
        return [amount * data.rates[toCurrency], data.date];
      })
      .then((calculatedVal) => {
        setExchangedVal(calculatedVal[0]);
        setDate(calculatedVal[1]);
      });
  }

  function handleClick(event: React.MouseEvent) {
    event.preventDefault();
    if (amount === null) {
      return;
    }
    exchange(fromCurrency, toCurrency, amount);
  }

  return (
    <div>
      <form>
        <label>
          Amount:
          <input
            name="amount"
            type="number"
            value={amount || undefined}
            onChange={amountChange}
          />
        </label>
        <br />
        <label>
          From:
          <select value={fromCurrency} onChange={fromChange}>
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="PLN">PLN</option>
          </select>
        </label>
        <label>
          To:
          <select value={toCurrency} onChange={toChange}>
            <option value="USD">USD</option>
            <option value="PLN">PLN</option>
            <option value="EUR">EUR</option>
          </select>
        </label>
        <br />
        <button onClick={handleClick}>Exchange!</button>
      </form>
      <h3>
        {amount} {fromCurrency} = {exchangedVal} {toCurrency}
      </h3>
      <p>date: {date}</p>
      <p>
        source: <a href="https://exchangeratesapi.io/">exchangeratesapi</a>
      </p>
    </div>
  );
}
