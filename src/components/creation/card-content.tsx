import Image from "next/image"

import { formatDistanceToNow } from "date-fns"
import CardButtons from "./card-buttons"
import { CreationInList } from "@/types/creations"

const CardContent = ({ creation }: { creation: CreationInList }) => {
  return (
    <div className="flex gap-x-2 w-full">
      <div className="h-[40px] w-[40px] rounded-full overflow-hidden relative">
        <Image
          alt={creation.ownerName}
          src={creation.ownerImage}
          className="rounded-full object-cover"
          fill
        />
      </div>
      <div className="flex-1">
        <div className="space-y-2">
          <div className="space-y-1">
            <div className="flex gap-x-2 items-center text-neutral-400">
              <h1 className="font-semibold text-dark-light">
                {creation.title}
              </h1>
              <span>{creation.ownerName}</span>
              <span className="leading-none h-[20px] align-middle">.</span>
              <span>
                {formatDistanceToNow(new Date(creation.createdAt), {
                  addSuffix: true,
                })}
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
          <CardButtons creation={creation} />
        </div>
      </div>
    </div>
  )
}

export default CardContent
