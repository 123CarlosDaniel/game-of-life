import Image from "next/image"

import { formatDate } from "date-fns"
import CardButtons from "./card-buttons"
import { CreationInList } from "@/types/creations"
import Avatar from "../common/avatar"
import Link from "next/link"
import { Button } from "../ui/button"
import { EyeOpenIcon } from "@radix-ui/react-icons"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

const CardById = ({ creation }: { creation: CreationInList }) => {
  return (
    <div className="space-y-4 text-[15px]">
      <div className="flex gap-x-2 w-full items-center">
        <Avatar altSrc={creation.ownerName} src={creation.ownerImage} />
        <div className="flex flex-1 flex-col text-neutral-400">
          <h1 className="font-semibold text-dark-light tracking-wide">
            {creation.title}
          </h1>
          <span className="tracking-wide">{creation.ownerName}</span>
        </div>
        <Tooltip>
          <TooltipTrigger>
            <Button variant={"warningOutline"} asChild>
              <Link href={`/home/${creation.id}/play`}>
                <EyeOpenIcon className="w-4 h-4" />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-slate-700 opacity-90 text-slate-100">
            <p>Play</p>
          </TooltipContent>
        </Tooltip>
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
