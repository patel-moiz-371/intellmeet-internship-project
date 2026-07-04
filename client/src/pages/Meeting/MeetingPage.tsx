import { useState, useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import MeetingCard from '@/components/meeting/MeetingCard'

const API_BASE = 'http://localhost:5000/api/meetings'

interface Meeting {
  _id: string
  title: string
  host: { name: string; email: string }
  scheduledAt: string
  status: 'scheduled' | 'active' | 'ended'
  meetingCode: string
  participants: { _id: string }[]
}

const MeetingPage = () => {
  const { token, user } = useAuthStore()
  const [meetings, setMeetings] = useState<Meeting[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [title, setTitle] = useState('')
  const [scheduledAt, setScheduledAt] = useState('')
  const [creating, setCreating] = useState(false)

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }

  const fetchMeetings = async () => {
    setLoading(true)
    try {
      const res = await fetch(API_BASE, { headers })
      const data = await res.json()
      if (data.success && Array.isArray(data.data)) {
        setMeetings(data.data)
      }
    } catch {
      setError('Failed to load meetings')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMeetings()
  }, [])

  const handleCreate = async () => {
    if (!title || !scheduledAt) return
    setCreating(true)
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers,
        body: JSON.stringify({ title, scheduledAt }),
      })
      const data = await res.json()
      if (data.success) {
        setShowModal(false)
        setTitle('')
        setScheduledAt('')
        fetchMeetings()
      }
    } catch {
      setError('Failed to create meeting')
    } finally {
      setCreating(false)
    }
  }

  const handleJoin = async (meetingId: string) => {
    try {
      const res = await fetch(`${API_BASE}/${meetingId}/join`, {
        method: 'PATCH',
        headers,
      })
      const data = await res.json()
      if (data.success) {
        alert(`Joined meeting! Code: ${data.data.meetingCode}`)
        fetchMeetings()
      }
    } catch {
      setError('Failed to join meeting')
    }
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Meetings</h1>
          <p className="text-gray-400 mt-2">Manage and join your meetings</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium transition"
        >
          + Create Meeting
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Meetings List */}
      {loading ? (
        <div className="flex items-center justify-center h-48">
          <p className="text-gray-400">Loading meetings...</p>
        </div>
      ) : meetings.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48">
          <p className="text-gray-400 text-lg">No meetings yet</p>
          <p className="text-gray-500 text-sm mt-1">Create one to get started</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {meetings.map((meeting) => (
            <MeetingCard
              key={meeting._id}
              title={meeting.title}
              host={meeting.host?.name || 'Unknown'}
              date={new Date(meeting.scheduledAt).toLocaleString()}
              status={meeting.status === 'active' ? 'Active' : 'Scheduled'}
              onJoin={() => handleJoin(meeting._id)}
            />
          ))}
        </div>
      )}

      {/* Create Meeting Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-8 w-full max-w-md">
            <h2 className="text-xl font-bold text-white mb-6">Create Meeting</h2>
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm">Meeting Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Sprint Planning"
                  className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 mt-1 outline-none border border-gray-700 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm">Scheduled Date & Time</label>
                <input
                  type="datetime-local"
                  value={scheduledAt}
                  onChange={(e) => setScheduledAt(e.target.value)}
                  className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 mt-1 outline-none border border-gray-700 focus:border-blue-500"
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreate}
                  disabled={creating || !title || !scheduledAt}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-3 rounded-lg font-medium transition"
                >
                  {creating ? 'Creating...' : 'Create'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MeetingPage