import { useEffect, useState } from "react"

export const useKeyPressed = () => {
  const [keyPressed, setKeyPressed] = useState(new Set())
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeyPressed((prev) => new Set(prev).add(e.key))
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      setKeyPressed((prev) => {
        const updatedKeys = prev
        updatedKeys.delete(e.key)
        return updatedKeys
      })
    }
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])
  return keyPressed
}