import Image from "next/image"

import { formatDate } from "date-fns"
import CardButtons from "./card-buttons"
import { CreationInList } from "@/types/creations"
import Avatar from "../common/avatar"

const CardById = ({ creation }: { creation: CreationInList }) => {
  return (
    <div className="space-y-4">
      <div className="flex gap-x-2 w-full">
        <Avatar altSrc={creation.ownerName} src={creation.ownerImage} />
        <div className="flex flex-col text-neutral-400">
          <div className="flex gap-x-2 items-center">
            <h1 className="font-semibold text-dark-light first-letter:capitalize">
              {creation.title}
            </h1>
            <span>·</span>
            <span>
              {formatDate(
                new Date(creation.createdAt),
                "MMMM dd, yyyy · hh:mm a"
              )}
            </span>
          </div>
          <span>{creation.ownerName}</span>
        </div>
      </div>
      <p className="text-dark-dark first-letter:capitalize">
        {creation.description}
      </p>
      <div className="border rounded-lg overflow-hidden">
        <Image
          alt={creation.title}
          width={600}
          height={450}
          src={"/game.jpg"}
        />
      </div>
      <CardButtons creation={creation} />
    </div>
  )
}

export default CardById
