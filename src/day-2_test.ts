import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { solve, solve2 } from "./day-2.ts"

const exampleInput = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`

Deno.test(function solveTestInput() {
  const result = solve(exampleInput)
  assertEquals(result, 8)
})

Deno.test(function solve2TestInput() {
  const result = solve2(exampleInput)
  assertEquals(result, 2286)
})
