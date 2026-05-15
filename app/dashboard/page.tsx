import Header from '@/components/layout/Header'
import MetricsPanel from '@/components/dashboard/MetricsPanel'
import StudentTable from '@/components/dashboard/StudentTable'
import SessionCard from '@/components/dashboard/SessionCard'

export default function DashboardPage() {
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950">
      <Header />

      <main className="flex-1 px-8 py-8 max-w-7xl mx-auto w-full">
        {/* Page header */}
        <div className="flex items-baseline justify-between mb-8">
          <div>
            <h1 className="font-mono font-bold text-2xl text-zinc-100">
              Session Overview
            </h1>
            <p className="font-mono text-sm text-zinc-500 mt-1">{today}</p>
          </div>
          <div className="font-mono text-xs text-zinc-600 border border-zinc-800 px-3 py-1">
            B2B Analytics — Demo Data
          </div>
        </div>

        {/* Metrics */}
        <section className="mb-8">
          <MetricsPanel />
        </section>

        {/* Student table */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-mono font-semibold text-zinc-300 text-sm uppercase tracking-widest">
              Students
            </h2>
            <span className="font-mono text-xs text-zinc-600">Current session</span>
          </div>
          <StudentTable />
        </section>

        {/* Recent sessions */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-mono font-semibold text-zinc-300 text-sm uppercase tracking-widest">
              Recent Sessions
            </h2>
            <span className="font-mono text-xs text-zinc-600">Last 3 sessions</span>
          </div>
          <SessionCard />
        </section>
      </main>

      <footer className="px-8 py-4 border-t border-zinc-800">
        <p className="font-mono text-xs text-zinc-600">
          CodeCheckers — Fog of War Engine v0.1
        </p>
      </footer>
    </div>
  )
}
