import Image from "next/image"

const creations = [
  {
    id: "1",
    title: "Creation 1",
    creatorName: "John Doe",
    creatorImage: "/profile.jpg",
    creationDate: "2022-01-01",
    description: "Description 1",
    image: "/game.jpg",
  },
  {
    id: "2",
    title: "Creation 2",
    creatorName: "John Doe",
    creatorImage: "/profile.jpg",
    creationDate: "2022-01-01",
    description: "Description 2",
    image: "/game.jpg",
  },
]

const CreationsPage = () => {
  return (
    <div className="flex flex-col w-full text-sm pb-4">
      {creations.map((creation) => (
        <div
          key={creation.id}
          className="w-[600px] mx-auto p-4 border-neutral-600 border-x border-b first:border-t"
        >
          <div className="flex gap-x-2 w-full">
            <div className="h-[40px] w-[40px] rounded-full overflow-hidden relative">
              <Image
                alt={creation.creatorName}
                src={creation.creatorImage}
                layout="fill"
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="space-y-2">
                <div className="space-y-1">
                  <div className="flex gap-x-2 items-center">
                    <h1 className="font-semibold">{creation.title}</h1>
                    <span className="text-neutral-400">
                      {creation.creatorName}
                    </span>
                    <span className="text-neutral-400 leading-none h-[20px] align-middle">
                      .
                    </span>
                    <span className="text-neutral-400">
                      {creation.creationDate}
                    </span>
                  </div>
                  <p>{creation.description}</p>
                </div>
                <div className="border rounded-lg overflow-hidden">
                  <Image
                    alt={creation.title}
                    width={600}
                    height={450}
                    src={creation.image}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CreationsPage
