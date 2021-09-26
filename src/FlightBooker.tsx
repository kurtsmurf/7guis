import { useState } from "preact/hooks";

export function FlightBooker() {
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
        onInput={(e) => setDepartureDate(new Date(e.currentTarget.value))} />
      <input
        value={isReturn ? format(returnDate) : undefined}
        type="date"
        name="return"
        id="return"
        disabled={!isReturn}
        onInput={(e) => setReturnDate(new Date(e.currentTarget.value))} />
      <button
        disabled={isReturn && returnDate < departureDate}
        onClick={() => {
          const message = `You have booked a ${isReturn
              ? "flight"
              : "one-way flight"} ` +
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
