'use client'

import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"

const EndCallButton = () => {
  const router = useRouter()
  //callinfo
  const call = useCall()
  //participant info
  const { useLocalParticipant } = useCallStateHooks()
  const localParticipant = useLocalParticipant()
  //check meeting owner
  const isMeetingOwner = localParticipant && call?.state.createdBy && localParticipant.userId === call?.state.createdBy.id

  if (!isMeetingOwner) return null
  return (
    <Button
      className="bg-red-500"
      onClick={async () => {
        await call.endCall()
        router.push('/')
      }}
    >
      End call for everyone
    </Button>
  )
}

export default EndCallButton