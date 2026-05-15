import { Badge } from '@/components/ui/badge'

type StudentStatus = 'Active' | 'Idle' | 'Finished'

interface Student {
  name: string
  moves: number
  captures: number
  errors: number
  winRate: string
  status: StudentStatus
}

const STUDENTS: Student[] = [
  { name: 'Aisha Bekova', moves: 87, captures: 12, errors: 4, winRate: '60%', status: 'Active' },
  { name: 'Temur Rakhimov', moves: 54, captures: 7, errors: 11, winRate: '25%', status: 'Idle' },
  { name: 'Zarina Seitkali', moves: 103, captures: 18, errors: 2, winRate: '75%', status: 'Active' },
  { name: 'Daniyar Akhmet', moves: 39, captures: 5, errors: 9, winRate: '20%', status: 'Finished' },
  { name: 'Madina Yusupova', moves: 72, captures: 10, errors: 6, winRate: '50%', status: 'Active' },
  { name: 'Ruslan Dzhaksybekov', moves: 61, captures: 9, errors: 8, winRate: '40%', status: 'Idle' },
  { name: 'Ainur Suleimenova', moves: 95, captures: 15, errors: 3, winRate: '65%', status: 'Active' },
  { name: 'Baurzhan Nurgaliev', moves: 28, captures: 3, errors: 14, winRate: '10%', status: 'Finished' },
]

function statusVariant(status: StudentStatus) {
  switch (status) {
    case 'Active': return 'active' as const
    case 'Idle': return 'idle' as const
    case 'Finished': return 'finished' as const
  }
}

export default function StudentTable() {
  return (
    <div className="border border-zinc-800 shadow-[2px_2px_0px_#000] overflow-hidden">
      <table className="w-full text-sm font-mono">
        <thead>
          <tr className="border-b border-zinc-800 bg-zinc-900">
            {['Student', 'Moves', 'Captures', 'Errors', 'Win Rate', 'Status'].map(
              (col) => (
                <th
                  key={col}
                  className="text-left px-4 py-3 text-xs text-zinc-500 uppercase tracking-widest font-medium"
                >
                  {col}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {STUDENTS.map((student, i) => (
            <tr
              key={student.name}
              className={`border-b border-zinc-800 ${
                i % 2 === 0 ? 'bg-zinc-950' : 'bg-zinc-900'
              }`}
            >
              <td className="px-4 py-3 text-zinc-200">{student.name}</td>
              <td className="px-4 py-3 text-zinc-400">{student.moves}</td>
              <td className="px-4 py-3 text-zinc-400">{student.captures}</td>
              <td className="px-4 py-3 text-zinc-400">{student.errors}</td>
              <td className="px-4 py-3 text-zinc-400">{student.winRate}</td>
              <td className="px-4 py-3">
                <Badge variant={statusVariant(student.status)}>
                  {student.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
