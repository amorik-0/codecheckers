import Link from 'next/link'
import { cn } from '@/lib/utils'

interface HeaderProps {
  className?: string
}

export default function Header({ className }: HeaderProps) {
  return (
    <header
      className={cn(
        'flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950 shrink-0',
        className
      )}
    >
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-mono font-bold text-zinc-100 text-base tracking-tight">
            CodeCheckers
          </span>
          <span className="text-zinc-600 text-sm font-mono">Fog of War</span>
        </Link>
      </div>
      <nav className="flex items-center gap-4">
        <Link
          href="/play"
          className="text-sm text-zinc-400 hover:text-zinc-100 font-mono transition-colors"
        >
          Play
        </Link>
        <Link
          href="/dashboard"
          className="text-sm text-zinc-400 hover:text-zinc-100 font-mono transition-colors"
        >
          Dashboard
        </Link>
      </nav>
    </header>
  )
}
