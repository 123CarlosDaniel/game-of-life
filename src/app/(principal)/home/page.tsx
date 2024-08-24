import { GetCreationsList } from "@/services/creations"
import CreationCard from "@/components/creation/creation-card"
import getSession from "@/lib/getSession"

const CreationsPage = async () => {
  const session = await getSession()
  const { data, pages } = await GetCreationsList(session?.jwt)
  return (
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
  )
}

export default CreationsPage
