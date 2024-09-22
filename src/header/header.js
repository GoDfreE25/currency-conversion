import React, { useState, useEffect } from "react";
import { getExchangeCourse } from "../api/api";
import "./header.scss";
import { Card, CardContent, Typography } from "@mui/material";
import Flag from "react-flagkit";
import { flags } from "./helper/flags";

const Header = () => {
  const [currency, setCurrency] = useState([]);

  useEffect(() => {
    getExchangeCourse()
      .then((data) => setCurrency(data))
      .catch((error) => console.error("Error fetching currency data:", error));
  }, []);

  const filteredCurrencies = currency.filter(
    (curr) => curr.cc === "USD" || curr.cc === "EUR"
  );

  return (
    <header className="header">
      <div className="header_container">
        <Typography
          fontFamily={"Effra, Helvetica, Arial, sans-serif"}
          fontSize={"40px"}
          fontWeight={"700"}
          lineHeight={" 48px"}
        >
          Exchange rate
        </Typography>
        <div className="currency_container">
          {filteredCurrencies.map((curr) => (
            <Card key={curr.cc}>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  alignItems: "center",
                  paddingBottom: '16px !important',
                }}
              >
                {flags[curr.cc] && <Flag country={flags[curr.cc]} size={40} />}
                <Typography gutterBottom sx={{ fontSize: 16, margin: "0" }}>
                  {curr.cc} - {Math.round(curr.rate * 100) / 100}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
