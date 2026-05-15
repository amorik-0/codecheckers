import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      {/* Header */}
      <header className="px-8 py-6 border-b border-zinc-800">
        <div className="flex items-baseline gap-3">
          <span className="font-mono font-bold text-zinc-100 text-xl tracking-tight">
            CodeCheckers
          </span>
          <span className="text-zinc-500 font-mono text-sm">Fog of War</span>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-8 py-16">
        <div className="max-w-3xl w-full">
          <div className="mb-12">
            <h1 className="font-mono font-bold text-5xl text-zinc-100 tracking-tight mb-3">
              CodeCheckers
            </h1>
            <p className="font-mono text-zinc-500 text-lg">
              Fog of War Engine
            </p>
            <p className="mt-6 text-zinc-400 text-base max-w-xl leading-relaxed">
              A tactical checkers game played entirely through code commands. The board
              is obscured by fog — you can only see cells near your own pieces.
              Write commands to move, capture, and win.
            </p>
          </div>

          {/* Mode cards */}
          <div className="grid grid-cols-2 gap-4 mb-12">
            <Link href="/play" className="group block">
              <div className="border border-zinc-800 p-6 bg-zinc-900 hover:border-zinc-400 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
                    Mode 01
                  </span>
                  <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300 transition-colors" />
                </div>
                <h2 className="font-mono font-semibold text-zinc-100 text-lg mb-2">
                  Terminal Sandbox
                </h2>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Play against the bot using code commands. Move pieces by typing
                  board.move("A3", "B4") in the terminal panel.
                </p>
                <div className="mt-4 font-mono text-xs text-zinc-600 border-t border-zinc-800 pt-3">
                  Player vs Bot — Fog of War active
                </div>
              </div>
            </Link>

            <Link href="/dashboard" className="group block">
              <div className="border border-zinc-800 p-6 bg-zinc-900 hover:border-zinc-400 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
                    Mode 02
                  </span>
                  <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300 transition-colors" />
                </div>
                <h2 className="font-mono font-semibold text-zinc-100 text-lg mb-2">
                  B2B Dashboard
                </h2>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  View student performance metrics across sessions. Track moves,
                  errors, captures, and win rates for your cohort.
                </p>
                <div className="mt-4 font-mono text-xs text-zinc-600 border-t border-zinc-800 pt-3">
                  Instructor view — Aggregate analytics
                </div>
              </div>
            </Link>
          </div>

          {/* Command preview */}
          <div className="border border-zinc-800 bg-zinc-900 p-4 mb-8 shadow-[2px_2px_0px_#000]">
            <div className="text-xs text-zinc-500 font-mono uppercase tracking-widest mb-2">
              Quick start
            </div>
            <div className="font-mono text-sm text-blue-400">
              board.move(&quot;C3&quot;, &quot;D4&quot;)
            </div>
            <div className="font-mono text-xs text-zinc-600 mt-1">
              Columns A-H, Rows 1 (bottom) to 8 (top)
            </div>
          </div>

          {/* Docs link */}
          <div className="flex items-center gap-2">
            <a
              href="#"
              className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors font-mono"
            >
              <BookOpen className="w-4 h-4" />
              Read the docs
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-8 py-4 border-t border-zinc-800">
        <p className="font-mono text-xs text-zinc-600">
          CodeCheckers — Fog of War Engine v0.1
        </p>
      </footer>
    </div>
  )
}
