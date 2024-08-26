"use client"

import { Button } from "@/components/ui/button"
import { SaveCreationData } from "@/services/creations"
import { HEIGHT, WIDTH } from "@/lib/constants"
import GameOfLifeLogic from "@/logic/game-of-life"

const GameFrame = () => {
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
  } = GameOfLifeLogic()

  return (
    <div className="w-full flex flex-col gap-y-8 justify-center items-center">
      <div className="flex w-full justify-between">
        <div className="flex gap-x-4">
          <Button variant={"outline"} onClick={handleStartStop}>
            {running ? "Stop" : "Start"}
          </Button>
          <Button
            variant={"secondary"}
            onClick={nextState}
            disabled={running}
          >
            Next State
          </Button>
          <Button variant={"destructive"} onClick={clearGrid}>
            Clear
          </Button>
        </div>
        <div className="flex gap-x-4">
          <Button
            variant={"outline"}
            onClick={() => {
              SaveCreationData()
            }}
          >
            Save
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
