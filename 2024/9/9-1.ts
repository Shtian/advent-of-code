import { input } from "./9-input.ts";
const testInput = `2333133121414131402`;

const createLayout = (denseMap: string[]) => {
  const layout: number[] = [];
  for (let i = 0; i < denseMap.length; i += 2) {
    const fileLen = +denseMap[i];
    const freeLen = +denseMap[i + 1];
    const fileId = i / 2;
    for (let j = 0; j < fileLen; j++) layout.push(fileId);
    for (let j = 0; j < freeLen; j++) layout.push(-1);
  }
  return layout;
};

function runCompactor(layout: number[]) {
  while (true) {
    const gapIndex = layout.indexOf(-1);
    if (gapIndex < 0) break;
    let blockIndex = -1;
    for (let i = layout.length - 1; i > gapIndex; i--) {
      if (layout[i] !== -1) {
        blockIndex = i;
        break;
      }
    }
    if (blockIndex < 0) break;
    layout[gapIndex] = layout[blockIndex];
    layout[blockIndex] = -1;
  }
  return layout;
}

function calculateChecksum(layout: number[]) {
  let sum = 0;
  for (let i = 0; i < layout.length; i++) {
    if (layout[i] === -1) continue;
    sum += layout[i] * i;
  }
  return sum;
}

const part1 = (data: string) => {
  const denseMap = data.split("");
  const layout = createLayout(denseMap);
  const compactedLayout = runCompactor(layout);
  const checksum = calculateChecksum(compactedLayout);
  return checksum;
};

console.log(part1(input));
