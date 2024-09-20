import React, { useState, useEffect } from "react";
import { getExchangeCourse } from "../api/api";

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
    <header>
      <div>
        {filteredCurrencies.map((curr) => (
          <p key={curr.cc}>
            {curr.txt} ({curr.cc}): {curr.rate.toFixed(2)}
          </p>
        ))}
      </div>
    </header>
  );
};

export default Header;
