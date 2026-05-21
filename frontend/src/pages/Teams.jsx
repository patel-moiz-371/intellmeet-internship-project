import MainLayout from "../layouts/MainLayout";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Rohit Sharma",
    role: "Backend Engineer",
    status: "Online",
  },
  {
    name: "Jay Gaikwad",
    role: "Frontend Developer",
    status: "Online",
  },
  {
    name: "Charulatha",
    role: "UI Developer",
    status: "Offline",
  },
  {
    name: "Aman Verma",
    role: "AI Engineer",
    status: "Online",
  },
];

const Teams = () => {
  return (
    <MainLayout>

      <h1 className="text-3xl font-bold text-white mb-6">
        Teams
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {teamMembers.map((member, index) => (

          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: index * 0.1,
            }}
            whileHover={{
              scale: 1.03,
            }}
            className="bg-slate-800 rounded-2xl p-6 shadow-lg"
          >

            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-sky-500 flex items-center justify-center text-2xl font-bold text-white mb-5">
              {member.name.charAt(0)}
            </div>

            {/* Name */}
            <h2 className="text-xl font-semibold text-white mb-2">
              {member.name}
            </h2>

            {/* Role */}
            <p className="text-gray-400 mb-4">
              {member.role}
            </p>

            {/* Status */}
            <div className="flex items-center gap-2">

              <div
                className={`w-3 h-3 rounded-full ${
                  member.status === "Online"
                    ? "bg-green-400"
                    : "bg-gray-500"
                }`}
              />

              <span
                className={`text-sm ${
                  member.status === "Online"
                    ? "text-green-400"
                    : "text-gray-400"
                }`}
              >
                {member.status}
              </span>

            </div>

          </motion.div>

        ))}

      </div>

    </MainLayout>
  );
};

export default Teams;