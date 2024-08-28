"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { useTransition } from "react"
import { useSession } from "next-auth/react"
import { PostComment } from "@/services/comments"
import { CommentFormSchema } from "@/types/comment"
import { useRouter } from "next/navigation"

export function CreationAddCommentForm({
  creationOwner,
  creationId
}: {
  creationOwner: string,
  creationId: string
}) {
  const form = useForm<z.infer<typeof CommentFormSchema>>({
    resolver: zodResolver(CommentFormSchema),
  })
  const session = useSession()
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  function onSubmit(data: z.infer<typeof CommentFormSchema>) {
    startTransition(async () => {
      if(session.status !== "authenticated") {
        toast({
          title: "Error",
          description: "You must be logged in to comment",
          variant: "destructive",
          duration: 2000,
        })
        return
      }
      const response = await PostComment(creationId, data, session.data?.jwt)
      if (response.error === true) {
        toast({
          title: `An error has occurred - ${response.status}`,
          description: response.message,
          duration: 2000,
          variant: "destructive",
        })
        return
      } 
      toast({
        title: "Added successfully",
        description: "Your comment has been added.",
        duration: 2000,
        variant: "success",
      })
      form.reset({
        opinion: "",
      })
      router.refresh()
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col flex-1 space-y-6"
      >
        <FormField
          control={form.control}
          name="opinion"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center mb-4 text-dark-light">
                <span className="font-normal mr-2 text-neutral-400">Replying to</span>{" "}
                <span className="font-normal">{creationOwner}</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder=""
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500 font-normal"/>
            </FormItem>
          )}
        />
        <Button type="submit" className="ml-auto" variant={"outline"} disabled={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  )
}
