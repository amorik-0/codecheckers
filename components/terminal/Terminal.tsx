'use client'

import { Terminal as TerminalIcon, RotateCcw, RefreshCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useGameStore } from '@/store/gameStore'
import TerminalLog from './TerminalLog'
import TerminalInput from './TerminalInput'

export default function Terminal() {
  const terminalLog = useGameStore((s) => s.terminalLog)
  const inputValue = useGameStore((s) => s.inputValue)
  const currentPlayer = useGameStore((s) => s.gameState.currentPlayer)
  const winner = useGameStore((s) => s.gameState.winner)
  const submitCommand = useGameStore((s) => s.submitCommand)
  const resetGame = useGameStore((s) => s.resetGame)
  const clearLog = useGameStore((s) => s.clearLog)
  const setInputValue = useGameStore((s) => s.setInputValue)

  const isPlayerTurn = currentPlayer === 'white' && !winner
  const isDisabled = !isPlayerTurn

  return (
    <div className="flex flex-col h-full bg-zinc-950 text-zinc-100">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 shrink-0">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-zinc-400" />
          <span className="font-mono text-sm font-medium text-zinc-300 tracking-widest uppercase">
            Terminal
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={clearLog}
            title="Clear log"
            aria-label="Clear log"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={resetGame}
            title="Reset game"
            aria-label="Reset game"
          >
            <RefreshCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Log */}
      <TerminalLog entries={terminalLog} />

      {/* Input */}
      <TerminalInput
        value={inputValue}
        onChange={setInputValue}
        onSubmit={submitCommand}
        disabled={isDisabled}
      />
    </div>
  )
}
