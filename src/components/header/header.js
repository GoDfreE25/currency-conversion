import React, { useState, useEffect } from "react";
import { getExchangeCourse } from "../../api/api";
import "./header.scss";
import { Typography } from "@mui/material";
import Flag from "react-flagkit";
import { flags } from "../../constants/flags";
import { getRoundedResult } from "../../helpers/get-rounded-result";
import { NoFlagIcon } from "../../icon/no-flag";
import { FIATS } from "../../constants/fiats";

const Header = () => {
  const [currency, setCurrency] = useState([]);

  useEffect(() => {
    getExchangeCourse()
      .then((data) => setCurrency(data))
      .catch((error) => console.error("Error fetching currency data:", error));
  }, []);

  const filteredCurrencies = currency.filter(
    (curr) => curr.cc === FIATS.USD || curr.cc === FIATS.EUR
  );

  return (
    <header className="header">
      <div className="header_container">
        <Typography
          fontFamily="Effra, Helvetica, Arial, sans-serif"
          fontSize="40px"
          fontWeight="700"
          lineHeight=" 48px"
        >
          Exchange rate
        </Typography>
        <div className="currency_container">
          {filteredCurrencies.map((curr) => (
            <div className="card" key={curr.cc}>
              {flags[curr.cc] ? (
                <Flag country={flags[curr.cc]} size={40} />
              ) : (
                <NoFlagIcon />
              )}
              <Typography sx={{ fontSize: 16, margin: "0" }}>
                {curr.cc} - {getRoundedResult(curr.rate)}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
