import Image from "next/image"

import { formatDate } from "date-fns"
import CardButtons from "./card-buttons"
import { CreationInList } from "@/types/creations"
import Avatar from "../common/avatar"

const CardById = ({ creation }: { creation: CreationInList }) => {
  return (
    <div className="space-y-4 text-[15px]">
      <div className="flex gap-x-2 w-full">
        <Avatar altSrc={creation.ownerName} src={creation.ownerImage} />
        <div className="flex flex-col text-neutral-400">
          <h1 className="font-semibold text-dark-light tracking-wide">
            {creation.title}
          </h1>
          <span className="tracking-wide">{creation.ownerName}</span>
        </div>
      </div>
      <p className="text-dark-dark first-letter:capitalize text-[17px]">
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
      <span className="text-neutral-400 inline-block font-light">
        {formatDate(new Date(creation.createdAt), "hh:mm a · MMM dd, yyyy")}
      </span>
      <CardButtons creation={creation} />
    </div>
  )
}

export default CardById
