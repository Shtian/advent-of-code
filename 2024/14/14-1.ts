import { input } from "./14-input";

type Position = { x: number; y: number };
type Robot = {
  currentPosition: Position;
  velocity: Position;
  startPosition: Position;
};

const MAP_WIDTH = 101;
const MAP_HEIGHT = 103;
const SECONDS = 100;

const parseInput = (input: string) => {
  const rows = input.trim().split("\n");
  const robots: Array<Robot> = [];

  for (const row of rows) {
    const [pRaw, vRaw] = row.split(" ");
    const pStr = pRaw.split("=")[1];
    const vStr = vRaw.split("=")[1];
    const startPosition = {
      x: Number(pStr.split(",")[0]),
      y: Number(pStr.split(",")[1]),
    };
    const velocity = {
      x: Number(vStr.split(",")[0]),
      y: Number(vStr.split(",")[1]),
    };
    robots.push({
      startPosition,
      velocity,
      currentPosition: startPosition,
    });
  }

  return robots;
};

const move = (robot: Robot, seconds: number) => {
  const { currentPosition, velocity } = robot;

  // account for negative values 🤦‍♂️
  const deltaX = (velocity.x * seconds) % MAP_WIDTH;
  const deltaY = (velocity.y * seconds) % MAP_HEIGHT;

  const x = (currentPosition.x + deltaX + MAP_WIDTH) % MAP_WIDTH;
  const y = (currentPosition.y + deltaY + MAP_HEIGHT) % MAP_HEIGHT;

  return { x, y };
};

const simulateRobots = (robots: Robot[], seconds: number) => {
  for (let i = 0; i < robots.length; i++) {
    const robot = robots[i];
    const newPos = move(robot, seconds);
    robots[i].currentPosition = newPos;
  }
  return robots;
};

// 1 2
// 3 4
const isInFirstQuadrant = (robot: Robot) => {
  const { currentPosition } = robot;
  return (
    currentPosition.x < Math.floor(MAP_WIDTH / 2) &&
    currentPosition.y < Math.floor(MAP_HEIGHT / 2)
  );
};

const isInSecondQuadrant = (robot: Robot) => {
  const { currentPosition } = robot;

  return (
    currentPosition.x >= Math.ceil(MAP_WIDTH / 2) &&
    currentPosition.y < Math.floor(MAP_HEIGHT / 2)
  );
};
const isInThirdQuadrant = (robot: Robot) => {
  const { currentPosition } = robot;
  return (
    currentPosition.x >= Math.ceil(MAP_WIDTH / 2) &&
    currentPosition.y >= Math.ceil(MAP_HEIGHT / 2)
  );
};

const isInFourthQuadrant = (robot: Robot) => {
  const { currentPosition } = robot;
  return (
    currentPosition.x < Math.floor(MAP_WIDTH / 2) &&
    currentPosition.y >= Math.ceil(MAP_HEIGHT / 2)
  );
};

const calculateSafetyFactor = (robots: Robot[]) => {
  const firstQuadrant = robots.filter(isInFirstQuadrant); //?
  const secondQuadrant = robots.filter(isInSecondQuadrant); //?
  const thirdQuadrant = robots.filter(isInThirdQuadrant); //?
  const fourthQuadrant = robots.filter(isInFourthQuadrant); //?

  return (
    firstQuadrant.length *
    secondQuadrant.length *
    thirdQuadrant.length *
    fourthQuadrant.length
  );
};

const createMap = (robots: Robot[]) => {
  const map = Array.from({ length: MAP_HEIGHT }, () =>
    Array.from({ length: MAP_WIDTH }, () => ".")
  );
  for (const robot of robots) {
    const { currentPosition } = robot;
    const tile = map[currentPosition.y][currentPosition.x];
    if (tile === ".") {
      map[currentPosition.y][currentPosition.x] = "1";
      continue;
    }
    map[currentPosition.y][currentPosition.x] = (Number(tile) + 1).toString();
  }
  return map;
};

const printMap = (map: Array<Array<string>>) => {
  console.log(map.map((row) => row.join("")).join("\n"));
};

const part1 = (input: string) => {
  const robots = parseInput(input);
  const robotsAfterMovement = simulateRobots(robots, SECONDS);

  // view map 👀
  // const map = createMap(robotsAfterMovement); // ?
  // printMap(map);

  const safetyFactor = calculateSafetyFactor(robotsAfterMovement);
  return safetyFactor; //?
};

const testInput = `p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`;
const testInputOne = `p=2,4 v=2,-3`;

// 220971520
part1(input);
