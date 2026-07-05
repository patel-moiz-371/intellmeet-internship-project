import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { io, Socket } from 'socket.io-client'
import {
  Mic, MicOff, Video, VideoOff, PhoneOff,
  MessageSquare, Users, X, Send
} from 'lucide-react'

const SOCKET_URL = 'http://localhost:5000'

interface Message {
  id: number
  message: string
  senderName: string
  timestamp: string
}

interface Participant {
  socketId: string
  name: string
  isHost: boolean
}

const MeetingRoom = () => {
  const { meetingCode } = useParams()
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const isHost = (location.state as any)?.isHost || false

  const videoRef = useRef<HTMLVideoElement>(null)
  const socketRef = useRef<Socket | null>(null)
  const videoTrackRef = useRef<MediaStreamTrack | null>(null)
  const audioTrackRef = useRef<MediaStreamTrack | null>(null)

  const [micOn, setMicOn] = useState(true)
  const [cameraOn, setCameraOn] = useState(true)
  const [showChat, setShowChat] = useState(false)
  const [showParticipants, setShowParticipants] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [participants, setParticipants] = useState<Participant[]>([])
  const [cameraAvailable, setCameraAvailable] = useState(false)

  useEffect(() => {
    const initMedia = async () => {
      // Try camera
      try {
        const videoStream = await navigator.mediaDevices.getUserMedia({ video: true })
        videoTrackRef.current = videoStream.getVideoTracks()[0]
        if (videoRef.current) {
          videoRef.current.srcObject = videoStream
        }
        setCameraAvailable(true)
      } catch {
        setCameraAvailable(false)
      }

      // Try mic separately
      try {
        const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true })
        audioTrackRef.current = audioStream.getAudioTracks()[0]
      } catch {
        setMicOn(false)
      }
    }

    initMedia()

    // Connect socket
    socketRef.current = io(SOCKET_URL, { withCredentials: true })
    socketRef.current.emit('join-room', {
      roomId: meetingCode,
      name: user?.name || 'Guest',
      isHost,
    })

    socketRef.current.on('participants-updated', (data: Participant[]) => {
      setParticipants(data)
    })

    socketRef.current.on('receive-message', (msg: Message) => {
      setMessages(prev => [...prev, msg])
    })

    return () => {
      videoTrackRef.current?.stop()
      audioTrackRef.current?.stop()
      socketRef.current?.emit('leave-room', meetingCode)
      socketRef.current?.disconnect()
    }
  }, [meetingCode])

  const toggleMic = () => {
    if (audioTrackRef.current) {
      audioTrackRef.current.enabled = !audioTrackRef.current.enabled
      setMicOn(prev => !prev)
    }
  }

  const toggleCamera = () => {
    if (videoTrackRef.current) {
      videoTrackRef.current.enabled = !videoTrackRef.current.enabled
      setCameraOn(prev => !prev)
    }
  }

  const handleLeave = () => {
    videoTrackRef.current?.stop()
    audioTrackRef.current?.stop()
    socketRef.current?.emit('leave-room', meetingCode)
    socketRef.current?.disconnect()
    navigate('/meetings')
  }

  const sendMessage = () => {
    if (!newMessage.trim()) return
    socketRef.current?.emit('send-message', {
      roomId: meetingCode,
      message: newMessage,
      senderName: user?.name || 'Guest',
    })
    setNewMessage('')
  }

  return (
    <div className="fixed inset-0 bg-gray-950 flex flex-col">

      {/* Header */}
      <div className="h-14 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-white font-bold">IntellMeet</span>
          <span className="text-gray-500">|</span>
          <span className="text-gray-400 text-sm">Room: {meetingCode}</span>
          {isHost && (
            <span className="bg-blue-600/20 text-blue-400 text-xs px-2 py-0.5 rounded-full">
              Host
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-gray-400 text-sm">👤 {user?.name}</span>
          <button
            onClick={handleLeave}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2"
          >
            <PhoneOff size={14} /> Leave
          </button>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex overflow-hidden">

        {/* Video Area */}
        <div className="flex-1 flex flex-col items-center justify-center bg-gray-950 relative p-6">
          <div className="relative w-full max-w-3xl aspect-video bg-gray-900 rounded-2xl overflow-hidden border border-gray-800">
            {cameraAvailable && cameraOn ? (
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover scale-x-[-1]"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {user?.avatar ? (
                <img
                   src={user.avatar}
                  alt="avatar"
                   className="w-24 h-24 rounded-full object-cover border-2 border-blue-500 mb-4"
                   />  
                  ) : (
                   <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl font-bold mb-4">
                    {user?.name?.charAt(0).toUpperCase()}
                 </div>
                  )}
                <p className="text-white mt-1 font-medium">{user?.name}</p>
                <p className="text-gray-500 text-sm mt-1">
                  {!cameraAvailable ? 'Camera unavailable' : 'Camera off'}
                </p>
              </div>
            )}
            <div className="absolute bottom-4 left-4 bg-black/50 text-white text-sm px-3 py-1 rounded-lg">
              {user?.name} {isHost ? '(Host)' : ''}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4 mt-6">

            {/* Mic */}
            <button
              onClick={toggleMic}
              title={micOn ? 'Mute mic' : 'Unmute mic'}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition ${
                micOn
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
            >
              {micOn ? <Mic size={18} /> : <MicOff size={18} />}
            </button>

            {/* Camera */}
            <button
              onClick={toggleCamera}
              title={cameraOn ? 'Turn off camera' : 'Turn on camera'}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition ${
                cameraOn
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
            >
              {cameraOn ? <Video size={18} /> : <VideoOff size={18} />}
            </button>

            {/* Chat */}
            <button
              onClick={() => { setShowChat(!showChat); setShowParticipants(false) }}
              title="Chat"
              className={`w-12 h-12 rounded-full flex items-center justify-center transition ${
                showChat ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-white'
              }`}
            >
              <MessageSquare size={18} />
            </button>

            {/* Participants */}
            <button
              onClick={() => { setShowParticipants(!showParticipants); setShowChat(false) }}
              title="Participants"
              className={`w-12 h-12 rounded-full flex items-center justify-center transition ${
                showParticipants ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-white'
              }`}
            >
              <Users size={18} />
            </button>

            {/* Leave */}
            <button
              onClick={handleLeave}
              title="Leave meeting"
              className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center text-white transition"
            >
              <PhoneOff size={18} />
            </button>
          </div>
        </div>

        {/* Chat Panel */}
        {showChat && (
          <div className="w-80 bg-gray-900 border-l border-gray-800 flex flex-col">
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
              <h3 className="text-white font-semibold">Chat</h3>
              <button onClick={() => setShowChat(false)} className="text-gray-400 hover:text-white">
                <X size={16} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 ? (
                <p className="text-gray-500 text-sm text-center mt-8">No messages yet</p>
              ) : (
                messages.map(msg => (
                  <div key={msg.id} className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-400 text-xs font-semibold">{msg.senderName}</span>
                      <span className="text-gray-600 text-xs">{msg.timestamp}</span>
                    </div>
                    <p className="text-white text-sm bg-gray-800 px-3 py-2 rounded-lg">{msg.message}</p>
                  </div>
                ))
              )}
            </div>
            <div className="p-4 border-t border-gray-800 flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 bg-gray-800 text-white rounded-lg px-3 py-2 text-sm outline-none border border-gray-700 focus:border-blue-500"
              />
              <button
                onClick={sendMessage}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Participants Panel */}
        {showParticipants && (
          <div className="w-80 bg-gray-900 border-l border-gray-800 flex flex-col">
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
              <h3 className="text-white font-semibold">Participants ({participants.length})</h3>
              <button onClick={() => setShowParticipants(false)} className="text-gray-400 hover:text-white">
                <X size={16} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {participants.length === 0 ? (
                <p className="text-gray-500 text-sm text-center mt-8">No participants yet</p>
              ) : (
                participants.map(p => (
                  <div key={p.socketId} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                      {p.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{p.name}</p>
                      {p.isHost && (
                        <span className="text-blue-400 text-xs">Host</span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MeetingRoom