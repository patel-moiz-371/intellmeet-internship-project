const meetings = [
  {
    title: "Project Sprint Review",
    participants: 12,
    status: "Live",
  },
  {
    title: "Client Discussion",
    participants: 8,
    status: "Completed",
  },
  {
    title: "AI Planning",
    participants: 15,
    status: "Scheduled",
  },
];

const MeetingTable = () => {
  return (
    <div className="bg-slate-800 mt-6 rounded-2xl p-6">
      <h2 className="text-xl text-white font-semibold mb-4">
        Recent Meetings
      </h2>

      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-400">
            <th className="pb-3">Meeting</th>
            <th className="pb-3">Participants</th>
            <th className="pb-3">Status</th>
          </tr>
        </thead>

        <tbody>
          {meetings.map((meeting, index) => (
            <tr key={index} className="border-t border-slate-700">
              <td className="py-4 text-white">
                {meeting.title}
              </td>

              <td className="text-gray-300">
                {meeting.participants}
              </td>

              <td>
                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                  {meeting.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MeetingTable;