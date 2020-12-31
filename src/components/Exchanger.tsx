import React, { ButtonHTMLAttributes, useState } from "react";
import { useExchange } from "./useExchange"; //custom hook

export default function Exchanger() {
  const echangedValues = useExchange();
  return (
    <div>
      <form>
        <label>
          <input
            name="amount"
            type="number"
            value={echangedValues.amount || undefined}
            onChange={echangedValues.amountChange}
          />
          <select
            value={echangedValues.fromCurrency}
            onChange={echangedValues.fromChange}
          >
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="PLN">PLN</option>
          </select>
        </label>
        <br />
        <label>
          <input
            name="amount"
            type="number"
            value={echangedValues.amount || undefined}
            onChange={echangedValues.amountChange}
          />
          <select
            value={echangedValues.toCurrency}
            onChange={echangedValues.toChange}
          >
            <option value="USD">USD</option>
            <option value="PLN">PLN</option>
            <option value="EUR">EUR</option>
          </select>
        </label>
        <br />
      </form>
      <h3>
        {echangedValues.amount} {echangedValues.fromCurrency} ={" "}
        {echangedValues.exchangedAmount} {echangedValues.toCurrency}
      </h3>
      <p>date: {echangedValues.date}</p>
      <p>
        source: <a href="https://exchangeratesapi.io/">exchangeratesapi</a>
      </p>
    </div>
  );
}
