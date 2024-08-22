"use client"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "@/components/ui/use-toast"
import { Button } from "./ui/button"
import { ChatBubbleIcon } from "@radix-ui/react-icons"
import { CreationInList } from "@/types/creations"
import { useCallback, useRef, useTransition } from "react"
import { debounce } from "@/lib/utils"
import { CommentForm, CommentFormSchema } from "@/types/comment"
import { PostComment } from "@/services/comments"
import { useSession } from "next-auth/react"

const AddCommentDialog = ({ creation }: { creation: CreationInList }) => {
  const session = useSession()
  const [isPending, startTransition] = useTransition()
  const form = useForm<CommentForm>({
    resolver: zodResolver(CommentFormSchema),
    defaultValues: {
      opinion: "",
    },
  })

  const refClose = useRef<HTMLButtonElement>(null)

  function onSubmit(data: CommentForm) {
    startTransition(async() => {
        const response = await PostComment(creation.id, data, session.data?.jwt)
        if(response.status === 404) {
          toast({
            title: "Creation not found",
            description: "The creation you are trying to comment on does not exist.",
          })
          return
        }
        else if(response.status === 401) {
          toast({
            title: "Unauthorized",
            description: "You are not authorized to comment on this creation.",
          })
          return
        }
        else if(!response.body) {
          toast({
            title: "Error",
            description: "An error occurred while trying to comment on the creation.",
          })
          return
        }
      toast({
        title: "Added successfully",
        description: "Your comment has been added.",
      })
      form.reset()
      await new Promise(res => {
        setTimeout(() => {
          refClose.current?.click()
          res(null)
        }, 500)
      })
    })
  }

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
        <div className="flex items-center flex-col gap-y-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col flex-1 space-y-6 w-full"
            >
              <FormField
                control={form.control}
                name="opinion"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder=""
                        className="resize-none h-24"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 font-normal" />
                  </FormItem>
                )}
              />
              <div className="flex gap-x-4">
                <DialogClose asChild>
                  <Button
                    ref={refClose}
                    type="button"
                    variant="outline"
                    className="ml-auto border text-red-300 border-red-300 hover:text-red-300"
                    onClick={() => form.reset()}
                  >
                    Close
                  </Button>
                </DialogClose>
                <Button type="submit" variant={"default"} disabled={isPending}>
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddCommentDialog
