import { useReducer, useRef, useState } from "preact/hooks";

type position = { x: number; y: number };
type circle = position & { radius: number };
type event =
  | { type: "Resize"; index: number; newRadius: number }
  | { type: "Create"; circle: circle }
  | { type: "Select"; index: number }
  | { type: "Undo" }
  | { type: "Redo" };
type domainState = {
  circles: circle[];
  selected: number;
};
type appState = {
  domainState: domainState;
  events: event[];
  undoIndex: number;
};

const initialDomainState = {
  circles: [],
  selected: -1,
};

const domainReducer = (
  state: domainState,
  event: event,
): domainState => {
  switch (event.type) {
    case "Resize": {
      return {
        ...state,
        circles: state.circles.map((circle, index) =>
          index === event.index
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
  return state;
};

const initialAppState: appState = {
  domainState: initialDomainState,
  events: [],
  undoIndex: 0,
};

const appReducer = (state: appState, event: event): appState => {
  switch (event.type) {
    case "Resize": {
      return {
        ...state,
        events: [...state.events, event],
        domainState: domainReducer(state.domainState, event),
      };
    }
    case "Create": {
      if (state.undoIndex === 0) {
        return {
          ...state,
          events: [...state.events, event],
          domainState: domainReducer(state.domainState, event),
        };
      }
      return {
        ...state,
        domainState: domainReducer(
          state.events.slice(0, state.undoIndex).reduce(
            domainReducer,
            initialDomainState,
          ),
          event,
        ),
        events: [...state.events.slice(0, state.undoIndex), event],
        undoIndex: 0,
      };
    }
    case "Select": {
      return {
        ...state,
        events: [...state.events, event],
        domainState: domainReducer(state.domainState, event),
      };
    }
    case "Undo": {
      const undoIndex = Math.max(state.events.length * -1, state.undoIndex - 1);
      return {
        ...state,
        domainState: state.events.slice(0, undoIndex).reduce(
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
        domainState: state.events.slice(0, undoIndex || state.events.length)
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
  const svgRef = useRef<SVGSVGElement>(null);

  const [appState, dispatch] = useReducer(
    (state: appState, event: event) => {
      const nextState = appReducer(state, event);
      console.log(nextState);
      return nextState;
    },
    initialAppState,
  );

  const create = (clickPos: position) => {
    console.log(clickPos);
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

  const nothingToUndo = appState.events.length * -1 === appState.undoIndex;
  const nothingToRedo = appState.undoIndex === 0;

  return (
    <div class="task stack">
      <h3>Circle Drawer</h3>
      <div className="row">
        <button onClick={undo} disabled={nothingToUndo}>Undo</button>
        <button onClick={redo} disabled={nothingToRedo}>Redo</button>
      </div>
      <svg ref={svgRef} onClick={create}>
        {appState.domainState.circles.map((circle, index) => (
          <circle
            onClick={(e) => {
              e.stopPropagation();
              select(index);
            }}
            cx={circle.x}
            cy={circle.y}
            r={circle.radius}
            class={index === appState.domainState.selected ? "selected" : ""}
          >
          </circle>
        ))}
      </svg>
    </div>
  );
}
