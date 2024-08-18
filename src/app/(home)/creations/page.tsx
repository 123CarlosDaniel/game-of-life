import { formatDistanceToNow } from "date-fns"
import CreationCard from "@/components/creation/creation-card"

const creations = [
  {
    id: "1",
    title: "Creation 1",
    creatorName: "John Doe",
    creatorImage: "/profile.jpg",
    creationDate: formatDistanceToNow(new Date("2022-01-01"), {
      addSuffix: true,
    }),
    description: "Description 1",
    image: "/game.jpg",
    comments: "10",
    reactions: "10",
    isReactionActive: false,
  },
  {
    id: "2",
    title: "Creation 2",
    creatorName: "John Doe",
    creatorImage: "/profile.jpg",
    creationDate: formatDistanceToNow(new Date("2022-01-01"), {
      addSuffix: true,
    }),
    description: "Description 2",
    image: "/game.jpg",
    comments: "10",
    reactions: "10",
    isReactionActive: true,
  },
]

const CreationsPage = () => {
  return (
    <div className="flex flex-col w-full text-sm pb-4">
      {creations.map((creation) => (
        <CreationCard key={creation.id} creation={creation}/>
      ))}
    </div>
  )
}

export default CreationsPage
