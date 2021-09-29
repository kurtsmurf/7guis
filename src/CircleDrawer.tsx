import { useRef, useState } from "preact/hooks";

type position = { x: number; y: number };
type circle = position & { radius: number };

const distance = (a: position, b: position) => {
  const distanceX = Math.abs(a.x - b.x);
  const distanceY = Math.abs(a.y - b.y);
  return Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
};

type circleDistance = circle & { distance: number; index: number };

const getNearestCircle = (
  circles: circle[],
  position: position,
): circleDistance | undefined => {
  type accumulator = circleDistance | undefined;
  return circles.reduce((acc: accumulator, circle, index) => {
    const d = distance(position, circle);
    return !acc || d < acc.distance ? { ...circle, distance: d, index } : acc;
  }, undefined);
};

export function CircleDrawer() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [circles, setCircles] = useState<circle[]>([]);
  const [selected, setSelected] = useState(-1);

  const handleClick = (e: MouseEvent) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const position = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    const nearestCircle = getNearestCircle(circles, position);

    if (nearestCircle && nearestCircle.distance <= nearestCircle.radius) {
      setSelected(nearestCircle.index);
    } else {
      setSelected(-1);
      setCircles([...circles, { ...position, radius: 10 }]);
    }
  };

  return (
    <div class="task stack">
      <h3>Circle Drawer</h3>
      <div className="row">
        <button disabled>Undo</button>
        <button disabled>Redo</button>
      </div>
      <svg ref={svgRef} onClick={handleClick}>
        {circles.map((circle, index) => (
          <circle cx={circle.x} cy={circle.y} r={circle.radius} class={index === selected ? "selected" : ""}></circle>
        ))}
      </svg>
    </div>
  );
}
