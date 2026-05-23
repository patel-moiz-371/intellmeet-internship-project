import { motion } from "framer-motion";

const cards = [
  {
    title: "Total Meetings",
    value: "128",
  },
  {
    title: "Active Users",
    value: "1,245",
  },
  {
    title: "AI Summaries",
    value: "320",
  },
  {
    title: "Tasks Created",
    value: "89",
  },
];

const DashboardCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

      {cards.map((card, index) => (

        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
          }}
          whileHover={{
            scale: 1.03,
          }}
          className="bg-slate-800 p-6 rounded-2xl shadow-lg"
        >

          <h2 className="text-gray-400 text-sm">
            {card.title}
          </h2>

          <p className="text-3xl font-bold text-white mt-2">
            {card.value}
          </p>

        </motion.div>

      ))}

    </div>
  );
};

export default DashboardCards;