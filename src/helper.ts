export const readInput = async (filename: string) => {
  return await Deno.readTextFile(`src/${filename}.txt`)
}

export const splitLines = (text: string) => text.split("\n")
