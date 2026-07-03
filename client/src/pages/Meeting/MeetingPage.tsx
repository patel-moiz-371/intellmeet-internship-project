import MeetingCard from "@/components/meeting/MeetingCard"

const meetings = [
  {
    id: 1,
    title: "Sprint Planning",
    host: "Jay Gaikwad",
    date: "15 July 2026 • 10:00 AM",
    status: "Active" as const,
  },
  {
    id: 2,
    title: "Design Review",
    host: "Priya Sharma",
    date: "16 July 2026 • 02:00 PM",
    status: "Scheduled" as const,
  },
  {
    id: 3,
    title: "Backend Sync",
    host: "Mohammed Patel",
    date: "17 July 2026 • 11:30 AM",
    status: "Scheduled" as const,
  },
  {
    id: 4,
    title: "Client Demo",
    host: "Rahul Verma",
    date: "18 July 2026 • 04:00 PM",
    status: "Active" as const,
  },
]

const MeetingPage = () => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Meetings
          </h1>

          <p className="text-gray-400 mt-2">
            Manage and join your meetings
          </p>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium transition">
          + Create Meeting
        </button>
      </div>

      <div className="grid gap-6">
        {meetings.map((meeting) => (
          <MeetingCard
            key={meeting.id}
            title={meeting.title}
            host={meeting.host}
            date={meeting.date}
            status={meeting.status}
          />
        ))}
      </div>
    </div>
  )
}

export default MeetingPage