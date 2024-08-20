"use client"

import GameFrame from "@/components/conway/game-logic"
function PlayPage() {
  return (
    <div className="flex w-full flex-1 items-center justify-center">
      <GameFrame />
    </div>
  )
}

export default PlayPage
