'use client'

import { useEffect, useRef } from 'react'
import type { TerminalEntry } from '@/lib/game/types'
import { cn } from '@/lib/utils'

interface TerminalLogProps {
  entries: TerminalEntry[]
}

function entryClass(type: TerminalEntry['type']): string {
  switch (type) {
    case 'input':
      return 'text-zinc-400'
    case 'success':
      return 'text-blue-400'
    case 'error':
      return 'text-red-400'
    case 'info':
      return 'text-zinc-300'
    case 'system':
      return 'text-zinc-500 italic'
    default:
      return 'text-zinc-400'
  }
}

export default function TerminalLog({ entries }: TerminalLogProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [entries])

  return (
    <div className="flex-1 overflow-y-auto terminal-scroll p-4 space-y-1">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className={cn('font-mono text-sm leading-relaxed', entryClass(entry.type))}
        >
          {entry.message}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  )
}
