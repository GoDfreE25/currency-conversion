import { MenuItem, Select, TextField, Typography } from "@mui/material";
import React from "react";
import Flag from "react-flagkit";
import { flags } from "../../../../constants/flags";
import "./currency-input-with-select.scss";
import { FIATS } from "../../../../constants/fiats";

const CurrencyInputWithSelect = ({
  amount,
  currency,
  onAmountChange,
  onCurrencyChange,
}) => (
  <div className="input_container">
    <Select
      value={currency}
      fullWidth
      size="small"
      name="country"
      className="select"
      onChange={(e) => onCurrencyChange(e.target.value)}
    >
      <MenuItem value={FIATS.USD} className="item">
        <Flag country={flags[FIATS.USD]} size={40} />
        <Typography gutterBottom sx={{ fontSize: 16, margin: "0" }}>
          US Dollar
        </Typography>
      </MenuItem>
      <MenuItem value={FIATS.EUR} className="item">
        <Flag country={flags[FIATS.EUR]} size={40} />
        <Typography gutterBottom sx={{ fontSize: 16, margin: "0" }}>
          Euro
        </Typography>
      </MenuItem>
      <MenuItem value={FIATS.UKR} className="item">
        <Flag country={flags[FIATS.UKR]} size={40} />
        <Typography gutterBottom sx={{ fontSize: 16, margin: "0" }}>
          Ukraine Hryvnia
        </Typography>
      </MenuItem>
    </Select>
    <TextField
      type="number"
      variant="outlined"
      step="any"
      value={amount}
      onChange={(e) => {
        const value = e.target.value;
        onAmountChange(parseFloat(value));
      }}
      onBlur={() => {
        if (amount === "") {
          onAmountChange(0);
        }
      }}
    />
  </div>
);
export default CurrencyInputWithSelect;
