import { useParams, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { useRef } from 'react'

const MeetingRoom = () => {
  const { meetingCode } = useParams()
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const roomUrl = `https://intellmeet.daily.co/intellmeet`

  return (
    <div className="fixed inset-0 bg-gray-950 flex flex-col">
      {/* Header */}
      <div className="h-14 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-white font-semibold">IntellMeet</span>
          <span className="text-gray-500">|</span>
          <span className="text-gray-400 text-sm">Room: {meetingCode}</span>
          <span className="text-gray-500">|</span>
          <span className="text-gray-400 text-sm">👤 {user?.name}</span>
        </div>
        <button
          onClick={() => navigate('/meetings')}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          Leave Meeting
        </button>
      </div>

      <iframe
        ref={iframeRef}
        src={roomUrl}
        allow="camera; microphone; fullscreen; speaker; display-capture"
        className="flex-1 w-full border-0"
      />
    </div>
  )
}

export default MeetingRoom