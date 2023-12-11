import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { solve } from "./day-11.ts"

const exampleInput = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`

Deno.test(function solveTestInput() {
  const result = solve(exampleInput, 1)
  assertEquals(result, 374)
})

Deno.test(function solveTestInput2() {
  const result = solve(exampleInput, 9)
  assertEquals(result, 1030)
})

Deno.test(function solveTestInput3() {
  const result = solve(exampleInput, 99)
  assertEquals(result, 8410)
})
