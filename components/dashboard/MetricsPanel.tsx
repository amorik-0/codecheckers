interface MetricCard {
  label: string
  value: string | number
  sub?: string
}

const METRICS: MetricCard[] = [
  { label: 'Students Active', value: 24, sub: 'this session' },
  { label: 'Moves Executed', value: 1_482, sub: 'total today' },
  { label: 'Avg Error Rate', value: '18%', sub: 'per session' },
  { label: 'Avg Win Rate', value: '34%', sub: 'vs bot' },
]

export default function MetricsPanel() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {METRICS.map((m) => (
        <div
          key={m.label}
          className="border border-zinc-800 bg-zinc-900 p-5 shadow-[2px_2px_0px_#000]"
        >
          <div className="text-xs text-zinc-500 font-mono uppercase tracking-widest mb-2">
            {m.label}
          </div>
          <div className="text-3xl font-bold text-zinc-100 font-mono">{m.value}</div>
          {m.sub && (
            <div className="text-xs text-zinc-600 mt-1 font-mono">{m.sub}</div>
          )}
        </div>
      ))}
    </div>
  )
}
