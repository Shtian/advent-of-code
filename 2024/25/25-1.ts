import { input } from "./25-input";
const testInput = `#####
.####
.####
.####
.#.#.
.#...
.....

#####
##.##
.#.##
...##
...#.
...#.
.....

.....
#....
#....
#...#
#.#.#
#.###
#####

.....
.....
#.#..
###..
###.#
###.#
#####

.....
.....
.....
#....
#.#..
#.#.#
#####`;

const parseLockHeights = (schematic: Array<string>) => {
  const pinHeights: Array<number> = [];
  for (let col = 0; col < 5; col++) {
    let height = 0;
    for (let row = 0; row < 7; row++) {
      if (schematic[row][col] === "#") {
        height++;
      } else {
        break;
      }
    }
    pinHeights.push(height - 1); // zero-based indexing
  }
  return pinHeights;
};

const parseKeyHeights = (schematic: Array<string>) => {
  const keyHeights: Array<number> = [];
  for (let col = 0; col < 5; col++) {
    let height = 0;
    for (let row = 6; row >= 0; row--) {
      if (schematic[row][col] === "#") {
        height++;
      } else {
        break;
      }
    }
    keyHeights.push(height - 1);
  }
  return keyHeights;
};

const canFit = (lockHeights: Array<number>, keyHeights: Array<number>) => {
  for (let i = 0; i < 5; i++) {
    if (lockHeights[i] + keyHeights[i] > 5) {
      return false;
    }
  }
  return true;
};

const countFittingPairs = (
  lockSchematics: Array<Array<string>>,
  keySchematics: Array<Array<string>>
) => {
  const locks = lockSchematics.map(parseLockHeights);
  const keys = keySchematics.map(parseKeyHeights);
  let count = 0;
  for (const lock of locks) {
    for (const key of keys) {
      if (canFit(lock, key)) {
        count++;
      }
    }
  }
  return count;
};

const parseInput = (puzzleInput: string) => {
  const rawBlocks = puzzleInput.trim().split(/\n\n/);
  const lockSchematics: Array<Array<string>> = [];
  const keySchematics: Array<Array<string>> = [];

  for (const block of rawBlocks) {
    const lines = block.trim().split("\n");
    if (lines[0] === "#####") {
      lockSchematics.push(lines);
    } else {
      keySchematics.push(lines);
    }
  }

  return [lockSchematics, keySchematics];
};

const part1 = (puzzleInput: string) => {
  const [locks, keys] = parseInput(puzzleInput);
  return countFittingPairs(locks, keys);
};

part1(input); //? 3439
