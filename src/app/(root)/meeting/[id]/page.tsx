'use client'
import LoaderUI from '@/components/ui/LoaderUI'
import { useUser } from '@clerk/nextjs'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'

function Meetings() {
  const { id } = useParams()
  const { isLoaded } = useUser()
  const isCallLoading = false
  const [isSetupComplete, setisSetupComplete] = useState(false)

  if (!isLoaded || isCallLoading ) return <LoaderUI />

  return (
    <div>Meetings</div>
  )
}

export default Meetings