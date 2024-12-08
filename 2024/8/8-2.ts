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

function extrapolateAntinodesUntilOutside(
  first: Position,
  second: Position,
  maxX: number,
  maxY: number
): Array<Position> {
  // create vector from first point to secont point
  const vx = second.x - first.x;
  const vy = second.y - first.y;

  const antinodes: Array<Position> = [];

  // move from first
  let cx = first.x;
  let cy = first.y;
  while (cx >= 0 && cx < maxX && cy >= 0 && cy < maxY) {
    antinodes.push({ x: cx, y: cy });
    cx -= vx;
    cy -= vy;
  }

  // move from second
  cx = second.x;
  cy = second.y;
  while (cx >= 0 && cx < maxX && cy >= 0 && cy < maxY) {
    antinodes.push({ x: cx, y: cy });
    cx += vx;
    cy += vy;
  }

  return antinodes;
}

const createAntinodeLocations = (
  antennaPairs: Map<string, Array<{ first: Position; second: Position }>>,
  width: number,
  height: number
) => {
  const antinodes: Array<Position> = [];
  for (const pairs of antennaPairs.values()) {
    for (const pair of pairs) {
      const first = pair[0];
      const second = pair[1];
      const antinodesForPair = extrapolateAntinodesUntilOutside(
        first,
        second,
        width,
        height
      ); //?
      antinodes.push(...antinodesForPair);
    }
  }

  return antinodes;
};

const part2 = (input: string) => {
  const map = input.split("\n");
  const antennas = mapAntennas(map);
  const antennaPairs = createAntennaPairs(antennas);
  const antinodes = createAntinodeLocations(
    antennaPairs,
    map[0].length,
    map.length
  );
  const uniqueAntinodes = new Set(
    antinodes
      .filter((p) => !isOutsideMap(p, map[0].length, map.length))
      .map((node) => `${node.x},${node.y}`)
  );
  return uniqueAntinodes.size;
};

part2(input); //?
