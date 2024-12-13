import { input } from "./13-input";

type Position = { x: number; y: number };
type MachineConfiguration = {
  buttonA: Position;
  buttonB: Position;
  prize: Position;
};
const offset = 10000000000000;

function parseInput(input: string): Array<MachineConfiguration> {
  const blocks = input.trim().split("\n\n");
  const configurations: Array<MachineConfiguration> = [];

  for (const block of blocks) {
    const lines = block.split("\n");
    const buttonAMatch = lines[0].match(/X\+(\d+), Y\+(\d+)/);
    const buttonBMatch = lines[1].match(/X\+(\d+), Y\+(\d+)/);
    const prizeMatch = lines[2].match(/X=(\d+), Y=(\d+)/);

    configurations.push({
      buttonA: { x: Number(buttonAMatch[1]), y: Number(buttonAMatch[2]) },
      buttonB: { x: Number(buttonBMatch[1]), y: Number(buttonBMatch[2]) },
      prize: { x: Number(prizeMatch[1]), y: Number(prizeMatch[2]) },
    });
  }

  return configurations;
}

function checkForSolution(configuration: MachineConfiguration) {
  const { buttonA, buttonB, prize } = configuration;
  const adjustedPrize = {
    x: prize.x + offset,
    y: prize.y + offset,
  };
  const intersectValue = buttonB.x * buttonA.y - buttonB.y * buttonA.x;
  const steps = adjustedPrize.x * buttonA.y - adjustedPrize.y * buttonA.x;

  const integerSolutionExists = steps % intersectValue === 0;
  if (!integerSolutionExists) {
    return 0;
  }

  const buttonBPressCount = steps / intersectValue;
  if ((adjustedPrize.x - buttonB.x * buttonBPressCount) % buttonA.x !== 0) {
    return 0;
  }

  const buttonAPressCount =
    (adjustedPrize.x - buttonB.x * buttonBPressCount) / buttonA.x;
  return buttonAPressCount * 3 + buttonBPressCount;
}

function checkMachines(configurations: Array<MachineConfiguration>): number {
  return configurations.reduce((accumulatedTokens, machineConfiguration) => {
    const tokensNeeded = checkForSolution(machineConfiguration);
    return accumulatedTokens + tokensNeeded;
  }, 0);
}

function part2(input: string): number {
  const configurations = parseInput(input);
  const totalTokens = checkMachines(configurations);
  return totalTokens;
}

part2(input); //? 74478585072604
