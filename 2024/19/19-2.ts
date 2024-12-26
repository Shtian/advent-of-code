import { input } from "./19-input";
const testInput = `r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb`;

const part1 = (input: string) => {
  const [towelsInput, designsInput] = input.split("\n\n");
  const towels = towelsInput.split(", ");
  const designs = designsInput.split("\n");

  const possibleDesigns = checkDesigns(towels, designs);
  return possibleDesigns;
};

const checkDesigns = (towels: string[], designs: string[]) => {
  const possibleDesignsLength = designs.reduce((acc, next) => {
    return acc + countCombinationsForDesign(next, towels);
  }, 0);

  return possibleDesignsLength;
};

const countCombinationsForDesign = (
  design: string,
  towels: string[]
): number => {
  const numWays = Array(design.length + 1).fill(0);
  numWays[0] = 1;

  for (let endIndex = 1; endIndex <= design.length; endIndex++) {
    for (const towel of towels) {
      const towelLength = towel.length;
      const startIndexOfTowel = endIndex - towelLength;

      if (
        startIndexOfTowel >= 0 &&
        design.substring(startIndexOfTowel, endIndex) === towel
      ) {
        numWays[endIndex] += numWays[startIndexOfTowel];
      }
    }
  }

  return numWays[design.length];
};

const t0 = performance.now();
part1(input); //?
const t1 = performance.now();
console.log(`Part1 took ${(t1 - t0).toFixed(3)} milliseconds.`);
