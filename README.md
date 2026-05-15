# CodeCheckers: Fog of War

A tactical checkers game played entirely through code commands, designed as a B2B SaaS platform for coding education.

---

## Fog of War Architecture

The central mechanic is visibility masking. The full board state is never directly exposed to the player. Instead:

1. The authoritative game state lives in the Zustand store (server-side simulation on the client).
2. Before any board is rendered, `applyFog()` in `lib/game/fog.ts` produces a `ClientBoard` — an 8x8 grid where each cell is one of three states:
   - `{ state: 'fog' }` — the player cannot see this cell
   - `{ state: 'empty', cellColor }` — visible, no piece
   - `{ state: 'piece', cellColor, piece }` — visible, contains a piece

3. Visibility is computed by `calculateVisibility()`:
   - Each of your pieces reveals a 3x3 square around it (1-cell Chebyshev radius)
   - Kings reveal a 5x5 square (2-cell radius)
   - Enemy pieces are only visible when they fall inside your visible area

4. The bot receives its own fog view (`botView`), though it is not displayed. In a real server implementation, the fog would be applied server-side and never send hidden data to the client.

---

## B2B SaaS Vision

CodeCheckers is designed for coding bootcamps and educational institutions:

- **Students** play against the bot using code commands, learning syntax and logical thinking
- **Instructors** see aggregate metrics via the Dashboard: moves, errors, captures, win rates per student
- **Sessions** track cohort performance over time
- **The fog mechanic** forces students to reason about incomplete information — a core programming skill

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 App Router |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 3 |
| UI Primitives | Radix UI (manual, no CLI) |
| State | Zustand 5 |
| Icons | lucide-react |
| Database | Supabase (PostgreSQL + RLS) |
| Deployment | Vercel |

---

## Local Setup

### Prerequisites

- Node.js 20+
- npm 10+

### Steps

```bash
# 1. Clone the repository
git clone <repo-url>
cd codecheckers

# 2. Install dependencies
npm install

# 3. Copy the example env file
cp .env.local.example .env.local

# 4. Fill in your Supabase credentials in .env.local
# NEXT_PUBLIC_SUPABASE_URL=...
# NEXT_PUBLIC_SUPABASE_ANON_KEY=...

# 5. Run the development server
npm run dev
```

Open http://localhost:3000 in your browser.

---

## Terminal Command Syntax

The game is controlled entirely via terminal commands in the right panel:

```
board.move("A3", "B4")
```

### Notation

- **Columns**: A through H, left to right
- **Rows**: 1 (bottom of board) through 8 (top of board)
- **You play as WHITE**, which starts at rows 1-3 (bottom)
- **Bot plays as BLACK**, which starts at rows 6-8 (top)

### Examples

```
board.move("C3", "D4")   -- move piece at C3 to D4
board.move("E3", "C5")   -- capture move (jumps over an enemy at D4)
```

### Rules

- Pieces move diagonally forward only (men), or in all directions (kings)
- If a capture is available, you must capture (mandatory capture rule)
- Chain captures: after capturing, if you can capture again with the same piece, you must
- A man reaching the opposite back row is promoted to king
- Kings have a larger fog radius (2 cells vs 1 cell for men)

---

## Supabase Schema Setup

1. Create a new Supabase project at https://supabase.com
2. Open the SQL editor in your Supabase dashboard
3. Paste and run the contents of `supabase/schema.sql`
4. Copy the project URL and anon key into `.env.local`

---

## Deployment to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Link and deploy
vercel link
vercel --prod
```

Or push to a GitHub repository and import it in the Vercel dashboard. Add the Supabase environment variables in Vercel project settings.

---

## Screenshots

_Screenshots placeholder — add images of the play page and dashboard here._

---

## Project Structure

```
app/                  Next.js App Router pages
components/
  board/              Board, Cell, Piece components
  terminal/           Terminal, log, and input components
  dashboard/          Metrics, student table, session cards
  layout/             Header and GameLayout
  ui/                 Button, Badge, Separator primitives
lib/
  game/               Game engine, fog logic, parser, bot AI, types
  supabase/           Supabase client
store/
  gameStore.ts        Zustand store — full game state + actions
supabase/
  schema.sql          Database schema with RLS policies
```
