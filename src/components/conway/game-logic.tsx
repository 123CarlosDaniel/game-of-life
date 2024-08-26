"use client"

import {
  MouseEvent,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react"
import { Button } from "@/components/ui/button"
import { useKeyPressed } from "@/hooks/useKeyPressed"

const GameFrame = () => {
  const WIDTH = 800
  const HEIGHT = 450
  const cellSize = 20
  const rows = 200
  const cols = 200
  const offsetX = -((cols * cellSize) / 2 - WIDTH / 2)
  const offsetY = -((rows * cellSize) / 2 - HEIGHT / 2)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const intervalRef = useRef<NodeJS.Timeout>()
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
  const [action, setAction] = useState<"none" | "panning" | "toggling">("none")
  const [startPanMousePosition, setStartMousePosition] = useState({
    x: 0,
    y: 0,
  })
  const [panOffset, setPanOffset] = useState({ x: offsetX, y: offsetY })
  const [scale, setScale] = useState(1)
  const [scaleOffset, setScaleOffset] = useState({ x: 0, y: 0 })
  const [toggleState, setToggleState] = useState(false)

  const keyPressed = useKeyPressed()

  const [grid, setGrid] = useState<boolean[][]>(
    Array.from({ length: rows }, () => Array(cols).fill(false))
  )
  const [running, setRunning] = useState(false)

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

  const finalState = (r: number, c: number) => {
    let counterAlive = 0
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if (i == j && i == 0) continue
        const row = r + i
        const col = c + j
        if (row < 0 || row >= rows || col < 0 || col >= cols) continue
        if (grid[row][col]) counterAlive++
      }
    }
    const state = grid[r][c]
    // supervivencia
    if (state && (counterAlive == 2 || counterAlive == 3)) return true
    // muerte soledad
    if (state && counterAlive < 2) return false
    // muerte por sobrepoblacion
    if (state && counterAlive > 3) return false
    // reproduccion
    if (!state && counterAlive == 3) return true
    return false
  }

  const nextGrid = (grid: boolean[][]) => {
    const newGrid = Array.from(grid, (row) => Array.from(row))
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const result = finalState(r, c)
        newGrid[r][c] = result
      }
    }
    setGrid(newGrid)
  }

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        nextGrid(grid)
      }, 100)
    }
    return () => {
      clearInterval(intervalRef.current)
    }
  }, [grid, running])

  const onZoom = (delta: number) => {
    setScale((prev) => Math.min(Math.max(prev + delta, 0.3), 4))
  }

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

  const handleStartStop = () => {
    if (running) {
      setRunning(false)
    } else {
      setRunning(true)
    }
  }

  const obtainCoordinates = (x: number, y: number) => {
    const r = Math.floor(y / cellSize)
    const c = Math.floor(x / cellSize)
    return [r, c]
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

  const getClientInCanvasRectPosition = (
    e: MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>
  ) => {
    let { clientX, clientY } = getMouseCoordinates(e)
    const rect = canvasRef.current?.getBoundingClientRect()
    clientX = clientX - rect?.left! / scale
    clientY = clientY - rect?.top! / scale
    return { clientX, clientY }
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

  const getMouseCoordinates = (
    e: MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>
  ) => {
    const clientX = (e.clientX - panOffset.x * scale + scaleOffset.x) / scale
    const clientY = (e.clientY - panOffset.y * scale + scaleOffset.y) / scale
    return { clientX, clientY }
  }

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

  return (
    <div className="w-full flex flex-col gap-y-8 justify-center items-center">
      <div className="flex w-full justify-between">
        <div className="flex gap-x-4">
          <Button variant={"outline"} onClick={handleStartStop}>
            {running ? "Stop" : "Start"}
          </Button>
          <Button
            variant={"secondary"}
            onClick={() => nextGrid(grid)}
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
              console.log({ grid })
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
