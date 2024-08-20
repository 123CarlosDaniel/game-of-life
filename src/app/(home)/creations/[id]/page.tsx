import { auth } from "@/auth"
import CreationCard from "@/components/creation/creation-card"
import { GetCreationById } from "@/services/creations"

const CreationPage = async({ params }: { params: { id: string }}) => {
  const session = await auth()
  const data = await GetCreationById(session?.jwt, params.id)

  return (
    <div className="flex w-full flex-1 items-center justify-center">
      <CreationCard creation={data}/>
    </div>
  )
}

export default CreationPage