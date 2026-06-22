import { useState } from 'react'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import { Video, Users, CheckSquare, Clock, Brain, AlertTriangle } from 'lucide-react'

const meetingsData = [
  { week: 'Week 1', meetings: 0, participants: 0 },
  { week: 'Week 2', meetings: 0, participants: 0 },
  { week: 'Week 3', meetings: 0, participants: 0 },
  { week: 'Week 4', meetings: 0, participants: 0 },
]

const taskData = [
  { name: 'Completed', value: 0 },
  { name: 'Pending', value: 0 },
  { name: 'Overdue', value: 0 },
]

const stats = [
  { title: 'Total Meetings', value: '0', subtitle: 'This quarter', icon: Video, color: 'blue' },
  { title: 'Active Users', value: '0', subtitle: 'Unique participants', icon: Users, color: 'green' },
  { title: 'AI Summaries', value: '0', subtitle: 'Auto-generated', icon: Brain, color: 'purple' },
  { title: 'Task Completion', value: '0%', subtitle: 'Across all teams', icon: CheckSquare, color: 'yellow' },
  { title: 'Meeting Hours', value: '0h', subtitle: 'This month', icon: Clock, color: 'indigo' },
  { title: 'Dropped Sessions', value: '0', subtitle: 'This week', icon: AlertTriangle, color: 'red' },
]

const colorMap: Record<string, string> = {
  blue: 'bg-blue-600/20 text-blue-400',
  green: 'bg-green-600/20 text-green-400',
  purple: 'bg-purple-600/20 text-purple-400',
  yellow: 'bg-yellow-600/20 text-yellow-400',
  indigo: 'bg-indigo-600/20 text-indigo-400',
  red: 'bg-red-600/20 text-red-400',
}

const AnalyticsPage = () => {
  const [range, setRange] = useState('3M')

  return (
    <div>
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Analytics Overview</h1>
        <p className="text-gray-400 mt-1">
          Track meeting activity, task performance and engagement.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.title} className="bg-gray-900 rounded-xl p-5 border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorMap[stat.color]}`}>
                  <Icon size={18} />
                </div>
              </div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-white mt-1">{stat.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{stat.subtitle}</p>
            </div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 mb-8">

        {/* Meeting Activity Chart */}
        <div className="xl:col-span-3 bg-gray-900 border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white">Meeting Activity</h2>
              <p className="text-sm text-gray-400 mt-0.5">Weekly sessions and participants</p>
            </div>
            <div className="flex gap-1 bg-gray-800 p-1 rounded-lg">
              {['1M', '3M', '6M', '1Y'].map(r => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className={`text-xs px-3 py-1.5 rounded-md transition-all ${
                    range === r ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={meetingsData}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" vertical={false} />
              <XAxis dataKey="week" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
              <Legend wrapperStyle={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }} />
              <Area type="monotone" dataKey="meetings" stroke="#6366f1" strokeWidth={2} fill="rgba(99,102,241,0.1)" dot={false} />
              <Area type="monotone" dataKey="participants" stroke="#34d399" strokeWidth={2} fill="rgba(52,211,153,0.1)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Task Completion Chart */}
        <div className="xl:col-span-2 bg-gray-900 border border-gray-800 rounded-xl p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white">Task Completion</h2>
            <p className="text-sm text-gray-400 mt-0.5">By status this quarter</p>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={taskData}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
              <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Meetings Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Recent Meetings</h2>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Video size={40} className="text-gray-600 mb-3" />
          <p className="text-gray-400">No meetings yet</p>
          <p className="text-gray-500 text-sm mt-1">Your meeting history will appear here</p>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsPage