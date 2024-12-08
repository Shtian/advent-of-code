import { input } from "./5-input.js";

const part2 = (input: string) => {
  const [order, updates] = input.split("\n\n");
  const largerThan = new Map<string, string[]>();
  const smallerThan = new Map<string, string[]>();

  order.split("\n").forEach((rule) => {
    const [a, b] = rule.split("|");
    largerThan.set(a, [...(largerThan.get(a) || []), b]);
    smallerThan.set(b, [...(smallerThan.get(b) || []), a]);
  });

  const middleValues = updates.split("\n").map((update) => {
    const updateValues = update.split(",");
    let isIncorrect = false;

    const dependencies = new Map<string, Set<string>>();

    updateValues.forEach((page) => {
      dependencies.set(page, new Set());

      if (smallerThan.has(page)) {
        smallerThan.get(page)!.forEach((dep) => {
          if (updateValues.includes(dep)) dependencies.get(page)!.add(dep);
        });
      }

      if (largerThan.has(page)) {
        largerThan.get(page)!.forEach((dep) => {
          if (updateValues.includes(dep)) dependencies.get(dep)?.add(page);
        });
      }
    });

    const visited = new Set<string>();
    const sorted: string[] = [];

    const visit = (node: string) => {
      if (visited.has(node)) return;
      visited.add(node);

      for (const dep of dependencies.get(node) || []) {
        visit(dep);
      }

      sorted.push(node);
    };

    updateValues.forEach((page) => visit(page));

    if (sorted.join(",") !== updateValues.join(",")) {
      isIncorrect = true;
    }

    const middle = isIncorrect ? +sorted[Math.floor(sorted.length / 2)] : 0; // Middle value
    return middle; // ?
  });

  return middleValues.reduce((a, b) => a + b, 0);
};

part2(input); //?
