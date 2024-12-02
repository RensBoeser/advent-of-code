const part1 = (input: string) => {
  const reports = input.split("\n").map((line) =>
    line.split(" ").map((num) => parseInt(num))
  )

  const safeReports = reports.filter((report) => {
    let direction: "ascending" | "descending" | null = null
    for (let i = 1; i < report.length; i++) {
      const [last, current] = [report[i - 1], report[i]]

      if (!direction) {
        direction = report[i - 1] > report[i] ? "descending" : "ascending"
      }

      if (direction === "descending" && last < current) {
        return false
      } else if (direction === "ascending" && last > current) {
        return false
      }

      if (Math.abs(last - current) < 1 || Math.abs(last - current) > 3) {
        return false
      }
    }

    return true
  })

  return safeReports.length
}

const part2 = (input: string) => {
  const reports = input.split("\n").map((line) =>
    line.split(" ").map((num) => parseInt(num))
  )

  const retryReportWithDampener = (report: number[]) => {
    for (let i = 0; i < report.length; i++) {
      if (checkIfReportIsSafe(report.toSpliced(i, 1), false)) {
        return true
      }
    }

    return false
  }

  const checkIfReportIsSafe = (
    report: number[],
    canFail: boolean,
  ): boolean => {
    let direction: "ascending" | "descending" | null = null

    for (let i = 1; i < report.length; i++) {
      const [last, current] = [report[i - 1], report[i]]

      if (!direction) {
        direction = report[i - 1] > report[i] ? "descending" : "ascending"
      }

      if (direction === "descending" && last <= current) {
        if (!canFail) return false
        return retryReportWithDampener(report)
      }

      if (direction === "ascending" && last >= current) {
        if (!canFail) return false
        return retryReportWithDampener(report)
      }

      if (Math.abs(last - current) < 1 || Math.abs(last - current) > 3) {
        if (!canFail) return false
        return retryReportWithDampener(report)
      }
    }

    return true
  }

  const safeReports = reports.filter((report) =>
    checkIfReportIsSafe(report, true)
  )

  return safeReports.length
}

const input = Deno.readTextFileSync("2024/day-2/input.txt")

if (import.meta.main) {
  console.log("2024 Day 2: Red-Nosed Reports")
  console.log("Result of part 1:", part1(input))
  console.log("Result of part 2:", part2(input))
}

Deno.bench({
  name: "2024 Day 2: Red-Nosed Reports - Part 1",
  fn: () => {
    part1(input)
  },
})

Deno.bench({
  name: "2024 Day 2: Red-Nosed Reports - Part 2",
  fn: () => {
    part2(input)
  },
})
