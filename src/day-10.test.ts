import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { solve, solve2 } from "./day-10.ts"

const exampleInput = `.....
.S-7.
.|.|.
.L-J.
.....`

Deno.test(function solveTestInput() {
  const result = solve(exampleInput)
  assertEquals(result, 35)
})

Deno.test(function solveTestInput2() {
  const result = solve2(exampleInput)
  assertEquals(result, 46)
})
