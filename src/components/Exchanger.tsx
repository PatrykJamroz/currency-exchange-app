import React from "react";
import { useExchange } from "./useExchange";
import "../index.css";

export default function Exchanger() {
  const exchangedValues = useExchange();

  return (
    <div className="mx-auto inline-flex flex-wrap w-full">
      <div className="w-full inline-flex">
        <div className="w-min mx-auto">
          <div className="pl-1 pt-3">
            <h3 className="font-semibold text-base">
              {exchangedValues.resultFieldDisplay}
            </h3>
          </div>
          <form className="mt-2">
            <input
              type="date"
              name="date"
              value={exchangedValues.startDate}
              onChange={(e) => exchangedValues.setStartDate(e.target.value)}
              className="rounded-lg mb-2"
              max={exchangedValues.dateToday}
            />
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
                disabled
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
          <p className="mt-4 text-xs max-w-xs">
            Due to exchangeratesapi is no longer completely free there were some
            changes introduced:
          </p>

          <ul className="font-thin text-xs max-w-xs">
            <li>- removed historical rates list</li>
            <li>- disabled possibility to change base currency</li>
            <li>
              - https protocol is not supported in free plan so app does not
              work on Chrome browser. Workaround is to use Brave browser with
              site setting "Insecure content" set to "allow" or Firefox browser
              with disabled protection (on your own risk).
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
