import { input } from "../2-input";
const testInput = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

export function part1(input: string) {
  const reports = input.split("\n");
  return reports.reduce((previous, next) => {
    return previous + checkReport(next);
  }, 0);
}

function checkReport(report: string) {
  const levels = report.split(" ");

  let deltaValue: null | -1 | 1 = null;
  for (let i = 0; i < levels.length - 1; i++) {
    const current = +levels[i];
    const next = +levels[i + 1];
    const diff = current - next;
    const distance = Math.abs(diff);
    if (distance > 3 || distance === 0) return 0;
    const currentDelta = diff > 0 ? 1 : -1;
    if (deltaValue && currentDelta !== deltaValue) return 0;
    deltaValue = currentDelta;
  }

  return 1;
}

part1(input); //?
