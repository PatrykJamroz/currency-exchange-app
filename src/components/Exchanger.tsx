import { useExchange } from "./useExchange";
import Chart from "./Chart";
import "../index.css";
import { stringify } from "postcss";
import { getAutomaticTypeDirectiveNames } from "typescript";

export default function Exchanger() {
  const exchangedValues = useExchange();
  //console.log(exchangedValues.processedData);
  return (
    <div className="container border-2 border-black border-solid mx-auto inline-flex flex-wrap">
      <div className="w-full md:w-1/2 inline-flex border-2 border-purple-500 border-solid">
        <div className="mx-auto w-10/12 mt-5 md:pl-1.5 border-2 border-green-500 border-solid">
          <div
            style={
              exchangedValues.inputOne !== null
                ? { display: "block" }
                : { display: "none" }
            }
            className=""
          >
            <h3 className="font-semibold text-xl">
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
            <p className="font-thin text-xs">
              {new Date(exchangedValues.date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <form
            className="mt-2"
            style={
              exchangedValues.inputOne !== null
                ? { paddingTop: 0 }
                : { paddingTop: 47.36 }
            }
          >
            <div className="container mx-auto">
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
                className="w-36 rounded-lg mr-2"
                autoFocus
              />
              <select
                value={exchangedValues.currencyOne}
                onChange={exchangedValues.currencyOneChange}
                className="w-36 rounded-lg"
              >
                <option
                  value="EUR"
                  disabled={
                    exchangedValues.currencyTwo === "EUR" ? true : false
                  }
                >
                  EUR
                </option>
                <option
                  value="USD"
                  disabled={
                    exchangedValues.currencyTwo === "USD" ? true : false
                  }
                >
                  USD
                </option>
                <option
                  value="PLN"
                  disabled={
                    exchangedValues.currencyTwo === "PLN" ? true : false
                  }
                >
                  PLN
                </option>
              </select>
            </div>
            <div className="mt-2">
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
                className="w-36 rounded-lg mr-2"
              />
              <select
                value={exchangedValues.currencyTwo}
                onChange={exchangedValues.currencyTwoChange}
                className="w-36 rounded-lg"
              >
                <option
                  value="USD"
                  disabled={
                    exchangedValues.currencyOne === "USD" ? true : false
                  }
                >
                  USD
                </option>
                <option
                  value="PLN"
                  disabled={
                    exchangedValues.currencyOne === "PLN" ? true : false
                  }
                >
                  PLN
                </option>
                <option
                  value="EUR"
                  disabled={
                    exchangedValues.currencyOne === "EUR" ? true : false
                  }
                >
                  EUR
                </option>
              </select>
            </div>
          </form>

          <p className="mt-4 font-thin text-xs">
            source: <a href="https://exchangeratesapi.io/">exchangeratesapi</a>
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/2 border-2 border-blue-500 border-solid">
        <div className="border-2 border-solid border-red-500 mt-5">
          <Chart
            data={exchangedValues.processedData}
            className="border-solid border-yellow-500"
          />
        </div>
        <div className="border-2 border-solid border-yellow-500 grid grid-cols-3 gap-2 w-60 mx-auto text-white">
          <div className="border-2 border-black-500 border-solid inline">
            <input
              type="button"
              value="week"
              onClick={exchangedValues.handleStartDate}
              className="w-full bg-black"
            />
          </div>
          <div className="border-2 border-black-500 border-solid inline">
            <input
              type="button"
              value="month"
              onClick={exchangedValues.handleStartDate}
              className="w-full bg-black"
            />
          </div>
          <div className="border-2 border-black-500 border-solid inline ">
            <input
              type="button"
              value="year"
              onClick={exchangedValues.handleStartDate}
              className="w-full bg-black"
            />
          </div>
        </div>
      </div>
      <div className="ml-10 mr-5 mt-1">
        <h1 className="">
          Rates history between{" "}
          {new Date(exchangedValues.startDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}{" "}
          and{" "}
          {new Date(exchangedValues.date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
          :
        </h1>
        {exchangedValues.processedData.map((data) => (
          <p>
            {new Date(data.date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
            : {data.rate.toFixed(4)}
          </p>
        ))}
      </div>
    </div>
  );
}
