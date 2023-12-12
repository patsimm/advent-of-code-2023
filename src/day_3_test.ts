import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { arePositionsAdjacent, solve, solve2 } from "./day_3.ts"

const exampleInput = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`

Deno.test(function solveTestInput() {
  const result = solve(exampleInput)
  assertEquals(result, 4361)
})

Deno.test(function solve2TestInput() {
  const result = solve2(exampleInput)
  assertEquals(result, 467835)
})

Deno.test(function arePositionsAdjacent_diagonal() {
  const result = arePositionsAdjacent([5, 5], [6, 6])
  assertEquals(result, true)
})

Deno.test(function arePositionsAdjacent_false() {
  const result = arePositionsAdjacent([5, 5], [6, 7])
  assertEquals(result, false)
})

Deno.test(function arePositionsAdjacent_false2() {
  const result = arePositionsAdjacent([5, 5], [3, 6])
  assertEquals(result, false)
})

Deno.test(function arePositionsAdjacent_same() {
  const result = arePositionsAdjacent([5, 5], [5, 5])
  assertEquals(result, true)
})

Deno.test(function arePositionsAdjacent_right() {
  const result = arePositionsAdjacent([5, 5], [6, 5])
  assertEquals(result, true)
})
