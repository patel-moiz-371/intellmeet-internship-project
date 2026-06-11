import { useAuthStore } from '@/store/authStore'
import { StatsCard } from '@/components/analytics/StatsCard'

const DashboardPage = () => {
  const { user } = useAuthStore()

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">
        Welcome, {user?.name} 👋
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatsCard
          title="Total Meetings"
          value="1,284"
          subtitle="This quarter"
          color="blue"
          trend={{ value: 12 }}
          icon={<span>📅</span>}
        />
        <StatsCard
          title="Active Users"
          value="9,432"
          subtitle="Unique participants"
          color="green"
          trend={{ value: 5 }}
          icon={<span>👥</span>}
        />
        <StatsCard
          title="Task Completion"
          value="83%"
          subtitle="Across all teams"
          color="purple"
          trend={{ value: 7 }}
          icon={<span>✅</span>}
        />
      </div>
    </div>
  )
}

export default DashboardPage