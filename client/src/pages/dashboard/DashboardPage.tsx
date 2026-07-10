import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useNavigate } from 'react-router-dom'
import { Video, Users, CheckSquare, Clock, Calendar, ArrowRight } from 'lucide-react'
import { API_BASE_URL } from '@/config/constants'

const API_BASE = API_BASE_URL

interface Meeting {
  _id: string
  title: string
  host: { name: string; email: string }
  scheduledAt: string
  status: 'scheduled' | 'active' | 'ended'
  meetingCode: string
  participants: { _id: string }[]
}

interface Task {
  _id: string
  title: string
  status: 'todo' | 'in-progress' | 'done'
  priority: 'low' | 'medium' | 'high'
  assignedTo: string
  dueDate: string
}

const getMeetingStatus = (meeting: Meeting) => {
  if (meeting.status === 'ended') return 'ended'
  const now = new Date()
  const scheduled = new Date(meeting.scheduledAt)
  const diffMins = (scheduled.getTime() - now.getTime()) / 60000
  if (diffMins <= 10 && diffMins > 0) return 'starting-soon'
  if (diffMins <= 0) return 'active'
  return 'scheduled'
}

const DashboardPage = () => {
  const { user, token } = useAuthStore()
  const navigate = useNavigate()
  const [meetings, setMeetings] = useState<Meeting[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [meetingsRes, tasksRes] = await Promise.all([
          fetch(`${API_BASE}/meetings`, { headers }),
          fetch(`${API_BASE}/tasks`, { headers }),
        ])
        const meetingsData = await meetingsRes.json()
        const tasksData = await tasksRes.json()
        if (meetingsData.success) setMeetings(meetingsData.data)
        if (tasksData.success && Array.isArray(tasksData.data)) setTasks(tasksData.data)
      } catch {
        console.error('Failed to fetch dashboard data')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const totalMeetings = meetings.length
  const activeMeetings = meetings.filter(m => getMeetingStatus(m) === 'active').length
  const pendingTasks = tasks.filter(t => t.status === 'todo' || t.status === 'in-progress').length
  const uniqueParticipants = new Set(meetings.flatMap(m => m.participants?.map(p => p._id) || [])).size
  const recentMeetings = [...meetings]
    .sort((a, b) => new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime())
    .slice(0, 5)
  const upcomingMeetings = meetings
    .filter(m => getMeetingStatus(m) === 'scheduled' || getMeetingStatus(m) === 'starting-soon')
    .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())
    .slice(0, 3)

  const statusConfig: Record<string, { label: string; class: string }> = {
    'active': { label: 'Active', class: 'bg-green-500/10 text-green-400' },
    'starting-soon': { label: 'Starting Soon', class: 'bg-blue-500/10 text-blue-400' },
    'scheduled': { label: 'Scheduled', class: 'bg-amber-500/10 text-amber-400' },
    'ended': { label: 'Ended', class: 'bg-gray-500/10 text-gray-400' },
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">

      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-gray-400 mt-1">Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#0d1526] border border-white/[0.07] rounded-2xl p-6 hover:border-white/[0.14] transition">
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-400 text-sm">Total Meetings</p>
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center">
              <Video size={18} className="text-blue-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">{loading ? '—' : totalMeetings}</p>
          <p className="text-gray-400 text-xs mt-1">{activeMeetings} active now</p>
        </div>

        <div className="bg-[#0d1526] border border-white/[0.07] rounded-2xl p-6 hover:border-white/[0.14] transition">
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-400 text-sm">Participants</p>
            <div className="w-10 h-10 rounded-xl bg-green-600/20 flex items-center justify-center">
              <Users size={18} className="text-green-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">{loading ? '—' : uniqueParticipants}</p>
          <p className="text-gray-400 text-xs mt-1">Across all meetings</p>
        </div>

        <div className="bg-[#0d1526] border border-white/[0.07] rounded-2xl p-6 hover:border-white/[0.14] transition">
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-400 text-sm">Pending Tasks</p>
            <div className="w-10 h-10 rounded-xl bg-yellow-600/20 flex items-center justify-center">
              <CheckSquare size={18} className="text-yellow-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">{loading ? '—' : pendingTasks}</p>
          <p className="text-gray-400 text-xs mt-1">{tasks.filter(t => t.status === 'done').length} completed</p>
        </div>

        <div className="bg-[#0d1526] border border-white/[0.07] rounded-2xl p-6 hover:border-white/[0.14] transition">
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-400 text-sm">Upcoming</p>
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center">
              <Clock size={18} className="text-purple-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">{loading ? '—' : upcomingMeetings.length}</p>
          <p className="text-gray-400 text-xs mt-1">Scheduled meetings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Upcoming Meetings */}
        <div className="bg-[#0d1526] border border-white/[0.07] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-white">Upcoming Meetings</h2>
            <button
              onClick={() => navigate('/meetings')}
              className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm transition"
            >
              View all <ArrowRight size={14} />
            </button>
          </div>

          {loading ? (
            <p className="text-gray-500 text-sm text-center py-8">Loading...</p>
          ) : upcomingMeetings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10">
              <Calendar size={32} className="text-gray-600 mb-2" />
              <p className="text-gray-400 text-sm">No upcoming meetings</p>
              <button
                onClick={() => navigate('/meetings')}
                className="mt-3 text-blue-400 hover:text-blue-300 text-xs transition"
              >
                Create one →
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingMeetings.map(meeting => {
                const status = getMeetingStatus(meeting)
                const config = statusConfig[status]
                return (
                  <div key={meeting._id} className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl border border-white/[0.05]">
                    <div>
                      <p className="text-white text-sm font-medium">{meeting.title}</p>
                      <p className="text-gray-500 text-xs mt-0.5">
                        {new Date(meeting.scheduledAt).toLocaleDateString('en-US', {
                          weekday: 'short', month: 'short', day: 'numeric'
                        })} • {new Date(meeting.scheduledAt).toLocaleTimeString('en-US', {
                          hour: '2-digit', minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${config.class}`}>
                      {config.label}
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Recent Meetings */}
        <div className="bg-[#0d1526] border border-white/[0.07] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-white">Recent Meetings</h2>
            <button
              onClick={() => navigate('/meetings')}
              className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm transition"
            >
              View all <ArrowRight size={14} />
            </button>
          </div>

          {loading ? (
            <p className="text-gray-500 text-sm text-center py-8">Loading...</p>
          ) : recentMeetings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10">
              <Video size={32} className="text-gray-600 mb-2" />
              <p className="text-gray-400 text-sm">No meetings yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentMeetings.map(meeting => {
                const status = getMeetingStatus(meeting)
                const config = statusConfig[status]
                return (
                  <div key={meeting._id} className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl border border-white/[0.05]">
                    <div>
                      <p className="text-white text-sm font-medium">{meeting.title}</p>
                      <p className="text-gray-500 text-xs mt-0.5">
                        Host: {meeting.host?.name} • {meeting.participants?.length || 0} participants
                      </p>
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${config.class}`}>
                      {config.label}
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default DashboardPage