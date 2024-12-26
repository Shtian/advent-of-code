import { input } from "./23-input";

const testInput = `kh-tc
qp-kh
de-cg
ka-co
yn-aq
qp-ub
cg-tb
vc-aq
tb-ka
wh-tc
yn-cg
kh-ub
ta-co
de-co
tc-td
tb-wq
wh-td
ta-ka
td-qp
aq-cg
wq-ub
ub-vc
de-ta
wq-aq
wq-vc
wh-yn
ka-de
kh-ta
co-tc
wh-qp
tb-vc
td-yn`;

const part1 = (puzzleInput: string) => {
  const lines = puzzleInput.trim().split("\n");
  const graph = new Map();

  lines.forEach((line) => {
    const [a, b] = line.split("-");
    if (!graph.has(a)) graph.set(a, new Set());
    if (!graph.has(b)) graph.set(b, new Set());
    graph.get(a).add(b);
    graph.get(b).add(a);
  });

  const nodes = Array.from(graph.keys());
  const triangles: Array<Array<string>> = [];

  // oof
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      for (let k = j + 1; k < nodes.length; k++) {
        const a = nodes[i];
        const b = nodes[j];
        const c = nodes[k];

        if (graph.get(a).has(b) && graph.get(a).has(c) && graph.get(b).has(c)) {
          triangles.push([a, b, c].sort());
        }
      }
    }
  }

  const filtered = triangles.filter((tri) =>
    tri.some((name) => name.startsWith("t"))
  );

  return filtered.length;
};

part1(input); //?
