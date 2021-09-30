import { useReducer, useRef, useState } from "preact/hooks";

type position = { x: number; y: number };
type circle = position & { radius: number };
type domainEvent =
  | { type: "Resize"; newRadius: number }
  | { type: "Create"; circle: circle }
  | { type: "Select"; index: number };
type appEvent =
  | domainEvent
  | { type: "Undo" }
  | { type: "Redo" };
type domainState = {
  circles: circle[];
  selected: number;
};
type appState = {
  domainState: domainState;
  domainEvents: domainEvent[];
  undoIndex: number;
};

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

const initialDomainState = {
  circles: [],
  selected: -1,
};

const initialAppState: appState = {
  domainState: initialDomainState,
  domainEvents: [],
  undoIndex: 0,
};

const appReducer = (state: appState, event: appEvent): appState => {
  switch (event.type) {
    case "Resize": {
      return {
        ...state,
        domainEvents: [...state.domainEvents, event],
        domainState: domainReducer(state.domainState, event),
      };
    }
    case "Create": {
      if (state.undoIndex === 0) {
        return {
          ...state,
          domainEvents: [...state.domainEvents, event],
          domainState: domainReducer(state.domainState, event),
        };
      }
      return {
        ...state,
        domainState: domainReducer(
          state.domainEvents.slice(0, state.undoIndex).reduce(
            domainReducer,
            initialDomainState,
          ),
          event,
        ),
        domainEvents: [...state.domainEvents.slice(0, state.undoIndex), event],
        undoIndex: 0,
      };
    }
    case "Select": {
      if (state.domainState.selected === event.index) return state;
      return {
        ...state,
        domainEvents: [...state.domainEvents, event],
        domainState: domainReducer(state.domainState, event),
        undoIndex: 0
      };
    }
    case "Undo": {
      const undoIndex = Math.max(
        state.domainEvents.length * -1,
        state.undoIndex - 1,
      );
      return {
        ...state,
        domainState: state.domainEvents.slice(0, undoIndex).reduce(
          domainReducer,
          initialDomainState,
        ),
        undoIndex,
      };
    }
    case "Redo": {
      const undoIndex = Math.min(state.undoIndex + 1, 0);
      return {
        ...state,
        domainState: state.domainEvents.slice(
          0,
          undoIndex || state.domainEvents.length,
        )
          .reduce(
            domainReducer,
            initialDomainState,
          ),
        undoIndex,
      };
    }
  }
};

export function CircleDrawer() {
  const [appState, dispatch] = useReducer(appReducer, initialAppState);
  const svgRef = useRef<SVGSVGElement>(null);

  const create = (clickPos: position) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    dispatch({
      type: "Create",
      circle: {
        x: clickPos.x - rect.left,
        y: clickPos.y - rect.top,
        radius: 10,
      },
    });
  };
  const select = (index: number) => dispatch({ type: "Select", index });
  const undo = () => dispatch({ type: "Undo" });
  const redo = () => dispatch({ type: "Redo" });
  const resize = (newRadius: number) => dispatch({ type: "Resize", newRadius });

  const nothingToUndo =
    appState.domainEvents.length * -1 === appState.undoIndex;
  const nothingToRedo = appState.undoIndex === 0;
  const selectedCircle = appState.domainState.circles
    .find((_, i) => i === appState.domainState.selected)

  return (
    <div class="task stack">
      <h3>Circle Drawer</h3>
      <div className="row">
        <button onClick={undo} disabled={nothingToUndo}>Undo</button>
        <button onClick={redo} disabled={nothingToRedo}>Redo</button>
        <input
          style="margin-left: auto;"
          type="range"
          disabled={appState.domainState.selected === -1}
          value={selectedCircle?.radius}
          onChange={e => resize(
            parseFloat((e.target as HTMLInputElement).value)
          )}
        />
      </div>
      <svg ref={svgRef} onClick={create}>
        {appState.domainState.circles.map((circle, index) => {
          const className = index === appState.domainState.selected
            ? "selected"
            : "";
          const handleClick = (e: MouseEvent) => {
            e.stopPropagation();
            select(index);
          };
          return (
            <circle
              onClick={handleClick}
              cx={circle.x}
              cy={circle.y}
              r={circle.radius}
              className={className}
            >
            </circle>
          );
        })}
      </svg>
    </div>
  );
}
