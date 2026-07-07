import { useState, useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useNavigate } from 'react-router-dom'
import { Calendar, Users, Clock, Plus, Trash2, Video, CheckCircle, AlertCircle } from 'lucide-react'

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

const getMeetingDisplayStatus = (meeting: Meeting) => {
  if (meeting.status === 'ended') return 'ended'
  const now = new Date()
  const scheduled = new Date(meeting.scheduledAt)
  const diffMs = scheduled.getTime() - now.getTime()
  const diffMins = diffMs / 60000
  if (diffMins <= 10 && diffMins > 0) return 'starting-soon'
  if (diffMins <= 0) return 'active'
  return 'scheduled'
}

const MeetingPage = () => {
  const { token, user } = useAuthStore()
  const navigate = useNavigate()
  const [meetings, setMeetings] = useState<Meeting[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [title, setTitle] = useState('')
  const [scheduledDate, setScheduledDate] = useState('')
  const [scheduledTime, setScheduledTime] = useState('')
  const [creating, setCreating] = useState(false)
  const [filter, setFilter] = useState<'all' | 'active' | 'scheduled' | 'ended'>('all')
  const [, setTick] = useState(0)

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }

  // Re-render every minute to update status badges
  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 60000)
    return () => clearInterval(interval)
  }, [])

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

  useEffect(() => { fetchMeetings() }, [])

  const handleCreate = async () => {
    if (!title || !scheduledDate || !scheduledTime) return
    setCreating(true)
    try {
      const scheduledAt = new Date(`${scheduledDate}T${scheduledTime}`).toISOString()
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers,
        body: JSON.stringify({ title, scheduledAt }),
      })
      const data = await res.json()
      if (data.success) {
        setShowModal(false)
        setTitle('')
        setScheduledDate('')
        setScheduledTime('')
        fetchMeetings()
      }
    } catch {
      setError('Failed to create meeting')
    } finally {
      setCreating(false)
    }
  }

  const handleDelete = async (meetingId: string) => {
    if (!confirm('Delete this meeting?')) return
    try {
      await fetch(`${API_BASE}/${meetingId}`, { method: 'DELETE', headers })
      fetchMeetings()
    } catch {
      setError('Failed to delete meeting')
    }
  }

  const handleMarkEnded = async (meetingId: string) => {
    try {
      await fetch(`${API_BASE}/${meetingId}/status`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ status: 'ended' }),
      })
      fetchMeetings()
    } catch {
      setError('Failed to update meeting status')
    }
  }

  const handleJoin = (meetingId: string, meetingCode: string, meetingTitle: string, hostEmail: string) => {
    const isHost = user?.email === hostEmail
    navigate(`/pre-join/${meetingCode}`, { state: { meetingTitle, isHost } })
  }

  const filteredMeetings = meetings.filter(m => {
    const displayStatus = getMeetingDisplayStatus(m)
    if (filter === 'active') return displayStatus === 'active' || displayStatus === 'starting-soon'
    if (filter === 'scheduled') return displayStatus === 'scheduled'
    if (filter === 'ended') return displayStatus === 'ended'
    return true
  })

  const totalMeetings = meetings.length
  const activeMeetings = meetings.filter(m => getMeetingDisplayStatus(m) === 'active').length
  const scheduledMeetings = meetings.filter(m => getMeetingDisplayStatus(m) === 'scheduled').length

  const statusConfig = {
    'active': { label: 'Active', class: 'bg-green-500/10 text-green-400' },
    'starting-soon': { label: 'Starting Soon', class: 'bg-blue-500/10 text-blue-400 animate-pulse' },
    'scheduled': { label: 'Scheduled', class: 'bg-amber-500/10 text-amber-400' },
    'ended': { label: 'Ended', class: 'bg-gray-500/10 text-gray-400' },
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Meetings</h1>
          <p className="text-gray-400 mt-1 text-sm">Create and manage your meetings</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition"
        >
          <Plus size={16} /> Create Meeting
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-[#0d1526] border border-white/[0.07] rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Video size={16} className="text-blue-400" />
            </div>
            <span className="text-gray-400 text-sm">Total Meetings</span>
          </div>
          <p className="text-3xl font-semibold text-white">{totalMeetings}</p>
        </div>
        <div className="bg-[#0d1526] border border-white/[0.07] rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-green-500/10 flex items-center justify-center">
              <Users size={16} className="text-green-400" />
            </div>
            <span className="text-gray-400 text-sm">Active Now</span>
          </div>
          <p className="text-3xl font-semibold text-white">{activeMeetings}</p>
        </div>
        <div className="bg-[#0d1526] border border-white/[0.07] rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <Clock size={16} className="text-amber-400" />
            </div>
            <span className="text-gray-400 text-sm">Scheduled</span>
          </div>
          <p className="text-3xl font-semibold text-white">{scheduledMeetings}</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 bg-white/5 p-1 rounded-xl w-fit mb-6">
        {(['all', 'active', 'scheduled', 'ended'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-xs font-medium px-4 py-1.5 rounded-lg capitalize transition-all duration-200 ${
              filter === f ? 'bg-blue-600 text-white shadow' : 'text-white/40 hover:text-white/70'
            }`}
          >
            {f === 'all' ? 'All' : f === 'active' ? 'Active' : f === 'scheduled' ? 'Scheduled' : 'Ended'}
          </button>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
          <AlertCircle size={14} />
          {error}
        </div>
      )}

      {/* Meetings List */}
      {loading ? (
        <div className="flex items-center justify-center h-48">
          <p className="text-gray-400">Loading meetings...</p>
        </div>
      ) : filteredMeetings.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 bg-[#0d1526] border border-white/[0.07] rounded-2xl">
          <Video size={40} className="text-gray-600 mb-3" />
          <p className="text-gray-400 font-medium">No meetings found</p>
          <p className="text-gray-600 text-sm mt-1">
            {filter === 'all' ? 'Create one to get started' : `No ${filter} meetings`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMeetings.map(meeting => {
            const displayStatus = getMeetingDisplayStatus(meeting)
            const config = statusConfig[displayStatus]
            const isMyMeeting = user?.email === meeting.host?.email

            return (
              <div
                key={meeting._id}
                className={`bg-[#0d1526] border rounded-2xl p-6 transition-all duration-200 ${
                  displayStatus === 'starting-soon'
                    ? 'border-blue-500/40 shadow-lg shadow-blue-500/10'
                    : 'border-white/[0.07] hover:border-white/[0.14]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-lg font-semibold text-white">{meeting.title}</h2>
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${config.class}`}>
                        {config.label}
                      </span>
                      {isMyMeeting && (
                        <span className="text-xs bg-blue-600/20 text-blue-400 px-2 py-0.5 rounded-full">
                          Host
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1.5">
                        <Users size={14} />
                        {meeting.host?.name || 'Unknown'}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        {new Date(meeting.scheduledAt).toLocaleDateString('en-US', {
                          weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
                        })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} />
                        {new Date(meeting.scheduledAt).toLocaleTimeString('en-US', {
                          hour: '2-digit', minute: '2-digit'
                        })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users size={14} />
                        {meeting.participants?.length || 0} participants
                      </span>
                    </div>

                    <div className="mt-2">
                      <span className="text-xs text-gray-600">Code: </span>
                      <span className="text-xs font-mono text-blue-400">{meeting.meetingCode}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4 shrink-0">
                    {/* Host controls */}
                    {isMyMeeting && displayStatus !== 'ended' && displayStatus !== 'scheduled' && (
                      <button
                        onClick={() => handleMarkEnded(meeting._id)}
                        title="Mark as ended"
                        className="flex items-center gap-1.5 bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-2 rounded-lg text-xs font-medium transition"
                      >
                        <CheckCircle size={13} /> End
                      </button>
                    )}
                    {isMyMeeting && (
                      <button
                        onClick={() => handleDelete(meeting._id)}
                        className="w-9 h-9 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center transition"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                    {displayStatus !== 'ended' && (
                      <button
                        onClick={() => handleJoin(meeting._id, meeting.meetingCode, meeting.title, meeting.host?.email)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                          displayStatus === 'starting-soon' || displayStatus === 'active'
                            ? 'bg-green-600 hover:bg-green-700 text-white'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                      >
                        <Video size={14} />
                        {displayStatus === 'starting-soon' ? 'Join Now' : 'Join'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Create Meeting Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 w-full max-w-md">
            <h2 className="text-xl font-bold text-white mb-6">Create Meeting</h2>
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm block mb-1">Meeting Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Sprint Planning"
                  className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 outline-none border border-gray-700 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-400 text-sm block mb-1">Date</label>
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 outline-none border border-gray-700 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm block mb-1">Time</label>
                  <input
                    type="time"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 outline-none border border-gray-700 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => { setShowModal(false); setTitle(''); setScheduledDate(''); setScheduledTime('') }}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreate}
                  disabled={creating || !title || !scheduledDate || !scheduledTime}
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