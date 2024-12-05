const part1 = (input: string): number => {
  const regex = /(mul\(\d+,\d+\))/g

  const sumOfProducts = input.match(regex)?.reduce((acc, mul) => {
    const [a, b] = mul.slice(4, -1).replace(")", "").split(",").map(Number)

    return acc + a * b
  }, 0) ?? 0

  return sumOfProducts
}

const part2 = (input: string): number => {
  const [firstMuls, ...splitOnDont] = input.split("don't()")

  const doMuls = splitOnDont.map((split) => {
    const [_, ...splitOnDo] = split.split("do()")
    return splitOnDo.join("")
  })

  return part1(firstMuls.concat(doMuls.join("")))
}

const input = Deno.readTextFileSync("2024/day-3/input.txt")

if (import.meta.main) {
  console.log("2024 Day 3: Mull It Over")
  console.log("Result of part 1:", part1(input))
  console.log("Result of part 2:", part2(input))
}

Deno.bench({
  name: "2024 Day 3: Mull It Over - Part 1",
  fn: () => {
    part1(input)
  },
})

Deno.bench({
  name: "2024 Day 3: Mull It Over - Part 2",
  fn: () => {
    part2(input)
  },
})
