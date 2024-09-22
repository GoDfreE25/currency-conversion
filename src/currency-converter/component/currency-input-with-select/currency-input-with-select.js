import { MenuItem, Select, TextField, Typography } from "@mui/material";
import React from "react";
import Flag from "react-flagkit";
import { flags } from "../../../header/helper/flags";
import "./currency-input-with-select.scss";

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
      <MenuItem value={"USD"} className="item">
        <Flag country={flags["USD"]} size={40} />
        <Typography gutterBottom sx={{ fontSize: 16, margin: "0" }}>
          US Dollar
        </Typography>
      </MenuItem>
      <MenuItem value={"EUR"} className="item">
        <Flag country={flags["EUR"]} size={40} />
        <Typography gutterBottom sx={{ fontSize: 16, margin: "0" }}>
          Euro
        </Typography>
      </MenuItem>
      <MenuItem value={"UKR"} className="item">
        <Flag country={flags["UKR"]} size={40} />
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
        onAmountChange(value === "" ? "" : parseFloat(value));
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
