import { useEffect, useRef, useState } from "preact/hooks";

const drawCircle = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number
) => {
  context.beginPath();
  context.arc(x, y, r, 0, Math.PI * 2, true);
  context.fill()
  context.stroke();
}

export function CircleDrawer() {
  type circle = {x: number, y: number, r: number}

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [circles, setCircles] = useState<circle[]>([])
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.fillStyle = "white"
    context.strokeStyle = "black"
    context.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach(circle => drawCircle(context, circle.x, circle.y, circle.r))
  }, [canvasRef.current, circles]);

  const addCircle = (e: MouseEvent) => {
    if (!canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setCircles([...circles, {x, y, r: 10}])
  }

  return (
    <div class="task stack">
      <h3>Circle Drawer</h3>
      <div className="row">
        <button disabled>Undo</button>
        <button disabled>Redo</button>
      </div>
      <canvas ref={canvasRef} onClick={addCircle}></canvas>
    </div>
  );
}
