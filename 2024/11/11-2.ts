const parseStart = (input: string): Array<number> => {
  return input.trim().split(" ").map(Number);
};

const memo = new Map<string, number>();

function shiftStone(stone: number): Array<number> {
  if (stone === 0) {
    return [1];
  }

  const s = stone.toString();
  if (s.length % 2 === 0) {
    const midpoint = s.length / 2;
    const left = Number(s.slice(0, midpoint));
    const right = Number(s.slice(midpoint));
    return [left, right];
  } else {
    return [stone * 2024];
  }
}

function blink(stone: number, iterations: number): number {
  const key = `${stone}-${iterations}`;
  if (memo.has(key)) {
    return memo.get(key)!;
  }

  if (iterations === 0) {
    memo.set(key, 1);
    return 1;
  }

  const nextStones = shiftStone(stone);
  let result = 0;
  for (const nextStone of nextStones) {
    result += blink(nextStone, iterations - 1);
  }

  memo.set(key, result);
  return result;
}

function part2(input: string): number {
  const stones = parseStart(input);
  let total = 0;
  for (const stone of stones) {
    total += blink(stone, 75);
  }
  return total;
}

const testInput = `125 17`;
const input = `475449 2599064 213 0 2 65 5755 51149`;
console.log(part2(input));
