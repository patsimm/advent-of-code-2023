import { readInput } from "./helper.ts"

type SolveFn = (input: string) => number

export const runDay = async (day: string) => {
  const { solve, solve2 } = await import(`./day_${day}.ts`) as {
    solve?: SolveFn
    solve2?: SolveFn
  }
  const input = await readInput(`day_${day}`)
  console.log(`# Day ${day} Solution`)
  solve && console.log(`Part 1: ${solve(input)}`)
  solve2 && console.log(`Part 2: ${solve2(input)}`)
}
