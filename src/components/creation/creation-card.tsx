import { CreationInList } from "@/types/creations"
import CardWrapper from "./card-wrapper"
import CardElement from "./card-element"
import CardById from "./card-by-id"

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
    <CardWrapper
      creation={creation}
      className={className?.wrapper}
      canRedirect={canRedirect}
    >
      {canRedirect ? (
        <CardElement creation={creation} />
      ) : (
        <CardById creation={creation} />
      )}
    </CardWrapper>
  )
}

export default CreationCard
