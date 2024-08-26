
import GameFrame from "@/components/conway/game-frame"
import getSession from "@/lib/getSession"
import { GetCreationById } from "@/services/creations"
async function PlayPage({params: {id}}: {params: {id: string}}) {
  const session = await getSession()
  const data = await GetCreationById(session?.jwt, id) 
  return (
    <div className="flex w-full flex-1 items-center justify-center">
      <GameFrame id={id} ownerId={data.ownerId}/>
    </div>
  )
}

export default PlayPage
