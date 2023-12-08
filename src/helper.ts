export const readInput = async (filename: string) => {
  return await Deno.readTextFile(`src/${filename}.txt`)
}

export const splitLines = (text: string) => text.split("\n")

export const parseNumbers = (numbers: string) => {
  return numbers.trim().split(" ").filter((num) => num !== "").map((num) =>
    Number(num.trim())
  )
}

declare global {
  interface ObjectConstructor {
    typedKeys<T>(obj: T): Array<keyof T>
  }
}

// deno-lint-ignore no-explicit-any
Object.typedKeys = Object.keys as any
