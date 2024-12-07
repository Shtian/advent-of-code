const testInput = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

const part1 = (input: string) => {
  const [order, updates] = input.split("\n\n");
  const largerThan = new Map<string, string[]>();
  const smallerThan = new Map<string, string[]>();
  order.split("\n").forEach((update) => {
    const [a, b] = update.split("|");
    const currentLargerThan = largerThan.get(a);
    largerThan.set(
      a,
      currentLargerThan === undefined ? [b] : [...currentLargerThan, b]
    );
    smallerThan.set(
      b,
      smallerThan.get(b) === undefined ? [a] : [...smallerThan.get(b), a]
    );
  });

  smallerThan;

  const middleValues = updates.split("\n").map((update) => {
    const updateValues = update.split(",");
    for (
      let currentIndex = 0;
      currentIndex < updateValues.length;
      currentIndex++
    ) {
      const currentValue = updateValues[currentIndex];
      if (!largerThan.has(currentValue) && !smallerThan.has(currentValue)) {
        continue;
      }

      for (let i = 0; i < updateValues.length; i++) {
        if (currentIndex === i) {
          continue;
        }
        const valueToCheckAgainst = updateValues[i];
        const mapToCheck = i < currentIndex ? smallerThan : largerThan;
        if (mapToCheck.get(valueToCheckAgainst)?.includes(currentValue)) {
          return 0;
        }
      }
    }
    console.log("valid");
    return +updateValues[Math.floor(updateValues.length / 2)];
  });
  return middleValues.reduce((a, b) => a + +b, 0);
};

part1(testInput); //?
// 143 test result
