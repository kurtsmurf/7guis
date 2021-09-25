import { useEffect, useReducer, useState } from "preact/hooks";

export function App() {
  return (
    <div class="stack">
      <Counter />
      <TemperatureConverter />
      <FlightBooker />
      <Timer />
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
  );
}

function Timer() {
  type timerState = {
    active: boolean;
    start: Date;
    duration: number;
    elapsed: number;
  };

  type timerEvent =
    | { type: "TICK" }
    | { type: "RESET" }
    | { type: "UPDATE_DURATION"; duration: number };

  const MAX_DURATION = 100;

  const differenceInSeconds = (start: Date, end: Date) =>
    (end.getTime() - start.getTime()) / 1000;

  const reducer = (state: timerState, event: timerEvent) => {
    switch (state.active) {
      case true: {
        switch (event.type) {
          case "RESET": {
            return {
              ...state,
              active: true,
              start: new Date(),
              elapsed: 0,
            };
          }
          case "TICK": {
            const elapsed = differenceInSeconds(state.start, new Date());
            const active = elapsed < state.duration

            return {
              ...state,
              active,
              elapsed: active ? elapsed : state.duration,
            };
          }
          case "UPDATE_DURATION": {
            const elapsed = differenceInSeconds(state.start, new Date());

            return {
              ...state,
              active: elapsed < event.duration,
              duration: Math.min(MAX_DURATION, event.duration),
              elapsed,
            };
          }
        }
      }
      case false: {
        switch (event.type) {
          case "RESET": {
            return {
              ...state,
              active: true,
              start: new Date(),
              elapsed: 0
            };
          }
          case "UPDATE_DURATION": {
            const duration = Math.min(MAX_DURATION, event.duration);

            return {
              ...state,
              active: state.elapsed < event.duration,
              start: new Date(new Date().getTime() - duration * 1000),
              duration,
            };
          }
        }
      }
    }
    return state;
  };

  const initialState = {
    active: true,
    start: new Date(),
    duration: 100,
    elapsed: 0,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const handle = setInterval(() => {
      dispatch({ type: "TICK" });
    }, 50);
    return () => clearInterval(handle);
  }, []);

  const updateDuration = (e: Event) =>
    dispatch({
      type: "UPDATE_DURATION",
      duration: parseFloat((e.target as HTMLInputElement).value),
    });

  const reset = () => dispatch({ type: "RESET" });

  return (
    <div class="task stack">
      <h3>Timer</h3>
      <div className="row">
        <label for="time">Elapsed time:</label>
        <progress id="time" max={state.duration} value={state.elapsed}>
        </progress>
      </div>
      <p>{state.elapsed.toFixed(2)}s</p>
      <div className="row">
        <label for="duration">Duration:</label>
        <input
          type="range"
          id="duration"
          name="duration"
          min="0"
          max={MAX_DURATION}
          value={state.duration}
          onInput={updateDuration}
        />
      </div>
      <button onClick={reset}>Reset</button>
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
