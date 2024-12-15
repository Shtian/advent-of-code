import { input } from "./15-input";
const testInput = `#######
#...#.#
#.....#
#..OO@#
#..O..#
#.....#
#######

<`; //<vv<<^^<<^^`;

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
const boxLeftSide = "[";
const boxRightSide = "]";
const openSpace = ".";
type Direction = "^" | ">" | "v" | "<";
const part1 = (input: string) => {
  const [mapRows, commandsRows] = input.split("\n\n");
  const map = createLargeMap(mapRows);
  printMap(map);
  const commands = commandsRows
    .split("\n")
    .join("")
    .split("") as Array<Direction>;
  const mapAfterCommands = runCommands(map, commands);
  return calculateGPSSum(mapAfterCommands);
};

const createLargeMap = (mapRows: string) => {
  const oldMap = mapRows.split("\n");
  const newMap: Array<string> = [];
  for (const row of oldMap) {
    const newRow = row
      .replace(/#/g, "##")
      .replace(/\./g, "..")
      .replace(/@/g, "@.")
      .replace(/O/g, "[]");
    newMap.push(newRow);
  }
  return newMap.map((row) => row.split(""));
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
      case boxLeftSide:
      case boxRightSide:
        const canMove = shiftBoxes(map, robotX, robotY, nextCommand!, nextTile);
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
  direction: Direction,
  nextTile: string
) => {
  switch (direction) {
    case "^":
      return moveBoxUp(map, robotX, robotY, nextTile);
    case ">":
      return moveBoxRight(map, robotX, robotY, nextTile);
    case "v":
      return moveBoxDown(map, robotX, robotY, nextTile);
    case "<":
      return moveBoxLeft(map, robotX, robotY, nextTile);
  }
};
const moveBoxUp = (
  map: string[][],
  robotX: number,
  robotY: number,
  nextTile: string
) => {
  const alsoCheck = nextTile === "[" ? 1 : -1;
  for (let y = robotY; y >= 0; y--) {
    if (
      map[y][robotX] === openSpace &&
      map[y][robotX + alsoCheck] === openSpace
    ) {
      map[y][robotX] = nextTile;
      map[y][robotX + alsoCheck] =
        nextTile === "[" ? boxRightSide : boxLeftSide;
      return true;
    }
  }
  return false;
};
const moveBoxDown = (
  map: string[][],
  robotX: number,
  robotY: number,
  nextTile: string
) => {
  const alsoCheck = nextTile === "[" ? 1 : -1;
  for (let y = robotY; y < map.length; y++) {}
  return false;
};
const moveBoxRight = (
  map: string[][],
  robotX: number,
  robotY: number,
  nextTile: string
) => {
  for (let x = robotX; x < map[0].length; x++) {}
  return false;
};

const moveBoxLeft = (
  map: string[][],
  robotX: number,
  robotY: number,
  nextTile: string
) => {
  for (let x = robotX; x >= 0; x--) {}
};

const calculateGPSSum = (map: string[][]) => {
  let gpsSum = 0;
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "]") {
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

part1(testInput); //?
