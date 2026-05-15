import type { ParsedCommand } from './types'

const COMMAND_REGEX = /^board\.move\(\s*["']([a-h][1-8])["']\s*,\s*["']([a-h][1-8])["']\s*\)$/i

function notationToCoords(notation: string): { row: number; col: number } {
  const letter = notation[0].toLowerCase()
  const digit = parseInt(notation[1], 10)
  const col = letter.charCodeAt(0) - 'a'.charCodeAt(0)
  const row = 8 - digit
  return { row, col }
}

export function parseCommand(input: string): ParsedCommand {
  const trimmed = input.trim()
  const match = trimmed.match(COMMAND_REGEX)

  if (!match) {
    return {
      valid: false,
      error: 'Syntax error. Expected: board.move("A3", "B4")',
    }
  }

  const from = notationToCoords(match[1])
  const to = notationToCoords(match[2])

  return { valid: true, from, to }
}
