interface Session {
  id: string
  date: string
  students: number
  totalMoves: number
  avgWinRate: string
  winner: string
}

const SESSIONS: Session[] = [
  {
    id: 'SES-001',
    date: '2026-05-15',
    students: 24,
    totalMoves: 1482,
    avgWinRate: '34%',
    winner: 'Zarina Seitkali',
  },
  {
    id: 'SES-002',
    date: '2026-05-14',
    students: 21,
    totalMoves: 1103,
    avgWinRate: '29%',
    winner: 'Ainur Suleimenova',
  },
  {
    id: 'SES-003',
    date: '2026-05-13',
    students: 19,
    totalMoves: 987,
    avgWinRate: '31%',
    winner: 'Aisha Bekova',
  },
]

export default function SessionCard() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {SESSIONS.map((session) => (
        <div
          key={session.id}
          className="border border-zinc-800 bg-zinc-900 p-5 shadow-[2px_2px_0px_#000]"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
              {session.id}
            </span>
            <span className="font-mono text-xs text-zinc-600">{session.date}</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-mono">
              <span className="text-zinc-500">Students</span>
              <span className="text-zinc-300">{session.students}</span>
            </div>
            <div className="flex justify-between text-sm font-mono">
              <span className="text-zinc-500">Total Moves</span>
              <span className="text-zinc-300">{session.totalMoves}</span>
            </div>
            <div className="flex justify-between text-sm font-mono">
              <span className="text-zinc-500">Avg Win Rate</span>
              <span className="text-zinc-300">{session.avgWinRate}</span>
            </div>
            <div className="border-t border-zinc-800 pt-2 mt-2">
              <div className="text-xs text-zinc-500 font-mono">Top performer</div>
              <div className="text-sm text-blue-400 font-mono mt-0.5">{session.winner}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
