import React, { ButtonHTMLAttributes, useState } from "react";
import { useExchange } from "./useExchange"; //custom hook

export default function Exchanger() {
  const exchangedValues = useExchange();
  return (
    <div>
      <form>
        <label>
          <input
            name="inputOne"
            type="number"
            value={
              exchangedValues.inputOneChanged
                ? exchangedValues.inputOne || undefined
                : exchangedValues.exchangedAmount || undefined
            }
            onChange={exchangedValues.inputOneChange}
          />
          <select
            value={exchangedValues.currencyOne}
            onChange={exchangedValues.currencyOneChange}
          >
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="PLN">PLN</option>
          </select>
        </label>
        <br />
        <label>
          <input
            name="inputTwo"
            type="number"
            value={
              !exchangedValues.inputOneChanged
                ? exchangedValues.inputTwo || undefined
                : exchangedValues.exchangedAmount || undefined
            }
            onChange={exchangedValues.inputTwoChange}
          />
          <select
            value={exchangedValues.currencyTwo}
            onChange={exchangedValues.currencyTwoChange}
          >
            <option value="USD">USD</option>
            <option value="PLN">PLN</option>
            <option value="EUR">EUR</option>
          </select>
        </label>
        <br />
      </form>
      <h3>
        {exchangedValues.inputOneChanged
          ? `${exchangedValues.inputOne} ${exchangedValues.currencyOne} =${" "}
        ${exchangedValues.exchangedAmount?.toFixed(4)}${" "}
        ${exchangedValues.currencyTwo}`
          : `${exchangedValues.exchangedAmount?.toFixed(4)} ${
              exchangedValues.currencyOne
            } =${" "}
        ${exchangedValues.inputTwo}${" "}
        ${exchangedValues.currencyTwo}`}
      </h3>
      <p>date: {exchangedValues.date}</p>
      <p>
        source: <a href="https://exchangeratesapi.io/">exchangeratesapi</a>
      </p>
    </div>
  );
}
