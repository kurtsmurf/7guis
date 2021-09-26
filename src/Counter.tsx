import { useState } from "preact/hooks";

export function Counter() {
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
