const BASE_URL = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json";

export const getExchangeCourse = () => (
  fetch(BASE_URL)
    .then(response => response.json())
);