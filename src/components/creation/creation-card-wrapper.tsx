import { CreationInList } from "@/types/creations"
import Link from "next/link"
import React from "react"
import CreationCard from "./creation-card"

function CreationCardWrapper({
  creation,
  asLink,
}: {
  creation: CreationInList
  asLink?: boolean
}) {
  return (
    <>
      {asLink ? (
        <Link href={`/creations/${creation.id}`}>
          <CreationCard creation={creation} />
        </Link>
      ) : (
        <CreationCard creation={creation} />
      )}
    </>
  )
}

export default CreationCardWrapper
