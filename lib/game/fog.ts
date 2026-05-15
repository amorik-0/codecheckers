import type { Piece, Player, ClientBoard, CellState } from './types'

export function calculateVisibility(
  board: (Piece | null)[][],
  player: Player
): Set<string> {
  const visible = new Set<string>()

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c]
      if (!piece || piece.player !== player) continue

      const radius = piece.type === 'king' ? 2 : 1

      for (let dr = -radius; dr <= radius; dr++) {
        for (let dc = -radius; dc <= radius; dc++) {
          const nr = r + dr
          const nc = c + dc
          if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
            visible.add(`${nr},${nc}`)
          }
        }
      }
    }
  }

  return visible
}

export function applyFog(
  board: (Piece | null)[][],
  player: Player
): ClientBoard {
  const visible = calculateVisibility(board, player)

  return board.map((row, r) =>
    row.map((cell, c) => {
      if (!visible.has(`${r},${c}`)) {
        return { state: 'fog' as const }
      }

      const cellColor: CellState = (r + c) % 2 === 0 ? 'light' : 'dark'

      if (!cell) {
        return { state: 'empty' as const, cellColor }
      }

      return { state: 'piece' as const, cellColor, piece: cell }
    })
  )
}
