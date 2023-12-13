import { runDay } from "./src/runner.ts"

const day = Deno.args[0]

if (!day || day === "all") {
  for (const day of [...new Array(24)].map((_, i) => `${i + 1}`)) {
    try {
      await runDay(day)
    } catch (e) {
      console.log(`# Day ${day} - ${e}`)
    }
  }
} else {
  await runDay(day)
}
