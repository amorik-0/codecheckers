import { Crown } from 'lucide-react'
import type { Piece as PieceType } from '@/lib/game/types'
import { cn } from '@/lib/utils'

interface PieceProps {
  piece: PieceType
}

export default function Piece({ piece }: PieceProps) {
  const isWhite = piece.player === 'white'
  const isKing = piece.type === 'king'

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div
        className={cn(
          'w-8 h-8 rounded-full border-2 flex items-center justify-center',
          isWhite
            ? 'bg-white border-zinc-400'
            : 'bg-zinc-950 border-zinc-600'
        )}
      >
        {isKing && (
          <Crown
            className={cn(
              'w-3 h-3',
              isWhite ? 'text-zinc-600' : 'text-zinc-400'
            )}
          />
        )}
      </div>
    </div>
  )
}
