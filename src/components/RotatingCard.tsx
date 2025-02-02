import { CallRecording } from '@stream-io/video-react-sdk'
import React from 'react'
import toast from 'react-hot-toast'

function RotatingCard( {recording}: { recording: CallRecording }) {
  const handleText = async() => {
    try {
      await navigator.clipboard.writeText(recording.url)
      toast.success('URL copied to clipboard')
    } catch (error) {
      toast.error('Failed to copy URL')
    }
  }
  return (
    <div>RotatingCard</div>
  )
}

export default RotatingCard