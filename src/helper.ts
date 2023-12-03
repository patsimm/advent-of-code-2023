export const readInput = async (filename: string) => {
  return await Deno.readTextFile(`src/${filename}.txt`)
}

export const splitLines = (text: string) => text.split("\n")

declare global {
  interface ObjectConstructor {
    typedKeys<T>(obj: T): Array<keyof T>
  }
}
Object.typedKeys = Object.keys as any
