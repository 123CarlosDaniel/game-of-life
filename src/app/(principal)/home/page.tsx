import { GetCreationsList } from "@/services/creations"
import CreationCard from "@/components/creation/creation-card"
import getSession from "@/lib/getSession"
import Link from "next/link"
import { ArrowLeftIcon } from "@radix-ui/react-icons"

const CreationsPage = async () => {
  const session = await getSession()
  const { data, pages } = await GetCreationsList(session?.jwt)
  return (
    <>
      {data.length === 0 ? (
        <div className="p-4 space-y-4">
          <div className="flex gap-x-8  items-center sticky z-30 top-0">
            <Link href="/">
              <ArrowLeftIcon className="h-6 w-6" />
            </Link>
            <span className="text-xl font-semibold tracking-wide">Back</span>
          </div>
          <p>No creations</p>
        </div>
      ) : (
        <div className="flex flex-col w-fit mx-auto items-center text-sm border-neutral-600 border-x border-t">
          {data.map((creation) => (
            <CreationCard
              key={creation.id}
              creation={creation}
              canRedirect
              className={{
                wrapper: "p-4",
              }}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default CreationsPage
