import "./App.css";
import CurrencyConverter from "./currency-converter/currency-converter";
import Header from "./header/header";

function App() {
  return (
    <div className="App">
      <Header />
      <CurrencyConverter />
    </div>
  );
}

export default App;
