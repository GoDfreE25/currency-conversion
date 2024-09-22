import "./App.scss";
import CurrencyConverter from "./components/currency-converter/currency-converter";
import Header from "./components/header/header";

function App() {
  return (
    <div className="app">
      <Header />
      <CurrencyConverter />
    </div>
  );
}

export default App;
