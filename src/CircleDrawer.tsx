import { useEffect, useRef, useState } from "preact/hooks";

type position = { x: number; y: number };
type circle = position & { radius: number };

const drawCircle = (
  context: CanvasRenderingContext2D,
  circle: circle,
  selected: boolean,
) => {
  context.beginPath();
  context.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, true);
  if (selected) context.fill();
  context.stroke();
};

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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [circles, setCircles] = useState<circle[]>([]);
  const [selected, setSelected] = useState(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.fillStyle = "lightgrey";
    context.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach((circle, index) =>
      drawCircle(context, circle, index === selected)
    );
  }, [canvasRef.current, circles, selected]);

  const handleClick = (e: MouseEvent) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
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
      <canvas ref={canvasRef} onClick={handleClick}></canvas>
    </div>
  );
}
