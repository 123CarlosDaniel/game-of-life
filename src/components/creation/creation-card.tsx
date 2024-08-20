
import { CreationInList } from "@/types/creations"
import CardWrapper from "./card-wrapper"
import CardContent from "./card-content"

const CreationCard = ({ creation, canRedirect }: { creation: CreationInList, canRedirect?: boolean }) => {
  return (
    <CardWrapper creation={creation} canRedirect={canRedirect}>
      <CardContent creation={creation} />
    </CardWrapper>
  )
}

export default CreationCard
