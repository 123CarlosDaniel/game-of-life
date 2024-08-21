import Image from "next/image"

const Avatar = ({ altSrc, src }: { altSrc: string; src: string }) => {
  return (
    <div className="h-[40px] w-[40px] rounded-full overflow-hidden relative">
    <Image
      alt={altSrc}
      src={src}
      className="rounded-full object-cover"
      fill
    />
  </div>
  )
}

export default Avatar