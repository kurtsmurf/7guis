import { CircleDrawer } from "./CircleDrawer";
import { Counter } from "./Counter";
import { CRUD } from "./CRUD";
import { FlightBooker } from "./FlightBooker";
import { TemperatureConverter } from "./TemperatureConverter";
import { Timer } from "./Timer";

export function App() {
  return (
    <div class="stack stack-left">
      <Header />
      <Counter />
      <TemperatureConverter />
      <FlightBooker />
      <Timer />
      <CRUD />
      <CircleDrawer />
    </div>
  );
}

function Header() {
  return (
    <h1>
      Solutions to <a href="https://eugenkiss.github.io/7guis/tasks">7guis</a>
    </h1>
  );
}
