"use client"

import Image from "next/image"
import {
  HeartIcon,
  HeartFilledIcon,
  ChatBubbleIcon,
} from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { Creation } from "@/types/creations"

const CreationCard = ({ creation }: { creation: Creation }) => {
  const [isReactionActive, setIsReactionActive] = useState(
    creation.isReactionActive
  )

  return (
    <div
      key={creation.id}
      className="w-[600px] mx-auto p-4 border-neutral-600 border-x border-b first:border-t"
    >
      <div className="flex gap-x-2 w-full">
        <div className="h-[40px] w-[40px] rounded-full overflow-hidden relative">
          <Image
            alt={creation.ownerName}
            src={creation.ownerImage}
            layout="fill"
            className="rounded-full object-cover"
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
            <div className="flex justify-around w-full text-neutral-400 ">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={"ghost"}
                    onClick={() => setIsReactionActive(!isReactionActive)}
                    className={cn(
                      "flex items-center",
                      isReactionActive && "text-pink-600",
                      "hover:text-pink-600"
                    )}
                  >
                    {isReactionActive ? (
                      <HeartFilledIcon className="h-[18px] w-[22px] mr-1" />
                    ) : (
                      <HeartIcon className="h-[18px] w-[22px] mr-1" />
                    )}
                    <span className="text-sm">{creation.reactions}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-slate-700 opacity-90 text-slate-100">
                  <p>Like</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={"ghost"}
                    className="flex items-center hover:text-blue-400"
                  >
                    <ChatBubbleIcon className="h-[18px] w-[18px] mr-1" />{" "}
                    <span className="text-sm">{creation.comments}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-slate-700 opacity-90 text-slate-100">
                  <p>Comment</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreationCard
