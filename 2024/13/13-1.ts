import { input } from "./13-input";
const testInput = `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`;
type Position = { x: number; y: number };
type Entry = {
  buttonA: Position;
  buttonB: Position;
  prize: Position;
};
const parseInput = (input: string) => {
  const blocks = input.trim().split("\n\n");
  const result: Array<Entry> = [];

  for (const block of blocks) {
    const lines = block.split("\n");
    const buttonA = lines[0].match(/X\+(\d+), Y\+(\d+)/);
    const buttonB = lines[1].match(/X\+(\d+), Y\+(\d+)/);
    const prize = lines[2].match(/X=(\d+), Y=(\d+)/);

    result.push({
      buttonA: { x: Number(buttonA[1]), y: Number(buttonA[2]) },
      buttonB: { x: Number(buttonB[1]), y: Number(buttonB[2]) },
      prize: { x: Number(prize[1]), y: Number(prize[2]) },
    });
  }

  return result;
};

const simulateButtonPresses = (configuration: Entry) => {
  const { buttonA, buttonB, prize } = configuration;
  for (let i = 0; i < 100; i++) {
    const remainingX = prize.x - buttonA.x * i;
    const remainingY = prize.y - buttonA.y * i;
    if (remainingX < 0 || remainingY < 0) break;
    for (let j = 0; j < 100; j++) {
      const remainingX2 = remainingX - buttonB.x * j;
      const remainingY2 = remainingY - buttonB.y * j;
      if (remainingX2 < 0 || remainingY2 < 0) break;
      if (remainingX2 === 0 && remainingY2 === 0) {
        console.log(i, j);
        return i * 3 + j;
      }
    }
  }

  return 0;
};

const checkMachines = (configurations: Array<Entry>) => {
  const result = configurations.reduce((acc, cur) => {
    const coinsNeeded = simulateButtonPresses(cur);
    return acc + coinsNeeded;
  }, 0);

  return result;
};

const part1 = (input: string) => {
  const configurations = parseInput(input);
  const result = checkMachines(configurations);
  return result;
};

part1(input); //? 39748
