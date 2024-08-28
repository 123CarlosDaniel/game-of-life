import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <main className="p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-teal-400">🎮 What is the Game of Life?</h1>
      <p className="text-lg mb-4">
        The "Game of Life," created by mathematician John Conway in 1970, is a
        fascinating cellular automaton that explores how simple rules can lead
        to complex patterns. This simulation models a grid of cells, where each
        cell can either be alive or dead. The game progresses in discrete time
        steps, with each cell's state evolving based on its neighbors' states.
      </p>
      <div className="mb-4">
        <Button variant="successOutline" asChild>
          <Link href="/home">See the Game creations</Link>
        </Button>
      </div>
      <h2 className="text-xl font-semibold mb-2 text-teal-400">💡 How It Works</h2>
      <p className="mb-4">
        The grid of cells updates based on the following rules:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>
          <strong>Birth:</strong> A dead cell with exactly three live neighbors
          becomes a live cell.
        </li>
        <li>
          <strong>Survival:</strong> A live cell with two or three live
          neighbors remains alive.
        </li>
        <li>
          <strong>Death:</strong> A live cell with fewer than two live neighbors
          dies of loneliness, and with more than three live neighbors dies of
          overpopulation.
        </li>
      </ul>
      <p className="mb-4">
        These simple rules create a variety of patterns, from still lifes and
        oscillators to more complex structures like gliders and spaceships. The
        Game of Life is a great example of how mathematical rules can produce
        intricate and unpredictable behaviors.
      </p>
      <h2 className="text-xl font-semibold mb-2 text-teal-400">🔍 Explore and Experiment</h2>
      <p>
        With our implementation of the Game of Life, you can experiment with
        different initial configurations and see how the patterns evolve over
        time. Adjust the grid size and zoom level to explore the various
        dynamics and witness the emergence of fascinating structures.
      </p>
    </main>
  )
}
