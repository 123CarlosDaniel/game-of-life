import { cellSize, cols, rows } from "@/lib/constants"

export const obtainCoordinates = (x: number, y: number) => {
  const r = Math.floor(y / cellSize)
  const c = Math.floor(x / cellSize)
  return [r, c]
}

export const finalState = (r: number, c: number, grid: boolean[][]) => {
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

export const nextGrid = (grid: boolean[][]) => {
  const newGrid = Array.from(grid, (row) => Array.from(row))
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const result = finalState(r, c, grid)
      newGrid[r][c] = result
    }
  }
  return newGrid
}