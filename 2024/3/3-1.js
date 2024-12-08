import { readFileSync } from "fs";
function readInput() {
  const input = readFileSync(`./3-input.txt`, "utf-8");
  return input;
}
const input = readInput();
const part1 = (input) => {
  const reggie = new RegExp(/mul\(\d+,\d+\)/g);
  const matches = input.match(reggie);
  return matches.reduce((previous, next) => {
    const [a, b] = next.split(","); // ?
    return previous + +a.slice(4) * +b.slice(0, -1); // ?
  }, 0);
};

// part1(input); //?
const testinput =
  "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";
const part2 = (input) => {
  const reggieDoDont = new RegExp(/(mul\(\d+,\d+\))|(do\(\))|(don\'t\(\))/g);
  const matches = input.match(reggieDoDont);
  let enabled = true;

  return matches.reduce((previous, next) => {
    if (next === "do()") {
      enabled = true;
    } else if (next === "don't()") {
      enabled = false;
    } else if (enabled && next.startsWith("mul")) {
      const [a, b] = next.split(",");
      return previous + +a.slice(4) * +b.slice(0, -1);
    }

    return previous;
  }, 0);
};

part2(input); //?
