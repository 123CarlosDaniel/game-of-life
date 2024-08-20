import { auth } from "@/auth"
import { GetCreationsList } from "@/services/creations"
import CreationCard from "@/components/creation/creation-card"

const CreationsPage = async() => {
  const session = await auth()
  const {data, pages} = await GetCreationsList(session?.jwt)
  return (
    <div className="flex flex-col w-full items-center text-sm pb-4">
      {data.map((creation) => (
        <CreationCard key={creation.id} creation={creation}/>
      ))}
    </div>
  )
}

export default CreationsPage
