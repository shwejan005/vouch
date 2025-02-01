'use client'
import MeetingRoom from '@/components/MeetingRoom'
import MeetingSetup from '@/components/MeetingSetup'
import LoaderUI from '@/components/ui/LoaderUI'
import useGetCallById from '@/hooks/useGetCallById'
import { useUser } from '@clerk/nextjs'
import { StreamCall } from '@stream-io/video-react-sdk'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'

function Meetings() {
  const { id } = useParams()
  const { isLoaded } = useUser()
  const [isSetupComplete, setIsSetupComplete] = useState(false)
  const { call, isCallLoading } = useGetCallById()
  if (!isLoaded || isCallLoading ) return <LoaderUI />

  return (
    <StreamCall call = {call}>
      { !isSetupComplete ? (
        <MeetingSetup onSetupComplete={() => setIsSetupComplete(true)} />
      )
      : (
        <MeetingRoom />
      )}
    </StreamCall>
  )
}

export default Meetings