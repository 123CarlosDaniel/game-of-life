import Image from "next/image"

import { formatDate } from "date-fns"
import CardButtons from "./card-buttons"
import { CreationInList } from "@/types/creations"
import Avatar from "../common/avatar"

const CardElement = ({ creation }: { creation: CreationInList }) => {
  return (
    <div className="w-full space-y-4">
      <div className="flex gap-x-2 w-full">
        <Avatar altSrc={creation.ownerName} src={creation.ownerImage} />
        <div className="space-y-4 flex-1">
          <div className="space-y-1">
            <div className="flex gap-x-2 items-center text-neutral-400">
              <h1 className="font-semibold text-dark-light">
                {creation.title}
              </h1>
              <span>{creation.ownerName}</span>
              <span>·</span>
              <span>
                {formatDate(
                  new Date(creation.createdAt),
                  "hh:mm a · MMMM dd, yyyy"
                )}
              </span>
            </div>
            <p className="text-dark-dark">{creation.description}</p>
          </div>
          <div className="border rounded-lg overflow-hidden">
            <Image
              alt={creation.title}
              width={600}
              height={450}
              src={"/game.jpg"}
            />
          </div>
        </div>
      </div>
      <CardButtons creation={creation} />
    </div>
  )
}

export default CardElement
