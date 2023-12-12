import {
  add,
  equals,
  neighbors,
  readInput,
  Vector,
  walkGrid,
} from "./helper.ts"

// | is a vertical pipe connecting north and south.
// - is a horizontal pipe connecting east and west.
// L is a 90-degree bend connecting north and east.
// J is a 90-degree bend connecting north and west.
// 7 is a 90-degree bend connecting south and west.
// F is a 90-degree bend connecting south and east.
// . is ground; there is no pipe in this tile.
// S is the starting position of the animal; there is a pipe on this tile, but your sketch doesn't show what shape the pipe has.

const charEntityMap = {
  "|": "pipe_vertical",
  "-": "pipe_horizontal",
  "L": "bend_ne",
  "J": "bend_nw",
  "7": "bend_sw",
  "F": "bend_se",
  ".": "ground",
  "S": "start",
} as const

const isPartType = (entityType: EntityType): entityType is PipeType => {
  return entityType != "ground" && entityType != "start"
}

const partConnectionDeltas: { [key in PipeType]: Vector[] } = {
  pipe_vertical: [[0, 1], [0, -1]],
  pipe_horizontal: [[1, 0], [-1, 0]],
  bend_ne: [[1, 0], [0, -1]],
  bend_se: [[1, 0], [0, 1]],
  bend_nw: [[-1, 0], [0, -1]],
  bend_sw: [[-1, 0], [0, 1]],
}

const connectingPositions = (currentPos: Vector, pipe: PipeType | "start") => {
  if (pipe === "start") {
    return neighbors(currentPos)
  }
  return partConnectionDeltas[pipe].map((delta) => add(currentPos, delta))
}

const nextPosition = (currPos: Vector, prevPos: Vector, pipe: PipeType) => {
  const connections = connectingPositions(currPos, pipe)

  if (equals(connections[0], prevPos)) {
    return connections[1]
  }
  if (equals(connections[1], prevPos)) {
    return connections[0]
  }
  throw new Error("Previous position is not connected!")
}

type EntityType = (typeof charEntityMap)[keyof typeof charEntityMap]
type PipeType = Exclude<EntityType, "ground" | "start">

type ParsedInput = {
  size: Vector
  startPosition: Vector
  grid: EntityType[][]
}

const parseEntityType = (char: string) => {
  return charEntityMap[char as keyof typeof charEntityMap]
}

const parse = (input: string): ParsedInput => {
  const grid: EntityType[][] = []
  let startPosition: Vector | null = null
  const size = walkGrid(input, (char, [x, y]) => {
    if (grid[x] == undefined) {
      grid[x] = []
    }

    const type = parseEntityType(char)
    if (type === "start") startPosition = [x, y]
    grid[x][y] = type
  })
  if (startPosition === null) throw new Error("Start position is not defined")
  return { startPosition, grid, size }
}

const isNeighbor = (a: Vector, b: Vector) => {
  return Math.abs(b[0] - a[0]) + Math.abs(b[1] - a[0]) <= 1
}

const isConnected = (grid: EntityType[][], a: Vector, b: Vector) => {
  const typeA = grid[a[0]][a[1]]
  const typeB = grid[b[0]][b[1]]

  if (
    !(isPartType(typeA) || typeA === "start") ||
    !(isPartType(typeB) || typeB === "start")
  ) return false
  const connectionsA = connectingPositions(a, typeA)
  const connectionsB = connectingPositions(b, typeB)

  const aConnectedToB = connectionsA.some((connA) => equals(connA, b))
  const bConnectedToA = connectionsB.some((connB) => equals(connB, a))
  return aConnectedToB && bConnectedToA
}

const walk = (grid: EntityType[][], start: Vector) => {
  const startConnections = neighbors(start).filter((neighbor) =>
    isConnected(grid, neighbor, start)
  )

  if (startConnections.length != 2) {
    throw new Error("Start is not connected to exactly 2 pipes")
  }

  let curr = startConnections[0]
  let prev = start
  const loopPipes: Vector[] = []
  while (!equals(curr, start)) {
    loopPipes.push(curr)
    const type = grid[curr[0]][curr[1]]
    if (!isPartType(type)) {
      throw new Error("loop is not closed")
    }
    const next = nextPosition(curr, prev, type)
    prev = curr
    curr = next
  }
  return loopPipes
}

export const solve = (input: string): number => {
  const parsed = parse(input)
  const loopPipes = walk(parsed.grid, parsed.startPosition)
  return Math.ceil(loopPipes.length / 2)
}

export const solve2 = (input: string): number => {
  return 0
}

console.log(solve(await readInput("day-10")))
console.log(solve2(await readInput("day-10")))
