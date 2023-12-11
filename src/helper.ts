export const readInput = async (filename: string) =>
  (await Deno.readTextFile(`src/inputs/${filename}.txt`)).trim()

export const splitLines = (text: string) => text.split("\n")

export const splitWhitespace = (text: string) =>
  text.trim().split(" ").filter((num) => num !== "")

export const parseNumbers = (numbers: string) =>
  splitWhitespace(numbers).map((num) => Number(num.trim()))

declare global {
  interface ObjectConstructor {
    typedKeys<T>(obj: T): Array<keyof T>
  }
}

// deno-lint-ignore no-explicit-any
Object.typedKeys = Object.keys as any
