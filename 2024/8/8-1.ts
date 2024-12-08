import { input } from "./8-input";
const testInput = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;

const TILES = { OPEN_SPACE: ".", ANTINODE: "#" } as const;
type Position = { x: number; y: number };

const mapAntennas = (map: string[]) => {
  const antennas = new Map<string, Array<Position>>();
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const tile = map[y][x];
      if (tile === TILES.OPEN_SPACE) continue;
      const antennaPositions = antennas.get(tile) ?? [];
      antennaPositions.push({ x, y });
      antennas.set(tile, antennaPositions);
    }
  }
  return antennas;
};

const createAntennaPairs = (antennas: Map<string, Array<Position>>) => {
  const antennaPairs = new Map<
    string,
    Array<{ first: Position; second: Position }>
  >();
  for (const [frequency, positions] of antennas.entries()) {
    const pairs = [];
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        pairs.push([positions[i], positions[j]]);
      }
    }
    antennaPairs.set(frequency, pairs);
  }

  return antennaPairs;
};

const isOutsideMap = (position: Position, width: number, height: number) => {
  return (
    position.x < 0 ||
    position.x >= width ||
    position.y < 0 ||
    position.y >= height
  );
};

const extrapolatedAntinodes = (
  first: Position,
  second: Position
): [Position, Position] => {
  const vx = second.x - first.x;
  const vy = second.y - first.y;
  const antinodeOne = { x: first.x - vx, y: first.y - vy };
  const antinodeTwo = { x: second.x + vx, y: second.y + vy };
  return [antinodeOne, antinodeTwo];
};

const createAntinodeLocations = (
  antennaPairs: Map<string, Array<{ first: Position; second: Position }>>
) => {
  const antinodes: Array<Position> = [];
  for (const pairs of antennaPairs.values()) {
    for (const pair of pairs) {
      const first = pair[0];
      const second = pair[1];
      const [antinodeOne, antinodeTwo] = extrapolatedAntinodes(first, second);
      antinodes.push(antinodeOne);
      antinodes.push(antinodeTwo);
    }
  }

  return antinodes;
};

const part1 = (input: string) => {
  const map = input.split("\n");
  const antennas = mapAntennas(map);
  const antennaPairs = createAntennaPairs(antennas);
  const antinodes = createAntinodeLocations(antennaPairs);
  const uniqueAntinodes = new Set(
    antinodes
      .filter((p) => !isOutsideMap(p, map[0].length, map.length))
      .map((node) => `${node.x},${node.y}`)
  );
  return uniqueAntinodes.size;
};

part1(input); //?
