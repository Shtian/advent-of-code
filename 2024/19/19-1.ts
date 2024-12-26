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
  designs.length; //?

  const possibleDesigns = checkDesigns(towels, designs);
  return possibleDesigns;
};

const checkDesigns = (towels: string[], designs: string[]) => {
  const maxTowelLength = Math.max(...towels.map((towel) => towel.length));
  const availableTowels = new Set(towels);
  const possibleDesignsLength = designs.filter((design) => {
    return checkDesign(design, maxTowelLength, availableTowels);
  }).length;

  return possibleDesignsLength;
};

const checkDesign = (
  design: string,
  maxTowelLength: number,
  availableTowels: Set<string>
): number => {
  const canMatchUpTo = Array(design.length + 1).fill(false);
  canMatchUpTo[0] = true;

  for (let endIndex = 1; endIndex <= design.length; endIndex++) {
    for (
      let startIndex = Math.max(0, endIndex - maxTowelLength);
      startIndex < endIndex;
      startIndex++
    ) {
      if (
        canMatchUpTo[startIndex] &&
        availableTowels.has(design.substring(startIndex, endIndex))
      ) {
        canMatchUpTo[endIndex] = true;
        break;
      }
    }
  }

  return canMatchUpTo[design.length] ? 1 : 0;
};

const t0 = performance.now();
part1(input); //?
const t1 = performance.now();
console.log(`Part1 took ${(t1 - t0).toFixed(3)} milliseconds.`);
