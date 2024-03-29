import { Graph } from "./graph";

/**
 * Generate random graph of size n
 */
export function createRandomGraph(n: number, maxWeight: number = n): Graph {
  const graph = new Graph();
  const nodes: string[] = []; // Store node names as we go

  console.log(`[INFO] Creating graph of size ${n} and maxWeight ${maxWeight}`)
  for (let i = 0; i < n; i++) {
    const nodeKey = getLetter(i) ?? 'ERROR';

    if (nodeKey === 'ERROR') {
      console.error(`[ERROR] unable to get random Letter from i = ${i}`);
      break;
    }

    graph.addNode(nodeKey);
    nodes.push(nodeKey);
    console.log(`[INFO] added node ${nodeKey} to graph`);

    if (graph.getNodes().length === 1) continue;

    const nodeKey2 = getRandomNode(nodes, nodeKey);
    const weight = Math.max(1, Math.floor(Math.random() * maxWeight));
    graph.addEdge(nodeKey, nodeKey2, weight);
    console.log(`[INFO] added edge ${nodeKey}<->${nodeKey2} to graph with weight of ${weight}`);
  }

  return graph;
}

function getLetter(n: number): string | undefined {
  if (n < 0) return;

  const ASCII_OFFSET = 65;
  const ALPHABET_SIZE = 26;

  let result = '';
  while (n >= 0) {
    const remainder = n % ALPHABET_SIZE;

    result = String.fromCharCode(ASCII_OFFSET + remainder) + result;
    n = Math.floor(n / ALPHABET_SIZE) - 1;

    if (n < 0) break;
}
  return result;
}

function getRandomNode(nodes: string[], exclude?: string): string {
  const index = Math.floor(Math.random() * nodes.length);
  let node = nodes[index];

  if (exclude != null) {
    while (exclude === node) {
      node = getRandomNode(nodes, exclude);
    }
  }

  return node;
}