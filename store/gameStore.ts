import { create } from 'zustand'
import type { GameState, ClientBoard, TerminalEntry } from '@/lib/game/types'
import { initBoard, getValidMoves, applyMove, checkWin, coordToNotation } from '@/lib/game/engine'
import { applyFog } from '@/lib/game/fog'
import { parseCommand } from '@/lib/game/parser'
import { getBotMove } from '@/lib/game/bot'

function makeEntry(
  type: TerminalEntry['type'],
  message: string
): TerminalEntry {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    type,
    message,
    timestamp: Date.now(),
  }
}

function buildInitialGameState(): GameState {
  const board = initBoard()
  return {
    board,
    currentPlayer: 'white',
    winner: null,
    moveCount: 0,
    captureCount: { white: 0, black: 0 },
  }
}

interface GameStore {
  gameState: GameState
  playerView: ClientBoard
  botView: ClientBoard
  terminalLog: TerminalEntry[]
  inputValue: string

  initGame(): void
  submitCommand(input: string): void
  executeBotMove(): void
  resetGame(): void
  setInputValue(v: string): void
  clearLog(): void
}

export const useGameStore = create<GameStore>((set, get) => ({
  gameState: buildInitialGameState(),
  playerView: applyFog(initBoard(), 'white'),
  botView: applyFog(initBoard(), 'black'),
  terminalLog: [
    makeEntry('system', 'CodeCheckers: Fog of War Engine v0.1'),
    makeEntry('system', 'You are WHITE. Bot is BLACK.'),
    makeEntry('info', 'Use board.move("A3", "B4") to move your pieces.'),
    makeEntry('info', 'Columns: A-H (left to right). Rows: 1 (bottom) to 8 (top).'),
  ],
  inputValue: '',

  initGame() {
    const board = initBoard()
    const gameState: GameState = {
      board,
      currentPlayer: 'white',
      winner: null,
      moveCount: 0,
      captureCount: { white: 0, black: 0 },
    }
    set({
      gameState,
      playerView: applyFog(board, 'white'),
      botView: applyFog(board, 'black'),
      terminalLog: [
        makeEntry('system', 'CodeCheckers: Fog of War Engine v0.1'),
        makeEntry('system', 'You are WHITE. Bot is BLACK.'),
        makeEntry('info', 'Use board.move("A3", "B4") to move your pieces.'),
        makeEntry('info', 'Columns: A-H (left to right). Rows: 1 (bottom) to 8 (top).'),
      ],
      inputValue: '',
    })
  },

  resetGame() {
    get().initGame()
  },

  clearLog() {
    set({ terminalLog: [] })
  },

  setInputValue(v: string) {
    set({ inputValue: v })
  },

  submitCommand(input: string) {
    const { gameState } = get()

    const addEntry = (entry: TerminalEntry) =>
      set((s) => ({ terminalLog: [...s.terminalLog, entry] }))

    addEntry(makeEntry('input', '> ' + input))

    if (gameState.winner) {
      addEntry(makeEntry('error', 'Game over. Reset to play again.'))
      return
    }

    if (gameState.currentPlayer !== 'white') {
      addEntry(makeEntry('error', 'Not your turn.'))
      return
    }

    const parsed = parseCommand(input)
    if (!parsed.valid || !parsed.from || !parsed.to) {
      addEntry(makeEntry('error', parsed.error ?? 'Parse error.'))
      return
    }

    const { from, to } = parsed
    const validMoves = getValidMoves(gameState.board, 'white')

    const matchingMove = validMoves.find(
      (m) =>
        m.from.row === from.row &&
        m.from.col === from.col &&
        m.to.row === to.row &&
        m.to.col === to.col
    )

    if (!matchingMove) {
      addEntry(makeEntry('error', 'Invalid move. Check rules or fog state.'))
      return
    }

    // Check if target is visible to white
    const playerView = get().playerView
    const targetCell = playerView[to.row][to.col]
    if (targetCell.state === 'fog') {
      addEntry(makeEntry('error', 'Target cell is in the Fog. You cannot see there.'))
      return
    }

    const newBoard = applyMove(gameState.board, matchingMove)
    const newCaptureCount = {
      white: gameState.captureCount.white + matchingMove.captures.length,
      black: gameState.captureCount.black,
    }
    const newMoveCount = gameState.moveCount + 1
    const winner = checkWin(newBoard, 'black')

    const fromNotation = coordToNotation(from.row, from.col)
    const toNotation = coordToNotation(to.row, to.col)

    const newGameState: GameState = {
      board: newBoard,
      currentPlayer: winner ? 'white' : 'black',
      winner,
      moveCount: newMoveCount,
      captureCount: newCaptureCount,
    }

    set({
      gameState: newGameState,
      playerView: applyFog(newBoard, 'white'),
      botView: applyFog(newBoard, 'black'),
    })

    addEntry(makeEntry('success', `Move executed: ${fromNotation} -> ${toNotation}`))

    if (matchingMove.captures.length > 0) {
      addEntry(makeEntry('info', `Capture: ${matchingMove.captures.length} enemy piece(s) removed.`))
    }

    if (winner) {
      addEntry(makeEntry('system', `Game over. ${winner.toUpperCase()} wins!`))
      return
    }

    // Bot's turn after delay
    setTimeout(() => {
      get().executeBotMove()
    }, 800)
  },

  executeBotMove() {
    const { gameState } = get()

    const addEntry = (entry: TerminalEntry) =>
      set((s) => ({ terminalLog: [...s.terminalLog, entry] }))

    if (gameState.winner || gameState.currentPlayer !== 'black') return

    addEntry(makeEntry('system', 'Bot is thinking...'))

    const botMove = getBotMove(gameState.board, 'black')

    if (!botMove) {
      addEntry(makeEntry('system', 'Bot has no valid moves. WHITE wins!'))
      set((s) => ({
        gameState: { ...s.gameState, winner: 'white' },
      }))
      return
    }

    const newBoard = applyMove(gameState.board, botMove)
    const newCaptureCount = {
      white: gameState.captureCount.white,
      black: gameState.captureCount.black + botMove.captures.length,
    }
    const newMoveCount = gameState.moveCount + 1
    const winner = checkWin(newBoard, 'white')

    const fromNotation = coordToNotation(botMove.from.row, botMove.from.col)
    const toNotation = coordToNotation(botMove.to.row, botMove.to.col)

    const newGameState: GameState = {
      board: newBoard,
      currentPlayer: winner ? 'black' : 'white',
      winner,
      moveCount: newMoveCount,
      captureCount: newCaptureCount,
    }

    set({
      gameState: newGameState,
      playerView: applyFog(newBoard, 'white'),
      botView: applyFog(newBoard, 'black'),
    })

    addEntry(makeEntry('system', `Bot moved: ${fromNotation} -> ${toNotation}`))

    if (botMove.captures.length > 0) {
      addEntry(makeEntry('info', `Bot capture: ${botMove.captures.length} white piece(s) removed.`))
    }

    if (winner) {
      addEntry(makeEntry('system', `Game over. ${winner.toUpperCase()} wins!`))
    }
  },
}))
