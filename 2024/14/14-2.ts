import { input } from "./14-input";

type Position = { x: number; y: number };
type Robot = {
  currentPosition: Position;
  velocity: Position;
  startPosition: Position;
};

const MAP_WIDTH = 101;
const MAP_HEIGHT = 103;

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

function serializeXY(x: number, y: number): string {
  return `${x},${y}`;
}
const simulateRobots = (robots: Robot[], seconds: number) => {
  const robotPositions = new Set<string>();
  for (let i = 0; i < robots.length; i++) {
    const robot = robots[i];
    const newPos = move(robot, seconds);
    robotPositions.add(serializeXY(newPos.x, newPos.y));
  }
  return robotPositions;
};

const simulateRobotsLegacy = (robots: Robot[], seconds: number) => {
  for (let i = 0; i < robots.length; i++) {
    const robot = robots[i];
    const newPos = move(robot, seconds);
    robots[i].currentPosition = newPos;
  }
  return robots;
};

const createMap = (robots: Robot[]) => {
  const map = Array.from({ length: MAP_HEIGHT }, () =>
    Array.from({ length: MAP_WIDTH }, () => ".")
  );
  for (const robot of robots) {
    const { currentPosition } = robot;
    map[currentPosition.y][currentPosition.x] = "X";
  }
  return map;
};

const printMap = (map: Array<Array<string>>) => {
  console.log(map.map((row) => row.join("")).join("\n"));
};

const part2 = (input: string) => {
  const robots = parseInput(input);
  let seconds = 100_000;

  // Loop through each second and store the number of unique robot positions in a set
  const robotpositions = [];
  while (seconds > 0) {
    console.log("checking", seconds);
    seconds--;
    const robotsAfterMovement = simulateRobots(robots, seconds);
    robotpositions.push({ unique: robotsAfterMovement.size, seconds });
  }

  // check top unique robot positions for christmass tree
  robotpositions.sort((a, b) => a.unique - b.unique);

  // view map 👀
  const robotsAfterMovement = simulateRobotsLegacy(robots, seconds);
  const map = createMap(robotsAfterMovement);
  printMap(map);
};

part2(input); // 6355
