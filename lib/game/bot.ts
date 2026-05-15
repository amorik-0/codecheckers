import type { Piece, Player, Move } from './types'
import { getValidMoves } from './engine'

export function getBotMove(board: (Piece | null)[][], botPlayer: Player): Move | null {
  const moves = getValidMoves(board, botPlayer)

  if (moves.length === 0) return null

  // Prefer capture moves
  const captureMoves = moves.filter((m) => m.captures.length > 0)

  if (captureMoves.length > 0) {
    // Pick the capture with the most pieces taken
    captureMoves.sort((a, b) => b.captures.length - a.captures.length)
    const maxCaptures = captureMoves[0].captures.length
    const best = captureMoves.filter((m) => m.captures.length === maxCaptures)
    return best[Math.floor(Math.random() * best.length)]
  }

  // Random valid move
  return moves[Math.floor(Math.random() * moves.length)]
}
