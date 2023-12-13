import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { isValid, solve, solve2, unfold } from "./day_12.ts"

const exampleInput = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`

Deno.test(function solveTestInput() {
  const result = solve(exampleInput)
  assertEquals(result, 21)
})

Deno.test(function solveTestInput2() {
  const result = solve2(exampleInput)
  assertEquals(result, 525152)
})

Deno.test(function isValid_valid() {
  const result = isValid([1, 1, 3])("#.#.###")
  assertEquals(result, true)
})

Deno.test(function isValid_valid() {
  const result = isValid([1, 1, 3])("...#.#.###")
  assertEquals(result, true)
})

Deno.test(function isValid_valid2() {
  const result = isValid([1, 1, 3])("#.#..###")
  assertEquals(result, true)
})

Deno.test(function isValid_invalid() {
  const result = isValid([1, 1, 3])("#.##.###")
  assertEquals(result, false)
})

Deno.test(function isValid_invalid2() {
  const result = isValid([1, 1, 3])("#.#.##")
  assertEquals(result, false)
})

Deno.test(function unfold_1() {
  const result = unfold({ input: ".#", conditions: [1] })
  assertEquals(result, { input: ".#?.#?.#?.#?.#", conditions: [1, 1, 1, 1, 1] })
})

Deno.test(function unfold_2() {
  const result = unfold({ input: "???.###", conditions: [1, 1, 3] })
  assertEquals(result, {
    input: "???.###????.###????.###????.###????.###",
    conditions: [1, 1, 3, 1, 1, 3, 1, 1, 3, 1, 1, 3, 1, 1, 3],
  })
})
