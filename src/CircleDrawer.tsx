import { useEffect, useRef } from "preact/hooks"

export function CircleDrawer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext("2d")
    if (!context) return
    context.fillStyle = "black"
    context.fillRect(0,0,canvas.width,canvas.height)
  }, [canvasRef.current])

  return (
    <div class="task stack">
      <h3>Circle Drawer</h3>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
