import { useReducer, useRef, useState } from "preact/hooks";

type position = { x: number; y: number };
type circle = position & { radius: number };
type domainState = {
  circles: circle[];
  selected: number;
};
type domainEvent =
  | { type: "Resize"; newRadius: number; softResize: boolean }
  | { type: "Create"; circle: circle }
  | { type: "Select"; index: number };
type appState = {
  domainState: domainState;
  domainEvents: domainEvent[];
  undoIndex: number;
};
type appEvent =
  | domainEvent
  | { type: "Undo" }
  | { type: "Redo" };

const domainReducer = (
  state: domainState,
  event: domainEvent,
): domainState => {
  switch (event.type) {
    case "Resize": {
      return {
        ...state,
        circles: state.circles.map((circle, index) =>
          index === state.selected
            ? { ...circle, radius: event.newRadius }
            : circle
        ),
      };
    }
    case "Create": {
      return {
        ...state,
        circles: [...state.circles, event.circle],
        selected: -1,
      };
    }
    case "Select": {
      return {
        ...state,
        selected: event.index,
      };
    }
  }
};

const initialDomainState: domainState = {
  circles: [],
  selected: -1,
};

const rebuild = (events: domainEvent[], offset: number): domainState =>
  events
    .slice(0, offset >= 0 ? events.length : offset)
    .reduce(
      domainReducer,
      initialDomainState,
    );

const advance = (state: appState, event: domainEvent): appState => ({
  ...state,
  domainEvents: [...state.domainEvents, event],
  domainState: domainReducer(state.domainState, event),
});

const fork = (state: appState, event: domainEvent): appState => ({
  ...state,
  domainState: domainReducer(state.domainState, event),
  domainEvents: [...state.domainEvents.slice(0, state.undoIndex), event],
  undoIndex: 0,
});

const advanceOrFork = (state: appState, event: domainEvent): appState =>
  (state.undoIndex === 0) ? advance(state, event) : fork(state, event);

const handleSignificantAction = (state: appState, event: domainEvent): appState => {
  // Ignore duplicate selects
  if (event.type === "Select" && state.domainState.selected === event.index) {
    return state;
  }

  // On "soft" resize, update state without recording a "resize" event
  if (event.type === "Resize" && event.softResize) {
    return {
      ...state,
      domainState: domainReducer(state.domainState, event),
    };
  }

  // Ignore multiple consecutive create requests for the same rough position
  const distance = (a: position, b: position): number => {
    const dX = Math.abs(a.x - b.x);
    const dY = Math.abs(a.y - b.y);
    return Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2))
  }
  const circles = state.domainState.circles
  const lastCircle = circles[circles.length -1]

  if (
    event.type === "Create" &&
    lastCircle &&
    distance(event.circle, lastCircle) < 1
  ) {
    return state
  }

  return advanceOrFork(state, event);
  
}

const initialAppState: appState = {
  domainState: initialDomainState,
  domainEvents: [],
  undoIndex: 0,
};

const appReducer = (state: appState, event: appEvent): appState => {
  switch (event.type) {
    case "Undo": {
      const undoIndex = Math.max(
        state.domainEvents.length * -1,
        state.undoIndex - 1,
      );
      return {
        ...state,
        domainState: rebuild(state.domainEvents, undoIndex),
        undoIndex,
      };
    }
    case "Redo": {
      if (state.undoIndex === 0) return state;
      const undoIndex = state.undoIndex + 1;
      return {
        ...state,
        domainState: rebuild(state.domainEvents, undoIndex),
        undoIndex,
      };
    }
    default: return handleSignificantAction(state, event)
  }
};

export function CircleDrawer() {
  const [
    { domainEvents: events, domainState: { circles, selected }, undoIndex },
    dispatch,
  ] = useReducer(appReducer, initialAppState);
  const svgRef = useRef<SVGSVGElement>(null);

  const create = (clickPos: position) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = clickPos.x - rect.left;
    const y = clickPos.y - rect.top;
    dispatch({ type: "Create", circle: { x, y, radius: 10 } });
  };
  const select = (index: number) => dispatch({ type: "Select", index });
  const undo = () => dispatch({ type: "Undo" });
  const redo = () => dispatch({ type: "Redo" });
  const resizeHard = (newRadius: number) =>
    dispatch({ type: "Resize", newRadius, softResize: false });
  const resizeSoft = (newRadius: number) =>
    dispatch({ type: "Resize", newRadius, softResize: true });

  const nothingToUndo = events.length * -1 === undoIndex;
  const nothingToRedo = undoIndex === 0;
  const selectedCircle = circles[selected];

  return (
    <div class="task stack">
      <h3>Circle Drawer</h3>
      <div className="row">
        <button onClick={undo} disabled={nothingToUndo}>Undo</button>
        <button onClick={redo} disabled={nothingToRedo}>Redo</button>
        <input
          style="margin-left: auto;"
          type="range"
          disabled={selected === -1}
          value={selectedCircle?.radius}
          onChange={(e) =>
            resizeHard(
              parseFloat((e.target as HTMLInputElement).value),
            )}
          onInput={(e) =>
            resizeSoft(
              parseFloat((e.target as HTMLInputElement).value),
            )}
        />
      </div>
      <svg ref={svgRef} onClick={create}>
        {circles.map((circle, index) => (
          <circle
            onContextMenu={(e) => {
              e.preventDefault();
              select(index);
            }}
            cx={circle.x}
            cy={circle.y}
            r={circle.radius}
            className={index === selected ? "selected" : ""}
          >
          </circle>
        ))}
      </svg>
    </div>
  );
}
