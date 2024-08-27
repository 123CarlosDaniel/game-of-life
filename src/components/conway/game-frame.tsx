"use client"

import { Button } from "@/components/ui/button"
import { SaveCreationData } from "@/services/creations"
import { HEIGHT, WIDTH } from "@/lib/constants"
import GameOfLifeLogic from "@/logic/game-of-life"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { toast } from "../ui/use-toast"
import Link from "next/link"
import {
  ArrowLeftIcon,
  CameraIcon,
  ResetIcon,
  ResumeIcon,
  StopIcon,
  TrackNextIcon,
} from "@radix-ui/react-icons"
import { FaRegSave } from "react-icons/fa"
import { MdClear } from "react-icons/md"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

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
      const response = await fetch(url)
      if (!response.ok) {
        toast({
          title: "Creation not found",
          description: "Please try again",
          variant: "destructive",
        })
      }
      const data = await response.json()
      if(data.data === "[]") return
      const matrix = JSON.parse(data.data) as number[][]
      const newGrid = matrix.map((row) => row.map((value) => value === 1))
      setInitialState(newGrid)
    })()
  }, [])

  return (
    <div className="w-full flex flex-col gap-y-4 justify-center items-center">
      <div className="self-start flex w-fit gap-x-8 px-4 items-center sticky z-30 top-0">
        <Link href={`/home/${id}`}>
          <ArrowLeftIcon className="h-6 w-6" />
        </Link>
        <span className="text-xl font-semibold tracking-wide">Creation</span>
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
      <div className="flex w-full justify-between">
        <div className="flex gap-x-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"info"}
                className="font-normal text-base"
                onClick={handleStartStop}
              >
                {running ? (
                  <StopIcon className="h-4 w-4" />
                ) : (
                  <ResumeIcon className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-slate-700 opacity-90 text-slate-100">
              {running ? "Stop" : "Resume"}
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"purple"}
                className="font-normal text-base"
                onClick={nextState}
                disabled={running}
              >
                <TrackNextIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-slate-700 opacity-90 text-slate-100">
              Next State
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"success"}
                className="font-normal text-base"
                onClick={() => {
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
                <CameraIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-slate-700 opacity-90 text-slate-100">
              Take a snapshot
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"teal"}
                className="font-normal text-base"
                onClick={useSavedState}
                disabled={running}
              >
                <ResetIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-slate-700 opacity-90 text-slate-100">
              Restart from snapshot
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="flex gap-x-4">
          {session.status === "authenticated" &&
            session.data.user.id == ownerId && (
              <Tooltip>
                <TooltipTrigger asChild>
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
                    <FaRegSave className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-slate-700 opacity-90 text-slate-100">
                  Save Creation
                </TooltipContent>
              </Tooltip>
            )}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"warningOutline"}
                className="text-base"
                onClick={clearGrid}
              >
                <MdClear className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-slate-700 opacity-90 text-slate-100">
              Clear
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

export default GameFrame
