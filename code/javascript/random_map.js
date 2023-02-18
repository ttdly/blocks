class Node {
  constructor(id) {
    this.id = id;
    this.neighbors = new Set();
  }

  connect(node) {
    if(node !== this) {
      this.neighbors.add(node);
      node.neighbors.add(this);
    }
  }
}

class RandomGraph {
  constructor(size) {
    this.nodes = new Set();
    for (let i = 0; i < size; ++i) {
      this.nodes.add(new Node(i));
    }
    const numTemp = parseFloat(1 / size); // 用于和随机数比较的数
    for (const x of this.nodes) {
      for (const y of this.nodes) {
        if (Math.random() < numTemp) {
          x.connect(y);
        }
      }
    }
  }
  /**
   * 用于打印出图的形状
   */
  print() {
    for (const node of this.nodes) {
      const ids = [...node.neighbors]
      .map((n) => n.id)
      .join(',');
      console.log(`${node.id}:${ids}`);
    }
  }
  /**
   * 检测这个随机图是否连通
   */
  isConnected() {
    const visitedNode = new Set();

    function* visit(nodes) {
      for (const node of nodes) {
        if(!visitedNode.has(node)) {
          yield node;
          yield* visit(node.neighbors);
        }
      }
    }
      const firstNode = this.nodes[Symbol.iterator]().next().value;

      for (const node of visit([firstNode])) {
        visitedNode.add(node);
      }

      return (visitedNode.size === this.nodes.size);
  }
}

const g = new RandomGraph(6);
g.print();
console.log(g.isConnected())
