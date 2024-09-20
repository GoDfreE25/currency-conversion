import React from "react";

const CurrencyInputWithSelect = ({
  amount,
  currency,
  onAmountChange,
  onCurrencyChange,
}) => (
  <div>
    <input
      type="number"
      step="any"
      value={amount}
      onChange={(e) => {
        const value = e.target.value;
        onAmountChange(value === "" ? "" : parseFloat(value));
      }}
      onBlur={() => {
        if (amount === "") {
          onAmountChange(0);
        }
      }}
    />
    <select value={currency} onChange={(e) => onCurrencyChange(e.target.value)}>
      <option value="USD">USD</option>
      <option value="UAH">UAH</option>
      <option value="EUR">EUR</option>
    </select>
  </div>
);
export default CurrencyInputWithSelect;
