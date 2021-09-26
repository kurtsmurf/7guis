import { useState } from "preact/hooks";

export function TemperatureConverter() {
  const [fahrenheit, setFahrenheit] = useState(32);
  const celsius = (fahrenheit - 32) * (5 / 9);

  return (
    <div class="task stack">
      <h3>Temperature Converter</h3>
      <div class="row">
        <input
          type="number"
          name="celsius"
          id="celsius"
          value={celsius.toFixed(2)}
          onInput={(e) => {
            const celsius = parseFloat(e.currentTarget.value);
            if (typeof celsius !== "number")
              return;
            setFahrenheit(celsius * (9 / 5) + 32);
          }} />
        <label htmlFor="celsius">celsius</label>
        <span>=</span>
        <input
          type="number"
          name="fahrenheit"
          id="fahrenheit"
          value={fahrenheit.toFixed(2)}
          onInput={(e) => {
            const fahrenheit = parseFloat(e.currentTarget.value);
            if (typeof fahrenheit !== "number")
              return;
            setFahrenheit(fahrenheit);
          }} />
        <label htmlFor="fahrenheit">fahrenheit</label>
      </div>
    </div>
  );
}
