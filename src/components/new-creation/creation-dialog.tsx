"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Pencil1Icon } from "@radix-ui/react-icons"
import CreationDialogForm from "./creation-dialog-form"

const CreationCreateDialog = () => {
  return (
    <Dialog>
      <DialogTrigger className="w-full px-2">
        <div className="w-full flex items-center">
          <Pencil1Icon className="mr-2 h-4 w-4" />
          <span>Create new creation</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md" >
        <DialogHeader>
          <DialogTitle className="text-sm font-normal">New Creation</DialogTitle>
          <DialogDescription>
            Give information about your creation
          </DialogDescription>
        </DialogHeader>
        <CreationDialogForm />
      </DialogContent>
    </Dialog>
  )
}

export default CreationCreateDialog
