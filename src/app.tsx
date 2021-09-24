import { useState } from "preact/hooks";

export function App() {
  return (
    <div class="stack">
      <Counter />
      <TemperatureConverter />
      <FlightBooker />
    </div>
  );
}

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div class="task stack">
      <h3>Counter</h3>
      <div class="row">
        <input type="number" readonly value={count} />
        <button onClick={() => setCount(count + 1)}>
          Count
        </button>
      </div>
    </div>
  );
}

function TemperatureConverter() {
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
            if (typeof celsius !== "number") return;
            setFahrenheit(celsius * (9 / 5) + 32);
          }}
        />
        <label htmlFor="celsius">celsius</label>
        <span>=</span>
        <input
          type="number"
          name="fahrenheit"
          id="fahrenheit"
          value={fahrenheit.toFixed(2)}
          onInput={(e) => {
            const fahrenheit = parseFloat(e.currentTarget.value);
            if (typeof fahrenheit !== "number") return;
            setFahrenheit(fahrenheit);
          }}
        />
        <label htmlFor="fahrenheit">fahrenheit</label>
      </div>
    </div>
  );
}

function FlightBooker() {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const [departureDate, setDepartureDate] = useState(today);
  const [returnDate, setReturnDate] = useState(today);
  const [isReturn, setIsReturn] = useState(false);

  const format = (date: Date) => date.toISOString().slice(0, 10);

  return (
    <div class="task stack">
      <h3>Flight Booker</h3>
      <div class="stack">
        <select
          name="flight"
          id="flight"
          onInput={(e) => setIsReturn(e.currentTarget.value === "return")}
        >
          <option selected={!isReturn} value="one-way">one-way flight</option>
          <option selected={isReturn} value="return">return flight</option>
        </select>
        <input
          value={format(departureDate)}
          type="date"
          name="start"
          id="start"
          onInput={(e) => setDepartureDate(new Date(e.currentTarget.value))}
        />
        <input
          value={isReturn ? format(returnDate) : undefined}
          type="date"
          name="return"
          id="return"
          disabled={!isReturn}
          onInput={(e) => setReturnDate(new Date(e.currentTarget.value))}
        />
        <button
          disabled={isReturn && returnDate < departureDate}
          onClick={() => {
            const message = `You have booked a ${
              isReturn
                ? "flight"
                : "one-way flight"
            } ` +
              `departing on ${format(departureDate)}` +
              `${isReturn ? ` and returning on ${format(returnDate)}` : ""}.`;

            alert(message);
          }}
        >
          Book
        </button>
      </div>
    </div>
  );
}

// function Task() {
//   return (
//     <div class="task stack">
//       <h3>Task</h3>
//       <div class="row">
//       </div>
//     </div>
//   )
// }
