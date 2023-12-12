import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import {
  applyTable,
  applyTableRange,
  MapTable,
  solve,
  solve2,
} from "./day_5.ts"

const exampleInput = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`

Deno.test(function solveTestInput() {
  const result = solve(exampleInput)
  assertEquals(result, 35)
})

Deno.test(function solveTestInput2() {
  const result = solve2(exampleInput)
  assertEquals(result, 46)
})

Deno.test(function applyTable_test1() {
  const table: MapTable = {
    src: "src",
    dest: "dest",
    ranges: [
      {
        srcStart: 0,
        srcEnd: 9,
        destStart: 10,
        destEnd: 19,
      },
    ],
  }
  const result = applyTable(table, 0)
  assertEquals(result, {
    mappedValue: 10,
    rangeSrcEnd: 9,
    rangeDestEnd: 19,
  })
})

Deno.test(function applyTable_test2() {
  const table: MapTable = {
    src: "src",
    dest: "dest",
    ranges: [
      {
        srcStart: 0,
        srcEnd: 9,
        destStart: 10,
        destEnd: 19,
      },
    ],
  }
  const result = applyTable(table, 5)
  assertEquals(result, {
    mappedValue: 15,
    rangeSrcEnd: 9,
    rangeDestEnd: 19,
  })
})

Deno.test(function applyTable_test3() {
  const table: MapTable = {
    src: "src",
    dest: "dest",
    ranges: [
      {
        srcStart: 0,
        srcEnd: 9,
        destStart: 10,
        destEnd: 19,
      },
      {
        srcStart: 20,
        srcEnd: 29,
        destStart: 0,
        destEnd: 9,
      },
    ],
  }
  const result = applyTable(table, 15)
  assertEquals(result, {
    mappedValue: 15,
    rangeSrcEnd: 19,
    rangeDestEnd: 19,
  })
})

Deno.test(function applyTableRage_test1() {
  const table: MapTable = {
    src: "src",
    dest: "dest",
    ranges: [
      {
        srcStart: 0,
        srcEnd: 9,
        destStart: 10,
        destEnd: 19,
      },
      {
        srcStart: 20,
        srcEnd: 29,
        destStart: 0,
        destEnd: 9,
      },
    ],
  }
  const result = applyTableRange(table, { start: 15, end: 24 })
  assertEquals(result, [{
    start: 15,
    end: 19,
  }, { start: 0, end: 4 }])
})
