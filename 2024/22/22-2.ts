import { input } from "./22-input";
const testInput = `1
10
100
2024`;

const simpleTestInput = `123`;
const PRUNE_NUMBER = 16777216;
const part1 = (input: string) => {
  const timesToProcess = 2000;
  const initialBuyerNumbers = input.split("\n").map(Number);
  const secretNumbers = initialBuyerNumbers.map((initial) =>
    processBuyer(initial, timesToProcess)
  );
  return secretNumbers.reduce((acc, next) => acc + next, 0);
};

const processBuyer = (initialNumber: number, times: number) => {
  let currentNumber = initialNumber;
  let secretNumbers: number[] = [];
  for (let i = 0; i < times; i++) {
    currentNumber = nextNumber(currentNumber);
    secretNumbers.push(currentNumber);
  }
  return currentNumber;
};

const nextNumber = (original: number) => {
  let secret = original;
  // Step 1
  let x = (secret * 64) >>> 0;
  secret = mix(secret, x);
  secret = prune(secret);

  // Step 2
  x = Math.floor(secret / 32);
  secret = mix(secret, x);
  secret = prune(secret);

  // Step 3
  x = secret * 2048;
  secret = mix(secret, x);
  secret = prune(secret);

  return secret;
};

const mix = (original: number, mixNumber: number) => {
  return (original ^ mixNumber) & 0xffffff; // mask to stay in unsigned int range
};

const prune = (original: number) => {
  return original % PRUNE_NUMBER;
};

const t0 = performance.now();
part1(input); //? 16999668565
const t1 = performance.now();
console.log(`Part1 took ${(t1 - t0).toFixed(3)} milliseconds.`);
