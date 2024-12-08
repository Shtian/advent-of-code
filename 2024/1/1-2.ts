import { input } from "./1-1-input";

export function part2(input: string) {
  const rows = input.split("\n");
  const leftList: Array<number> = [];
  const rightList = new Map();

  for (const row of rows) {
    const [left, rightString] = row.split("   ");
    leftList.push(+left);
    const right = +rightString;
    rightList.set(right, (rightList.get(right) ?? 0) + 1);
  }

  const total = leftList.reduce((totalScore, currentNumber) => {
    const occurrences = rightList.get(currentNumber) ?? 0;
    const similarityScore = occurrences * currentNumber;
    return totalScore + similarityScore;
  }, 0);

  return total;
}

const testInput = `3   4
4   3
2   5
1   3
3   9
3   3`;

part2(testInput); //?

part2(input); //?
