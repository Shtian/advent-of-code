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

// Map tile types
const guard = "^"; // guard to move, and start position
const obstacle = "#";
const visited = "X";
const openSpace = ".";

const part2 = (input: string) => {
  const map = input.split("\n").map((row) => row.split(""));

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
  const startPosX = posX;
  const startPosY = posY;

  let timeloopCount = 0;
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] !== openSpace) continue;
      const newMap = input.split("\n").map((row) => row.split(""));
      newMap[y][x] = obstacle;
      newMap[startPosY][startPosX] = ".";
      const isTimeloop = simulate(newMap, startPosX, startPosY);
      if (isTimeloop) {
        timeloopCount++;
      }
    }
  }

  return timeloopCount;
};

const simulate = (map: string[][], startPosX: number, startPosY: number) => {
  let currentPosX = startPosX;
  let currentPosY = startPosY;
  let currentDirection = directions[0];
  let done = false;
  let isTimeloop = false;
  const crashmap = new Map<string, number>();

  // replace guard with openSpace
  map[currentPosY][currentPosX] = ".";
  while (!done) {
    const [nextPosX, nextPosY] = move(
      currentPosX,
      currentPosY,
      currentDirection
    );

    // break when exiting map
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
      const key =
        currentPosX + "-" + nextPosX + "," + currentPosY + "-" + nextPosY;
      const crash = crashmap.get(key) ?? 0;
      if (crash > 0) {
        isTimeloop = true;
        break;
      }
      crashmap.set(key, crash + 1);
      currentDirection = getNextDirection(currentDirection);
      continue;
    }

    currentPosX = nextPosX;
    currentPosY = nextPosY;
    map[currentPosY][currentPosX] = visited;
  }

  return isTimeloop;
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

console.log("loops:", part2(input)); //?
