"use client"

import { HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useCallback, useState } from "react"
import { CreationInList } from "@/types/creations"
import CommentAddDialog from "@/components/comment/comment-add-dialog"
import { debounce } from "@/lib/utils"
import { addReaction, deleteReaction } from "@/services/reactions"
import { useSession } from "next-auth/react"
import { toast } from "../ui/use-toast"

const CardButtons = ({
  creation: creationData,
}: {
  creation: CreationInList
}) => {
  const session = useSession()
  const [creation, setCreation] = useState(creationData)
  const [isReactionActive, setIsReactionActive] = useState(
    creation.isReactionActive
  )
  // % TODO obtain number of reactions from api
  // % TODO obtain number of comments from api
  const debounceHandleClick = useCallback(
    debounce(
      async (active: boolean, jwt: string | undefined) => {
        if(jwt === undefined) {
          return
        }
        let response
        if(active) {
          response = await addReaction(jwt, creation.id)
        }
        else {
          response = await deleteReaction(jwt, creation.id)
        }  
        if(response.status === 409) {
          return
        }
        toast({
          title: `Status - ${response.status === 200 ? "Success" : "Error"}`,
          description: `${response.message}`,
        })
      },
      500
    ),
    []
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
              debounceHandleClick(!isReactionActive, session.data?.jwt)
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
      <CommentAddDialog creation={creation} />
    </div>
  )
}

export default CardButtons
