import { readInput, splitLines } from "./helper.ts"

const galaxy = "#" as const
const space = "." as const

const parseLine = (line: string) => {
  return line.trim().split("")
}

type Universe = {
  size: [number, number]
  galaxies: Galaxy[]
}

type Galaxy = {
  position: [number, number]
}

const parse = (input: string): Universe => {
  const lines = splitLines(input)

  const galaxies: Galaxy[] = []
  for (let y = 0; y < lines.length; y++) {
    const line = lines[y]
    for (let x = 0; x < line.length; x++) {
      const char = line[x]
      switch (char) {
        case "#":
          galaxies.push({ position: [x, y] })
          break
        default:
      }
    }
  }
  return {
    size: [lines[0].length, lines.length],
    galaxies,
  }
}

const expandColumn = (
  universe: Universe,
  x: number,
  amount: number = 1,
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
  amount: number = 1,
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

export const solve = (input: string, amount: number): number => {
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

console.log(solve(await readInput("day-11"), 1))
console.log(solve(await readInput("day-11"), 1000000 - 1))
