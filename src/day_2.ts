import { readInput, splitLines } from "./helper.ts"

// only 12 red cubes, 13 green cubes, and 14 blue cubes
const maxAmount = {
  red: 12,
  green: 13,
  blue: 14,
} as const

type Colors = "red" | "green" | "blue"

type Hand = { [K in Colors]: number }

type Game = Hand[]

const parseHand = (handInput: string) => {
  return handInput
    .split(",")
    .map((handPart) => {
      const [amount, color] = handPart.trim().split(" ")
      return { amount, color }
    })
    .reduce(
      (obj, { amount, color }) => ({ ...obj, [color]: Number(amount) }),
      { red: 0, green: 0, blue: 0 } as const,
    )
}

const parseGame = (gameInput: string) => {
  return gameInput.trim().split(";").map(parseHand)
}

const parseLine = (line: string) => {
  const [gameNumberString, gameInput] = line.split(":")

  const gameNumber = Number(gameNumberString.replace("Game ", ""))
  return {
    gameNumber,
    game: parseGame(gameInput),
  }
}

const isValid = (game: Game): boolean => {
  for (const hand of game) {
    for (const color of Object.typedKeys(hand)) {
      if ((hand[color] || 0) > maxAmount[color]) {
        return false
      }
    }
  }
  return true
}

export const solve = (input: string): number => {
  const result = splitLines(input)
    .map(parseLine)
    .reduce((result, { gameNumber, game }) => {
      if (isValid(game)) {
        result = result + gameNumber
      }
      return result
    }, 0)

  return result
}

export const power = (game: Game): number => {
  const minValues = game.reduce((obj, hand) => {
    const newObj = {} as Partial<Hand>
    for (const color of Object.typedKeys(hand)) {
      if (hand[color] > obj[color]) {
        newObj[color] = hand[color]
      }
    }
    return { ...obj, ...newObj }
  }, { red: 0, green: 0, blue: 0 } as const)

  return Object
    .values(minValues)
    .filter((val) => val !== 0)
    .reduce(
      (acc, curr) => acc * curr,
      1,
    )
}

export const solve2 = (input: string): number => {
  const powers = splitLines(input)
    .map(parseLine)
    .map(({ game }) => power(game))

  return powers.reduce((result, power) => {
    return result + power
  }, 0)
}

console.log(solve(await readInput("day_2")))
console.log(solve2(await readInput("day_2")))
