"use client"

import {
  Dialog,
  DialogClose,
  DialogContent,
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
import { useRef } from "react"

const FormSchema = z.object({
  comment: z
    .string()
    .min(1, {
      message: "Comment must not be empty.",
    })
    .max(200, {
      message: "Comment must not be longer than 200 characters.",
    }),
})

const AddCommentDialog = ({ creation }: { creation: CreationInList }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      comment: "",
    }
  })

  const refClose = useRef<HTMLButtonElement>(null)

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
    form.reset()
    refClose.current?.click()
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
        </DialogHeader>
        <div className="flex items-center flex-col gap-y-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col flex-1 space-y-6 w-full"
            >
              <FormField
                control={form.control}
                name="comment"
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
                <Button type="submit" variant={"default"}>
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
