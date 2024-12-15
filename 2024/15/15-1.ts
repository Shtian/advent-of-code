import { input } from "./15-input";
const testInput = `########
#..O.O.#
##@.O..#
#...O..#
#.#.O..#
#...O..#
#......#
########

<^^>>>vv<v>>v<<`;

const testLarge = `##########
#..O..O.O#
#......O.#
#.OO..O.O#
#..O@..O.#
#O#..O...#
#O..O..O.#
#.OO.O.OO#
#....O...#
##########

<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^`;

const robot = "@"; // guard to move, and start position
const obstacle = "#";
const box = "O";
const openSpace = ".";
type Direction = "^" | ">" | "v" | "<";
const part1 = (input: string) => {
  const [mapRows, commandsRows] = input.split("\n\n");
  const map = mapRows.split("\n").map((row) => row.split(""));
  const commands = commandsRows
    .split("\n")
    .join("")
    .split("") as Array<Direction>;
  const mapAfterCommands = runCommands(map, commands);
  return calculateGPSSum(mapAfterCommands);
};

const runCommands = (map: string[][], commands: Array<Direction>) => {
  let [robotX, robotY] = findObject(map, robot);
  while (commands.length > 0) {
    const nextCommand = commands.shift();
    const [nextX, nextY] = nextPosition(robotX, robotY, nextCommand!);
    const nextTile = map[nextY][nextX];
    switch (nextTile) {
      case openSpace:
        map[robotY][robotX] = openSpace;
        robotX = nextX;
        robotY = nextY;
        map[nextY][nextX] = robot;
        continue;
      case box:
        const canMove = shiftBoxes(map, robotX, robotY, nextCommand!);
        if (!canMove) continue;
        map[robotY][robotX] = openSpace;
        robotX = nextX;
        robotY = nextY;
        map[nextY][nextX] = robot;
        continue;
      case obstacle:
        continue;
    }
  }
  printMap(map);
  return map;
};

const shiftBoxes = (
  map: string[][],
  robotX: number,
  robotY: number,
  direction: Direction
) => {
  switch (direction) {
    case "^":
      return moveBoxUp(map, robotX, robotY);
    case ">":
      return moveBoxRight(map, robotX, robotY);
    case "v":
      return moveBoxDown(map, robotX, robotY);
    case "<":
      return moveBoxLeft(map, robotX, robotY);
  }
};
const moveBoxUp = (map: string[][], robotX: number, robotY: number) => {
  for (let y = robotY; y >= 0; y--) {
    if (map[y][robotX] === obstacle) {
      return false;
    }
    if (map[y][robotX] === openSpace) {
      map[y][robotX] = box;
      return true;
    }
  }
  return false;
};
const moveBoxRight = (map: string[][], robotX: number, robotY: number) => {
  for (let x = robotX; x < map[0].length; x++) {
    if (map[robotY][x] === obstacle) {
      return false;
    }
    if (map[robotY][x] === openSpace) {
      map[robotY][x] = box;
      return true;
    }
  }
  return false;
};
const moveBoxDown = (map: string[][], robotX: number, robotY: number) => {
  for (let y = robotY; y < map.length; y++) {
    if (map[y][robotX] === obstacle) {
      return false;
    }
    if (map[y][robotX] === openSpace) {
      map[y][robotX] = box;
      return true;
    }
  }
  return false;
};
const moveBoxLeft = (map: string[][], robotX: number, robotY: number) => {
  for (let x = robotX; x >= 0; x--) {
    if (map[robotY][x] === obstacle) {
      return false;
    }
    if (map[robotY][x] === openSpace) {
      map[robotY][x] = box;
      return true;
    }
  }
};

const calculateGPSSum = (map: string[][]) => {
  let gpsSum = 0;
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === box) {
        gpsSum += y * 100 + x;
      }
    }
  }
  return gpsSum;
};

const findObject = (map: string[][], object: string) => {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === object) {
        return [x, y];
      }
    }
  }

  return [0, 0];
};

const nextPosition = (posX: number, posY: number, direction: Direction) => {
  switch (direction) {
    case "^":
      return [posX, posY - 1];
    case ">":
      return [posX + 1, posY];
    case "v":
      return [posX, posY + 1];
    case "<":
      return [posX - 1, posY];
  }
};

const printMap = (map) => {
  map.forEach((row) => {
    console.log(row.join(""));
  });
};

part1(input); //?
