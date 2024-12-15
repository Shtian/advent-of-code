import { input } from "./12-input";

type Position = { x: number; y: number };
type Region = {
  plots: Map<string, Position>;
  plantType: string;
};

const serializeXY = (x: string | number, y: string | number) => `${x},${y}`;

const isOutOfBounds = (x: number, y: number, map: Array<Array<string>>) =>
  x < 0 || y < 0 || x >= map.length || y >= map[0].length;

const getNeighbourPositions = (pos: Position) => {
  const possibleNeighbours = [
    { x: pos.x - 1, y: pos.y },
    { x: pos.x + 1, y: pos.y },
    { x: pos.x, y: pos.y - 1 },
    { x: pos.x, y: pos.y + 1 },
  ];
  return possibleNeighbours;
};

const mapRegions = (map: Array<Array<string>>) => {
  const regions: Array<Region> = [];
  const visited = new Set<string>();

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (visited.has(serializeXY(x, y))) continue;
      const region: Region = { plantType: map[y][x], plots: new Map() };
      const queue: Array<Position> = [];
      queue.push({ x, y });
      visited.add(serializeXY(x, y));
      while (queue.length > 0) {
        const current = queue.shift();
        region.plots.set(serializeXY(current.x, current.y), {
          x: current.x,
          y: current.y,
        });

        const possibleNeighbours = getNeighbourPositions(current);
        for (const neighbour of possibleNeighbours) {
          if (
            isOutOfBounds(neighbour.x, neighbour.y, map) ||
            visited.has(serializeXY(neighbour.x, neighbour.y)) ||
            map[neighbour.y][neighbour.x] !== region.plantType
          ) {
            continue;
          }

          visited.add(serializeXY(neighbour.x, neighbour.y));
          queue.push(neighbour);
        }
      }

      // add finished region to regions
      regions.push(region);
    }
  }

  return regions;
};

const calculateRegionPrice = (region: Region, map: Array<Array<string>>) => {
  let sides = 0;
  for (const pos of region.plots.values()) {
    const neighbourPositions = getNeighbourPositions(pos);
    for (const neighbourPos of neighbourPositions) {
      // count continuous sides that are not part of the region
    }
  }

  sides;

  return sides * region.plots.size;
};

const calculateTotalPrice = (
  regions: Array<Region>,
  map: Array<Array<string>>
) => {
  const result = regions.reduce((acc, cur) => {
    return acc + calculateRegionPrice(cur, map);
  }, 0);

  return result;
};

const part1 = (input: string) => {
  const map = input.split("\n").map((line) => line.split(""));
  const regions = mapRegions(map);
  const result = calculateTotalPrice(regions, map);
  return result; //?
};

const testInput = `AAAA
BBCD
BBCC
EEEC`;
const testInput2 = `OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`;
const testInput3 = `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`;
const testInput4 = `EEEEE
EXXXX
EEEEE
EXXXX
EEEEE`;
part1(testInput);
