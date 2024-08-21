"use client"
import { cn } from "@/lib/utils"
import { CreationInList } from "@/types/creations"
import { useRouter } from "next/navigation"

function CardWrapper({
  children,
  creation,
  canRedirect,
  className,
}: {
  children: React.ReactNode
  creation: CreationInList
  canRedirect?: boolean
  className?: string
}) {
  const router = useRouter()
  return (
    <div
      key={creation.id}
      className={cn(
        "max-w-[700px] min-w-[600px] mx-auto border-neutral-600 border-b",
        className ? className : "",
        canRedirect ? "cursor-pointer" : ""
      )}
      onClick={() => {
        if (canRedirect) {
          router.push(`/creations/${creation.id}`)
        }
      }}
    >
      {children}
    </div>
  )
}

export default CardWrapper
