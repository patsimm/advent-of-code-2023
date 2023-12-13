import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { execSolve } from "./day_11.ts"

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
  const result = execSolve(exampleInput, 1)
  assertEquals(result, 374)
})

Deno.test(function solveTestInput2() {
  const result = execSolve(exampleInput, 9)
  assertEquals(result, 1030)
})

Deno.test(function solveTestInput3() {
  const result = execSolve(exampleInput, 99)
  assertEquals(result, 8410)
})
