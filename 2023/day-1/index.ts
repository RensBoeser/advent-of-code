const part1 = (input: string): number => {
  const lines = input.split("\n")

  const numbersPerLine = lines.map((line) => {
    const chars = line.split("")
    const firstNumber = chars.find((char) => !isNaN(parseInt(char)))!
    const lastNumber = chars.findLast((char) => !isNaN(parseInt(char)))!

    return parseInt(firstNumber + lastNumber)
  })

  return numbersPerLine.reduce((acc, curr) => acc + curr, 0)
}

const stringToDigitMap = {
  "one": "1",
  "two": "2",
  "three": "3",
  "four": "4",
  "five": "5",
  "six": "6",
  "seven": "7",
  "eight": "8",
  "nine": "9",
}

const part2 = (input: string): number => {
  const lines = input.split("\n")

  const firstNumbers = lines.map((line) => {
    const chars = line.split("")

    for (let i = 0; i < chars.length; i++) {
      if (!isNaN(parseInt(chars[i]))) {
        return parseInt(chars[i])
      }

      const currentLine = line.slice(0, i + 1)
      for (const key of Object.keys(stringToDigitMap)) {
        if (currentLine.includes(key)) {
          return stringToDigitMap[key as keyof typeof stringToDigitMap]
        }
      }
    }

    throw new Error("No number found")
  })

  const secondNumbers = lines.map((line) => {
    const chars = line.split("")

    for (let i = chars.length - 1; i >= 0; i--) {
      if (!isNaN(parseInt(chars[i]))) {
        return chars[i]
      }

      const currentLine = line.slice(i)
      for (const key of Object.keys(stringToDigitMap)) {
        if (currentLine.includes(key)) {
          return stringToDigitMap[key as keyof typeof stringToDigitMap]
        }
      }
    }

    throw new Error("No number found")
  })

  const numbers = firstNumbers.map((num, index) => num + secondNumbers[index])
  return numbers.reduce((acc, curr) => acc + parseInt(curr), 0)
}

const input = Deno.readTextFileSync("2023/day-1/input.txt")

if (import.meta.main) {
  console.log("2023 Day 1: Trebuchet?!")

  console.log("Result of part 1:", part1(input))
  console.log("Result of part 2:", part2(input))
}

Deno.bench({
  name: "2023 Day 1: Trebuchet?! - Part 1",
  fn: () => {
    part1(input)
  },
})

Deno.bench({
  name: "2023 Day 1: Trebuchet?! - Part 2",
  fn: () => {
    part2(input)
  },
})
