import React, { useState, useEffect, useCallback } from "react";
import { getExchangeCourse } from "../api/api";
import CurrencyInputWithSelect from "./component/currency-input-with-select/currency-input-with-select";

const CurrencyConverter = () => {
  const [rates, setRates] = useState({});
  const [fromAmount, setFromAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toAmount, setToAmount] = useState(0);
  const [toCurrency, setToCurrency] = useState("UAH");

  useEffect(() => {
    getExchangeCourse()
      .then((data) => {
        const ratesMap = data.reduce(
          (acc, rate) => {
            acc[rate.cc] = rate.rate;
            return acc;
          },
          {
            UAH: 1,
          }
        );
        setRates(ratesMap);
      })
      .catch((error) => console.error("Error fetching currency data:", error));
  }, []);

  const convertCurrency = useCallback(
    (from, to, amount) => {
      if (!rates[from] || !rates[to]) return 1;
      return (amount * rates[from]) / rates[to];
    },
    [rates]
  );

  const handleFromAmountChange = useCallback(
    (amount) => {
      setFromAmount(amount);
      setToAmount(convertCurrency(fromCurrency, toCurrency, amount));
    },
    [fromCurrency, toCurrency, convertCurrency]
  );

  const handleFromCurrencyChange = useCallback(
    (currency) => {
      setFromCurrency(currency);
      setToAmount(convertCurrency(currency, toCurrency, fromAmount));
    },
    [toCurrency, fromAmount, convertCurrency]
  );

  const handleToAmountChange = useCallback(
    (amount) => {
      setToAmount(amount);
      setFromAmount(convertCurrency(toCurrency, fromCurrency, amount));
    },
    [fromCurrency, toCurrency, convertCurrency]
  );

  const handleToCurrencyChange = useCallback(
    (currency) => {
      setToCurrency(currency);
      setFromAmount(convertCurrency(toCurrency, fromCurrency, toAmount));
    },
    [convertCurrency, toCurrency, fromCurrency, toAmount]
  );

  return (
    <div>
      <h1>Currency Converter</h1>
      <div>
        <CurrencyInputWithSelect
          amount={fromAmount}
          currency={fromCurrency}
          onAmountChange={handleFromAmountChange}
          onCurrencyChange={handleFromCurrencyChange}
        />
        <CurrencyInputWithSelect
          amount={toAmount}
          currency={toCurrency}
          onAmountChange={handleToAmountChange}
          onCurrencyChange={handleToCurrencyChange}
        />
      </div>
    </div>
  );
};

export default CurrencyConverter;
