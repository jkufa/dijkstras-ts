export function drawGraph(drawFunction: () => void) {
  const canvas = document.querySelector<HTMLCanvasElement>('canvas')!;
  const ctx = canvas.getContext('2d')!;

  if (ctx == null) {
    console.error('[Error] For some reason ctx was null!')
    return;
  }

  drawFunction();
  resize();

  // window.addEventListener('resize', resize);
  window.addEventListener('load', () => { drawGraph(drawFunction) });

  function resize() {
    const container = document.querySelector<HTMLDivElement>('.canvas-container')!;
    const rectangle = container.getBoundingClientRect();  
  
    canvas.width = rectangle.width - 5 * 4
    canvas.height = rectangle.height - 5 * 4;
  
    // redraw
    drawFunction();
  }
}

export function addNode(label: string, x: number, y: number) {
  const canvas = document.querySelector<HTMLCanvasElement>('canvas')!;
  const ctx = canvas.getContext('2d')!;

  drawCircle(label, x, y);

  function drawCircle(label: string, x: number, y: number) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.87)';
    const circle = new Path2D();
    circle.arc(x, y, 32, 0, 2 * Math.PI);
    ctx.fill(circle);
    writeText(label, x, y);
  }

  function writeText(label: string, x: number, y: number) {
    const X_OFFSET = 6;
    const Y_OFFSET = 4;
    ctx.fillStyle = '#000';
    ctx.font = '16px sans-serif';
    ctx.fillText(label, x - X_OFFSET, y + Y_OFFSET)
  }
}