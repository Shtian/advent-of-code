import { input } from "./9-input";
const testInput = `2333133121414131402`;

type Block = {
  type: "file" | "free space";
  size: number;
  id: number;
};

function createLayout(denseMap: string[]) {
  const layout: Block[] = [];
  for (let i = 0; i < denseMap.length; i += 2) {
    const fileLen = +denseMap[i];
    const freeLen = +denseMap[i + 1];
    const fileId = i / 2;
    if (fileLen > 0) {
      layout.push({
        type: "file",
        size: fileLen,
        id: fileId,
      });
    }
    if (freeLen > 0) {
      layout.push({
        type: "free space",
        size: freeLen,
        id: -1,
      });
    }
  }
  mergeFreeSpaces(layout);
  return layout;
}

function mergeFreeSpaces(layout: Block[]) {
  for (let i = 0; i < layout.length - 1; i++) {
    if (
      layout[i].type === "free space" &&
      layout[i + 1].type === "free space"
    ) {
      layout[i].size += layout[i + 1].size;
      layout.splice(i + 1, 1);
      i--;
    }
  }
}

function runCompactor(layout: Block[]) {
  const sortedFiles = [...layout.filter((b) => b.type === "file")].sort(
    (a, b) => b.id - a.id
  );

  for (const currentFileBlock of sortedFiles) {
    const fileIndex = layout.indexOf(currentFileBlock);
    if (fileIndex < 0) continue;

    let foundFreeIndex = -1;
    for (let i = 0; i < fileIndex; i++) {
      if (
        layout[i].type === "free space" &&
        layout[i].size >= currentFileBlock.size
      ) {
        foundFreeIndex = i;
        break;
      }
    }

    if (foundFreeIndex < 0) continue;

    layout[fileIndex] = {
      type: "free space",
      size: currentFileBlock.size,
      id: -1,
    };
    mergeFreeSpaces(layout);

    foundFreeIndex = -1;
    for (let i = 0; i < layout.length; i++) {
      if (
        layout[i].type === "free space" &&
        layout[i].size >= currentFileBlock.size
      ) {
        if (i < fileIndex) {
          foundFreeIndex = i;
          break;
        }
      }
    }

    if (foundFreeIndex < 0) {
      continue;
    }

    const foundFreeBlock = layout[foundFreeIndex];
    const diff = foundFreeBlock.size - currentFileBlock.size;
    layout[foundFreeIndex] = {
      type: "file",
      size: currentFileBlock.size,
      id: currentFileBlock.id,
    };
    if (diff > 0) {
      layout.splice(foundFreeIndex + 1, 0, {
        type: "free space",
        size: diff,
        id: -1,
      });
    }

    mergeFreeSpaces(layout);
  }

  return layout;
}

function calculateChecksum(layout: Block[]) {
  const finalBlocks: number[] = [];
  for (const block of layout) {
    if (block.type === "free space") {
      for (let i = 0; i < block.size; i++) finalBlocks.push(-1);
    } else {
      for (let i = 0; i < block.size; i++) finalBlocks.push(block.id);
    }
  }

  let sum = 0;
  for (let i = 0; i < finalBlocks.length; i++) {
    const val = finalBlocks[i];
    if (val !== -1) sum += val * i;
  }
  return sum;
}

function part2(data: string) {
  const denseMap = data.split("");
  const layout = createLayout(denseMap);
  const compactedLayout = runCompactor(layout);
  const checksum = calculateChecksum(compactedLayout);
  return checksum;
}

console.log(part2(input));
