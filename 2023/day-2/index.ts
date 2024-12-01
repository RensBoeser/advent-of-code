interface CubeThrow {
  color: "red" | "green" | "blue"
  count: number
}

interface CubeSet {
  set: number
  cubeThrows: Array<CubeThrow>
}

interface Game {
  id: number
  sets: Array<CubeSet>
}

const parseGame = (line: string): Game => {
  const gameId = parseInt(line.split(" ")[1].replace(":", ""))
  const setStrings = line.split(":")[1].split(";")
  const sets = setStrings.map((setString, index) => {
    const cubeStrings = setString.split(",").map((str) => str.trim())
    const cubeThrows = cubeStrings.map((cubeString) => {
      const [count, color] = cubeString.split(" ")

      return {
        color: color as "red" | "green" | "blue",
        count: parseInt(count),
      } satisfies CubeThrow
    })

    return {
      set: index + 1,
      cubeThrows: cubeThrows,
    } satisfies CubeSet
  })

  return {
    id: gameId,
    sets,
  } satisfies Game
}

const part1 = () => {
  const MAX_RED_CUBES = 12
  const MAX_GREEN_CUBES = 13
  const MAX_BLUE_CUBES = 14

  const inputText = Deno.readTextFileSync("2023/day-2/input.txt")
  const lines = inputText.split("\n")

  const games = lines.map(parseGame)

  const legitGames = games.filter((game) => {
    return !game.sets.some((set) => {
      const hasIllegalThrow = set.cubeThrows.some((cubeThrow) => {
        if (cubeThrow.color === "red" && cubeThrow.count > MAX_RED_CUBES) {
          return true
        }

        if (cubeThrow.color === "green" && cubeThrow.count > MAX_GREEN_CUBES) {
          return true
        }

        if (cubeThrow.color === "blue" && cubeThrow.count > MAX_BLUE_CUBES) {
          return true
        }

        return false
      })

      return hasIllegalThrow
    })
  })

  return legitGames.reduce((acc, curr) => acc + curr.id, 0)
}

interface MinimalCubesNeededToPlayGame {
  red: number
  green: number
  blue: number
}

const part2 = () => {
  const inputText = Deno.readTextFileSync("2023/day-2/input.txt")
  const lines = inputText.split("\n")

  const games = lines.map(parseGame)

  const minimalCubesNeededToPlayGame = games.map((game) => {
    return game.sets.reduce<MinimalCubesNeededToPlayGame>((acc, set) => {
      const redThrow = set.cubeThrows.find(({ color }) =>
        color === "red"
      )?.count ?? 0
      const greenThrow = set.cubeThrows.find(({ color }) =>
        color === "green"
      )?.count ?? 0
      const blueThrow =
        set.cubeThrows.find(({ color }) => color === "blue")?.count ?? 0

      return {
        red: Math.max(acc.red, redThrow),
        green: Math.max(acc.green, greenThrow),
        blue: Math.max(acc.blue, blueThrow),
      }
    }, { red: 0, green: 0, blue: 0 } as MinimalCubesNeededToPlayGame)
  })

  return minimalCubesNeededToPlayGame.reduce((acc, game) => {
    const power = game.red * game.green * game.blue
    return acc + power
  }, 0)
}

if (import.meta.main) {
  console.log("2023 Day 2: Cube Conundrum")

  console.log("Result of part 1:", part1())
  console.log("Result of part 2:", part2())
}
