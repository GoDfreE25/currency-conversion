import React, { useState, useEffect, useCallback } from "react";
import { getExchangeCourse } from "../../api/api";
import CurrencyInputWithSelect from "./component/currency-input-with-select/currency-input-with-select";
import "./currency-converter.scss";
import { IconButton, Typography } from "@mui/material";
import { getRoundedResult } from "../../helpers/get-rounded-result";
import { FIATS } from "../../constants/fiats";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

const DEFAULT_AMOUNT_VALUE = 0;

const CurrencyConverter = () => {
  const [rates, setRates] = useState({});
  const [fromAmount, setFromAmount] = useState(DEFAULT_AMOUNT_VALUE);
  const [fromCurrency, setFromCurrency] = useState(FIATS.USD);
  const [toAmount, setToAmount] = useState(DEFAULT_AMOUNT_VALUE);
  const [toCurrency, setToCurrency] = useState(FIATS.UKR);
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

      return getRoundedResult(result);
    },
    [rates]
  );

  useEffect(() => {
    if (isFromAmountChanged) {
      setToAmount(convertCurrency(fromCurrency, toCurrency, fromAmount));
    } else {
      setFromAmount(convertCurrency(toCurrency, fromCurrency, toAmount));
    }
  }, [
    fromAmount,
    toAmount,
    fromCurrency,
    toCurrency,
    isFromAmountChanged,
    convertCurrency,
  ]);

  const handleFromAmountChange = (amount) => {
    setFromAmount(amount);
    setIsFromAmountChanged(true);
  };

  const handleFromCurrencyChange = (currency) => {
    setFromCurrency(currency);
    setIsFromAmountChanged(true);
  };

  const handleToAmountChange = (amount) => {
    setToAmount(amount);
    setIsFromAmountChanged(false);
  };

  const handleToCurrencyChange = (currency) => {
    setToCurrency(currency);
    setIsFromAmountChanged(false);
  };

  const handleCurrencySwap = () => {
    const swappedFromCurrency = toCurrency;
    const swappedToCurrency = fromCurrency;
    const swappedFromAmount = toAmount;
    const swappedToAmount = fromAmount;

    setFromCurrency(swappedFromCurrency);
    setToCurrency(swappedToCurrency);
    setFromAmount(swappedFromAmount);
    setToAmount(swappedToAmount);
    setIsFromAmountChanged(!isFromAmountChanged);
  };

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
        <IconButton sx={{ height: "40px" }} onClick={handleCurrencySwap}>
          <SwapHorizIcon />
        </IconButton>
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
