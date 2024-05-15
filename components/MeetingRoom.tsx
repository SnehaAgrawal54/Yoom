'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { cn } from '@/lib/utils'
import { CallControls, CallParticipantsList, CallStatsButton, CallingState, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk'
import { LayoutList, User } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import EndCallButton from "./EndCallButton"
import Loader from "./Loader"


type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right'

const MeetingRoom = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isPersonalRoom = !!searchParams.get('personal')
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left')
  const [showParticipants, setShowParticipants] = useState(false)

  const { useCallCallingState } = useCallStateHooks()
  const callingState = useCallCallingState()

  if (callingState !== CallingState.JOINED) return <Loader />

  const CallLayout = () => {
    if (layout === 'grid') {
      return <PaginatedGridLayout />;
    } else if (layout === 'speaker-right') {
      return <SpeakerLayout participantsBarPosition='left' />;
    } else {
      return <SpeakerLayout participantsBarPosition='right' />;
    }
  }

  return (
    <section className='relative h-screen w-full overflow-hidden pt-4 text-white'>
      <div className="relative size-full flex-center">
        {/* participants */}
        <div className="flex items-center size-full max-w-[1000px]">
          <CallLayout />
        </div>
        {/* participants list */}
        <div className={cn('hidden ml-2 h-[calc(100vh-86px)]', { 'show-block': showParticipants })}>
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>

      {/* controls , dropdown */}
      <div className="fixed bottom-0 w-full flex-center flex-wrap gap-5">
        <CallControls onLeave={() => router.push('/')} />

        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className='cursor-pointer rounded-2xl px-4 py-2 bg-[#19232d] hover:bg-[#4c535b] '>
              <LayoutList size={20} className='text-white' />
            </DropdownMenuTrigger>
          </div>

          <DropdownMenuContent className='bg-dark-1 border-dark-1 text-white'>
            {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, idx) => (
              <div key={idx}>
                <DropdownMenuItem
                  className='cursor-pointer'
                  onClick={() => { setLayout(item.toLowerCase() as CallLayoutType) }}
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className='border-dark-1' />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <CallStatsButton />
        <button onClick={() => setShowParticipants((prev) => !prev)} >
          <div className="cursor-pointer rounded-2xl px-4 py-2 bg-[#19232d] hover:bg-[#4c535b]">
            <User size={20} className='text-white' />
          </div>
        </button>
        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  )
}

export default MeetingRoom