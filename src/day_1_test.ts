import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { getDigitAtPosition, isStringAtPosition, solve } from "./day_1.ts"

const exampleInput = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`

const exampleInput2 = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`

Deno.test(function solveTestInput() {
  const result = solve(exampleInput)
  assertEquals(result, 142)
})

Deno.test(function solveTestInput2() {
  const result = solve(exampleInput2)
  assertEquals(result, 281)
})

Deno.test(function isStringAtPosition_same_string_returns_true() {
  const result = isStringAtPosition("abc", 0, ["a", "b", "c"])
  assertEquals(result, true)
})

Deno.test(function isStringAtPosition_missing_char_returns_false() {
  const result = isStringAtPosition("abc", 0, ["a", "b"])
  assertEquals(result, false)
})

Deno.test(function isStringAtPosition_long_string_before_false() {
  const result = isStringAtPosition(
    "five",
    0,
    "mmg6fivegcthdonesix1eight".split(""),
  )
  assertEquals(result, false)
})

Deno.test(function isStringAtPosition_long_string_after_false() {
  const result = isStringAtPosition(
    "five",
    10,
    "mmg6fivegcthdonesix1eight".split(""),
  )
  assertEquals(result, false)
})

Deno.test(function isStringAtPosition_long_string_found_true() {
  const result = isStringAtPosition(
    "five",
    4,
    "mmg6fivegcthdonesix1eight".split(""),
  )
  assertEquals(result, true)
})

Deno.test(function getDigitAtPosition_long_string_five() {
  const result = getDigitAtPosition(4, "mmg6fivegcthdonesix1eight".split(""))
  assertEquals(result, "5")
})

Deno.test(function getDigitAtPosition_long_string_one() {
  const result = getDigitAtPosition(13, "mmg6fivegcthdonesix1eight".split(""))
  assertEquals(result, "1")
})

Deno.test(function getDigitAtPosition_long_string_6() {
  const result = getDigitAtPosition(3, "mmg6fivegcthdonesix1eight".split(""))
  assertEquals(result, "6")
})

Deno.test(function getDigitAtPosition_long_string_nothing() {
  const result = getDigitAtPosition(2, "mmg6fivegcthdonesix1eight".split(""))
  assertEquals(result, null)
})
