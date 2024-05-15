import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

interface HomeCardProps {
  color: string,
  img: string,
  title: string,
  description: string,
  handleClick: () => void
}

const HomeCard = ({ color, img, title, description, handleClick }: HomeCardProps) => {
  return (
    <div
      className={cn('bg-orange-1 flex flex-col justify-between w-full px-4 py-6 xl:max-[270px] min-h-[260px] rounded-[14px] cursor-pointer', color)}
      onClick={handleClick}
    >
      {/* box content */}
      <div className="flex-center glassmorphism size-12 rounded-[10px]">
        <Image src={img} alt="meeting" width={27} height={27} />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">
          {title}
        </h1>
        <p className="text-lg font-normal">
          {description}
        </p>
      </div>
    </div>
  )
}

export default HomeCard