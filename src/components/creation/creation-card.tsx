import { CreationInList } from "@/types/creations"
import CardWrapper from "./card-wrapper"
import CardContent from "./card-content"

const CreationCard = ({
  creation,
  canRedirect,
  className,
}: {
  creation: CreationInList
  canRedirect?: boolean
  className?: {
    wrapper?: string
  }
}) => {
  return (
    <CardWrapper creation={creation} className={className?.wrapper} canRedirect={canRedirect}>
      <CardContent creation={creation} />
    </CardWrapper>
  )
}

export default CreationCard
