'use client'

import type { ClientBoard } from '@/lib/game/types'
import Cell from './Cell'

interface BoardProps {
  board: ClientBoard
}

const COLUMN_LABELS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
const ROW_LABELS = ['8', '7', '6', '5', '4', '3', '2', '1']

export default function Board({ board }: BoardProps) {
  return (
    <div className="flex flex-col items-center select-none">
      {/* Column labels */}
      <div className="flex ml-6 mb-1">
        {COLUMN_LABELS.map((label) => (
          <div
            key={label}
            className="w-10 h-4 flex items-center justify-center text-xs text-zinc-500 font-mono"
          >
            {label}
          </div>
        ))}
      </div>

      <div className="flex">
        {/* Row labels */}
        <div className="flex flex-col mr-1">
          {ROW_LABELS.map((label) => (
            <div
              key={label}
              className="w-5 h-10 flex items-center justify-center text-xs text-zinc-500 font-mono"
            >
              {label}
            </div>
          ))}
        </div>

        {/* Board grid */}
        <div
          className="grid grid-cols-8 border border-zinc-800 shadow-[4px_4px_0px_#000]"
          style={{ width: '320px', height: '320px' }}
        >
          {board.map((row, r) =>
            row.map((cell, c) => (
              <div key={`${r}-${c}`} style={{ width: '40px', height: '40px' }}>
                <Cell cell={cell} row={r} col={c} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
