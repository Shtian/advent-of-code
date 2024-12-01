import { input } from "./1-1-input";

export function part1(input: string) {
  const rows = input.split("\n");
  const leftList: Array<number> = [];
  const rightList: Array<number> = [];

  for (const row of rows) {
    const [left, right] = row.split("   ");
    leftList.push(+left);
    rightList.push(+right);
  }

  leftList.sort((a, b) => a - b);
  rightList.sort((a, b) => a - b);

  let diff = 0;
  for (let i = 0; i < leftList.length; i++) {
    diff += Math.abs(leftList[i] - rightList[i]);
  }

  return diff;
}

const testInput = `3   4
4   3
2   5
1   3
3   9
3   3`;

part1(testInput); //?

part1(input); //?
