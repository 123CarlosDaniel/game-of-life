"use client"

import { Button } from "@/components/ui/button"
import { SaveCreationData } from "@/services/creations"
import { HEIGHT, WIDTH } from "@/lib/constants"
import GameOfLifeLogic from "@/logic/game-of-life"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { toast } from "../ui/use-toast"

const GameFrame = ({ id, ownerId, url }: { id: string; ownerId: string, url: string }) => {
  const session = useSession()
  const [initialState, setInitialState] = useState<boolean[][] | null>(null)

  const {
    canvasRef,
    nextState,
    running,
    clearGrid,
    handleClick,
    handleStartStop,
    mouseDownHandler,
    mouseMoveHandler,
    mouseUpHandler,
    grid,
  } = GameOfLifeLogic(initialState)

  useEffect(() => {
    ;(async () => {
      console.log(url)
      const response = await fetch(url)
      if (!response.ok) {
        toast({
          title: "Creation not found",
          description: "Please try again",
          variant: "destructive",
        })
      }
      const data = await response.json()
      const matrix = JSON.parse(data.data) as number[][]
      const newGrid = matrix.map((row) => row.map((value) => value === 1))
      setInitialState(newGrid)
    })()
  }, [])

  return (
    <div className="w-full flex flex-col gap-y-8 justify-center items-center">
      <div className="flex w-full justify-between">
        <div className="flex gap-x-4">
          <Button variant={"outline"} onClick={handleStartStop}>
            {running ? "Stop" : "Start"}
          </Button>
          <Button variant={"secondary"} onClick={nextState} disabled={running}>
            Next State
          </Button>
          <Button variant={"destructive"} onClick={clearGrid}>
            Clear
          </Button>
        </div>
        {session.status === "authenticated" &&
          session.data.user.id == ownerId && (
            <div className="flex gap-x-4">
              <Button
                variant={"outline"}
                onClick={async () => {
                  const matrix = grid.map((row) =>
                    row.map((value) => (value ? 1 : 0))
                  )
                  const response = await SaveCreationData(
                    session.data.jwt,
                    id,
                    JSON.stringify(matrix)
                  )
                  if (response.error === true) {
                    toast({
                      title: `An error has occurred - ${response.status}`,
                      description: response.message,
                      duration: 2000,
                    })
                    return
                  }
                  toast({
                    title: "Saved successfully",
                    description: "Your creation has been saved.",
                    duration: 2000,
                  })
                }}
              >
                Save
              </Button>
            </div>
          )}
      </div>
      <canvas
        ref={canvasRef}
        width={WIDTH}
        height={HEIGHT}
        onClick={handleClick}
        onMouseDown={mouseDownHandler}
        onMouseMove={mouseMoveHandler}
        onMouseUp={mouseUpHandler}
        style={{ position: "relative" }}
      ></canvas>
    </div>
  )
}

export default GameFrame
