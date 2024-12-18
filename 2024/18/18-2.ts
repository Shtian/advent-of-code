import { input } from "./18-input";
const testInput = `5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0`;

type MapNode = {
  x: number;
  y: number;
  isWall: boolean;
  isStart: boolean;
  isEnd: boolean;
  f: number | null; // f = g + h
  g: number | null; // distance to start
  h: number | null; // heuristic - distance to end - use manhattan distance?
  parent: MapNode | null;
};

type Position = {
  x: number;
  y: number;
};

const part2 = (
  input: string,
  byteCount: number,
  columns: number,
  rows: number
) => {
  const allBytes = input.split("\n");
  allBytes.length;
  let currentCount = byteCount;
  for (currentCount; currentCount < allBytes.length; currentCount++) {
    const bytes = new Set(allBytes.slice(0, currentCount));
    const map = createMap(columns, rows, bytes);
    const path = astar(map, [0, 0], [columns - 1, rows - 1]);
    if (path.length === 0) {
      break;
    }
  }
  console.log("failing byte coordinate:", allBytes[currentCount - 1]);
  return allBytes[currentCount - 1];
};

const createMap = (columns: number, rows: number, bytes: Set<string>) => {
  const map: Array<Array<MapNode>> = [];
  for (let i = 0; i < columns; i++) {
    map.push([]);
    for (let j = 0; j < rows; j++) {
      map[i].push({
        x: j,
        y: i,
        isEnd: false,
        isStart: false,
        f: null,
        g: null,
        h: null,
        parent: null,
        isWall: bytes.has(`${j},${i}`),
      });
    }
  }
  // set start and end
  map[0][0].isStart = true;
  map[columns - 1][rows - 1].isEnd = true;
  return map;
};

const heuristic = (a: [number, number], b: [number, number]) => {
  // 4 directions, using manhattan distance
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
};

const getNeighbours = (map: Array<Array<MapNode>>, node: MapNode) => {
  const neighbors: MapNode[] = [];
  if (node.x > 0) {
    neighbors.push(map[node.y][node.x - 1]);
  }
  if (node.x < map.length - 1) {
    neighbors.push(map[node.y][node.x + 1]);
  }
  if (node.y > 0) {
    neighbors.push(map[node.y - 1][node.x]);
  }
  if (node.y < map[0].length - 1) {
    neighbors.push(map[node.y + 1][node.x]);
  }
  return neighbors;
};

const astar = (
  map: Array<Array<MapNode>>,
  start: [number, number],
  end: [number, number]
) => {
  const open: Array<MapNode> = [];
  const closed = new Set<string>();
  const startNode = map[start[0]][start[1]];
  open.push(startNode);

  while (open.length > 0) {
    open.sort((a, b) => a.f! - b.f!);
    var current = open.shift()!;
    closed.add(`${current.x},${current.y}`);

    if (current.isEnd) {
      let path: Array<{ x: number; y: number }> = [];
      path.push({ x: current.x, y: current.y });
      while (current.parent) {
        path.push({ x: current.x, y: current.y });
        current = current.parent;
      }
      return path.reverse();
    }

    const neighbours = getNeighbours(map, current);
    for (const neighbour of neighbours) {
      // if wall or its on the closed list, skip
      if (neighbour.isWall || closed.has(`${neighbour.x},${neighbour.y}`)) {
        continue;
      }

      const newCost = current.g! + 1;
      const isOpen = open.find(
        (node) => node.x === neighbour.x && node.y === neighbour.y
      );

      if (!isOpen || newCost < neighbour.g!) {
        neighbour.g = newCost;
        neighbour.h = neighbour.h || heuristic([neighbour.x, neighbour.y], end);
        neighbour.f = neighbour.g + neighbour.h;
        neighbour.parent = current;
        if (!isOpen) {
          open.push(neighbour);
        }
      }
    }
  }

  return [];
};

part2(input, 1024, 71, 71); //?
