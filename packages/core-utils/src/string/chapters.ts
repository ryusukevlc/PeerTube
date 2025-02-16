import { timeToInt, timecodeRegexString } from '../common/date.js'

const timecodeRegex = new RegExp(`^(${timecodeRegexString})\\s`)

export function parseChapters (text: string) {
  if (!text) return []

  const lines = text.split(/\r?\n|\r|\n/g)
  let foundChapters = false

  const chapters: { timecode: number, title: string }[] = []

  for (const line of lines) {
    const matched = line.match(timecodeRegex)
    if (!matched) {
      // Stop chapters parsing
      if (foundChapters) break

      continue
    }

    foundChapters = true

    const timecodeText = matched[1]
    const timecode = timeToInt(timecodeText)
    const title = line.replace(matched[0], '')

    chapters.push({ timecode, title })
  }

  return chapters
}
