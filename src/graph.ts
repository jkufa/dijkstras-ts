export class Graph {
  #graph: Map<string, Edge[]>;

  constructor() {
    this.#graph = new Map<string, Edge[]>();
  }

  printGraph(): string {
    const str = JSON.stringify([...this.#graph.entries()]);
    console.log(str);
    return str;
  }

  getNodes(): string[] {
    return Array.from(this.#graph.keys());
  }

  getNodeEdges(node: string): Edge[] | undefined {
    return this.#graph.get(node);
  }

  addNode(node: string): void {
    this.#graph.set(node, new Array());
  }

  addEdge(node1: string, node2: string, weight: number): void {
    this.setEdge(node1, node2, weight);
    this.setEdge(node2, node1, weight);
  }

  private setEdge(node1: string, node2: string, weight: number): void {
    const v = this.#graph.get(node1);
    if (v == null) {
      console.error(`[Error] Node ${node1} could not be found in graph!`)
      return;
    }
    v.push({ node: node2, weight: weight });
  }
}

export type Edge = {
  node: string, // node to ->
  weight: number,
}