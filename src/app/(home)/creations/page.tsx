import { auth } from "@/auth"
import { GetCreationsList } from "@/services/creations"
import CreationCard from "@/components/creation/creation-card"

const CreationsPage = async() => {
  const session = await auth()
  const {data, pages} = await GetCreationsList(session?.jwt)
  return (
    <div className="flex flex-col w-fit mx-auto items-center text-sm pb-4 border-neutral-600 border-x">
      {data.map((creation) => (
        <CreationCard key={creation.id} creation={creation} canRedirect/>
      ))}
    </div>
  )
}

export default CreationsPage
