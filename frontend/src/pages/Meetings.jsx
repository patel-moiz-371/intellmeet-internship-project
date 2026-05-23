import MainLayout from "../layouts/MainLayout";
import { motion } from "framer-motion";

const meetings = [
  {
    title: "Sprint Planning",
    time: "10:00 AM",
    status: "Live",
    participants: 12,
  },
  {
    title: "Client Discussion",
    time: "1:30 PM",
    status: "Scheduled",
    participants: 8,
  },
  {
    title: "AI Feature Review",
    time: "4:00 PM",
    status: "Completed",
    participants: 15,
  },
];

const Meetings = () => {
  return (
    <MainLayout>

      <h1 className="text-3xl font-bold text-white mb-6">
        Meetings
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {meetings.map((meeting, index) => (

          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: index * 0.1,
            }}
            whileHover={{
              scale: 1.02,
            }}
            className="bg-slate-800 rounded-2xl p-6 shadow-lg"
          >

            <div className="flex justify-between items-center mb-4">

              <h2 className="text-xl font-semibold text-white">
                {meeting.title}
              </h2>

              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  meeting.status === "Live"
                    ? "bg-green-500/20 text-green-400"
                    : meeting.status === "Scheduled"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-slate-700 text-gray-300"
                }`}
              >
                {meeting.status}
              </span>

            </div>

            <p className="text-gray-400 mb-2">
              Time: {meeting.time}
            </p>

            <p className="text-gray-400 mb-6">
              Participants: {meeting.participants}
            </p>

            <button className="w-full bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-xl transition">
              Join Meeting
            </button>

          </motion.div>

        ))}

      </div>

    </MainLayout>
  );
};

export default Meetings;