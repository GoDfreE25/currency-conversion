import React, { useState, useEffect, useCallback } from "react";
import { getExchangeCourse } from "../api/api";
import CurrencyInputWithSelect from "./component/currency-input-with-select/currency-input-with-select";
import "./currency-converter.scss";
import { Typography } from "@mui/material";

const CurrencyConverter = () => {
  const [rates, setRates] = useState({});
  const [fromAmount, setFromAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toAmount, setToAmount] = useState(0);
  const [toCurrency, setToCurrency] = useState("UKR");
  const [isFromAmountChanged, setIsFromAmountChanged] = useState(true);

  useEffect(() => {
    getExchangeCourse()
      .then((data) => {
        const ratesMap = data.reduce(
          (acc, rate) => {
            acc[rate.cc] = rate.rate;
            return acc;
          },
          {
            UKR: 1,
          }
        );
        setRates(ratesMap);
      })
      .catch((error) => console.error("Error fetching currency data:", error));
  }, []);

  const convertCurrency = useCallback(
    (fromCurrency, toCurrency, amount) => {
      const result = (amount * rates[fromCurrency]) / rates[toCurrency];

      return Math.round(result * 100) / 100;
    },
    [rates]
  );

  useEffect(() => {
    if (isFromAmountChanged) {
      setToAmount(convertCurrency(fromCurrency, toCurrency, fromAmount));
    }
  }, [
    fromAmount,
    fromCurrency,
    toCurrency,
    isFromAmountChanged,
    convertCurrency,
  ]);

  useEffect(() => {
    if (!isFromAmountChanged) {
      setFromAmount(convertCurrency(toCurrency, fromCurrency, toAmount));
    }
  }, [
    toAmount,
    toCurrency,
    fromCurrency,
    isFromAmountChanged,
    convertCurrency,
  ]);

  const handleFromAmountChange = useCallback((amount) => {
    setFromAmount(amount);
    setIsFromAmountChanged(true);
  }, []);

  const handleFromCurrencyChange = useCallback((currency) => {
    setFromCurrency(currency);
    setIsFromAmountChanged(true);
  }, []);

  const handleToAmountChange = useCallback((amount) => {
    setToAmount(amount);
    setIsFromAmountChanged(false);
  }, []);

  const handleToCurrencyChange = useCallback((currency) => {
    setToCurrency(currency);
    setIsFromAmountChanged(false);
  }, []);

  return (
    <div className="main_container">
      <Typography
        fontFamily={"Effra, Helvetica, Arial, sans-serif"}
        fontSize={"35px"}
        fontWeight={"700"}
        lineHeight={" 48px"}
      >
        Currency Converter
      </Typography>
      <div className="currency_container">
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
