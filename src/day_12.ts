import { splitLines } from "./helper.ts"

const parseConditions = (conditions: string) => {
  return conditions.split(",").map(Number)
}

type Line = {
  input: string
  conditions: number[]
}

const parseLine = (line: string): Line => {
  const [input, conditions] = line.split(" ").map((x) => x.trim())
  return {
    input,
    conditions: parseConditions(conditions),
  }
}

const parse = (input: string) => {
  return splitLines(input).map(parseLine)
}

const replaceAt = (input: string, index: number, replacement: string) => {
  return input.substring(0, index) + replacement +
    input.substring(index + replacement.length)
}

const computeAllPossibilities = (
  input: string,
  conditions: number[],
): string[] => {
  if (input.includes("?")) {
    const variantOperational = input.replace("?", ".")
    const variantBroken = input.replace("?", "#")
    return [
      ...(isValid(conditions)(variantBroken)
        ? [...computeAllPossibilities(variantBroken, conditions)]
        : []),
      ...(isValid(conditions)(variantOperational)
        ? [...computeAllPossibilities(variantOperational, conditions)]
        : []),
    ]
  } else {
    return [input]
  }
}

export const isValid = (conditions: number[]) => (input: string) => {
  const brokenChains = input.split(/\.+/).filter((x) => x !== "")
  if (brokenChains.length !== conditions.length) return false
  for (let i = 0; i < brokenChains.length; i++) {
    if (brokenChains[i].length !== conditions[i]) return false
  }
  return true
}

export const unfold = (line: Line): Line => {
  return {
    input: [...new Array(5)].map((_) => line.input).join("?"),
    conditions: [...new Array(5)].flatMap(() => line.conditions),
  }
}

export const solve = (input: string): number => {
  const parsed = parse(input)
  return parsed
    .map((line) =>
      computeAllPossibilities(line.input, line.conditions)
        .length
    )
    .reduce((prev, curr) => prev + curr, 0)
}

export const solve2 = (input: string): number => {
  const parsed = parse(input)
  return parsed
    .map((line) => unfold(line))
    .map((line) =>
      computeAllPossibilities(line.input, line.conditions)
        .length
    )
    .reduce((prev, curr) => prev + curr, 0)
}
