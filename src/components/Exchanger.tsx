import { useExchange } from "./useExchange";
import Chart from "./Chart";
import "../index.css";

export default function Exchanger() {
  const exchangedValues = useExchange();

  return (
    <div className="mx-auto inline-flex flex-wrap w-full">
      <div className="w-full md:w-1/2 inline-flex">
        <div className="w-min mx-auto">
          <div className="pl-1 pt-3">
            <h3 className="font-semibold text-base">
              {exchangedValues.resultFieldDisplay}
            </h3>
            <p className="font-thin text-xs">
              {exchangedValues.resultFieldDate}
            </p>
          </div>
          <form className="mt-2">
            <div className="mx-auto">
              <input
                name="inputOne"
                type="number"
                value={exchangedValues.inputOneValue}
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
                  disabled={exchangedValues.disabledOptionSelectOne("EUR")}
                >
                  EUR
                </option>
                <option
                  value="GBP"
                  disabled={exchangedValues.disabledOptionSelectOne("GBP")}
                >
                  GBP
                </option>
                <option
                  value="USD"
                  disabled={exchangedValues.disabledOptionSelectOne("USD")}
                >
                  USD
                </option>
                <option
                  value="PLN"
                  disabled={exchangedValues.disabledOptionSelectOne("PLN")}
                >
                  PLN
                </option>
              </select>
            </div>
            <div className="mt-2">
              <input
                name="inputTwo"
                type="number"
                value={exchangedValues.inputTwoValue}
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
                  disabled={exchangedValues.disabledOptionSelectTwo("USD")}
                >
                  USD
                </option>
                <option
                  value="PLN"
                  disabled={exchangedValues.disabledOptionSelectTwo("PLN")}
                >
                  PLN
                </option>
                <option
                  value="GBP"
                  disabled={exchangedValues.disabledOptionSelectTwo("GBP")}
                >
                  GPB
                </option>
                <option
                  value="EUR"
                  disabled={exchangedValues.disabledOptionSelectTwo("EUR")}
                >
                  EUR
                </option>
              </select>
            </div>
          </form>

          <p className="mt-4 font-thin text-xs pl-1">
            source: <a href="https://exchangeratesapi.io/">exchangeratesapi</a>
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <div className="mt-5 w-11/12 mx-auto">
          <Chart data={exchangedValues.processedData} className="" />
        </div>
        <div className="grid grid-cols-3 gap-2 w-60 mx-auto text-white">
          <div className="inline">
            <input
              type="button"
              value="week"
              onClick={exchangedValues.handleStartDate}
              className="w-full bg-black"
            />
          </div>
          <div className="inline">
            <input
              type="button"
              value="month"
              onClick={exchangedValues.handleStartDate}
              className="w-full bg-black"
            />
          </div>
          <div className="inline ">
            <input
              type="button"
              value="year"
              onClick={exchangedValues.handleStartDate}
              className="w-full bg-black"
            />
          </div>
        </div>
      </div>
      <div className="pl-1 pr-10 mt-5 pl-2">
        <h1 className=" text-base font-medium underline">
          Rates history between {exchangedValues.ratesHistoryStartDate} and{" "}
          {exchangedValues.ratesHistoryEndDate}:
        </h1>
        {exchangedValues.processedData.map((data) => (
          <p key={data.date}>
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
