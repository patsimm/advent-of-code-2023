export type Vector = [number, number]

export const add = (a: Vector, b: Vector): Vector => [a[0] + b[0], a[1] + b[1]]

export const equals = (a: Vector, b: Vector) => a[0] === b[0] && a[1] === b[1]

export const neighborDistances: Vector[] = [
  [0, 1],
  [1, 0],
  [1, 1],
  [0, -1],
  [-1, 0],
  [-1, -1],
  [1, -1],
  [-1, 1],
]

export const neighbors = (a: Vector) => {
  return neighborDistances.map((dist) => add(a, dist))
}

export const readInput = async (filename: string) =>
  (await Deno.readTextFile(`src/inputs/${filename}.txt`)).trim()

export const splitLines = (text: string) => text.split("\n")

export const splitWhitespace = (text: string) =>
  text.trim().split(" ").filter((num) => num !== "")

export const parseNumbers = (numbers: string) =>
  splitWhitespace(numbers).map((num) => Number(num.trim()))

export const walkGrid = (
  input: string,
  visitor: (char: string, position: Vector) => void,
): Vector => {
  const lines = splitLines(input)
  for (let y = 0; y < lines.length; y++) {
    const line = lines[y]
    for (let x = 0; x < line.length; x++) {
      const char = line[x]
      visitor(char, [x, y])
    }
  }
  return [lines[0].length, lines.length]
}

declare global {
  interface ObjectConstructor {
    typedKeys<T>(obj: T): Array<keyof T>
  }
}

// deno-lint-ignore no-explicit-any
Object.typedKeys = Object.keys as any
