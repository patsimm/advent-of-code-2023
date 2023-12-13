import { walkGrid } from "./helper.ts"

type Universe = {
  size: [number, number]
  galaxies: Galaxy[]
}

type Galaxy = {
  position: [number, number]
}

const parse = (input: string): Universe => {
  const galaxies: Galaxy[] = []
  const size = walkGrid(input, (char, [x, y]) => {
    switch (char) {
      case "#":
        galaxies.push({ position: [x, y] })
        break
      default:
    }
  })
  return {
    size,
    galaxies,
  }
}

const expandColumn = (
  universe: Universe,
  x: number,
  amount = 1,
): Universe => {
  return {
    ...universe,
    size: [
      universe.size[0] + amount,
      universe.size[1],
    ],
    galaxies: universe.galaxies.map((galaxy) => ({
      ...galaxy,
      position: galaxy.position[0] >= x
        ? [galaxy.position[0] + amount, galaxy.position[1]]
        : [...galaxy.position],
    })),
  }
}

const expandRow = (
  universe: Universe,
  y: number,
  amount = 1,
): Universe => {
  return {
    ...universe,
    size: [
      universe.size[0],
      universe.size[1] + amount,
    ],
    galaxies: universe.galaxies.map((galaxy) => ({
      ...galaxy,
      position: galaxy.position[1] >= y
        ? [galaxy.position[0], galaxy.position[1] + amount]
        : [...galaxy.position],
    })),
  }
}

const expand = (universe: Universe, amount: number): Universe => {
  let newUniverse = universe

  for (let x = universe.size[0] - 1; x >= 0; x--) {
    if (!universe.galaxies.some((galaxy) => galaxy.position[0] === x)) {
      newUniverse = expandColumn(newUniverse, x, amount)
    }
  }

  for (let y = universe.size[1] - 1; y >= 0; y--) {
    if (!universe.galaxies.some((galaxy) => galaxy.position[1] === y)) {
      newUniverse = expandRow(newUniverse, y, amount)
    }
  }

  return newUniverse
}

export const distance = (a: Galaxy, b: Galaxy) => {
  if (a === b) return 0
  const distX = Math.abs(b.position[0] - a.position[0])
  const distY = Math.abs(b.position[1] - a.position[1])
  // return Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2))
  return distX + distY
}

export const execSolve = (input: string, amount: number): number => {
  const parsed = parse(input)
  const expanded = expand(parsed, amount)

  const sum = expanded.galaxies.reduce(
    (numA, a, i) =>
      expanded.galaxies.slice(i + 1).reduce(
        (numB, b) => numB + distance(a, b),
        numA,
      ),
    0,
  )
  return sum
}

export const solve = (input: string): number => execSolve(input, 1)
export const solve2 = (input: string): number => execSolve(input, 1000000 - 1)
