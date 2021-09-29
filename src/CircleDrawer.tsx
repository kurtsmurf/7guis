import { useRef, useState } from "preact/hooks";

type position = { x: number; y: number };
type circle = position & { radius: number };

export function CircleDrawer() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [circles, setCircles] = useState<circle[]>([]);
  const [selected, setSelected] = useState(-1);

  const addCircle = (e: MouseEvent) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const position = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    setSelected(-1);
    setCircles([...circles, { ...position, radius: 10 }]);
  };

  return (
    <div class="task stack">
      <h3>Circle Drawer</h3>
      <div className="row">
        <button disabled>Undo</button>
        <button disabled>Redo</button>
      </div>
      <svg ref={svgRef} onClick={addCircle}>
        {circles.map((circle, index) => (
          <circle
            onClick={e => { setSelected(index); e.stopPropagation() }}
            cx={circle.x}
            cy={circle.y}
            r={circle.radius}
            class={index === selected ? "selected" : ""}
          ></circle>
        ))}
      </svg>
    </div>
  );
}
