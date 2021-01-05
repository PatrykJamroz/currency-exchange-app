import { useExchange } from "./useExchange";
import "../index.css";

export default function Exchanger() {
  const exchangedValues = useExchange();
  return (
    <div className="border-2 border-black border-solid mx-auto flex flex-wrap">
      <div className="w-full md:w-1/2 border-2 border-purple-500 border-solid pl-10">
        <div
          style={
            exchangedValues.inputOne !== null
              ? { display: "block" }
              : { display: "none" }
          }
        >
          <h3>
            {exchangedValues.inputOneChanged
              ? `${exchangedValues.inputOne} ${
                  exchangedValues.currencyOne
                } equals${" "}
        ${exchangedValues.exchangedAmount}${" "}
        ${exchangedValues.currencyTwo}`
              : `${exchangedValues.exchangedAmount} ${
                  exchangedValues.currencyOne
                } equals${" "}
        ${exchangedValues.inputTwo}${" "}
        ${exchangedValues.currencyTwo}`}
          </h3>
          <p>
            {new Date(exchangedValues.date).toLocaleDateString([], {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <form className="">
          <div className="">
            <input
              name="inputOne"
              type="number"
              value={
                exchangedValues.inputOneChanged
                  ? exchangedValues.inputOne || undefined
                  : exchangedValues.exchangedAmount || undefined
              }
              onChange={exchangedValues.inputOneChange}
              placeholder="0"
            />
            <select
              value={exchangedValues.currencyOne}
              onChange={exchangedValues.currencyOneChange}
            >
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="PLN">PLN</option>
            </select>
          </div>
          <br />
          <div>
            <input
              name="inputTwo"
              type="number"
              value={
                !exchangedValues.inputOneChanged
                  ? exchangedValues.inputTwo || undefined
                  : exchangedValues.exchangedAmount || undefined
              }
              onChange={exchangedValues.inputTwoChange}
              placeholder="0"
            />
            <select
              value={exchangedValues.currencyTwo}
              onChange={exchangedValues.currencyTwoChange}
            >
              <option value="USD">USD</option>
              <option value="PLN">PLN</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
          <br />
        </form>

        <p>
          source: <a href="https://exchangeratesapi.io/">exchangeratesapi</a>
        </p>
      </div>
      <div className="w-full md:w-1/2 border-2 border-blue-500 border-solid">
        <img
          src="https://www.macrotrends.net/assets/images/large/euro-dollar-exchange-rate-historical-chart.png"
          className="h-56"
        />
      </div>
    </div>
  );
}
