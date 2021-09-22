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
      <div>{count}</div>
      <div>
      <button onClick={() => setCount(count + 1)}>
        Count
      </button>
      </div>
    </div>
  );
}
