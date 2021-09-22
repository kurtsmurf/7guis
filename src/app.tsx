import { useState } from "preact/hooks";

export function App() {
  return (
    <Counter />
  );
}

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div class="task">
      <h3>Counter</h3>
      <div class="input-group">
        <input type="number" readonly value={count} />
        <button onClick={() => setCount(count + 1)}>
          Count
        </button>
      </div>
    </div>
  );
}
