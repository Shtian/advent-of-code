// is no good, currently getting to 31 blinks left before it panics
const testInput = `125 17`;
const input = `475449 2599064 213 0 2 65 5755 51149`;

const part2 = (input: string) => {
  const stones = parseStart(input);
  const res = blink(stones, 75);
  return res.length;
};

const parseStart = (input: string) => {
  return input.split(" ");
};

const blink = (stones: string[], timesToBlink: number) => {
  const t0 = performance.now();
  console.log(
    "Times left to blink",
    timesToBlink,
    "- parsing",
    stones.length,
    "stones next..."
  );
  if (timesToBlink === 0) return stones;
  timesToBlink--;

  const stonesAfterBlink: Array<string> = [];
  for (let j = 0; j < stones.length; j++) {
    const currentNumber = stones[j];
    if (currentNumber === "0") {
      stonesAfterBlink.push("1");
      continue;
    } else if (currentNumber.length % 2 === 0) {
      const [first, second] = split(currentNumber);
      stonesAfterBlink.push(first);
      stonesAfterBlink.push(second);
      continue;
    }
    stonesAfterBlink.push((+currentNumber * 2024).toString());
  }

  const t1 = performance.now();
  console.log("Took ", (t1 - t0).toFixed(0) + "ms");
  return blink(stonesAfterBlink, timesToBlink);
};

// this shaves of about 1/3rd of the time
const memoizedResults = new Map<string, readonly [string, string]>();
const split = (currentNumber: string): readonly [string, string] => {
  if (memoizedResults.has(currentNumber)) {
    return memoizedResults.get(currentNumber)!;
  }

  const midpoint = currentNumber.length / 2;
  const first = currentNumber.substring(0, midpoint);

  let second = currentNumber.substring(midpoint);
  second = (+second).toString();
  const res = [first, second] as const;

  memoizedResults.set(currentNumber, res);
  return res;
};

console.log(part2(input));
