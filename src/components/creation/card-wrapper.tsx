"use client"
import { CreationInList } from "@/types/creations"
import { useRouter } from "next/navigation"

function CardWrapper({
  children,
  creation,
}: {
  children: React.ReactNode
  creation: CreationInList
}) {
  const router = useRouter()
  return (
    <div
      key={creation.id}
      className="cursor-pointer max-w-[600px] mx-auto p-4 border-neutral-600 border-x border-b first:border-t"
      onClick={() => {
        router.push(`/creations/${creation.id}`)
      }}
    >
      {children}
    </div>
  )
}

export default CardWrapper
