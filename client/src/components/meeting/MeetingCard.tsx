interface MeetingCardProps {
  title: string
  host: string
  date: string
  status: "Scheduled" | "Active"
}

const MeetingCard = ({
  title,
  host,
  date,
  status,
}: MeetingCardProps) => {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-500 transition-all duration-300 shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">
            {title}
          </h2>

          <p className="text-gray-400 mt-2">
            Host: {host}
          </p>

          <p className="text-gray-500 text-sm mt-1">
            {date}
          </p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            status === "Active"
              ? "bg-green-600/20 text-green-400"
              : "bg-yellow-600/20 text-yellow-400"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="mt-6 flex justify-end">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition">
          Join
        </button>
      </div>
    </div>
  )
}

export default MeetingCard