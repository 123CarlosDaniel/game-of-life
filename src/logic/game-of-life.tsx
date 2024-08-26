"use client"

import { MouseEvent, MouseEventHandler, useEffect, useRef, useState } from "react"
import { HEIGHT, WIDTH, cellSize, cols, offsetX, offsetY, rows } from "@/lib/constants"
import { useKeyPressed } from "@/hooks/useKeyPressed"
import { nextGrid, obtainCoordinates } from "./utils"

const GameOfLifeLogic = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const intervalRef = useRef<NodeJS.Timeout>()
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
  const [scale, setScale] = useState(1)
  const [scaleOffset, setScaleOffset] = useState({ x: 0, y: 0 })
  const [panOffset, setPanOffset] = useState({ x: offsetX, y: offsetY })
  const keyPressed = useKeyPressed()

  const [grid, setGrid] = useState<boolean[][]>(
    Array.from({ length: rows }, () => Array(cols).fill(false))
  )
  const [running, setRunning] = useState(false)
  const [action, setAction] = useState<"none" | "panning" | "toggling">("none")
  const [startPanMousePosition, setStartMousePosition] = useState({
    x: 0,
    y: 0,
  })
  const [toggleState, setToggleState] = useState(false)

  useEffect(() => {
    if (!context) return
    context.clearRect(0, 0, WIDTH, HEIGHT)
    context.strokeStyle = "#fffbf3"
    context.lineWidth = 0.2
    const scaleWidth = WIDTH * scale
    const scaleHeight = HEIGHT * scale
    const scaleOffsetX = (scaleWidth - WIDTH) / 2
    const scaleOffsetY = (scaleHeight - HEIGHT) / 2
    setScaleOffset({ x: scaleOffsetX, y: scaleOffsetY })
    context.save()
    context.translate(
      panOffset.x * scale - scaleOffsetX,
      panOffset.y * scale - scaleOffsetY
    )
    context.scale(scale, scale)
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * cellSize
        const y = r * cellSize
        if (grid[r][c]) {
          context.fillStyle = "#fffbf3"
          context.fillRect(x, y, cellSize, cellSize)
        }
        context.strokeRect(x, y, cellSize, cellSize)
      }
    }
    context.restore()
  }, [context, grid, panOffset, scale])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return
    canvas.addEventListener("contextmenu", (event) => {
      event.preventDefault()
    })
    setContext(ctx)
    clearInterval(intervalRef.current)
  }, []) 

  const onZoom = (delta: number) => {
    setScale((prev) => Math.min(Math.max(prev + delta, 0.3), 4))
  }

  const handleStartStop = () => {
    if (running) {
      setRunning(false)
    } else {
      setRunning(true)
    }
  }

  const getMouseCoordinates = (
    e: MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>
  ) => {
    const clientX = (e.clientX - panOffset.x * scale + scaleOffset.x) / scale
    const clientY = (e.clientY - panOffset.y * scale + scaleOffset.y) / scale
    return { clientX, clientY }
  }

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        nextState()
      }, 100)
    }
    return () => {
      clearInterval(intervalRef.current)
    }
  }, [grid, running])

  useEffect(() => {
    const panOrZoomFunction = (e: WheelEvent) => {
      if (e.ctrlKey) e.preventDefault()
      if (keyPressed.has("Control")) {
        onZoom(e.deltaY * -0.001) // positive = increase zoom
      }
      // pan inverso
      else
        setPanOffset((prev) => ({
          x: prev.x - e.deltaX,
          y: prev.y - e.deltaY,
        }))
    }
    document.addEventListener("wheel", panOrZoomFunction, { passive: false })
    return () => {
      document.removeEventListener("wheel", panOrZoomFunction)
    }
  }, [keyPressed])

  const mouseDownHandler: MouseEventHandler<HTMLCanvasElement> = (e) => {
    const { clientX, clientY } = getMouseCoordinates(e)
    if (e.button == 1) {
      setAction("panning")
      setStartMousePosition({ x: clientX, y: clientY })
      return
    } else if (e.button == 0) {
      setAction("toggling")
      setToggleState(true)
    } else if (e.button == 2) {
      setAction("toggling")
      setToggleState(false)
    }
  }

  const mouseMoveHandler: MouseEventHandler<HTMLCanvasElement> = (e) => {
    if (action == "panning") {
      const { clientX, clientY } = getMouseCoordinates(e)
      const deltaX = clientX - startPanMousePosition.x // deltaX positivo se desplaza hacia +X
      const deltaY = clientY - startPanMousePosition.y
      setPanOffset((prev) => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY,
      }))
      e.currentTarget.style.cursor = "grabbing"
    }
    if (action == "toggling") {
      toggleCellState(e, toggleState)
    }
  }

  const mouseUpHandler: MouseEventHandler<HTMLCanvasElement> = (e) => {
    e.currentTarget.style.cursor = "default"
    setAction("none")
  }

  const getClientInCanvasRectPosition = (
    e: MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>
  ) => {
    let { clientX, clientY } = getMouseCoordinates(e)
    const rect = canvasRef.current?.getBoundingClientRect()
    clientX = clientX - rect?.left! / scale
    clientY = clientY - rect?.top! / scale
    return { clientX, clientY }
  }

  const toggleCellState = (
    e: MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>,
    state: boolean
  ) => {
    const { clientX, clientY } = getClientInCanvasRectPosition(e)
    const [r, c] = obtainCoordinates(clientX, clientY)
    if (state == grid[r][c]) return
    setGrid((prev) => {
      const newGrid = [...prev]
      newGrid[r] = [...newGrid[r]]
      newGrid[r][c] = state
      return newGrid
    })
  }

  const handleClick: MouseEventHandler<HTMLCanvasElement> = (e) => {
    const { clientX, clientY } = getClientInCanvasRectPosition(e)
    const [r, c] = obtainCoordinates(clientX, clientY)
    setGrid((prev) => {
      const newGrid = [...prev]
      newGrid[r] = [...newGrid[r]]
      newGrid[r][c] = !grid[r][c]
      return newGrid
    })
  }

  const clearGrid = () => {
    setGrid(Array.from({ length: rows }, () => Array(cols).fill(0)))
  }

  const nextState = () => {
    const next = nextGrid(grid)
    setGrid(next)
  }
  
  return {
    canvasRef,
    running,
    clearGrid,
    nextState,
    handleStartStop,
    handleClick,
    mouseDownHandler,
    mouseMoveHandler,
    mouseUpHandler,
    grid
  }
}

export default GameOfLifeLogic