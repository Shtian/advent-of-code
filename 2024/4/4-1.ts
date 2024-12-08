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

const xmasRegex = /(?=(XMAS|SAMX))/g;

const parseLine = (line: string) => {
  const matches = line.match(xmasRegex);
  return matches ? matches.length : 0;
};

const getColumnLine = (matrix: string[], column: number) => {
  return matrix.map((row) => row[column]).join("");
};

function countDiagonalWord(grid, target) {
  const rowCount = grid.length;
  const colCount = grid[0].length;
  let count = 0;
  const len = target.length;

  for (let row = 0; row < rowCount; row++) {
    for (let col = 0; col < colCount; col++) {
      if (row + len - 1 < rowCount && col + len - 1 < colCount) {
        let match = true;
        for (let i = 0; i < len; i++) {
          if (grid[row + i][col + i] !== target[i]) {
            match = false;
            break;
          }
        }
        if (match) count++;
      }

      if (row + len - 1 < rowCount && col - (len - 1) >= 0) {
        let match = true;
        for (let i = 0; i < len; i++) {
          if (grid[row + i][col - i] !== target[i]) {
            match = false;
            break;
          }
        }
        if (match) count++;
      }
    }
  }
  return count;
}

const part1 = (input: string) => {
  const lines = input.split("\n");
  const width = lines[0].length;
  const height = lines.length;

  // Horizontal matches
  const horizontalMatches = lines.reduce((count, line) => {
    return count + parseLine(line);
  }, 0); //?

  // Vertical matches
  const verticalMatches = Array(width)
    .fill(0)
    .map((_, i) => {
      return getColumnLine(lines, i);
    })
    .reduce((acc, next) => {
      return acc + parseLine(next);
    }, 0); //?

  // Diagonal matches

  const diagonalsMatches = countDiagonalWord(lines, "XMAS"); //?
  const diagonalsMatchesRev = countDiagonalWord(lines, "SAMX"); //?

  return (
    horizontalMatches + verticalMatches + diagonalsMatches + diagonalsMatchesRev
  );
};

console.log(part1(input));
