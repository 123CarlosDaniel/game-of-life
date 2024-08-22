"use client"

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
import { toast } from "@/components/ui/use-toast"
import { debounce } from "@/lib/utils"
import { CommentForm, CommentFormSchema } from "@/types/comment"
import { PostComment } from "@/services/comments"
import { useSession } from "next-auth/react"
import { useCallback, useRef, useTransition } from "react"
import { Button } from "../ui/button"
import { DialogClose } from "../ui/dialog"

const CommentDialogForm = ({ creationId }: { creationId: string }) => {
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
    startTransition(async () => {
      const response = await PostComment(creationId, data, session.data?.jwt)
      if (response.status === 404) {
        toast({
          title: "Creation not found",
          description:
            "The creation you are trying to comment on does not exist.",
        })
        return
      } else if (response.status === 401) {
        toast({
          title: "Unauthorized",
          description: "You are not authorized to comment on this creation.",
        })
        return
      } else if (!response.body) {
        toast({
          title: "Error",
          description:
            "An error occurred while trying to comment on the creation.",
        })
        return
      }
      toast({
        title: "Added successfully",
        description: "Your comment has been added.",
      })
      form.reset()
      await new Promise((res) => {
        setTimeout(() => {
          refClose.current?.click()
          res(null)
        }, 500)
      })
    })
  }
  return (
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
  )
}

export default CommentDialogForm
