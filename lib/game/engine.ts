import type { Piece, Player, Move } from './types'

let pieceIdCounter = 0

function makeId(): string {
  pieceIdCounter += 1
  return `piece-${pieceIdCounter}`
}

export function initBoard(): (Piece | null)[][] {
  const board: (Piece | null)[][] = Array.from({ length: 8 }, () =>
    Array(8).fill(null)
  )

  // Black pieces: rows 0-2, dark squares only (row+col odd)
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 8; c++) {
      if ((r + c) % 2 === 1) {
        board[r][c] = { id: makeId(), player: 'black', type: 'man', row: r, col: c }
      }
    }
  }

  // White pieces: rows 5-7, dark squares only
  for (let r = 5; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if ((r + c) % 2 === 1) {
        board[r][c] = { id: makeId(), player: 'white', type: 'man', row: r, col: c }
      }
    }
  }

  return board
}

function inBounds(r: number, c: number): boolean {
  return r >= 0 && r < 8 && c >= 0 && c < 8
}

function getCaptureMoves(
  board: (Piece | null)[][],
  piece: Piece,
  visited: Set<string>
): Move[] {
  const moves: Move[] = []
  const directions: [number, number][] = []

  if (piece.type === 'king') {
    directions.push([-1, -1], [-1, 1], [1, -1], [1, 1])
  } else if (piece.player === 'white') {
    // White moves up (decreasing row)
    directions.push([-1, -1], [-1, 1])
  } else {
    // Black moves down (increasing row)
    directions.push([1, -1], [1, 1])
  }

  for (const [dr, dc] of directions) {
    const midR = piece.row + dr
    const midC = piece.col + dc
    const toR = piece.row + 2 * dr
    const toC = piece.col + 2 * dc

    if (!inBounds(midR, midC) || !inBounds(toR, toC)) continue

    const midPiece = board[midR][midC]
    const toPiece = board[toR][toC]

    if (midPiece && midPiece.player !== piece.player && !toPiece) {
      const captureKey = `${midR},${midC}`
      if (!visited.has(captureKey)) {
        moves.push({
          from: { row: piece.row, col: piece.col },
          to: { row: toR, col: toC },
          captures: [{ row: midR, col: midC }],
        })
      }
    }
  }

  return moves
}

function getChainCaptures(
  board: (Piece | null)[][],
  piece: Piece,
  capturedSoFar: { row: number; col: number }[],
  fromPos: { row: number; col: number }
): Move[] {
  const visited = new Set(capturedSoFar.map((c) => `${c.row},${c.col}`))
  const tempBoard = board.map((row) => [...row])

  // Remove already-captured pieces from the temp board
  for (const cap of capturedSoFar) {
    tempBoard[cap.row][cap.col] = null
  }

  const movedPiece: Piece = { ...piece, row: fromPos.row, col: fromPos.col }
  const nextCaptures = getCaptureMoves(tempBoard, movedPiece, visited)

  if (nextCaptures.length === 0) {
    if (capturedSoFar.length > 0) {
      return [
        {
          from: { row: piece.row, col: piece.col },
          to: fromPos,
          captures: capturedSoFar,
        },
      ]
    }
    return []
  }

  const results: Move[] = []
  for (const next of nextCaptures) {
    const newCaptures = [...capturedSoFar, ...next.captures]
    const chains = getChainCaptures(board, piece, newCaptures, next.to)
    results.push(...chains)
  }

  return results
}

function getMovesForPiece(board: (Piece | null)[][], piece: Piece): Move[] {
  const simpleMoves: Move[] = []
  const directions: [number, number][] = []

  if (piece.type === 'king') {
    directions.push([-1, -1], [-1, 1], [1, -1], [1, 1])
  } else if (piece.player === 'white') {
    directions.push([-1, -1], [-1, 1])
  } else {
    directions.push([1, -1], [1, 1])
  }

  for (const [dr, dc] of directions) {
    const toR = piece.row + dr
    const toC = piece.col + dc
    if (inBounds(toR, toC) && !board[toR][toC]) {
      simpleMoves.push({
        from: { row: piece.row, col: piece.col },
        to: { row: toR, col: toC },
        captures: [],
      })
    }
  }

  return simpleMoves
}

export function getValidMoves(
  board: (Piece | null)[][],
  player: Player,
  chainPiece?: { row: number; col: number }
): Move[] {
  const allMoves: Move[] = []
  const captureMoves: Move[] = []

  const piecesToCheck: Piece[] = []

  if (chainPiece) {
    const p = board[chainPiece.row][chainPiece.col]
    if (p && p.player === player) piecesToCheck.push(p)
  } else {
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const p = board[r][c]
        if (p && p.player === player) piecesToCheck.push(p)
      }
    }
  }

  for (const piece of piecesToCheck) {
    // Check for chain captures starting from this piece
    const chains = getChainCaptures(board, piece, [], { row: piece.row, col: piece.col })
    if (chains.length > 0) {
      captureMoves.push(...chains)
    } else {
      // Also try single-step captures
      const singleCaptures = getCaptureMoves(board, piece, new Set())
      if (singleCaptures.length > 0) {
        captureMoves.push(...singleCaptures)
      } else {
        allMoves.push(...getMovesForPiece(board, piece))
      }
    }
  }

  // Mandatory captures
  if (captureMoves.length > 0) return captureMoves
  return allMoves
}

export function applyMove(board: (Piece | null)[][], move: Move): (Piece | null)[][] {
  const newBoard = board.map((row) => row.map((cell) => (cell ? { ...cell } : null)))

  const piece = newBoard[move.from.row][move.from.col]
  if (!piece) return newBoard

  // Remove captured pieces
  for (const cap of move.captures) {
    newBoard[cap.row][cap.col] = null
  }

  // Move piece
  newBoard[move.from.row][move.from.col] = null
  const movedPiece: Piece = { ...piece, row: move.to.row, col: move.to.col }

  // King promotion
  if (movedPiece.type === 'man') {
    if (movedPiece.player === 'white' && move.to.row === 0) {
      movedPiece.type = 'king'
    }
    if (movedPiece.player === 'black' && move.to.row === 7) {
      movedPiece.type = 'king'
    }
  }

  newBoard[move.to.row][move.to.col] = movedPiece
  return newBoard
}

export function checkWin(board: (Piece | null)[][], currentPlayer: Player): Player | null {
  let whiteCount = 0
  let blackCount = 0

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = board[r][c]
      if (p?.player === 'white') whiteCount++
      if (p?.player === 'black') blackCount++
    }
  }

  if (blackCount === 0) return 'white'
  if (whiteCount === 0) return 'black'

  // Check if current player has no valid moves
  const moves = getValidMoves(board, currentPlayer)
  if (moves.length === 0) {
    return currentPlayer === 'white' ? 'black' : 'white'
  }

  return null
}

export function coordToNotation(row: number, col: number): string {
  const col_letter = String.fromCharCode('A'.charCodeAt(0) + col)
  const row_number = 8 - row
  return `${col_letter}${row_number}`
}
