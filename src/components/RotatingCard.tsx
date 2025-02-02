import { calculateRecordingDuration } from '@/lib/utils'
import { CallRecording } from '@stream-io/video-react-sdk'
import { format } from 'date-fns'
import React from 'react'
import toast from 'react-hot-toast'

function RotatingCard( {recording}: { recording: CallRecording }) {

  const handleCopyLink = async() => {
    try {
      await navigator.clipboard.writeText(recording.url)
      toast.success('URL copied to clipboard')
    } catch (error) {
      toast.error('Failed to copy URL')
    }
  }

  const formattedStartTime = recording.start_time
    ? format(new Date(recording.start_time), "MMM d, yyyy, hh:mm a")
    : "Unknown";

  const duration =
    recording.start_time && recording.end_time
      ? calculateRecordingDuration(recording.start_time, recording.end_time)
      : "Unknown duration";

  return (
    <div>RotatingCard</div>
  )
}

export default RotatingCard