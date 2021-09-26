import { useEffect, useRef } from "preact/hooks";

export function CircleDrawer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.arc(
      canvas.width / 2,
      canvas.height / 2,
      Math.min(canvas.width, canvas.height) / 2 - 1,
      0,
      Math.PI * 2,
      true,
    );
    context.stroke();
  }, [canvasRef.current]);

  return (
    <div class="task stack">
      <h3>Circle Drawer</h3>
      <div className="row">
        <button>Undo</button>
        <button>Redo</button>
      </div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
