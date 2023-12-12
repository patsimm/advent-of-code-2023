import { readInput, splitLines } from "./helper.ts"

type Position = [number, number]

type SchematicNumber = {
  positions: Position[]
  numStr: string
  num: number
}

type SchematicPart = {
  position: Position
  char: string
}

type ParsedInput = {
  parts: SchematicPart[]
  schematicNumbers: SchematicNumber[]
}

const addDigit = (
  schematicNumber: SchematicNumber | null,
  position: Position,
  digit: string,
): SchematicNumber => {
  if (!schematicNumber) {
    return { positions: [position], numStr: digit, num: Number(digit) }
  }
  const numStr = schematicNumber.numStr + digit
  return {
    positions: [...schematicNumber.positions, position],
    numStr,
    num: Number(numStr),
  }
}

const parse = (input: string): ParsedInput => {
  return splitLines(input)
    .map((line, y) => {
      let schematicNumbers: SchematicNumber[] = []
      let parts: SchematicPart[] = []

      let currentNumber: SchematicNumber | null = null
      line.split("").forEach((char, x) => {
        if (char >= "0" && char <= "9") {
          currentNumber = addDigit(currentNumber, [x, y], char)
          return
        }
        if (char !== ".") {
          parts = [...parts, { position: [x, y], char }]
        }
        if (currentNumber) {
          schematicNumbers = [...schematicNumbers, currentNumber]
          currentNumber = null
        }
      })
      if (currentNumber) {
        schematicNumbers = [...schematicNumbers, currentNumber]
      }
      return { schematicNumbers, parts }
    }).reduce((acc, curr) => ({
      schematicNumbers: [...acc.schematicNumbers, ...curr.schematicNumbers],
      parts: [...acc.parts, ...curr.parts],
    }), { schematicNumbers: [], parts: [] } as ParsedInput)
}

export const arePositionsAdjacent = (a: Position, b: Position) => {
  return Math.abs(a[0] - b[0]) <= 1 && Math.abs(a[1] - b[1]) <= 1
}

export const areAdjacent = (
  part: SchematicPart,
  schematicNumber: SchematicNumber,
) =>
  schematicNumber.positions.some((numPosition) =>
    arePositionsAdjacent(part.position, numPosition)
  )

const hasAdjacentPart = (
  schematicNumber: SchematicNumber,
  parts: SchematicPart[],
) => {
  return parts.some((part) => areAdjacent(part, schematicNumber))
}

export const adjacentNumbers = (
  part: SchematicPart,
  schematicNumbers: SchematicNumber[],
) => {
  return schematicNumbers.filter((schematicNumber) =>
    areAdjacent(part, schematicNumber)
  )
}

export const solve = (input: string): number => {
  const parsed = parse(input)
  const numbersWithAdjacentParts = parsed.schematicNumbers.filter((
    schematicNumber,
  ) => hasAdjacentPart(schematicNumber, parsed.parts))

  return numbersWithAdjacentParts.reduce((acc, curr) => acc + curr.num, 0)
}

export const solve2 = (input: string): number => {
  const parsed = parse(input)
  const engineParts = parsed.parts
    .filter((part) => part.char === "*")
    .map((part) => ({
      part,
      adjacentNumbers: adjacentNumbers(part, parsed.schematicNumbers),
    }))
    .filter(({ adjacentNumbers }) => adjacentNumbers.length === 2)
    .map(({ adjacentNumbers }) =>
      adjacentNumbers[0].num * adjacentNumbers[1].num
    )

  return engineParts.reduce((acc, curr) => acc + curr, 0)
}

console.log(solve(await readInput("day_3")))
console.log(solve2(await readInput("day_3")))
