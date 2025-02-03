import InterviewScheduleUI from '@/components/InterviewScheduleUI'
import LoaderUI from '@/components/ui/LoaderUI'
import { useUserRole } from '@/hooks/useUserRole'
import { useRouter } from 'next/navigation'
import React from 'react'

function Schedule() {
  const router = useRouter()
  const { isInterviewer,isLoading } = useUserRole()

  if (isLoading) return <LoaderUI />
  if (!isInterviewer) router.push('/')

  return (
    <div>
      <InterviewScheduleUI />
    </div>
  )
}

export default Schedule