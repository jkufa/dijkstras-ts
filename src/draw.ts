import { Edge, Graph } from "./graph";

const COLORS = {
  node: {
    'dark': 'rgba(8, 2, 21, 1)',
    'light': 'rgba(200,200, 200, 1)',
  },
  text: {
    'dark': 'rgba(36, 36, 36, 1)',
    'light': 'rgba(230,230, 230, 1)',
  }
}
const THEME = {
  node: COLORS.node.dark,
  text: COLORS.text.light
}

const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
darkThemeMq.addListener(e => {
 if (e.matches) {
  THEME.node = COLORS.node.dark
 } else {
    // Theme set to light.
    THEME.node = COLORS.node.light
  }
});

const canvas = document.querySelector<HTMLCanvasElement>('canvas')!;
const ctx = canvas.getContext('2d')!;

type Coords = { x: number, y: number };

export function drawGraph(graph: Graph) {
  if (ctx == null) {
    console.error('[Error] For some reason ctx was null!')
    return;
  }

  const nodeCoords: Map<string, Coords> = new Map();

  setCanvasSize();
  draw();
  resize();

  window.addEventListener('load', () => { drawGraph(graph) });

  function resize() {
    setCanvasSize();
    draw();
  }

  function setCanvasSize() {
    const numNodes = graph.getNodes().length;
    const baseSize = Math.min(4, Math.ceil(numNodes / 2));

    const width = baseSize + baseSize - 1;
    canvas.width = 64 * width;

    const baseHeight = Math.ceil(numNodes / baseSize);
    const height = Math.max(3, baseHeight + baseHeight - 1);
    canvas.height = 64 * height;
  }


  function draw() {
    const nodes = graph.getNodes();
    const drawnEdges: Set<string> = new Set();
    createNodeCoords(nodes);
    nodes.forEach((node) => {
      const coords = nodeCoords.get(node)!;
      drawEdge(graph.getNodeEdges(node)!, { label: node, coords});
      drawNode(node, coords.x, coords.y);
    });

    function drawEdge(edges: Edge[], start: { label: string, coords: Coords }) {
      for (const edge of edges) {
        const key = `${[start.label, edge.node].sort().join('<->')}`;
        if (drawnEdges.has(key)) {
          console.log(key, 'already drawn')
          continue;
        }
        const end = nodeCoords.get(edge.node)!;

        console.log(`[DEBUG] Drawing line for: ${key}`)
        drawLine(start.coords, end);
        
        let tX = start.coords.x + (end.x - start.coords.x) / 2;
        let tY = start.coords.y + (end.y - start.coords.y) / 2;

        if (start.coords.x === end.x) {
          tX -= 8;
        } else if (start.coords.y === end.y) {
          tY -= 8;
        } else {
          tY -= 16;
        }

        console.log(`[DEBUG] weight coords: (${tX},${tY})`,)
        drawText(String(edge.weight), tX, tY, COLORS.text.dark);

        drawnEdges.add(key);
      }
    
      function drawLine(start: Coords, end: Coords) {
        ctx.beginPath(); // Start a new path
        ctx.moveTo(start.x, start.y); // Move the pen to
        ctx.lineTo(end.x, end.y); // Draw a line to
        ctx.stroke(); // Render the path
      }
    }
    
    function drawNode(label: string, x: number, y: number) {
    
      drawCircle(label, x, y);
    
      function drawCircle(label: string, x: number, y: number) {
        ctx.fillStyle = THEME.node;
        const circle = new Path2D();
        circle.arc(x, y, 32, 0, 2 * Math.PI);
        ctx.fill(circle);
        drawText(label, x, y);
      }
    }

    function drawText(label: string, x: number, y: number, color: string = THEME.text) {
      // hardcoded fix lol
      let baseOffset = 0;
      if (label === 'I') {
        baseOffset = 2.5;
      } else if (label.length > 1) {
        baseOffset = 11;
      }
      else {
        baseOffset = 5.5;
      }
      const X_OFFSET = baseOffset;
      const Y_OFFSET = 4;
      ctx.fillStyle = color;
      ctx.font = '16px sans-serif';
      ctx.fillText(label, x - X_OFFSET, y + Y_OFFSET)
    }
    
    function createNodeCoords(labels: string[]) {
      const BASE = 32;
      const adder = 128;
      const rBound = canvas.width - BASE;
    
      let xOffset = BASE;
      let yOffset = BASE;
    
      for (const label of labels) {
        if (nodeCoords.has(label)) {
          continue;
        }
        nodeCoords.set(label, { x: xOffset, y: yOffset });
        xOffset += adder;
        if (xOffset > rBound) {
          xOffset = BASE;
          yOffset += adder;
        }
      }
    }
  }
}
