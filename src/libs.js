import fs from "fs"

export function getJson({ recent = false } = {}) {
  const dir = process.cwd()
  const words = JSON.parse(fs.readFileSync(`${dir}/src/words.json`, "utf-8"))
  if (recent) {
    const weekAgo = new Date().getTime() - 1000 * 60 * 60 * 24 * 7
    return words.data.filter((word) => new Date(word.date) > weekAgo)
  }
  return words.data
}

export function getRandomWord({ recent = false } = {}) {
  const words = getJson({ recent })
  return words[Math.floor(Math.random() * words.length)]
}
