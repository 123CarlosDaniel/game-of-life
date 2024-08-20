
import { CreationInList } from "@/types/creations"
import CardWrapper from "./card-wrapper"
import CardContent from "./card-content"

const CreationCard = ({ creation }: { creation: CreationInList }) => {
  return (
    <CardWrapper creation={creation}>
      <CardContent creation={creation} />
    </CardWrapper>
  )
}

export default CreationCard
