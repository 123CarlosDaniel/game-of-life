"use client"

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
import { CreationInList } from "@/types/creations"

const CardButtons = ({ creation }: { creation: CreationInList }) => {
  const [isReactionActive, setIsReactionActive] = useState(
    creation.isReactionActive
  )
  return (
    <div className="flex justify-around w-full text-neutral-400">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={"ghost"}
            onClick={(e) => {
              e.stopPropagation()
              setIsReactionActive(!isReactionActive)
            }}
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
            onClick={(e) => {
              e.stopPropagation()
            }}
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
  )
}

export default CardButtons
