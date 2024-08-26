"use client"

import { Button } from "@/components/ui/button"
import { SaveCreationData } from "@/services/creations"
import { HEIGHT, WIDTH } from "@/lib/constants"
import GameOfLifeLogic from "@/logic/game-of-life"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { toast } from "../ui/use-toast"

const GameFrame = ({
  id,
  ownerId,
  url,
}: {
  id: string
  ownerId: string
  url: string
}) => {
  const session = useSession()

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
    setInitialState,
    saveState,
    useSavedState,
  } = GameOfLifeLogic()

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
          <Button
            variant={"info"}
            className="font-normal text-base"
            onClick={handleStartStop}
          >
            {running ? "Stop" : "Start"}
          </Button>
          <Button
            variant={"purple"}
            className="font-normal text-base"
            onClick={nextState}
            disabled={running}
          >
            Next State
          </Button>
          <Button
            variant={"success"}
            className="font-normal text-base"
            onClick={()=>{
              saveState()
              toast({
                title: "State saved",
                description: "The state has been saved",
                variant: "success",
                duration: 1000,
              })
            }}
            disabled={running}
          >
            Set Initial State
          </Button>
          <Button
            variant={"teal"}
            className="font-normal text-base"
            onClick={useSavedState}
            disabled={running}
          >
            Initial State
          </Button>
        </div>
        <div className="flex gap-x-4">
          {session.status === "authenticated" &&
            session.data.user.id == ownerId && (
              <Button
                variant={"successOutline"}
                className="text-base"
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
                    variant: "info",
                    duration: 2000,
                  })
                }}
              >
                Save
              </Button>
            )}
             <Button
            variant={"warningOutline"}
            className="text-base"
            onClick={clearGrid}
          >
            Clear
          </Button>
        </div>
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
