import { input } from "../6-input";
const testInput = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

type direction = "up" | "right" | "down" | "left";
const directions: Array<direction> = ["up", "right", "down", "left"];
const part1 = (input: string) => {
  const map = input.split("\n").map((row) => row.split(""));
  const guard = "^"; // guard to move, and start position
  const obstacle = "#";
  const visited = "X";
  const openSpace = ".";
  // Find start position
  let posX = 0;
  let posY = 0;
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === guard) {
        posX = x;
        posY = y;
        break;
      }
    }
  }

  let currentDirection = directions[0];
  let done = false;
  let stepCount = 0;
  map[posY][posX] = ".";
  while (!done) {
    const [nextPosX, nextPosY] = move(posX, posY, currentDirection);
    if (
      nextPosX < 0 ||
      nextPosX >= map[0].length ||
      nextPosY < 0 ||
      nextPosY >= map.length
    ) {
      done = true;
      break;
    }
    const nextTile = map[nextPosY][nextPosX];
    if (nextTile === obstacle) {
      currentDirection = getNextDirection(currentDirection);
      continue;
    }
    posX = nextPosX;
    posY = nextPosY;
    if (nextTile !== visited) stepCount++;
    map[posY][posX] = visited;
    // printMap(map); //?
  }

  return stepCount;
};

const move = (posX: number, posY: number, direction: direction) => {
  switch (direction) {
    case "up":
      return [posX, posY - 1];
    case "right":
      return [posX + 1, posY];
    case "down":
      return [posX, posY + 1];
    case "left":
      return [posX - 1, posY];
  }
};

const getNextDirection = (currentDirection: direction) => {
  const index = directions.indexOf(currentDirection);
  return directions[(index + 1) % directions.length];
};

const printMap = (map) => {
  map.forEach((row) => {
    console.log(row.join(""));
  });
};

part1(testInput); //?
