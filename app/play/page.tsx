'use client'

import { useEffect } from 'react'
import { useGameStore } from '@/store/gameStore'
import Header from '@/components/layout/Header'
import GameLayout from '@/components/layout/GameLayout'

export default function PlayPage() {
  const initGame = useGameStore((s) => s.initGame)

  useEffect(() => {
    initGame()
  }, [initGame])

  return (
    <div className="flex flex-col h-screen bg-zinc-950 overflow-hidden">
      <Header />
      <div className="flex-1 overflow-hidden">
        <GameLayout />
      </div>
    </div>
  )
}
