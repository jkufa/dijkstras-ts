import './style.css'
import { createRandomGraph } from './generator'
import { addNode, drawGraph } from './draw';

const graph = createRandomGraph(5, 10);
const nodesToEdges = graph.getNodes().map((n) => {
  const edges = [...graph.getNodeEdges(n)!.values()].map((e) => `${e.node}:${e.weight}`).join(', ');
  return `<div>${n} ${edges}</div>`;
});


drawGraph(() => {
  let offset = 32;
  graph.getNodes().forEach((node) => {
    addNode(node, offset, offset)
    offset += 64 * 2;
  });
});

document.querySelector<HTMLDivElement>('#graph')!.innerHTML = `
    <code>
      ${graph.printGraph()}
    </code>
    ${nodesToEdges.join(' ')}
`