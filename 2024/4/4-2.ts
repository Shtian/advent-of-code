import { input } from "./4-input.js";
const testInput = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

const smallTestInput = `MSM
MAA
SMS`;

const part2 = (input: string) => {
  const lines = input.split("\n");
  const width = lines[0].length;
  const height = lines.length;
  let total = 0;
  const padding = 1;
  for (let i = 0 + padding; i < height - padding; i++) {
    for (let j = 0 + padding; j < width - padding; j++) {
      if (lines[i][j] !== "A") continue;

      const topLeft = lines[i - 1][j - 1];
      const topRight = lines[i - 1][j + 1];
      const bottomLeft = lines[i + 1][j - 1];
      const bottomRight = lines[i + 1][j + 1];
      if (
        topLeft === "M" &&
        bottomRight === "S" &&
        topRight === "M" &&
        bottomLeft === "S"
      ) {
        total++;
        continue;
      }
      if (
        topLeft === "S" &&
        bottomRight === "M" &&
        topRight === "S" &&
        bottomLeft === "M"
      ) {
        total++;
        continue;
      }
      if (
        topLeft === "M" &&
        bottomRight === "S" &&
        topRight === "S" &&
        bottomLeft === "M"
      ) {
        total++;
        continue;
      }

      if (
        topLeft === "S" &&
        bottomRight === "M" &&
        topRight === "M" &&
        bottomLeft === "S"
      ) {
        total++;
      }
    }
  }
  return total;
};

console.log(part2(input));
