const parseInput = (): Array<Array<number>> => {
  const inputText = Deno.readTextFileSync("2024/day-1/input.txt")
  const pairs = inputText.split("\n")

  const numbers1: Array<number> = []
  const numbers2: Array<number> = []
  for (const pair of pairs) {
    const [num1, num2] = pair.split("   ").map(Number)

    numbers1.push(num1)
    numbers2.push(num2)
  }

  return [numbers1, numbers2]
}

const part1 = (numbers1: Array<number>, numbers2: Array<number>): number => {
  const sortedNumbers1 = numbers1.toSorted((a, b) => a - b)
  const sortedNumbers2 = numbers2.toSorted((a, b) => a - b)

  return sortedNumbers1.reduce((acc, curr, index) => {
    return acc + Math.abs(curr - sortedNumbers2[index])
  })
}

const part2 = (numbers1: Array<number>, numbers2: Array<number>): number => {
  const similarityScores = numbers1.map((num) => {
    const occurrenceCount = numbers2.filter((num2) => num2 === num).length
    return num * occurrenceCount
  })

  return similarityScores.reduce((acc, curr) => acc + curr, 0)
}

const [numbers1, numbers2] = parseInput()

if (import.meta.main) {
  console.log("2024 Day 1: Historian Hysteria")

  console.log("Result of part 1:", part1(numbers1, numbers2))
  console.log("Result of part 2:", part2(numbers1, numbers2))
}

Deno.bench({
  name: "2024 Day 1: Historian Hysteria - Part 1",
  fn: () => {
    part1(numbers1, numbers2)
  },
})

Deno.bench({
  name: "2024 Day 1: Historian Hysteria - Part 2",
  fn: () => {
    part2(numbers1, numbers2)
  },
})
