import { input } from "./10-input";
const testInput = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`;

// [x, y, value]
type Position = [number, number, number];
type Path = {
  startPos: Position;
  score: number;
};
const TILES = {
  START: "0",
  GOAL: 9,
};
const VALID_INCREMENT = 1;

const findStartPositions = (input: string[][]): Set<Position> => {
  const startPositions = new Set<Position>();
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] === TILES.START) {
        startPositions.add([j, i, 0]);
      }
    }
  }
  return startPositions;
};

const getNeighbours = (pos: Position, map: string[][]): Position[] => {
  const [x, y] = pos;
  const neighbours: Position[] = [];
  if (x > 0) {
    const neighbour = map[y][x - 1];
    neighbours.push([x - 1, y, +neighbour]);
  }
  if (x < map[0].length - 1) {
    const neighbour = map[y][x + 1];
    neighbours.push([x + 1, y, +neighbour]);
  }
  if (y > 0) {
    const neighbour = map[y - 1][x];
    neighbours.push([x, y - 1, +neighbour]);
  }
  if (y < map.length - 1) {
    const neighbour = map[y + 1][x];
    neighbours.push([x, y + 1, +neighbour]);
  }
  return neighbours;
};

const serializePosition = (pos: Position, id: number): string => {
  return `${pos[0]},${pos[1]},${id}`;
};

const findPaths = (startPos: Position, map: string[][]): Path => {
  const queue = [startPos];
  const visited = new Set<string>();
  const foundGoals = new Set<string>();
  let goalsReached = 0;
  let increment = 0;
  while (queue.length > 0) {
    increment++;
    const currentPos = queue.shift();
    const key = serializePosition(currentPos, increment);
    if (visited.has(key)) continue;
    visited.add(key);

    const neighbours = getNeighbours(currentPos, map);

    for (const neighbour of neighbours) {
      const nKey = serializePosition(neighbour, increment);
      if (neighbour[2] === TILES.GOAL) {
        if (currentPos[2] === 8 && !foundGoals.has(nKey)) {
          foundGoals.add(nKey);
          goalsReached++;
        }
      } else {
        const canTravel = neighbour[2] === currentPos[2] + VALID_INCREMENT;
        if (canTravel && !visited.has(nKey)) {
          queue.push(neighbour);
        }
      }
    }
  }
  return { score: goalsReached, startPos };
};

const findAllPaths = (
  startPositions: Set<Position>,
  map: string[][]
): Array<Path> => {
  const allPaths: Array<Path> = [];
  for (const startPos of startPositions) {
    const paths = findPaths(startPos, map);
    allPaths.push(paths);
  }
  return allPaths;
};

const calculateScore = (paths: Array<Path>): number => {
  return paths.reduce((acc, path) => acc + path.score, 0);
};

const part1 = (input: string) => {
  const map = input.split("\n").map((line) => line.split(""));
  const startPositions = findStartPositions(map);
  const paths = findAllPaths(startPositions, map); //?
  const result = calculateScore(paths); //?
  return result;
};

part1(input); //?
