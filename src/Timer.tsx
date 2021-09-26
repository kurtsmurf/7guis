import { useEffect, useReducer } from "preact/hooks";

export function Timer() {
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
            const active = elapsed < state.duration;

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
              elapsed: 0,
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
