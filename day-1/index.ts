const parseInput = (): Array<Array<number>> => {
  const inputText = Deno.readTextFileSync("day-1/input.txt")
  const pairs = inputText.split("\n")

  const array1: Array<number> = []
  const array2: Array<number> = []
  for (const pair of pairs) {
    const [num1, num2] = pair.split("   ").map(Number)

    array1.push(num1)
    array2.push(num2)
  }

  return [array1, array2]
}

const part1 = (array1: Array<number>, array2: Array<number>) => {
  array1.sort((a, b) => a - b)
  array2.sort((a, b) => a - b)

  const distanceArray = array1.map((num, index) =>
    Math.abs(num - array2[index])
  )

  return distanceArray.reduce((acc, curr) => acc + curr, 0)
}

const part2 = (array1: Array<number>, array2: Array<number>) => {
  const similarityScoreArray = array1.map((num) => {
    const elementFrequency = array2.filter((num2) => num2 === num).length
    return num * elementFrequency
  })

  return similarityScoreArray.reduce((acc, curr) => acc + curr, 0)
}

if (import.meta.main) {
  console.log("Day 1: Historian Hysteria")

  const [array1, array2] = parseInput()

  console.log("Result of part 1:", part1(array1, array2))
  console.log("Result of part 2:", part2(array1, array2))
}
