export type Player = 'white' | 'black'
export type PieceType = 'man' | 'king'
export type CellState = 'light' | 'dark'

export interface Piece {
  id: string
  player: Player
  type: PieceType
  row: number
  col: number
}

export type ClientCell =
  | { state: 'fog' }
  | { state: 'empty'; cellColor: CellState }
  | { state: 'piece'; cellColor: CellState; piece: Piece }

export type ClientBoard = ClientCell[][]

export interface Move {
  from: { row: number; col: number }
  to: { row: number; col: number }
  captures: { row: number; col: number }[]
}

export interface GameState {
  board: (Piece | null)[][]
  currentPlayer: Player
  winner: Player | null
  moveCount: number
  captureCount: { white: number; black: number }
}

export interface TerminalEntry {
  id: string
  type: 'input' | 'success' | 'error' | 'info' | 'system'
  message: string
  timestamp: number
}

export interface ParsedCommand {
  valid: boolean
  from?: { row: number; col: number }
  to?: { row: number; col: number }
  error?: string
}
