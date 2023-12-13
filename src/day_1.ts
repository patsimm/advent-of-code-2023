import { splitLines } from "./helper.ts"

const digitStrings = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
]

export const isStringAtPosition = (
  expected: string,
  pos: number,
  chars: string[],
  reversed = false,
) => {
  let expectedChars = expected.split("")
  if (reversed) expectedChars = expectedChars.reverse()
  for (
    let expectedCharIndex = 0;
    expectedCharIndex < expectedChars.length;
    expectedCharIndex++
  ) {
    if (expectedChars[expectedCharIndex] !== chars[expectedCharIndex + pos]) {
      return false
    }
  }
  return true
}

export const getDigitAtPosition = (
  pos: number,
  chars: string[],
  reversed = false,
) => {
  if (chars[pos] >= "0" && chars[pos] <= "9") {
    return chars[pos]
  }
  for (const i in digitStrings) {
    if (isStringAtPosition(digitStrings[i], pos, chars, reversed)) {
      return `${Number(i) + 1}`
    }
  }
  return null
}

const firstDigit = (chars: string[], reversed: boolean): string | undefined => {
  for (const i in chars) {
    const digit = getDigitAtPosition(Number(i), chars, reversed)
    if (digit != null) {
      return digit
    }
  }
}

export const solve = (input: string): number => {
  const lines = splitLines(input)
  const sum = lines
    .map(
      (line) =>
        (firstDigit(line.split(""), false) || "") +
        (firstDigit(line.split("").reverse(), true) || ""),
    )
    .map((num) => (num !== "" ? Number(num) : 0))
    .reduce((prev, curr) => prev + curr, 0)

  return sum
}
