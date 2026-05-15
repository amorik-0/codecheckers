'use client'

import { useRef, useState, type KeyboardEvent } from 'react'
import { Play } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TerminalInputProps {
  value: string
  onChange: (v: string) => void
  onSubmit: (v: string) => void
  disabled?: boolean
}

const MAX_HISTORY = 50

export default function TerminalInput({
  value,
  onChange,
  onSubmit,
  disabled = false,
}: TerminalInputProps) {
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState<number>(-1)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  function handleSubmit() {
    const trimmed = value.trim()
    if (!trimmed || disabled) return

    setHistory((prev) => {
      const next = [trimmed, ...prev.filter((h) => h !== trimmed)].slice(
        0,
        MAX_HISTORY
      )
      return next
    })
    setHistoryIndex(-1)
    onSubmit(trimmed)
    onChange('')
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
      return
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const nextIndex = Math.min(historyIndex + 1, history.length - 1)
      setHistoryIndex(nextIndex)
      if (history[nextIndex] !== undefined) {
        onChange(history[nextIndex])
      }
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const nextIndex = Math.max(historyIndex - 1, -1)
      setHistoryIndex(nextIndex)
      if (nextIndex === -1) {
        onChange('')
      } else if (history[nextIndex] !== undefined) {
        onChange(history[nextIndex])
      }
    }
  }

  return (
    <div className="border-t border-zinc-800 p-3 flex flex-col gap-2" style={{ height: '120px' }}>
      <div className="flex gap-2 flex-1">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder='board.move("A3", "B4")'
          className="flex-1 resize-none bg-zinc-900 border border-zinc-700 text-zinc-100 font-mono text-sm p-2 focus:outline-none focus:border-zinc-500 placeholder:text-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed"
          rows={2}
        />
        <Button
          variant="primary"
          size="icon"
          onClick={handleSubmit}
          disabled={disabled || !value.trim()}
          className="self-stretch h-auto"
          aria-label="Run command"
        >
          <Play className="w-4 h-4" />
        </Button>
      </div>
      <div className="text-zinc-600 font-mono text-xs">
        ENTER to run | UP/DOWN for history
      </div>
    </div>
  )
}
