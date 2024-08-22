"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { ChatBubbleIcon } from "@radix-ui/react-icons"
import { CreationInList } from "@/types/creations"
import CommentDialogForm from "./comment-dialog-form"

const CommentAddDialog = ({ creation }: { creation: CreationInList }) => {
  return (
    <Dialog>
      <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
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
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle className="text-sm font-normal">
            Reply to <span className="text-gray-400">{creation.ownerName}</span>
          </DialogTitle>
          <DialogDescription>
            Write a comment about this creation.
          </DialogDescription>
        </DialogHeader>
        <CommentDialogForm creationId={creation.id} />
      </DialogContent>
    </Dialog>
  )
}

export default CommentAddDialog
