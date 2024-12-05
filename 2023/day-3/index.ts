const isNumber = (char: string): boolean => {
  return !isNaN(parseInt(char))
}

const isSymbol = (char: string): boolean => {
  if (isNumber(char)) return false
  if (char === ".") return false
  return true
}

const hasNeighborWith = (
  matrix: string[][],
  x: number,
  y: number,
  fn: (char: string) => boolean,
): boolean => {
  // left
  if (x > 0 && fn(matrix[y][x - 1])) return true

  // right
  if (x < matrix[y].length - 1 && fn(matrix[y][x + 1])) return true

  // top
  if (y > 0 && fn(matrix[y - 1][x])) return true

  // bottom
  if (y < matrix.length - 1 && fn(matrix[y + 1][x])) return true

  // top left
  if (x > 0 && y > 0 && fn(matrix[y - 1][x - 1])) return true

  // top right
  if (x < matrix[y].length - 1 && y > 0 && fn(matrix[y - 1][x + 1])) {
    return true
  }

  // bottom left
  if (x > 0 && y < matrix.length - 1 && fn(matrix[y + 1][x - 1])) {
    return true
  }

  // bottom right
  if (
    x < matrix[y].length - 1 && y < matrix.length - 1 &&
    fn(matrix[y + 1][x + 1])
  ) return true

  return false
}

const part1 = (input: string): number => {
  const matrix = input.split("\n").map((line) => line.split(""))
  const numbersTouchingSymbols: Array<number> = []

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      // Skip if not a number
      if (!isNumber(matrix[y][x])) {
        continue
      }

      // Skip if number has a number to the left (not a start of a new number)
      if (isNumber(matrix[y][x - 1])) {
        continue
      }

      // Get full number
      let num = matrix[y][x]
      for (let i = x + 1; i < matrix[y].length; i++) {
        if (isNumber(matrix[y][i])) {
          num += matrix[y][i]
        } else {
          break
        }
      }

      let hasSymbolNeighbor = false
      for (let i = x; i < x + num.length; i++) {
        if (hasNeighborWith(matrix, i, y, isSymbol)) {
          hasSymbolNeighbor = true
          break
        }
      }

      if (hasSymbolNeighbor) {
        numbersTouchingSymbols.push(parseInt(num))
      }
    }
  }

  console.log(numbersTouchingSymbols)
  return numbersTouchingSymbols.reduce((acc, num) => acc + num, 0)
}

const part2 = (input: string): number => {
  // const matrix = input.split("\n").map((line) => line.split(""))

  // for (let y = 0; y < matrix.length; y++) {
  //   for (let x = 0; x < matrix[y].length; x++) {
  //     // Skip if not a star
  //     if (matrix[y][x] !== "*") {
  //       continue
  //     }
  //   }
  // }

  return 0
}

const input = Deno.readTextFileSync("2023/day-3/input.txt")

if (import.meta.main) {
  console.log("2023 Day 3: Gear Ratios")

  console.log("Result of part 1:", part1(input))
  console.log("Result of part 2:", part2(input))
}
