"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
  comment: z.string().min(1, {
    message: "Comment must not be empty.",
  }).max(200, {
    message: "Comment must not be longer than 200 characters.",
  }),
})

export function CreationAddCommentForm({
  creationOwner,
}: {
  creationOwner: string
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
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
          name="comment"
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
        <Button type="submit" className="ml-auto" variant={"outline"}>
          Submit
        </Button>
      </form>
    </Form>
  )
}
