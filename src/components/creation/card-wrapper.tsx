"use client"
import { cn } from "@/lib/utils"
import { CreationInList } from "@/types/creations"
import { useRouter } from "next/navigation"

function CardWrapper({
  children,
  creation,
  canRedirect,
}: {
  children: React.ReactNode
  creation: CreationInList
  canRedirect?: boolean
}) {
  const router = useRouter()
  return (
    <div
      key={creation.id}
      className={cn(
        "max-w-[600px] mx-auto p-4 border-neutral-600 border-b first:border-t",
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
