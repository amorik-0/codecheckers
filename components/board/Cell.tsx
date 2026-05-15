import type { ClientCell } from '@/lib/game/types'
import { cn } from '@/lib/utils'
import Piece from './Piece'

interface CellProps {
  cell: ClientCell
  row: number
  col: number
}

export default function Cell({ cell }: CellProps) {
  if (cell.state === 'fog') {
    return (
      <div className="w-full h-full bg-zinc-900" />
    )
  }

  const isDark = cell.cellColor === 'dark'

  return (
    <div
      className={cn(
        'w-full h-full flex items-center justify-center',
        isDark ? 'bg-zinc-700' : 'bg-zinc-100'
      )}
    >
      {cell.state === 'piece' && <Piece piece={cell.piece} />}
    </div>
  )
}
