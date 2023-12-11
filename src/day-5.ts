import { parseNumbers, readInput, splitLines } from "./helper.ts"

export type MapRange = {
  destStart: number
  srcStart: number
  destEnd: number
  srcEnd: number
}

export type MapTable = {
  src: string
  dest: string
  ranges: MapRange[]
}

export type ValueRange = {
  start: number
  end: number
}

const parseMapRange = (mapRange: string): MapRange => {
  const [destStart, srcStart, length] = parseNumbers(mapRange)
  return {
    srcStart,
    srcEnd: srcStart + length - 1,
    destStart,
    destEnd: destStart + length - 1,
  }
}

const parseMapTable = (map: string): MapTable => {
  const [name, ...mapRanges] = splitLines(map)
  const [src, dest] = name.replace(" map:", "").split("-to-")

  return {
    src,
    dest,
    ranges: mapRanges.map(parseMapRange).sort((a, b) =>
      a.srcStart - b.srcStart
    ),
  }
}

const parseSeeds = (seeds: string) => {
  const [_, seedNumbers] = seeds.split(": ")
  const numbers = parseNumbers(seedNumbers)

  const ranges: ValueRange[] = []
  for (let i = 0; i <= numbers.length; i = i + 2) {
    const start = numbers[i]
    const length = numbers[i + 1]
    ranges.push({ start, end: start + length - 1 })
  }
  return {
    numbers,
    ranges,
  }
}

const parse = (input: string) => {
  const [seeds, ...maps] = input.split("\n\n")
  return {
    seeds: parseSeeds(seeds),
    maps: maps.map(parseMapTable),
  }
}

export const applyTable = (table: MapTable, value: number) => {
  const range = table.ranges.find((range) =>
    value >= range.srcStart && value <= range.srcEnd
  )
  if (!range) {
    const nextRange = table.ranges.find((range) => range.srcStart > value)
    return {
      mappedValue: value,
      rangeDestEnd: nextRange ? nextRange.srcStart - 1 : Infinity,
      rangeSrcEnd: nextRange ? nextRange.srcStart - 1 : Infinity,
    }
  }

  const diff = range.destStart - range.srcStart
  return {
    mappedValue: value + diff,
    rangeDestEnd: range.destEnd,
    rangeSrcEnd: range.srcEnd,
  }
}

export const applyTableRange = (table: MapTable, valueRange: ValueRange) => {
  const resultRanges: ValueRange[] = []
  let currentStart = valueRange.start
  const { mappedValue: mappedEnd } = applyTable(table, valueRange.end)
  while (currentStart < valueRange.end) {
    const { mappedValue: start, rangeDestEnd, rangeSrcEnd } = applyTable(
      table,
      currentStart,
    )
    currentStart = rangeSrcEnd + 1
    resultRanges.push(
      {
        start,
        end: currentStart < valueRange.end ? rangeDestEnd : mappedEnd,
      },
    )
  }
  return resultRanges
}

const performMapStep = (src: string, value: number, mapTables: MapTable[]) => {
  const table = mapTables.find((table) => table.src === src)
  if (!table) throw new Error(`table 'src' = '${src}' not found`)

  return {
    dest: table.dest,
    destValue: applyTable(table, value),
  }
}

const performMapStepRanges = (
  src: string,
  valueRanges: ValueRange[],
  mapTables: MapTable[],
) => {
  const table = mapTables.find((table) => table.src === src)
  if (!table) throw new Error(`table 'src' = '${src}' not found`)
  const destValueRanges = valueRanges.flatMap((valueRange) =>
    applyTableRange(table, valueRange)
  )
  return {
    dest: table.dest,
    destValueRanges,
  }
}

const performMap = (
  src: string,
  dest: string,
  value: number,
  mapTables: MapTable[],
) => {
  let currentSrc = src
  let currentValue = value
  while (currentSrc != dest) {
    const mapped = performMapStep(currentSrc, currentValue, mapTables)
    currentSrc = mapped.dest, currentValue = mapped.destValue.mappedValue
  }
  return currentValue
}

const performMapRange = (
  src: string,
  dest: string,
  valueRanges: ValueRange[],
  mapTables: MapTable[],
) => {
  let currentSrc = src
  let currentValues = valueRanges
  while (currentSrc != dest) {
    const mapped = performMapStepRanges(currentSrc, currentValues, mapTables)
    currentSrc = mapped.dest, currentValues = mapped.destValueRanges
  }
  return currentValues
}

export const solve = (input: string): number => {
  const parsed = parse(input)

  const locations = parsed.seeds.numbers.map(
    (seed) => performMap("seed", "location", seed, parsed.maps),
  )

  return Math.min(...locations)
}

export const solve2 = (input: string): number => {
  const parsed = parse(input)

  const locations = parsed.seeds.ranges
    .flatMap(
      (seedRange) =>
        performMapRange("seed", "location", [seedRange], parsed.maps),
    )
    .map((range) => range.start)

  return Math.min(...locations)
}

console.log(solve(await readInput("day-5")))
console.log(solve2(await readInput("day-5")))
