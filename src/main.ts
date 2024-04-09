import './style.css'
import { createRandomGraph } from './generator'
import { drawGraph } from './draw';

function hydrateDOM(numNodes: number, maxWeight: number) {
  const graph = createRandomGraph(numNodes, maxWeight);
  const nodesToEdges = graph.getNodes().map((n) => {
    const edges = [...graph.getNodeEdges(n)!.values()].map((e) => `${e.node}:${e.weight}`).join(', ');
    return `<div>${n} ${edges}</div>`
  });
  drawGraph(graph);
  document.querySelector<HTMLDivElement>('#graph')!.innerHTML = `${nodesToEdges.join(' ')}`

  const startInput = document.querySelector<HTMLSelectElement>('#start_node')!;
  const endInput = document.querySelector<HTMLSelectElement>('#end_node')!;

  const nodeOptions = graph.getNodes().reduce((a, c) => {
    return a + `<option value=${c}>${c}</option>`;
  }, '');
  startInput.innerHTML = nodeOptions;
  endInput.innerHTML = nodeOptions;
}

const initialNodeNum = 5;
const initialMaxWeight = 10;

hydrateDOM(initialNodeNum, initialMaxWeight);

const nodeNumInput = document.querySelector<HTMLInputElement>('#nodes_amount')!;
const maxWeightInput = document.querySelector<HTMLInputElement>('#max_weight')!;
const form = document.querySelector<HTMLFormElement>('#config')!;

nodeNumInput.value = String(initialNodeNum);
maxWeightInput.value = String(initialMaxWeight);

form.addEventListener('submit', (e: SubmitEvent) => {
  e.preventDefault();
  const weight = maxWeightInput.valueAsNumber;
  const nodeNum = nodeNumInput.valueAsNumber;

  if (weight < 1) window.alert('Weight cannot be lower than 1');
  if (nodeNum < 2) window.alert('At least 2 nodes is required');

  hydrateDOM(nodeNum, weight);
});