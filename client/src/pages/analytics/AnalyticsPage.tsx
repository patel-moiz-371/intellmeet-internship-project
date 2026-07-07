import { useState, useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import { Video, Users, CheckSquare, Clock, Brain, AlertTriangle } from 'lucide-react'

const API_BASE = 'http://localhost:5000/api'

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

const colorMap: Record<string, string> = {
  blue: 'bg-blue-600/20 text-blue-400',
  green: 'bg-green-600/20 text-green-400',
  purple: 'bg-purple-600/20 text-purple-400',
  yellow: 'bg-yellow-600/20 text-yellow-400',
  indigo: 'bg-indigo-600/20 text-indigo-400',
  red: 'bg-red-600/20 text-red-400',
}

const AnalyticsPage = () => {
  const { token } = useAuthStore()
  const [meetings, setMeetings] = useState<Meeting[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [range, setRange] = useState('1M')

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mRes, tRes] = await Promise.all([
          fetch(`${API_BASE}/meetings`, { headers }),
          fetch(`${API_BASE}/tasks`, { headers }),
        ])
        const mData = await mRes.json()
        const tData = await tRes.json()
        if (mData.success) setMeetings(mData.data)
        if (tData.success && Array.isArray(tData.data)) setTasks(tData.data)
      } catch {
        console.error('Failed to fetch analytics data')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Stats
  const totalMeetings = meetings.length
  const uniqueParticipants = new Set(meetings.flatMap(m => m.participants?.map(p => p._id) || [])).size
  const completedTasks = tasks.filter(t => t.status === 'done').length
  const totalTasks = tasks.length
  const taskCompletionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
  const endedMeetings = meetings.filter(m => m.status === 'ended').length

  const stats = [
    { title: 'Total Meetings', value: String(totalMeetings), subtitle: 'All time', icon: Video, color: 'blue' },
    { title: 'Participants', value: String(uniqueParticipants), subtitle: 'Unique across meetings', icon: Users, color: 'green' },
    { title: 'AI Summaries', value: '0', subtitle: 'Coming soon', icon: Brain, color: 'purple' },
    { title: 'Task Completion', value: `${taskCompletionRate}%`, subtitle: 'Across all tasks', icon: CheckSquare, color: 'yellow' },
    { title: 'Total Tasks', value: String(totalTasks), subtitle: `${completedTasks} completed`, icon: Clock, color: 'indigo' },
    { title: 'Ended Meetings', value: String(endedMeetings), subtitle: 'Completed sessions', icon: AlertTriangle, color: 'red' },
  ]

  // Weekly meeting activity chart data
  const getWeeklyData = () => {
    const weeks: Record<string, { meetings: number; participants: number }> = {}
    const now = new Date()
    const weeksCount = range === '1M' ? 4 : range === '3M' ? 12 : range === '6M' ? 24 : 52

    for (let i = weeksCount - 1; i >= 0; i--) {
      const d = new Date(now)
      d.setDate(d.getDate() - i * 7)
      const label = `W${Math.ceil(d.getDate() / 7)} ${d.toLocaleString('default', { month: 'short' })}`
      weeks[label] = { meetings: 0, participants: 0 }
    }

    meetings.forEach(m => {
      const d = new Date(m.scheduledAt)
      const label = `W${Math.ceil(d.getDate() / 7)} ${d.toLocaleString('default', { month: 'short' })}`
      if (weeks[label]) {
        weeks[label].meetings += 1
        weeks[label].participants += m.participants?.length || 0
      }
    })

    return Object.entries(weeks).map(([week, data]) => ({ week, ...data }))
  }

  // Task chart data
  const taskChartData = [
    { name: 'To Do', value: tasks.filter(t => t.status === 'todo').length, fill: '#6366f1' },
    { name: 'In Progress', value: tasks.filter(t => t.status === 'in-progress').length, fill: '#f59e0b' },
    { name: 'Completed', value: completedTasks, fill: '#10b981' },
  ]

  // Recent meetings
  const recentMeetings = [...meetings]
    .sort((a, b) => new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime())
    .slice(0, 7)

  const weeklyData = getWeeklyData()

  return (
    <div className="p-6 max-w-7xl mx-auto">

      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Analytics Overview</h1>
        <p className="text-gray-400 mt-1">Track meeting activity, task performance and engagement.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.title} className="bg-[#0d1526] border border-white/[0.07] rounded-2xl p-5 hover:border-white/[0.14] transition">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[stat.color]}`}>
                  <Icon size={18} />
                </div>
              </div>
              <p className="text-2xl font-bold text-white">{loading ? '—' : stat.value}</p>
              <p className="text-sm text-white/75 mt-1">{stat.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{stat.subtitle}</p>
            </div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 mb-8">

        {/* Meeting Activity Chart */}
        <div className="xl:col-span-3 bg-[#0d1526] border border-white/[0.07] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white">Meeting Activity</h2>
              <p className="text-sm text-gray-400 mt-0.5">Weekly sessions and participants</p>
            </div>
            <div className="flex gap-1 bg-white/5 p-1 rounded-xl">
              {['1M', '3M', '6M', '1Y'].map(r => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${
                    range === r ? 'bg-blue-600 text-white' : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={weeklyData}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" vertical={false} />
              <XAxis dataKey="week" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#0d1526', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
              <Legend wrapperStyle={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }} />
              <Area type="monotone" dataKey="meetings" stroke="#6366f1" strokeWidth={2} fill="rgba(99,102,241,0.1)" dot={false} />
              <Area type="monotone" dataKey="participants" stroke="#34d399" strokeWidth={2} fill="rgba(52,211,153,0.1)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Task Chart */}
        <div className="xl:col-span-2 bg-[#0d1526] border border-white/[0.07] rounded-2xl p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white">Task Overview</h2>
            <p className="text-sm text-gray-400 mt-0.5">Current status breakdown</p>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={taskChartData}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip contentStyle={{ background: '#0d1526', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {taskChartData.map((entry, index) => (
                  <rect key={index} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Meetings Table */}
      <div className="bg-[#0d1526] border border-white/[0.07] rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-white mb-5">Recent Meetings</h2>
        {loading ? (
          <p className="text-gray-500 text-sm text-center py-8">Loading...</p>
        ) : recentMeetings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Video size={40} className="text-gray-600 mb-3" />
            <p className="text-gray-400">No meetings yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {['Meeting', 'Host', 'Participants', 'Date', 'Status'].map(h => (
                    <th key={h} className="text-left text-xs text-white/30 font-medium pb-3 pr-6 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {recentMeetings.map(meeting => (
                  <tr key={meeting._id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 pr-6 font-medium text-white/80">{meeting.title}</td>
                    <td className="py-3.5 pr-6 text-white/50">{meeting.host?.name || 'Unknown'}</td>
                    <td className="py-3.5 pr-6 text-white/50">{meeting.participants?.length || 0}</td>
                    <td className="py-3.5 pr-6 text-white/50">
                      {new Date(meeting.scheduledAt).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric'
                      })}
                    </td>
                    <td className="py-3.5">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${
                        meeting.status === 'ended'
                          ? 'bg-gray-500/10 text-gray-400'
                          : meeting.status === 'active'
                          ? 'bg-green-500/10 text-green-400'
                          : 'bg-amber-500/10 text-amber-400'
                      }`}>
                        {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default AnalyticsPage