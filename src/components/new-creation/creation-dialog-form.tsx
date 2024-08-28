"use client"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "@/components/ui/use-toast"
import { useSession } from "next-auth/react"
import { useRef, useTransition } from "react"
import { Button } from "../ui/button"
import { DialogClose } from "../ui/dialog"
import { PostCreation } from "@/services/creations"
import { CreationForm, CreationFormSchema } from "@/types/creations"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"

const CreationDialogForm = () => {
  const router = useRouter()
  const session = useSession()
  const [isPending, startTransition] = useTransition()
  const form = useForm<CreationForm>({
    resolver: zodResolver(CreationFormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })
  const refClose = useRef<HTMLButtonElement>(null)

  function onSubmit(data: CreationForm) {
    startTransition(async () => {
      if (session.status !== "authenticated") {
        toast({
          title: "Error",
          description: "You must be logged in to create a creation",
          variant: "destructive",
          duration: 2000,
        })
        refClose.current?.click()
        return
      }
      const response = await PostCreation(session.data?.jwt, data)
      if (response.error === true) {
        toast({
          title: `An error has occurred - ${response.status}`,
          description: response.message,
          variant: "destructive",
        })
        return
      }
      toast({
        title: "Created successfully",
        description: "Your creation has been saved.",
        variant: "success",
      })
      form.reset()
      refClose.current?.click()
      const {body} = response
      router.push(`/home/${body.id}`)
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
             <FormControl>
                <Input
                  placeholder=""
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500 font-normal" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
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

export default CreationDialogForm
