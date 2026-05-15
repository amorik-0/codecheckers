'use client'

import { useGameStore } from '@/store/gameStore'
import Board from '@/components/board/Board'
import Terminal from '@/components/terminal/Terminal'

export default function GameLayout() {
  const playerView = useGameStore((s) => s.playerView)
  const gameState = useGameStore((s) => s.gameState)

  const { currentPlayer, moveCount, captureCount, winner } = gameState

  return (
    <div className="flex flex-col h-full">
      {/* Status bar */}
      <div className="flex items-center gap-6 px-6 py-2 border-b border-zinc-800 bg-zinc-900 shrink-0 font-mono text-xs text-zinc-400">
        <span>
          Turn:{' '}
          <span className={currentPlayer === 'white' ? 'text-zinc-100' : 'text-zinc-500'}>
            {winner ? `${winner.toUpperCase()} wins` : currentPlayer.toUpperCase()}
          </span>
        </span>
        <span>Moves: <span className="text-zinc-300">{moveCount}</span></span>
        <span>
          Captures — White:{' '}
          <span className="text-zinc-300">{captureCount.white}</span>
          {' / '}Black:{' '}
          <span className="text-zinc-300">{captureCount.black}</span>
        </span>
        <span className="ml-auto flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 bg-zinc-900 border border-zinc-700" />
            <span>Fog</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 bg-zinc-700 border border-zinc-600" />
            <span>Visible dark</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 bg-zinc-100 border border-zinc-400" />
            <span>Visible light</span>
          </span>
        </span>
      </div>

      {/* Split screen */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left — board */}
        <div className="w-1/2 flex items-center justify-center bg-zinc-950 border-r border-zinc-800">
          <Board board={playerView} />
        </div>

        {/* Right — terminal */}
        <div className="w-1/2 flex flex-col">
          <Terminal />
        </div>
      </div>
    </div>
  )
}
