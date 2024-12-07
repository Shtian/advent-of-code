import { input } from "./7-input";
const testInput = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

const operators = ["+", "*"];

const generateOperatorPermutations = (length: number): string[][] => {
  if (length === 0) return [[]];
  const nextPermutations = generateOperatorPermutations(length - 1);
  return operators.flatMap((op) =>
    nextPermutations.map((perm) => [op, ...perm])
  );
};
const evaluateExpression = (numbers: number[], operators: string[]): number => {
  let result = numbers[0];
  for (let i = 0; i < operators.length; i++) {
    const nextNum = numbers[i + 1];
    if (operators[i] === "+") result += nextNum;
    else if (operators[i] === "*") result *= nextNum;
  }
  return result;
};

const part1 = (input: string) => {
  let runs = 0;
  const rows = input.split("\n");
  const parsedRows = rows.map((row) => {
    const [target, values] = row.split(":");
    return {
      answer: +target,
      numbers: values.trim().split(" ").map(Number),
    };
  });
  const results = parsedRows.map((row) => {
    const operatorPermutations = generateOperatorPermutations(
      row.numbers.length - 1
    ); //?
    for (let operatorSequence of operatorPermutations) {
      runs++;
      const currentResult = evaluateExpression(row.numbers, operatorSequence); //?
      if (currentResult === row.answer) return currentResult;
    }
    return 0;
  });
  console.log(runs);
  return results.reduce((acc, next) => {
    return acc + next;
  }, 0);
};

const res = part1(input); //?
