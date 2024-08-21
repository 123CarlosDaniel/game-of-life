import { cn } from "@/lib/utils";
import Image from "next/image"

const Avatar = ({ altSrc, src, className }: { altSrc: string; src: string, className?: string }) => {
  return (
    <div className={cn("h-[40px] w-[40px] rounded-full overflow-hidden relative z-0", className || "")}>
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
